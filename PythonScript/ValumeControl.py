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
    if(value == "more"):
        volumeLevel = int(os.popen("osascript -e 'set ovol to output volume of (get volume settings)'").read())
        print("aaa")
        print(volumeLevel)
        print("aaa")
        if(volumeLevel+10 > 60):
            os.system('osascript -e "set Volume ' + str(volumeLevel/10 -3) +'"')
        else:
            os.system('osascript -e "set Volume 6"')
    elif(value == "less"):
        volumeLevel = int(os.system("osascript -e 'set ovol to output volume of (get volume settings)'"))
        if(volumeLevel-10 < 0):
            os.system('osascript -e "set Volume ' + str(volumeLevel/10 -4) +'"')
        else:
            os.system('osascript -e "set Volume 0"')
    elif(value == "off"):
        os.system('osascript -e "set Volume 0"')
    elif(value == "on"):
        os.system('osascript -e "set Volume 5"')
    else:
        return False
    return True



main()