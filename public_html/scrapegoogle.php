<?php 
// SCRAPES DRUDGE REPORT AND GOOGLE FOR CORONAVIRUS NEWS
include("simple_html_dom.php");
$curl = curl_init();
curl_setopt($curl, CURLOPT_HEADER, 0);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($curl, CURLOPT_CAINFO, getcwd() . '\cacert.pem');

$dom = new simple_html_dom(null, true, true, DEFAULT_TARGET_CHARSET, true, DEFAULT_BR_TEXT, DEFAULT_SPAN_TEXT);

$fp = fopen('news.txt', 'w');
$newstext = null;

/*
 * 
 * 
 * 
 * 
 * DRUDGE REPORT
 * 
 * 
 * 
 * 
 * 
 */

curl_setopt($curl, CURLOPT_URL, "https://www.drudgereport.com/");
$drudge = curl_exec($curl);
$drudge = $dom->load($drudge, true, true);


$drudgelinks = $drudge->find('tt > b tt > b a');

$newstext .= "Drudge Report\n";

$counter = 0;

foreach ($drudgelinks as $drudgelink) {
    //foreach ($title as $titleelement) {
        //$newstext .= $titleelement->innertext . "\n";
    if (strpos($drudgelink->href, 'drudgereport')) {
        break;
    } else {
        $newstext .= $string = str_replace(array("\n","\r"), ' ', $drudgelink->plaintext) . "\n" . $drudgelink->href . "\n";
    }
}

$newstext .= ";\n";

/*
 * 
 * 
 * 
 * 
 * GOOGLE
 * 
 * 
 * 
 * 
 * 
 */

curl_setopt($curl, CURLOPT_URL, "https://www.google.com/search?pz=1&cf=all&ned=us&hl=en&tbm=nws&gl=us&as_q=coronavirus&authuser=0");
$google=curl_exec($curl);
$google=$dom->load($google, true, true);

$googlelinks = $google->find('a');

$newstext .= "Google\n";

$counter = 0;

foreach ($googlelinks as $googlelink) {
    $title = $googlelink->find('.vvjwJb');
    foreach ($title as $titleelement) {
        $newstext .= $titleelement->innertext . "\n";
        //echo $titleelement;
    }

    $link = trim($googlelink->href);

    if (strpos($link, '/url?q=') !== false && $title !== "Sign in" && $title !== '' 
    && $title !== ' ' && $link !== ' ' && $link !== '' && strpos($link, 'authuser') === false) {
        $link = explode("q=", $link)[1];
        //$link = $link[1];
        $link = explode("&amp;sa=", $link)[0];

        if ($counter % 2 === 0) {
            $newstext .= $link . "\n";
            //echo $link . '<br />';
        }
        //echo $title . '<br />';
        $counter++;
        
    }
    
    //echo 'Description: ' . $descr . '</p>';
}
$newstext .= ";\n";



fwrite($fp, $newstext);
fclose($fp);

?>