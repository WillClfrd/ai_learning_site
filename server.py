from site_python_files.engine import minimax_engine as me
import site_python_files.uniform_cost as UCS
import site_python_files.a_star as AS
import asyncio
from websockets.server import serve
import json

pages = ["a_star_search","id3_dec_tree","minmax_adv_search","gen_algo","stoch_grad_desc","uni_cost_search","home"]
js_scripts = ["a_star_search", "gen_algo", "home.js", "id3_dec_tree", "index.js", "minmax_adv_search", "model", "stoch_grad_desc", "uni_cost_search"]
conn = 0

# define websocket here to make calls to minimax_engine methods and return call results
async def handle_req(websocket):
    print("connection established")
    # catches input from websocket
    async for message in websocket:
        res = {}
        req = json.loads(message)

        if req["method"] == "ismovelegal":
            me.board = req["board"]
            res["method"] = "ismovelegal"
            moveCheck = me.IsMoveLegal((req["move"]["from"][0],req["move"]["from"][1]), (req["move"]["to"][0],req["move"]["to"][1]))

            me.board[req["move"]["to"][0]][req["move"]["to"][1]] = req["board"][req["move"]["from"][0]][req["move"]["from"][1]]
            me.board[req["move"]["from"][0]][req["move"]["from"][1]] = '.'
            check = me.IsInCheck(req["player"])

            res["result"] = moveCheck and not check
            res["checkmate"] = me.IsCheckmate(req["opponent"])
            res["error"] = "none"
        elif req["method"] == "getminimaxmove":
            res["method"] = "getminimaxmove"
            me.board = req["board"]
            res["move"] = me.GetMinMaxMove(req["player"])
        elif req["method"] == "geteval":
            me.board = req["board"]
            res["eval"] = me.evl(req["player"])
        elif req["method"] == "getpage":
            if req["page"] in pages:
                with open("html/" + req["page"] + ".html", "r") as file:
                    res["content"] = file.read()
                    res["error"] = "none"
                    
                    scripts = []

                    if req["scripts"]:
                        for script in req["scripts"]:
                            if script in js_scripts:
                                scripts.append("assets/js/" + str(script) + ".js")
                        
                        res["scripts"] = scripts
                    else:
                        with open("html/error.html","r") as file:
                            res["content"] = file.read()
                            res["scripts"] = ["assets/js/error.js"]
                            res["error"] = "invalid_script"
            else:
                with open("html/error.html","r") as file:
                    res["content"] = file.read()
                    res["scripts"] = ["assets/js/error.js"]
                    res["error"] = "invalid_page"
        elif req["method"] == "ucs":
            print("uniform cost search")
            
            # parse nodes, edges, start, and goal from req and use to create ucs object and call ucs functions
            nodes = []
            edges = []
            start = 0
            goal = 0

            if goal != -1:
                ucs = UCS.UCS(start=start, goal=goal, nodes=nodes, edges=edges)
            else:
                ucs = UCS.UCS(start=start, nodes=nodes, edges=edges)

            result_path = ucs.graph_search()

            # package result_path appropriately
            res["result"] = result_path
        elif req["method"] == "a_star":
            print("a star search")

            # parse out nodes, edges, h_n values, start, and goal
            nodes = []
            edges = []
            h_n = {}
            start = 0
            goal = 0

            a_star = AS.AStar(nodes, edges, h_n, start, goal)

            result_path = a_star.a_star()

            # package result_path appropriately
            res["result"] = result_path
        elif req["method"] == "sgd":
            print("stochastic gradient descent")
        elif req["method"] == "id3":
            print("id3 decision tree")
        else:
            res["error"] = "invalid command"
        await websocket.send(json.dumps(res))

# use to test if websocket is listening, obtaining messages, and responding correctly
async def echo(websocket):
    async for message in websocket:
        req = json.loads(message)
        for item in req:
            await websocket.send(f"{item}: {req[item]}")

async def main():
    async with serve(handle_req, "localhost", 11111):
        print("websocket running")
        await asyncio.Future()

asyncio.run(main())