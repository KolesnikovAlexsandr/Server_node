import os
import sys

def main():
    total = len(sys.argv)
    cmdargs = str(sys.argv[1])
    return OpenProg(cmdargs)

def OpenProg(value):
    if(value == "itunes"):
        os.system('open /Applications/iTunes.app')
    elif(value == "xcode"):
        os.system('open /Applications/Xcode.app')
    elif(value == "twitter"):
        os.system('open /Applications/Twitter.app')
    elif(value == "skype"):
        os.system('open /Applications/Skype.app')
    else:
        return False
    return True



main()