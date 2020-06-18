<?php
function asPolygonArray($geom) {
    $pply = $geom; # "POLYGON((2723922.284 1211383.652,2723916.994 1211380.914,2723906.196 1211375.574,2723902.643 1211382.398,2723913.474 1211387.92,2723918.718 1211390.615,2723922.284 1211383.652))";
    $pply = substr($pply, strlen("POLYGON"), strlen($pply));
    $pply = substr($pply, strlen("(("), strlen($pply));
    $pply = substr($pply, 0, strlen($pply) - strlen("))"));
    $points = [];
    $pointStrings = explode(",", $pply);
    foreach($pointStrings as $pss) {
        $ps = explode(" ", $pss);
        $p = [];
    array_push($p, $ps[0], $ps[1]);
    array_push($points, $p);
    }
    return $points;
}
# require_once('tcpdf/tcpdf.php');
$xCoord = htmlspecialchars($_GET['x']);
$yCoord = htmlspecialchars($_GET['y']);
$token = htmlspecialchars($_GET['token']);
if ($token !== '4979764e-f018-4978-bd0b-41e741905b5d') {
   $contents = '{"success": false, "message": "token expired"}';
} else {
    $url = "https://map.geo.gl.ch/api/v1/plotinfo/?x=$xCoord&y=$yCoord";

    //Once again, we use file_get_contents to GET the URL in question.
    $contents = file_get_contents($url);

    //If $contents is not a boolean FALSE value.
    if($contents === false){
        $contents = '{"success": false}';
    } else {
        $contentJson = json_decode($contents);
        if ($contentJson->{'success'} === true) {
            $restes = array();
            foreach($contentJson->{'plots'} as $plot) {
                $restes['flaeche_gebaude_bbox'] = $plot->{"bbox"};
            }
            $boundingbox = implode(",",$restes['flaeche_gebaude_bbox']);
            $url3 = 'https://map.geo.gl.ch/api/v1/featureinfo/mainmap?service=WMS&version=1.3.0&request=GetFeatureInfo&id=715117f1-cbf5-4773-9b23-edeb33b3b30a&layers=ch.gl.cadastre.grundeigentum&query_layers=ch.gl.cadastre.grundeigentum&x=51&y=51&i=51&j=51&height=101&width=101&srs=EPSG:2056&crs=EPSG:2056&info_format=text%2Fxml&with_geometry=true&with_maptip=false&feature_count=20&FI_POINT_TOLERANCE=16&FI_LINE_TOLERANCE=8&FI_POLYGON_TOLERANCE=4&bbox=' . $boundingbox;
            $contents = file_get_contents($url3);
            $output_array = array();
            preg_match_all('/<HtmlContent.*>(.*)<\/HtmlContent>/s', $contents, $output_array);
            $htmlContent = $output_array[0][0];
            $contents = str_replace($htmlContent, " ", $contents);
            $xml = new SimpleXMLElement($contents);
            $res = $xml->xpath("//Attribute[@name='Nummer']/@value");
            $restes['grundbuch_nummer'] = (int)$res[0];
            $output_array = array();
            preg_match_all('/Eigentümer.*\n.*\n.*\n(.*)\(CH\)/', $htmlContent, $output_array);
            $restes['liegenschaft_eigentuemer'] = array();
            foreach ($output_array[1] as $eigentuemer) {
                $eigentuemer = str_replace("<br>", "", html_entity_decode($eigentuemer));
                $eigentuemer = str_replace("&nbsp;", " ", $eigentuemer);
                array_push($restes['liegenschaft_eigentuemer'], trim($eigentuemer));
            }
            $contents = json_encode($restes);
        }
    }
}

header('Content-Type: text/json');
header('X-Datasource: map.geo.gl.ch');
?>
<?php echo $contents; ?>

