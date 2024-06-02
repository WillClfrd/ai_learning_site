from site_python_files.engine import minimax_engine as me
import site_python_files.uniform_cost as UCS
import site_python_files.a_star as AS
import asyncio
from websockets.server import serve
import json
from bs4 import BeautifulSoup as bs
import re

pages = ["a_star_search","id3_dec_tree","minmax_adv_search","gen_algo","stoch_grad_desc","uni_cost_search","home","wsid"]
js_scripts = ["a_star_search", "gen_algo", "home.js", "id3_dec_tree", "index.js", "minmax_adv_search", "model", "stoch_grad_desc", "uni_cost_search", "wsid"]
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

            me.white_king = req["flags"][0]
            me.white_krook = req["flags"][1]
            me.white_qrook = req["flags"][2]
            me.black_king = req["flags"][3]
            me.black_krook = req["flags"][4]
            me.black_qrook = req["flags"][5]
            me.en_passant = req["flags"][6]
            me.ep_targets = req["en_passant_targets"]
            me.is_ep = False

            res["method"] = "ismovelegal"
            moveCheck = me.IsMoveLegal((req["move"]["from"][0],req["move"]["from"][1]), (req["move"]["to"][0],req["move"]["to"][1]))

            me.board[req["move"]["to"][0]][req["move"]["to"][1]] = req["board"][req["move"]["from"][0]][req["move"]["from"][1]]
            me.board[req["move"]["from"][0]][req["move"]["from"][1]] = '.'
            check = me.IsInCheck(req["player"])

            res["result"] = moveCheck and not check
            res["checkmate"] = me.IsCheckmate(req["opponent"])
            res["ep_picked"] = me.is_ep
            res["error"] = "none"
        elif req["method"] == "getminimaxmove":
            res["method"] = "getminimaxmove"
            me.board = req["board"]
            res["move"] = me.GetMinMaxMove(req["player"])
            me.movePiece(res["move"][0],res["move"][1],me.board)
            #res["board"] = me.board
            res["checkmate"] = me.IsCheckmate(req["opponent"])
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
            try: 
                nodes = req["nodes"]
                edges = req["edges"]
                start = req["start"]

                try:
                    goal = req["end"]
                except:
                    goal = -1

                if goal != -1:
                    ucs = UCS.UCS(start=start, goal=goal, nodes=nodes, edges=edges)
                else:
                    ucs = UCS.UCS(start=start, nodes=nodes, edges=edges)

                steps = ucs.graph_search()

                result = []
                for i in range(0,len(steps)):
                    result.append({})
                    result[i]["frontier"] = []
                    for path in steps[i]["frontier"]:
                        result[i]["frontier"].append({"nodes": path.nodes, "cost": path.cost})
                    
                    result[i]["path"] = {"nodes": steps[i]["path"].nodes, "cost": steps[i]["path"].cost}

                    try:
                        result[i]["total_path"] = {}
                        result[i]["total_path"]["nodes"] = []
                        for node in steps[i]["total_path"]:
                            result[i]["total_path"]["nodes"].append(node.nodes)
                        result[i]["total_path"]["cost"] = 0
                    except:
                        result[i]["total_path"] = result[i]["path"]

                res["steps"] = result
                res["error"] = 0
            except:
                res["steps"] = []
                res["error"] = -1
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
        elif req["method"] == "add_doc_module":
            print(req)
            try:
                with open("html/wsid.html","r+") as base:
                    print("1")
                    page = base.read()
                    print("2")
                    content = open("html/doc_module.html","r").read().split("$")
                    print("3")
                    for i in range(0,len(content)):
                        if content[i] == "module_name":
                            content[i] = req["module_name"]
                    print("4")
                    new_content = ""
                    print("5")
                    for tok in content:
                        new_content += tok
                    print("6")
                    soup = bs(page,"html")
                    print("7")
                    new_div = soup.new_tag('div')
                    new_div.string = new_content
                    new_div["class"] = "doc_module_div"
                    new_div["id"] = req["module_name"].lower() + "_module_div"
                    print("8")
                    module_div = soup.find('div', id='modules_div')
                    module_div.append(new_div)
                    print("9")

                    lt_pattern = re.compile(r'(&lt;)')
                    gt_pattern = re.compile(r'(&gt;)')
                    out_text = soup.prettify()
                    out_text = re.sub(lt_pattern,'<',out_text)
                    out_text = re.sub(gt_pattern,'>',out_text)

                    with open("html/wsid.html","w") as outFile:
                        outFile.write(out_text)
                    print("10")
                    res["error"] = 0
            except:
                res["error"] = -1
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