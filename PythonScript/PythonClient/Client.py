# -*- coding: utf-8 -*-
import httplib

def printText(txt):
    lines = txt.split('\n')
    for line in lines:
        print line.strip()

httpServ = httplib.HTTPConnection("ad1928f3.ngrok.io")
httpServ.connect()

quote = "test"
httpServ.request('POST', '/index', 'user:Как дела?')

response = httpServ.getresponse()
if response.status == httplib.OK:

    printText (response.read())

httpServ.close()