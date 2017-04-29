#!/usr/bin/env python

import websocket
import thread
import time
import json
import random

def on_message(ws, message):
    print message

def on_error(ws, error):
    print error

def on_close(ws):
    print "### closed ###"

def on_open(ws):
    def run(*args):
        for i in range(3):
            minx = miny = 0
            maxx = maxy = 600
            minfac = 300
            maxfac = 5000

            movement = {
                "duration": int(random.random() * random.randint(minfac,maxfac)),
                "start": {
                    "x":random.randint(minx, maxx),
                    "y":random.randint(minx, maxx)
                    },
                "stop": {
                    "x":random.randint(minx, maxx),
                    "y":random.randint(minx, maxx)
                    }
                }
            jmovement = json.dumps(movement)
            print("MOVEMENT:",jmovement)
            ws.send(jmovement)
            #ws.send("Hello %d" % i)
            time.sleep(5)

        ws.close()
        print "thread terminating..."
    thread.start_new_thread(run, ())


if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://localhost:8080",
                              on_message = on_message,
                              on_error = on_error,
                              on_close = on_close)
    ws.on_open = on_open
    ws.run_forever()
