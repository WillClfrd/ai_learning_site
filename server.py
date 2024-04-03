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

async def main():
    # sets hostname to listen on, function to handle requests, and port to listen on
    async with serve(echo, "localhost", 8765):
        # awaits future requests (will run forever unless stopped manually or erroring out)
        await asyncio.Future()

# starts the server listening on the websocket
asyncio.run(main())