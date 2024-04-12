from engine import minimax_engine as me
import asyncio
from websockets.server import serve
import json

# define websocket here to make calls to minimax_engine methods and return call results
async def handle_req(websocket):
    print("connection established")
    # catches input from websocket
    async for message in websocket:
        res = {}
        # returns every input received from websocket
        req = json.loads(message)
        # check exact format for parsing json into function parameters and for assigning function return values
        
        if req["method"] == "ismovelegal":
            me.board = req["board"]
            res["result"] = me.IsMoveLegal((req["move"]["from"][0],req["move"]["from"][1]), (req["move"]["to"][0],req["move"]["to"][1]))
        elif req["method"] == "getminimaxmove":
            res = "getminmamove"
            me.board = req["board"]
            # check exact return format for GetMinMaxMove
            move = me.GetMinMaxMove(req["player"])
            res["move"] = {}
            res["move"]["from"] = move[0]
            res["move"]["to"] = move[1]
        elif req["method"] == "geteval":
            res = "geteval"
            res["eval"] = me.evl(req["player"])
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
    # sets hostname to listen on, function to handle requests, and port to listen on
    async with serve(handle_req, "localhost", 11111):
        # awaits future requests (will run forever unless stopped manually or erroring out)
        print("websocket running")
        await asyncio.Future()

# starts the server listening on the websocket
asyncio.run(main())