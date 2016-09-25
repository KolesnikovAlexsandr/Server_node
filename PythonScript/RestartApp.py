import os
import sys
import subprocess
import time

def main():
    total = len(sys.argv)
    cmdargs = str(sys.argv[1])
    print(OpenProg(cmdargs))


def OpenProg(value):
    if(value == "itunes"):
        subprocess.call(['osascript', '-e', 'tell application "iTunes" to quit'])
        time.sleep(2)
        os.system('open /Applications/iTunes.app')
    elif(value == "xcode"):
        subprocess.call(['osascript', '-e', 'tell application "xcode" to quit'])
        time.sleep(2)
        os.system('open /Applications/Xcode.app')
    elif(value == "twitter"):
        subprocess.call(['osascript', '-e', 'tell application "Tweetbot" to quit'])
        time.sleep(2)
        os.system('open /Applications/Tweetbot.app')
    elif(value == "skype"):
        subprocess.call(['osascript', '-e', 'tell application "Skype" to quit'])
        time.sleep(2)
        os.system('open /Applications/Skype.app')
    elif(value == "terminal"):
        subprocess.call(['osascript', '-e', 'tell application "iTerm" to quit'])
        time.sleep(2)
        os.system('open /Applications/iTerm.app')
    elif(value == "safari"):
        subprocess.call(['osascript', '-e', 'tell application "safari" to quit'])
        time.sleep(2)
        os.system('open /Applications/safari.app')
    elif(value == "preferences"):
        subprocess.call(['osascript', '-e', 'tell application "System\ Preferences" to quit'])
        time.sleep(2)
        os.system('open /Applications/System\ Preferences.app')
    elif(value == "calendar"):
        subprocess.call(['osascript', '-e', 'tell application "Calendar" to quit'])
        time.sleep(2)
        os.system('open /Applications/Calendar.app')
    else:
        return False
    return True


main()