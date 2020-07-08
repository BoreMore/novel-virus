// RUNS RIGHT AFTER BNO NEWS IS SCRAPED TO CREATE JSON WITH DATATABLE DATA
var fs = require('fs');
var path = require('path');

fs.readFile(path.join(__dirname, 'spreadsheet.txt'), function(err, data) {
    
    dataArray = data.toString().split("\n");

    dataArraySplit = [];

    final_data = new Array();

    return_data = new Array();
    
    for (i = 0; i < dataArray.length; i++) {
        split = dataArray[i].split(";");
        if (split[0] != "Queue" && split[0] != "" && split[0] != "\"sep=") {
            dataArraySplit.push(split);
        }
    }

    for (i = dataArraySplit[0].length - 1; i > 0 ; i--) {
        curElement = dataArraySplit[0][i];
        if (curElement.includes("Cases") || curElement.includes("Confirmed")) {
            confirmedIndex = i;
        } else if (curElement.includes("Death")) {
            deathsIndex = i;
        } else if (curElement.includes("Serious")) {
            seriousIndex = i;
        } else if (curElement.includes("Recovered")) {
            recoveredIndex = i;
        }
    }


    for (i = 1; i < dataArraySplit.length; i++) {
        if (i == dataArraySplit.length - 1) {
            totalsArray = {
                'Country': 'TOTAL',
                'Confirmed Cases': dataArraySplit[i][confirmedIndex],
                'Deaths': dataArraySplit[i][deathsIndex],
                'Serious': dataArraySplit[i][seriousIndex],
                'Recovered': dataArraySplit[i][recoveredIndex],
            };

        } else {
            return_data.push({
                'Country': dataArraySplit[i][0],
                'Confirmed Cases': dataArraySplit[i][confirmedIndex].replace("N/A", 0),
                'Deaths': dataArraySplit[i][deathsIndex].replace("N/A", 0),
                'Serious': dataArraySplit[i][seriousIndex].replace("N/A", 0),
                'Recovered': dataArraySplit[i][recoveredIndex].replace("N/A", 0),
            });
        }
    }
    final_data.push(totalsArray);
    final_data.push(return_data);

    fs.writeFile(path.join(__dirname, '../public_html/processingapp/', 'data.json'), JSON.stringify(final_data), function(err, result) {
        if (err) console.log('error', err);
    });
});