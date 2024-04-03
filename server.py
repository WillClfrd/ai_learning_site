from engine import minimax_engine as me
import asyncio
from websockets.server import serve
import json

# define websocket here to make calls to minimax_engine methods and return call results

# this function echos back messages received from the websocket
async def echo(websocket):
    # catches input from websocket
    async for message in websocket:
        # returns every input received from websocket
        await websocket.send(message)

async def handle_request(websocket):
    # catches input from websocket
    async for message in websocket:
        # set up message formats and handle message requests according to established formatting
        # returns every input received from websocket
        await websocket.send(message)

async def main():
    # sets hostname to listen on, function to handle requests, and port to listen on
    async with serve(echo, "localhost", 8765):
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
#   Return Format:
#       {"result": "true"}

#---------------------------------------------#
# getMinimaxMove
#   get a move for a minimax ai
#   
#   Request Format:
#       {"method": "getMinimaxMove"}
#   Return Format:
#       {"move": {"from": [row,col],
#                 "to": [row,col]}}

#---------------------------------------------#
# getEval
#   return evaluation for non-engine player
#
#   Request Format:
#       {"method": "getEval",
#        "player": "w"}
#   Response Format:
#       {"eval": "0.0"}