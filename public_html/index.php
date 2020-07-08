<!DOCTYPE html>
<html>
    <head>
        <?php include('includes/head.php'); ?>
        <title>Novel Virus</title>
    </head>
    <body>
        <?php include('includes/navbar.php'); ?>

        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 col-xl-12">
                    <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12">
                            <div class="data totalstats">
                                <h1>Totals</h1>
                                <hr>
                                <div class="row">
                                    <div class="totalconfirmedlarge col-sm-6 col-md-6 col-lg-3">
                                        <h6>Total Confirmed</h6>
                                        <span></span>
                                    </div>
                                    <div class="totaldeathslarge col-sm-6 col-md-6 col-lg-3">
                                        <h6>Total Deaths</h6>
                                        <span></span>
                                    </div>
                                    <div class="totalseriouslarge col-sm-6 col-md-6 col-lg-3">
                                        <h6>Total Serious</h6>
                                        <span></span>
                                    </div>
                                    <div class="totalrecoveredlarge col-sm-6 col-md-6 col-lg-3">
                                        <h6>Total Recovered</h6>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-12 col-xl-12">
                            <div class="globaldata data">
                                <div class="heightest">
                                    <h2>Global Data <small><i>Last updated <span id="lastupdate">a few seconds ago</span></i></small><br><small>Click on rows to view data trends</small></h2>
                                    <div class="d-sm-none">
                                        <br>
                                        <br> 
                                    </div>
                                    <div id="globalpercents" class="percents">
                                        <div class="wrapper">
                                            Recovery Rate
                                            <div class="progress-bar">
                                                <span class="recoveredtext"></span>
                                                <span class="recovered progress-bar-fill"></span>
                                            </div>
                                        </div>
                                        <div class="wrapper">
                                            Death Rate
                                            <div class="progress-bar">
                                                <span class="deadtext"></span>
                                                <span class="dead progress-bar-fill"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <table id="global" class="display" style="width:100%;">
                                    <thead>
                                        <tr>
                                            <th>Country</th>
                                            <th>Confirmed</th>
                                            <th>Deaths</th>
                                            <th>Serious</th>
                                            <th>Recovered</th>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr class="totalrowglobal"></tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br><br>
        <?php include('includes/footer.php'); ?>
        <script src="script.js"></script>
    </body>
</html>