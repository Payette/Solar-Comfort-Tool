import os

"""Parse the cooling design temperature out of all epw files.

Args:
    directory : A directory that contains the extracted epw database.
    coolingDDYFileName: A json file name into which all cooling design temperatures will be written.
Returns:
    A json file name into which all cooling design temperatures
"""

directory  = "/home/aringler/code/Solar-Comfort-Tool/utilities"
coolingDDYFileName = "CoolingDDY.json"

extractDir = directory + "/epw_scrape/extracted/"
ddyjson = directory + "/" + coolingDDYFileName


fd = open(ddyjson,'w')
fd.write("{\n")
fd.close()


fd = open(ddyjson,'a')
for folder in os.listdir(extractDir):
    continentTrigger = True
    continentStr = '"' + folder + '"'
    fd.write("\t" + continentStr + ":{\n")
    totalDir = extractDir + folder + "/"
    allNations = os.listdir(totalDir)
    allNations.sort()

    nationList = []
    privonceList = ['None']
    cityList = []

    # For locations with TMY3, delete TMY2 (v2) and TMY (v1)
    hasTMY3 = []
    hasTMY2 = []
    for location in allNations:
        if location.endswith('_TMY3'):
            hasTMY3.append(location.split('_TMY3')[0])
        if location.endswith('_TMY2'):
            hasTMY2.append(location.split('_TMY2')[0])

    def includeLatestTMYVersion(l):
        if l.endswith('_TMY'):
            baseName = l.split('_TMY')[0]
            if baseName in hasTMY3 or baseName in hasTMY2:
                return False
        if l.endswith('_TMY2'):
            baseName = l.split('_TMY')[0]
            if baseName in hasTMY3:
                return False
        return True

    allNations = list(filter(includeLatestTMYVersion, allNations))

    for location in allNations:
        # pull the information out of the ddy file
        ddyFile = totalDir + location + "/" + location + ".ddy"

        try:
            # ddy = open(ddyFile, 'r')
            with open(ddyFile, encoding="ISO-8859-1") as ddy:
                designTemp = None
                dayOfMonth = None
                month = None
                locList = location.split("_")
                nation = locList[0]
                city = " ".join(locList[-2].split('.')[:-1])

                if len(locList) > 3:
                    province = locList[1]
                elif nation == "AUS":
                    province = city.split(' ')[0]
                    city = " ".join(city.split(' ')[1:])
                elif nation == "CHN":
                    province = city.split(' ')[0].upper()
                    city = " ".join(city.split(' ')[1:])
                else:
                    province = 'None'

                noDesignData = False
                foundCorrectSection = False
                for line in ddy:
                    if "No Design Conditions found for this Location" in line:
                        noDesignData = True
                        break
                    if foundCorrectSection and designTemp == None and "Maximum Dry-Bulb Temperature" in line:
                        designTemp = line.split(',')[0].strip()
                    if foundCorrectSection and dayOfMonth == None and "Day of Month" in line:
                        dayOfMonth = line.split(',')[0].strip()
                    if foundCorrectSection and month == None and "Month" in line:
                        month = line.split(',')[0].strip()

                    if "Ann Clg .4% Condns DB=>MWB" in line:
                        foundCorrectSection = True

                    if foundCorrectSection and designTemp and dayOfMonth and month:
                        break
                ddy.close()

                if noDesignData:
                    continue # no design data for location, just skipping without displaying an error

                # Format variables to be written into a dictionary.
                nation = '"' + nation + '"'
                province = '"' + province + '"'
                city = '"' + city + '"'

                # Write the information into the json.
                if designTemp != None:
                    jsonValue = "{\n" + '"temperature": ' +  designTemp + ', "month": ' + month + ', "dayOfMonth": ' + dayOfMonth + "\n}\n"

                    if nation not in nationList:
                        if continentTrigger == True:
                            continentTrigger = False
                        else:
                            fd.write("\n\t\t\t}\n")
                            fd.write("\t\t},\n")
                        fd.write("\t\t" + nation + " : {\n")
                        fd.write("\t\t\t" + province + " : {\n")
                        fd.write("\t\t\t\t" + city + ": " + jsonValue)
                        nationList.append(nation)
                        privonceList.append(province)
                        cityList.append(city)
                    elif province not in privonceList:
                        fd.write("\n\t\t\t},\n")
                        fd.write("\t\t\t" + province + " : {\n")
                        fd.write("\t\t\t\t" + city + ": " + jsonValue)
                        privonceList.append(province)
                        cityList.append(city)
                    elif city not in cityList:
                        fd.write(",\n\t\t\t\t" + city + ": " + jsonValue)
                        cityList.append(city)

                    #print(nation + " " + province + " " + city + " - " + designTemp)
                else:
                    print('unable to calculate design temp for ' + ddyFile)
        except Exception as inst:
            print('unknown exception trying to calculate design temp for ' + ddyFile)
            print(inst)
            pass

    fd.write("\t\t\t}\n")
    fd.write("\t\t}\n")
    fd.write("\t},\n")
fd.write("}")
fd.close()