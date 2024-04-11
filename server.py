from engine import minimax_engine as me
import asyncio
from websockets.server import serve
import json

# define websocket here to make calls to minimax_engine methods and return call results
async def handle_req(websocket):
    # catches input from websocket
    async for message in websocket:
        res = {}
        # returns every input received from websocket
        req = json.loads(message)
        # check exact format for parsing json into function parameters and for assigning function return values
        if req["method"] == "ismovelegal":
            me.board = req["board"]
            res["result"] = me.ismovelegal((req["move"]["from"][0],req["move"]["from"][1]), (req["move"]["to"][0],req["move"]["to"][1]))
        elif req["method"] == "getminimaxmove":
            me.board = req["board"]
            # check exact return format for GetMinMaxMove
            move = me.GetMinMaxMove(req["player"])
            res["move"] = {}
            res["move"]["from"] = move[0]
            res["move"]["to"] = move[1]
        elif req["method"] == "geteval":
            res["eval"] = me.evl(req["player"])
        else:
            res["error"] = "invalid command"

        await websocket.send(res)

# use to test if websocket is listening, obtaining messages, and responding correctly
async def echo(websocket):
    async for message in websocket:
        await websocket.send(message)

async def main():
    # sets hostname to listen on, function to handle requests, and port to listen on
    async with serve(handle_req, "localhost", 11111):
        # awaits future requests (will run forever unless stopped manually or erroring out)
        await asyncio.Future()

# starts the server listening on the websocket
asyncio.run(main())


# WEBSOCKET DOCUMENTATION #
#---------------------------------------------#
# ismovelegal
#   Check move for legality
#   
#   Request Format:
#       {"method": "ismovelegal", 
#        "board": [['r','n','b','q','k','b','n','r'],
#                 ['p','p','p','p','p','p','p','p'],
#                 ['.','.','.','.','.','.','.','.'],
#                 ['.','.','.','.','.','.','.','.'],
#                 ['.','.','.','.','.','.','.','.'],
#                 ['.','.','.','.','.','.','.','.'],
#                 ['P','P','P','P','P','P','P','P'],
#                 ['R','N','B','Q','K','B','N','R']],
#        "move": {"from": [row,col],
#                "to": [row,col]}}
#   Return Format (example):
#       {"result": true, 
#        "error": "none"}

#---------------------------------------------#
# getminimaxmove
#   get a move for a minimax ai
#   
#   Request Format (example):
#       {"method": "getminimaxmove",
#        "board": [['r','n','b','q','k','b','n','r'],
#                 ['p','p','p','p','p','p','p','p'],
#                 ['.','.','.','.','.','.','.','.'],
#                 ['.','.','.','.','.','.','.','.'],
#                 ['.','.','.','.','.','.','.','.'],
#                 ['.','.','.','.','.','.','.','.'],
#                 ['P','P','P','P','P','P','P','P'],
#                 ['R','N','B','Q','K','B','N','R']],
#        "player": "b"}
#   Return Format:
#       {"move": {"from": [row,col],
#                 "to": [row,col]},
#        "error": "none"}

#---------------------------------------------#
# geteval
#   return evaluation for non-engine player
#
#   Request Format (example):
#       {"method": "geteval",
#        "player": "w"}
#   Response Format:
#       {"eval": 0.0,
#        "error": "none"}

#---------------------------------------------#
# error
# Response Format:
#       {"error": "errorMessage"}