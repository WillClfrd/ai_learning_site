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

        # parse message into python dictionary
        # if req[method] == 'ismovelegal'
            # set me.board as req[board]
            # call me.ismovelegal with (req[move][from][0],req[move][from][1]) as src and (req[move][to][0],req[move][to][1]) as dest
        # else if req[method] == 'getminimaxmove'
            # set me.board as req[board]
            # call me.GetMinMaxMove with req[player] as player
        # else if req[method] == 'geteval':
        #   call me.evl with req[player] as player
        # else:
        #   return error message and handle error on client side

        print(message)
        #await websocket.send(message)

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
#   Return Format (example):
#       {"result": "true"}

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
#                 "to": [row,col]}}

#---------------------------------------------#
# geteval
#   return evaluation for non-engine player
#
#   Request Format (example):
#       {"method": "geteval",
#        "player": "w"}
#   Response Format:
#       {"eval": "0.0"}