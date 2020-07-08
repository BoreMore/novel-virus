<nav class="navbar fixed-top navbar-expand-lg navbar-dark">
    <a class="navbar-brand" href="index.php">
        Novel Virus
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item <?php echo (basename($_SERVER['PHP_SELF']) == 'index.php') ? 'active' : '' ?>">
                <a class="nav-link" href="index.php">Home</a>
            </li>
            <li class="nav-item <?php echo (basename($_SERVER['PHP_SELF']) == 'map.php') ? 'active' : '' ?>">
                <a class="nav-link" href="map.php">Map</a>
            </li>
            <li class="nav-item <?php echo (basename($_SERVER['PHP_SELF']) == 'news.php') ? 'active' : '' ?>">
                <a class="nav-link" href="news.php">News</a>
            </li>
        </ul>
    </div> 
</nav>