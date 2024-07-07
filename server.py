from site_python_files.engine import minimax_engine as me
import site_python_files.uniform_cost as UCS
import site_python_files.a_star as AS
import site_python_files.minimax as mini
import asyncio
from websockets.server import serve
import json
from bs4 import BeautifulSoup as bs
import re

pages = ["a_star_search","id3_dec_tree","minmax_adv_search","gen_algo","stoch_grad_desc","uni_cost_search","home","wsid","chess_test"]
js_scripts = ["a_star_search", "gen_algo", "home.js", "id3_dec_tree", "index.js", "minmax_adv_search", "model", "stoch_grad_desc", "uni_cost_search", "wsid","chess_test"]
tooltips = {
    "method-name": "Name must match exactly for method to function correctly.",
    "path": "Custom data structure of format {\"nodes\": [$classes$string@nodeID$,...,$classes$string@nodeID$], \"cost\": $classes$int@val$}",
    "board": "2D character array with possible values in the set ['R','r','B','b','T','t','Q','q','K','k','P','p','.'], with uppercase indicating white pieces and lowercase indicating black pieces.",
    "move": "Custom data structure of format {\"from\": [$classes$int@row$,$classes$int@col$], \"to\": [$classes$int@row$,$classes$int@col$]}",
    "en-passant-targets": "Custom array of the format [[$classes$int@row$,$classes$int@col$],[$classes$int@row$,$classes$int@col$]]",
    "int": "Int",
    "string": "String",
    "float": "Float",
    "boolean": "Boolean",
    "char": "Char"
}
chess_game = mini.Minimax()

async def handle_req(websocket):
    print("connection established")

    async for message in websocket:
        res = {}
        req = json.loads(message)
        print(f"Request: {req}")

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
            res["checkmate"] = me.IsCheckmate(req["opponent"])
        elif req["method"] == "geteval":
            me.board = req["board"]
            res["eval"] = me.evl(req["player"])
        elif req["method"] == "getpage":
            if req["page"] in pages:
                with open("html/" + req["page"] + ".html", "r") as file:
                    page = file.read()

                    res["content"] = htmlParser(page)
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
            try:
                try:
                    nodes = req["nodes"]
                except:
                    res["steps"] = []
                    res["error"] = 2

                try:
                    edges = req["edges"]
                except:
                    res["steps"] = []
                    res["error"] = 3

                try:
                    h_n = req["h_n"]
                except:
                    res["steps"] = []
                    res["error"] = 4

                try:
                    start = req["start"]
                except:
                    res["steps"] = []
                    res["error"] = 5

                try:
                    goal = req["end"]
                except:
                    res["steps"] = []
                    res["error"] = 6

                a_star = AS.AStar(nodes, edges, h_n, start, goal)

                res["steps"] = a_star.a_star()
                res["error"] = 0
            except:
                res["error"] = -1
        elif req["method"] == "sgd":
            print("stochastic gradient descent")
        elif req["method"] == "id3":
            print("id3 decision tree")
        elif req["method"] == "add_doc_module":
            try:
                with open("html/wsid.html","r+") as base:
                    page = base.read()
                    content = open("html/doc_module.html","r").read().split("$")

                    for i in range(0,len(content)):
                        if content[i] == "module_name":
                            content[i] = req["module_name"].lower().replace(" ","-")
                        elif content[i] == "module_title":
                            content[i] = req["module_title"]

                    new_content = ""
                    for tok in content:
                        new_content += tok

                    soup = bs(page,"html")

                    new_div = soup.new_tag('div')
                    new_div.string = new_content
                    new_div["class"] = "doc_module_div"
                    new_div["id"] = req["module_name"].lower().replace(" ","-") + "_module_div"

                    module_div = soup.find('div', id='modules_div')
                    module_div.append(new_div)

                    lt_pattern = re.compile(r'(&lt;)')
                    gt_pattern = re.compile(r'(&gt;)')
                    out_text = soup.prettify()
                    out_text = re.sub(lt_pattern,'<',out_text)
                    out_text = re.sub(gt_pattern,'>',out_text)

                    with open("html/wsid.html","w") as outFile:
                        outFile.write(out_text)
                    res["error"] = 0
            except:
                res["error"] = -1
        elif req["method"] == "remove_doc_div":
            try:
                page = open("html/wsid.html","r").read()
                soup = bs(page,"html.parser")

                target = soup.find('div',id=req["id"])
                if target:
                    target.decompose()

                lt_pattern = re.compile(r'(&lt;)')
                gt_pattern = re.compile(r'(&gt;)')
                out_text = soup.prettify()
                out_text = re.sub(lt_pattern,'<',out_text)
                out_text = re.sub(gt_pattern,'>',out_text)

                outFile = open("html/wsid.html", "w")
                outFile.write(out_text)

                res["error"] = 0
                pass
            except:
                res["error"] = -1
        elif req["method"] == "edit_doc_text":
            try:
                page = open("html/wsid.html","r").read()
                soup = bs(page, "html.parser")
                
                element = soup.find(id=req["el_id"])
                element.string = req["new_text"]

                with open("html/wsid.html","w") as outFile:
                    outFile.write(str(soup))
                res["error"] = 0
            except:
                res["error"] = -1
        elif req["method"] == "add_module_method":
            try:
                page = open("html/wsid.html","r+").read()
                content = open("html/methods_component.html","r").read().split("$")

                for i in range(0,len(content)):
                    if content[i] == "module_name":
                        content[i] = req["module_name"].lower().replace(" ","-")
                    elif content[i] == "method_name":
                        content[i] = req["method_name"].replace(" ","-")
                    elif content[i] == "function":
                        content[i] = req["func"]
                    elif content[i] == "returns":
                        content[i] = req["returns"]
                    elif content[i] == "request_format":
                        content[i] = req["req_format"]
                    elif content[i] == "request_params":
                        content[i] = req["req_params"]
                    elif content[i] == "response_format":
                        content[i] = req["res_format"]
                    elif content[i] == "response_params":
                        content[i] = req["res_params"]

                new_content = '\n'
                for tok in content:
                    new_content += tok
                new_content += '\n'

                soup = bs(page,"html")

                new_div = soup.new_tag('div')
                new_div.string = new_content
                new_div["class"] = "module_subcomponent_div"
                new_div["id"] = req["module_name"].lower().replace(" ","-") + "_methods_subcomponent_div"

                methods_div = soup.find('div', id='' + req["module_name"].replace(" ","-") + '_methods_subcomponents')
                methods_div.append(new_div)

                lt_pattern = re.compile(r'(&lt;)')
                gt_pattern = re.compile(r'(&gt;)')
                out_text = str(soup)
                out_text = re.sub(lt_pattern,'<',out_text)
                out_text = re.sub(gt_pattern,'>',out_text)

                with open("html/wsid.html","w") as outFile:
                    outFile.write(out_text)
                res["error"] = 0
            except:
                res["error"] = -1
        elif req["method"] == "edit_module_method":
            try:
                page = open("html/wsid.html","r").read()
                soup = bs(page,"html.parser")

                name = soup.find(id="" + req["module_name"] + "_" + req["method_name"] + "_method_name")
                name.string = req["new_method_name"]

                func = soup.find(id="" + req["module_name"] + "_" + req["method_name"] + "_function_desc")
                func.string = req["func"]

                returns = soup.find(id="" + req["module_name"] + "_" + req["method_name"] + "_return_desc")
                returns.string = req["returns"]

                req_format = soup.find(id="" + req["module_name"] + "_" + req["method_name"] + "_req_format_desc")
                req_format.string = req["req_format"]

                req_params = soup.find(id="" + req["module_name"] + "_" + req["method_name"] + "_req_params_list")
                req_params.string = req["req_params"]

                res_format = soup.find(id="" + req["module_name"] + "_" + req["method_name"] + "_res_format_desc")
                res_format.string = req["res_format"]

                res_params = soup.find(id="" + req["module_name"] + "_" + req["method_name"] + "_res_params_list")
                res_params.string = req["res_params"]

                lt_pattern = re.compile(r'(&lt;)')
                gt_pattern = re.compile(r'(&gt;)')
                out_text = str(soup)
                out_text = re.sub(lt_pattern,'<',out_text)
                out_text = re.sub(gt_pattern,'>',out_text)

                with open("html/wsid.html","w") as outFile:
                    outFile.write(out_text)
                res["error"] = 0
            except:
                res["error"] = -1

        if req["method"] == "test_ismovelegal":
            res["method"] = "test_ismovelegal"
            try:
                try:
                    if chess_game.checkValidPlayerForMove(req["move"],req["color_id"],req["game_id"]):
                        res["result"] = chess_game.isMoveLegal(req["move"],req["game_id"]) and not chess_game.willMovePutPlayerInCheck(req["move"],req["player"],req["game_id"])

                        mateResult = chess_game.isCheckmateStalemate(req["player"],req["game_id"])

                        if mateResult == 1:
                            res["checkmate"] = True
                            res["stalemate"] = False
                        elif mateResult == 2:
                            res["checkmate"] = False
                            res["stalemate"] = True
                        else:
                            res["checkmate"] = False
                            res["stalemate"] = False

                        if res["result"]:
                            chess_game.movePiece(req["move"],req["game_id"])

                        res["board"] = chess_game.getBoard(id=req["game_id"])
                        res["error"] = 0
                    else:
                        res["board"] = chess_game.getBoard(id=req["game_id"])
                        res["result"] = False
                except:
                    res["error"] = 2
            except:
                res["error"] = -1

        elif req["method"] == "test_getminimaxmove":
            try:
                res["method"] = "test_getminimaxmove"

                try:
                    chess_game.getMinimaxMove(req["player"],req["game_id"])
                    res["board"] = chess_game.getBoard(id=req["game_id"])

                    res["error"] = 0
                except:
                    res["error"] = 2
            except:
                res["error"] = -1

        elif req["method"] == "test_geteval":
            try:
                res["method"] = "test_geteval"
                res["eval"] = chess_game.getEval(req["player"],req["game_id"])

                res["error"] = 0
            except:
                res["error"] = -1
        elif req["method"] == "test_getboard":
            res["method"] = "test_getboard"
            try:
                if "game_id" in req and "color_id" in req:
                    res["board"],res["color_id"] = chess_game.getBoard(id=req["game_id"], color=req["color_id"])
                elif "game_id" in req and "color_id" not in req:
                    res["board"],res["color_id"] = chess_game.getBoard(id=req["game_id"])
                elif "game_id" not in req and "color_id" in req:
                    res["board"],res["game_id"],res["color_id"] = chess_game.getBoard(color=req["color_id"])
                else:
                    res["board"] = chess_game.getBoard()
                
                res["error"] = 0
            except:
                res["error"] = -9999

        else:
            res["error"] = 1

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

def htmlParser(content):
    tokens = content.split("$")
    for i in range(0,len(tokens)):
        if tokens[i] == "classes":
            tempTokens = tokens[i+1].split("@")
            try:
                tokens[i+1] = f"<span class=\"{tempTokens[0]} tooltip-container\">{tempTokens[1]}<span class=\"tooltip\">{htmlParser(tooltips[tempTokens[2]])}</span></span>"
            except:
                tokens[i+1] = f"<span class=\"{tempTokens[0]}\">{tempTokens[1]}</span>"
            tokens[i] = ""
    newContent = ""
    for token in tokens:
        newContent += token
    return newContent

asyncio.run(main())