// RUN THIS SCRIPT ONCE TO GET PAST TIME SERIES DATA
var fs = require('fs');
var path = require('path');

confirmed = {};
deaths = {};
recovered = {};

confirmedReq();

function confirmedReq() {
    fs.readFile(path.join(__dirname, '../public_html/processingapp/', 'time_series_covid19_confirmed_global0325.csv'), function(err, data) {
        confirmed = cleanData(data.toString().replace("\r", ""));
        deathsReq();
    });
}

function deathsReq() {
    fs.readFile(path.join(__dirname, '../public_html/processingapp/', 'time_series_covid19_deaths_global0325.csv'), function(err, data) {
        deaths = cleanData(data.toString().replace("\r", ""));
        recoveredReq();
    });
}

function recoveredReq() {
    fs.readFile(path.join(__dirname, '../public_html/processingapp/', 'time_series_covid19_recovered_global0325.csv'), function(err, data) {
        recovered = cleanData(data.toString().replace("﻿", "").replace("\r", ""));

        cleanedJSON = cleanJSON(confirmed, deaths, recovered);

        finalData = [];
        finalData.push(headers);
        finalData.push(cleanedJSON);

        /*orgListOfCountries = [];
        for (var key in cleanedJSON) {
            orgListOfCountries.push(key);
            
        }*/

        fs.writeFile(path.join(__dirname, '../public_html/processingapp/', 'chartdata.json'), JSON.stringify(finalData), function(err, result) {
            if (err) console.log('error', err);
        });
        
    });
}

function cleanData(data) {
    json = [];
    dataSplit = data.split("\n");

    headers = dataSplit[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    completeData = [];

    for (i = 0; i < dataSplit.length; i++) {
        completeData.push(dataSplit[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
    } 

    for (i = 1; i < completeData.length; i++) {
        tempJSON = {};
        for (j = 0; j < completeData[0].length; j++) {
            tempJSON[headers[j]] = completeData[i][j];
        }
        json.push(tempJSON);
    }

    for (var i = 0; i < json.length; i++) {
        var obj = json[i];
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
                obj[prop] = +obj[prop];   
            }
        }
    }

    territories = ['Hong Kong', 'Macau', 'Gibraltar', 'Aruba', 'New Caledonia', 'Greenland', 'Isle of Man', 'Sint Maarten', 'Montserrat', 'French Polynesia', 'Cayman Islands', 'Curacao'];
    var result = json.reduce(function(res, obj) {
        if (territories.indexOf(obj['Province/State']) > -1) {
            obj['Country/Region'] = obj['Province/State'];
        }
        if (!(obj['Country/Region'] in res)) {
            res.__array.push(res[obj['Country/Region']] = obj);
        } else {
            for (i = 4; i < headers.length; i++) {
                res[obj['Country/Region']][headers[i]] += obj[headers[i]];
            }
        }
        return res;
    }, {__array:[]}).__array;

    return result;
}

function cleanJSON(confirmed, deaths, recovered) {
    cleanedJSON = {};
    /*console.log(confirmed.length);
    console.log(deaths.length);
    console.log(recovered.length);*/

    //console.log(confirmed);

    /*confirmedList = [];

    // Dominica, Grenada, Libya, Mozambique, Syria
    recoveredList = [];*/

    /*for (i = 0; i < confirmed.length; i++) {
        confirmedList.push(confirmed[i]['Country/Region']);
    }
    for (i = 0; i < recovered.length; i++) {
        recoveredList.push(recovered[i]['Country/Region']);
    }*/
    /*for (i = 0; i < confirmedList.length; i++) {
        if (recoveredList.indexOf(confirmedList[i]) === -1) {
            // whats missing from confirmedList
            console.log(confirmedList[i]);
        }
    }*/


    for (i = 0; i < confirmed.length; i++) {
        confirmedObj = confirmed[i];
        deathsObj = deaths[i];
        recoveredObj = recovered[i];

        matchedKeys = {
            "US": "United States",
            "Czechia": "Czech Republic",
            "Taiwan*": "Taiwan",
            "Bosnia and Herzegovina": "Bosnia",
            "Congo (Kinshasa)": "DR Congo",
            "Congo (Brazzaville)": "Congo Republic",
            "Holy See": "Vatican City",

            "Cote d'Ivoire": "Ivory Coast",
            "Curacao": "Curaçao",
            "Cabo Verde": "Cape Verde",
            "Gambia": "The Gambia"
        };
        if (matchedKeys.hasOwnProperty(confirmedObj['Country/Region'])) {
            country = matchedKeys[confirmedObj['Country/Region']];
        } else {
            country = confirmedObj['Country/Region'];
        }

        confirmedArray = [];
        deathsArray = [];
        recoveredArray = [];

        //console.log(recovered)

        for (k = 4; k < headers.length; k++) {
            confirmedArray.push(confirmedObj[headers[k]]);
            deathsArray.push(deathsObj[headers[k]]);
            recoveredArray.push(recoveredObj[headers[k]]);
        }
        cleanedJSON[country] = {
            confirmed: confirmedArray, 
            deaths: deathsArray, 
            recovered: recoveredArray
        }
    }

    return cleanedJSON;
}