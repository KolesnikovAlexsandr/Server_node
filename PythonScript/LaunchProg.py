import os
import sys

def main():
    total = len(sys.argv)
    cmdargs = str(sys.argv[1])
    OpenProg(cmdargs)


def OpenProg(value):
    if(value == "itunes"):
        os.system('open /Applications/iTunes.app')
    elif(value == "xcode"):
        os.system('open /Applications/Xcode.app')
    elif(value == "twitter"):
        os.system('open /Applications/Tweetbot.app')
    elif(value == "skype"):
        os.system('open /Applications/Skype.app')
    elif(value == "terminal"):
        os.system('open /Applications/iTerm.app')
    elif(value == "safari"):
        os.system('open /Applications/safari.app')
    elif(value == "preferences"):
        os.system('open /Applications/System\ Preferences.app')
    elif(value == "calendar"):
        os.system('open /Applications/Calendar.app')



main()
