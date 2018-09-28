import os

directory  = "d:\ladybug\\epwDatabase\\"
heatingDDYFileName = "location.json"
ddyjson = directory + "refined\\" + heatingDDYFileName

fd = open(ddyjson,'r')
fdstr = fd.read()
pythonDictionary = eval(fdstr)
print pythonDictionary.keys()

fd.close()
