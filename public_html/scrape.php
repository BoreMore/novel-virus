<?php
// SCRAPES BNO NEWS DATA
require 'simple_html_dom.php';

$curl = curl_init();
curl_setopt($curl, CURLOPT_HEADER, 0);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($curl, CURLOPT_CAINFO, getcwd() . '\cacert.pem');
curl_setopt($curl, CURLOPT_URL, "https://docs.google.com/spreadsheets/u/0/d/e/2PACX-1vR30F8lYP3jG7YOq8es0PBpJIE5yvRVZffOyaqC0GgMBN6yt0Q-NI8pxS7hd1F9dYXnowSC6zpZmW9D/pubhtml/sheet?headers=false&gid=0");
$html=curl_exec($curl);
$dom = new simple_html_dom(null, true, true, DEFAULT_TARGET_CHARSET, true, DEFAULT_BR_TEXT, DEFAULT_SPAN_TEXT);
$html=$dom->load($html, true, true);

$fp = fopen('../processingapp/spreadsheet.txt', 'w');
$spreadText = "\"sep=;\"\n";

foreach($html->find('tr') as $element) {
    if ($element->style == "height:36px;" || $element->style == "height:39px;") {
        foreach($element->find('td') as $element2) {
            //$element3;
            
            
            $children = $element2->children;
            if (count($children) > 0) {
                foreach ($children as $child) {
                    if ($child->innertext != "Source") {
                        //echo $child->innertext . ' ';
                        //fwrite($fp, $child->innertext . ';');
                        //$spreadText .=  . ';';
                        $spreadText .= htmlspecialchars_decode($child->innertext . ";");
                       
                    }
                }
            } else {
                if ($element2->innertext != "Source") {
                    //echo $element2->innertext . ' ';
                    //fwrite($fp, $element2->innertext . ';');
                    //$spreadText .= $element2->innertext . ';';
                    $spreadText .= htmlspecialchars_decode($element2->innertext . ";");
                    
                }
            }
            
        }
        //fwrite($fp, "\n");
        $spreadText .= "\n";
        //echo "<br>";
    }
}
fwrite($fp, $spreadText);
fclose($fp);

?>