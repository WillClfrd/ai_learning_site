from site_python_files.engine import minimax_engine as me
import site_python_files.uniform_cost as UCS
import site_python_files.a_star as AS
import asyncio
from websockets.server import serve
import json

pages = ["a_star_search","id3_dec_tree","minmax_adv_search","gen_algo","stoch_grad_desc","uni_cost_search","home"]
js_scripts = ["a_star_search", "gen_algo", "home.js", "id3_dec_tree", "index.js", "minmax_adv_search", "model", "stoch_grad_desc", "uni_cost_search"]

# define websocket here to make calls to minimax_engine methods and return call results
async def handle_req(websocket):
    print("connection established")
    # catches input from websocket
    async for message in websocket:
        res = {}
        # returns every input received from websocket
        req = json.loads(message)
        # check exact format for parsing json into function parameters and for assigning function return values
        # print(req)
        if req["method"] == "ismovelegal":
            me.board = req["board"]
            res["method"] = "ismovelegal"
            moveCheck = me.IsMoveLegal((req["move"]["from"][0],req["move"]["from"][1]), (req["move"]["to"][0],req["move"]["to"][1]))
            # print(f"moveCheck: {moveCheck}")
            # make move to see if in check
            # print(req["board"])
            me.board[req["move"]["to"][0]][req["move"]["to"][1]] = req["board"][req["move"]["from"][0]][req["move"]["from"][1]]
            me.board[req["move"]["from"][0]][req["move"]["from"][1]] = '.'
            check = me.IsInCheck(req["player"])
            # print(f"inCheck: {check}")
            # print(me.board)
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
            # print(req["page"])
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
        elif req["method"] == "uniform_cost_search":
            print("uniform cost search")
        elif req["method"] == "a_star_search":
            print("a star search")
        else:
            res["error"] = "invalid command"
        #print(f"Sending: {res}")
        await websocket.send(json.dumps(res))
        #print("res sent")

# use to test if websocket is listening, obtaining messages, and responding correctly
async def echo(websocket):
    async for message in websocket:
        req = json.loads(message)
        for item in req:
            await websocket.send(f"{item}: {req[item]}")

async def main():
    # sets hostname to listen on, function to handle requests, and port to listen on
    async with serve(handle_req, "localhost", 11111):
        # awaits future requests (will run forever unless stopped manually or erroring out)
        print("websocket running")
        await asyncio.Future()

# starts the server listening on the websocket
asyncio.run(main())