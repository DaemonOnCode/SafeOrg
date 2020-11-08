from FMD.FMD import main as fmd
from SD.SD import main as sd

import requests

ProcessVidsSD = ["ML/SD/testvideo2.mp4"]
ProcessVidsFMD = ["ML/FMD/DontUse.mp4"]

dummy = {"Camid": 1,
         "TypeOfEvent": 0,
         "PathUrl": "ML/FM/Testvid",
         "TimeStamp": [45, 85, 86, 46]
         }

myjson = {"data":[]}

for i in ProcessVidsSD:
    print("Processsing " + i)
    j = sd(i,i.split(".")[0]+"Pros"+".mp4")
    temp = dict(dummy)
    temp["TypeOfEvent"] = 0
    temp["TimeStamp"] = j
    temp["PathUrl"] = i
    myjson["data"].append(temp)

# for i in ProcessVidsFMD:
#     print("Processsing " + i)
#     j = fmd(i,i.split(".")[0]+"Pros"+".mp4")
#     temp = dict(dummy)
#     temp["TypeOfEvent"] = 1
#     temp["TimeStamp"] = j
#     temp["PathUrl"] = i
#     myjson["data"].append(temp)


print(myjson)

url = "http://127.0.0.1:5500/"

x = requests.post(url, json=myjson)

print(x.text)
