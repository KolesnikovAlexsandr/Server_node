import os
import sys
import subprocess

def main():
    total = len(sys.argv)
    cmdargs = str(sys.argv[1])
    print(OpenProg(cmdargs))


def OpenProg(value):
    if(value == "itunes"):
        subprocess.call(['osascript', '-e', 'tell application "iTunes" to quit'])
    elif(value == "xcode"):
        subprocess.call(['osascript', '-e', 'tell application "xcode" to quit'])
    elif(value == "twitter"):
        subprocess.call(['osascript', '-e', 'tell application "Tweetbot" to quit'])
    elif(value == "skype"):
        subprocess.call(['osascript', '-e', 'tell application "Skype" to quit'])
    elif(value == "terminal"):
        subprocess.call(['osascript', '-e', 'tell application "iTerm" to quit'])
    elif(value == "safari"):
        subprocess.call(['osascript', '-e', 'tell application "safari" to quit'])
    elif(value == "preferences"):
        subprocess.call(['osascript', '-e', 'tell application "System\ Preferences" to quit'])
    elif(value == "calendar"):
        subprocess.call(['osascript', '-e', 'tell application "Calendar" to quit'])
    else:
        return False
    return True


main()