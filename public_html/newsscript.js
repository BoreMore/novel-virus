// DISPLAY NEWS ON SITE
$(document).ready(function() {
    $.ajax({
        url: 'news.txt',
        success: function(data) {
    
            dataArray = data.split("\n");
    
            allsources = [];
            cutfrom = 0;
    
            for (i = 1; i < dataArray.length; i += 2) {
                if (dataArray[i] == ";") {
                    allsources.push(dataArray.slice(cutfrom, i));
                    cutfrom = i + 1;
                }
            }
    
            console.log(allsources);
            for (i = 0; i < allsources.length; i++) {
                $("#news").append(`<div id="news${i}" class="col-lg-6 col-xl-6"><div class="data"></div></div>`);
                $("#news" + i + " .data").append(`<h3>${allsources[i][0]}</h3><hr>`);
                for (j = 1; j < allsources[i].length; j += 2) {
                    $("#news" + i + " .data").append(`<a href='${allsources[i][j + 1]}'>${allsources[i][j]}</a><br><br>`);
                }
            }
        }
    });
});