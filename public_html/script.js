// DISPLAYS DATA AND UPDATES DATA ON MAIN PAGE
lineChartNum = 0;
currentChart = 1;
prevCountry = "";

function makeChart(cleanedJSON, country) {
    var canvas = document.getElementById("lineGraph" + lineChartNum);
    var ctx = canvas.getContext('2d');

    if (cleanedJSON.hasOwnProperty(country)) {
        var active = cleanedJSON[country]['confirmed'].map(function(v,i) { return (v - (cleanedJSON[country]['deaths'][i] + cleanedJSON[country]['recovered'][i])); });
    
        Chart.defaults.global.defaultFontColor = '#d7dadc';
        Chart.defaults.global.defaultFontSize = 16;

        var data = {
        labels: headers.slice(4, headers.length),
        datasets: [{
                    label: "Total Confirmed",
                    fill: false,  
                    lineTension: 0.1,
                    borderColor: "#90ee90",
                    borderCapStyle: 'square',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "black",
                    pointBackgroundColor: "#90ee90",
                    pointBorderWidth: 1,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: "#90ee90",
                    pointHoverBorderColor: "black",
                    pointHoverBorderWidth: 2,
                    pointRadius: 4,
                    pointHitRadius: 5,
                    data: cleanedJSON[country]['confirmed'],
                    spanGaps: false,
                }, {
                    label: "Active",
                    fill: false,  
                    lineTension: 0.1,
                    borderColor: "plum",
                    borderCapStyle: 'square',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "black",
                    pointBackgroundColor: "plum",
                    pointBorderWidth: 1,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: "plum",
                    pointHoverBorderColor: "black",
                    pointHoverBorderWidth: 2,
                    pointRadius: 4,
                    pointHitRadius: 5,
                    data: active,
                    spanGaps: false,
                }, {
                    label: "Deaths",
                    fill: false,
                    lineTension: 0.1,
                    borderColor: "tomato",
                    borderCapStyle: 'square',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "black",
                    pointBackgroundColor: "tomato",
                    pointBorderWidth: 1,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: "tomato",
                    pointHoverBorderColor: "black",
                    pointHoverBorderWidth: 2,
                    pointRadius: 4,
                    pointHitRadius: 5,    
                    data: cleanedJSON[country]['deaths'],
                    spanGaps: false,
                }, {
                    label: "Recovered",
                    fill: false,
                    lineTension: 0.1,
                    borderColor: "#659cef",
                    borderCapStyle: 'square',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "black",
                    pointBackgroundColor: "#659cef",
                    pointBorderWidth: 1,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: "#659cef",
                    pointHoverBorderColor: "black",
                    pointHoverBorderWidth: 2,
                    pointRadius: 4,
                    pointHitRadius: 5,
                    data: cleanedJSON[country]['recovered'],
                    spanGaps: false,
                }]
        };

        var options = {
            responsive: true, 
            maintainAspectRatio: true,
            aspectRatio: 1.65,
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true,
                        color: "rgba(255, 255, 255, 0.25)"
                    },
                }],
                yAxes: [{
                    gridLines: {
                        display: true,
                        color: "rgba(255, 255, 255, 0.25)"
                    },
                    ticks: {
                        beginAtZero: true,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'People',
                        fontSize: 20 
                    }
                }]            
            }, 
            title: {
                display: true,
                text: `Coronavirus in ${country} Over Time`,
                fontSize: 20
            }
        };
        
        currentChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });

        $(`#lineWrapper${lineChartNum}`).after(`<div id="lineWrapperWrap${lineChartNum}" style="position: relative; height: ${$('#lineGraph' + lineChartNum).height()}px; width: 100%"></div>`);

    } else {
        currentChart = 1;
        $(`#lineWrapper${lineChartNum}`).after(`<div id="lineWrapperWrap${lineChartNum}" style="position: relative; height: auto; width: 100%"></div><br>`);
        $(`#lineWrapper${lineChartNum}`).html(`<h6>Chart data is not available for ${country}</h6>`).css("text-align", "center");
        console.log(country);
    }

    lineChartNum++;

    $(window).on('resize', function() {
        $(`#lineWrapper${lineChartNum - 1}`).width($("#global tbody").width());
        $(`#lineWrapperWrap${lineChartNum - 1}`).height($(`#lineGraph${lineChartNum - 1}`).height());
    });
}



cleanedJSON = [];
headers = [];
$(document).ready(function() {
    $.ajax({
        url: 'processingapp/chartdata.json',
        success: function(data) {
            headers = data[0];
            cleanedJSON = data[1];
        }
    });
});

$.ajax({
    url: 'processingapp/data.json',
    success: function(data) {
        
        totals = data[0];
        return_data = data[1];

        $(".totalconfirmedlarge span").text(totals['Confirmed Cases']);
        $(".totaldeathslarge span").text(totals['Deaths']);
        $(".totalseriouslarge span").text(totals['Serious']);
        $(".totalrecoveredlarge span").text(totals['Recovered']);

        $(".totalrowglobal").append(`<th>${totals['Country']}</th>`);
        $(".totalrowglobal").append(`<th>${totals['Confirmed Cases']}</th>`);
        $(".totalrowglobal").append(`<th>${totals['Deaths']}</th>`);
        $(".totalrowglobal").append(`<th>${totals['Serious']}</th>`);
        $(".totalrowglobal").append(`<th>${totals['Recovered']}</th>`);
        $("#globalpercents .recovered").css("width", parseInt(totals['Recovered'].replace(/,/g, ""))/parseInt(totals['Confirmed Cases'].replace(/,/g, "")) * 100 + "%");
        $("#globalpercents .recoveredtext").text((parseInt(totals['Recovered'].replace(/,/g, ""))/parseInt(totals['Confirmed Cases'].replace(/,/g, "")) * 100).toFixed() + "%");
        $("#globalpercents .dead").css("width", parseInt(totals['Deaths'].replace(/,/g, ""))/parseInt(totals['Confirmed Cases'].replace(/,/g, "")) * 100 + "%");
        $("#globalpercents .deadtext").text((parseInt(totals['Deaths'].replace(/,/g, ""))/parseInt(totals['Confirmed Cases'].replace(/,/g, "")) * 100).toFixed() + "%");
        

        datatable = $('#global').DataTable({
            language: {
                search: " ",
                searchPlaceholder: "Filter data"
            },
            errMode: 'none',
            data: return_data,
            searching: true,
            scrollY: `${$(".globaldata").height() - $(".heightest").height() - 85}px`,
            info: false,
            responsive: false,
            scrollX: true,
            scrollCollapse: true,
            paging: false,
            order: [1, 'desc'],
            columns: [
                {data: "Country", width: "30%"},
                {data: "Confirmed Cases", width: "15%"},
                {data: "Deaths", width: "15%"},
                {data: "Serious", width: "15%"},
                {data: "Recovered", width: "15%"}
            ],
            drawCallback: function() {
                if (currentChart !== 1) {
                    $(".chartHolder").remove();
                    currentChart.destroy();
                    currentChart = 1;

                    lineChartNum--;

                    $(`td:contains('${prevCountry}')`).parent().after(`<div class="chartHolder"><br><div id="lineWrapper${lineChartNum}" style="z-index: 1; position: absolute; height: auto; width:${$("#global tbody").width()}px"><canvas class="lineGraph" id="lineGraph${lineChartNum}"></canvas></div><br></div>`);
                    makeChart(cleanedJSON, prevCountry);
                }
            }
        });

        $('#global tbody').on('click', 'tr', function() {

            $(".chartHolder").remove();

            if (currentChart !== 1) {
                currentChart.destroy();
            }

            var data = datatable.row(this).data();
            if (prevCountry !== data['Country']) {
                $(this).after(`<div class="chartHolder"><br><div id="lineWrapper${lineChartNum}" style="z-index: 1; position: absolute; height: auto; width:${$("#global tbody").width()}px"><canvas class="lineGraph" id="lineGraph${lineChartNum}"></canvas></div><br></div>`);
                
                prevCountry = data['Country'];

                makeChart(cleanedJSON, data['Country']);
                
            } else {
                prevCountry = '';
                currentChart = 1;
            }
            
        });

        updateCounter = 0;

        updateInterval = setInterval(function() {
            updateCounter++;
            if (updateCounter < 60) {
                $("#lastupdate").text(`${updateCounter} minutes ago`);
            } else if (updateCounter < 1440) {
                $("#lastupdate").text(`${Math.floor(updateCounter / 60)} hours ago`);
            } else {
                $("#lastupdate").text(" several hours ago");
            }
        }, 60000);

        intervalset = true;
    }
});

$(document).ready(function() {
    setInterval(function() { 
        $.ajax({
            url: 'processingapp/data.json',
            success: function(data) {

                new_totals = data[0];
                new_return_data = data[1];

                arraysSame = true;

                if (JSON.stringify(totals) !== JSON.stringify(new_totals)) {
                    arraysSame = false;
                }

                if (arraysSame === false) {
                    
                    $(".totalrowglobal").html("");

                    $(".totalconfirmedlarge span").text(new_totals['Confirmed Cases']);
                    $(".totaldeathslarge span").text(new_totals['Deaths']);
                    $(".totalseriouslarge span").text(new_totals['Serious']);
                    $(".totalrecoveredlarge span").text(new_totals['Recovered']);

                    $(".totalrowglobal").append(`<th>${new_totals['Country']}</th>`);
                    $(".totalrowglobal").append(`<th>${new_totals['Confirmed Cases']}</th>`);
                    $(".totalrowglobal").append(`<th>${new_totals['Deaths']}</th>`);
                    $(".totalrowglobal").append(`<th>${new_totals['Serious']}</th>`);
                    $(".totalrowglobal").append(`<th>${new_totals['Recovered']}</th>`);
                    $("#globalpercents .recovered").css("width", parseInt(new_totals['Recovered'].replace(/,/g, ""))/parseInt(new_totals['Confirmed Cases'].replace(/,/g, "")) * 100 + "%");
                    $("#globalpercents .recoveredtext").text((parseInt(new_totals['Recovered'].replace(/,/g, ""))/parseInt(new_totals['Confirmed Cases'].replace(/,/g, "")) * 100).toFixed() + "%");
                    $("#globalpercents .dead").css("width", parseInt(new_totals['Deaths'].replace(/,/g, ""))/parseInt(new_totals['Confirmed Cases'].replace(/,/g, "")) * 100 + "%");
                    $("#globalpercents .deadtext").text((parseInt(new_totals['Deaths'].replace(/,/g, ""))/parseInt(new_totals['Confirmed Cases'].replace(/,/g, "")) * 100).toFixed() + "%");
        
                    totals = new_totals;
                    return_data = new_return_data;

                    datatable.clear().rows.add(new_return_data).draw();

                    updateCounter = 0;

                    $("#lastupdate").text("a few seconds ago");

                    if (intervalset) {
                        clearInterval(updateInterval);
                        intervalset = false;
                    }
    
                    updateInterval = setInterval(function() {
                        updateCounter++;
                        if (updateCounter < 60) {
                            $("#lastupdate").text(`${updateCounter} minutes ago`);
                        } else if (updateCounter < 1440) {
                            $("#lastupdate").text(`${Math.floor(updateCounter / 60)} hours ago`);
                        } else {
                            $("#lastupdate").text(" several hours ago");
                        }
                    }, 60000);
    
                    intervalset = true;
                }
            }
        });
    }, 120000);
});