// RUN AT 11:59 PM EVERY DAY TO LOG THE DATA FROM THE PREV DAY FOR THE CHARTS
var fs = require('fs');
var path = require('path');

getOriginal();

function getOriginal() {
    fs.readFile(path.join(__dirname, 'orglist.json'), function(err, data) {
        var orgList = JSON.parse(data.toString());
        getChartData(orgList);
    });
}

function getChartData(orgList) {
    fs.readFile(path.join(__dirname, '../public_html/processingapp/', 'chartdata.json'), function(err, data) {
        var data = JSON.parse(data.toString());
        var headers = data[0];
        var chartData = data[1];
        getDaily(orgList, headers, chartData);
    });
}

function getDaily(orgList, headers, chartData) {
    fs.readFile(path.join(__dirname, '../public_html/processingapp/', 'data.json'), function(err, data) {
        var dailyData = JSON.parse(data.toString())[1];

        appendDaily(orgList, headers, chartData, dailyData);

    });
}

function appendDaily(orgList, headers, chartData, dailyData) {

    

    //console.log(headers);

    var numDates = headers.slice(4, headers.length).length;
    //console.log(numDates)
    
    for (i = 0; i < dailyData.length; i++) {
        var currentObj = dailyData[i];
        if (chartData.hasOwnProperty(currentObj['Country'])) {
            chartData[currentObj['Country']]['confirmed'].push(parseInt(currentObj['Confirmed Cases'].replace(',', '')));
            chartData[currentObj['Country']]['deaths'].push(parseInt(currentObj['Deaths'].replace(',', '')));
            chartData[currentObj['Country']]['recovered'].push(parseInt(currentObj['Recovered'].replace(',', '')));
        } else {
            if (orgList.indexOf(currentObj['Country']) === -1) {
                (confirmedArr = []).length = numDates; 
                confirmedArr.fill(0);

                (deathsArr = []).length = numDates; 
                deathsArr.fill(0);

                (recoveredArr = []).length = numDates; 
                recoveredArr.fill(0);

                confirmedArr.push(parseInt(currentObj['Confirmed Cases'].replace(',', '')));
                deathsArr.push(parseInt(currentObj['Deaths'].replace(',', '')));
                recoveredArr.push(parseInt(currentObj['Recovered'].replace(',', '')));

                chartData[currentObj['Country']] = {
                    'confirmed': confirmedArr,
                    'deaths': deathsArr,
                    'recovered': recoveredArr
                };
            }
        }
    }

    var today = new Date();
    var dd = String(today.getDate());
    var mm = String(today.getMonth() + 1);
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    headers.push(today);

    var finalData = [];
    finalData.push(headers);
    finalData.push(chartData);

    fs.writeFile(path.join(__dirname, '../public_html/processingapp/', 'chartdata.json'), JSON.stringify(finalData), function(err, result) {
        if (err) console.log('error', err);
    });
}

