import os

"""Parse the heating design temperature out of all epw files.

Args:
    directory : A directory that contains the extracted epw database.
    locationFileName: A json file name into which all latitude, lognitude and
        time zone values will be written.
    writeAsOneLine: Boolean value to indicate whether to write the json
        as a single line.
Returns:
    A json file name with latitude, longitude, and time zone.
"""

directory  = "d:\ladybug\\epwDatabase\\"
locationFileName = "location.json"
writeAsOneLine = False

# create hte directories
extractDir = directory + "extracted\\"
locationjson = directory + "refined\\" + locationFileName

if not os.path.isdir(directory + "refined\\"):
    os.mkdir(directory + "refined")

# Set a character for line breaks if needed.
if writeAsOneLine == True:
    linB = ''
    tab = ''
else:
    linB = '\n'
    tab = '\t'

fd = open(locationjson,'w')
fd.write("LocationData = '")
fd.write("{" + linB)
fd.close()


fd = open(locationjson,'a')
for folder in os.listdir(extractDir):
    continentTrigger = True
    if 'south_america' in str(folder):
        continentStr = '"SOUTH AMERICA"'
    elif 'north_and_central_america' in str(folder):
        continentStr = '"NORTH AMERICA"'
    elif 'southwest_pacific' in str(folder):
        continentStr = '"SOUTH PACIFIC"'
    else:
        continentStr = '"' + folder.split('_')[0].upper() + '"'
    fd.write(tab + continentStr + ":{" + linB)
    totalDir = extractDir + folder + "\\"
    allNations = os.listdir(totalDir)
    allNations.sort()

    nationList = []
    privonceList = ['None']
    cityList = []
    for location in allNations:
        # pull the information out of the epw file
        try:
            epwFile = totalDir + location + "\\" + location + ".epw"
            epw = open(epwFile, 'r')
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

            first_line = epw.readline()
            location_data = first_line.strip().split(',')
            latitude = str(float(location_data[6]))
            longitude = str(float(location_data[7]))
            time_zone = str(float(location_data[8]))
            elevation = str(float(location_data[9]))
            locDictionary = '{"lat": ' + latitude + ', "lon": ' + longitude + ', "tz": ' + time_zone + ', "elev": ' + elevation + '}'
            epw.close()

            # Format variables to be written into a dictionary.
            nation = '"' + nation + '"'
            province = '"' + province + '"'
            city = '"' + city + '"'

            # Write the information into the json.
            if nation not in nationList:
                if continentTrigger == True:
                    continentTrigger = False
                else:
                    fd.write(linB + tab + tab + tab + "}" + linB)
                    fd.write(tab + tab + "}," + linB)
                fd.write(tab + tab + nation + " : {" + linB)
                fd.write(tab + tab + tab + province + " : {" + linB)
                fd.write(tab + tab + tab + tab + city + ": " + str(locDictionary))
                nationList.append(nation)
                privonceList.append(province)
                cityList.append(city)
            elif province not in privonceList:
                fd.write(linB + tab + tab + tab + "}," + linB)
                fd.write(tab + tab + tab + province + " : {" + linB)
                fd.write(tab + tab + tab + tab + city + ": " + str(locDictionary))
                privonceList.append(province)
                cityList.append(city)
            elif city not in cityList:
                fd.write("," + linB + tab + tab + tab + tab + city + ": " + str(locDictionary))
                cityList.append(city)

            print nation + " " + province + " " + city + " - " + str(locDictionary)
        except Exception, e:
            print e

    fd.write(tab + tab + tab + "}" + linB)
    fd.write(tab + tab + "}" + linB)
    fd.write(tab + "}," + linB)
fd.write("}'")
fd.close()
