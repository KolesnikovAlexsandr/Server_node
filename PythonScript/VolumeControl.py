import os
import sys

def main():
    print(sys.argv)
    total = len(sys.argv)
    cmdargs = str(sys.argv[1])
    VolumeControl(cmdargs)
    return 0;

def VolumeControl(value):
    volumeLevel = 0
    volumeLevel = os.popen("osascript -e '(get volume settings)'").read()
    volumeLevel = volumeLevel.split(",");
    volumeLevelInt = volumeLevel[0].split(":")
    volumeLevelInt = int(volumeLevelInt[1])
    if(value == "more"):
        if(volumeLevelInt + 10 > 100):
            os.system('osascript -e "set volume output volume 100"')
        else:
            os.system('osascript -e "set volume output volume ' + str(volumeLevelInt + 10) + '"')
    elif(value == "less"):
        if(volumeLevelInt - 10 < 0):
            os.system('osascript -e "set volume output volume 0"')
        else:
            os.system('osascript -e "set volume output volume ' + str(volumeLevelInt - 10) + '"')
    elif(value == "off"):
        os.system('osascript -e "set volume output volume 0"')
    elif(value == "on"):
        os.system('osascript -e "set volume output volume 60"')
    else:
        return False
    return True



main()