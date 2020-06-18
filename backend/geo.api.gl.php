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
            $responseJson = array("egrid", $contentJson->{'egrid'});
            $restes = array();
            foreach($contentJson->{'plots'} as $plot) {
                $restes['flaeche_gebaude_bbox'] = $plot->{"bbox"};
                $restes['egrid'] = $plot->{"egrid"};
                $restes['flaeche_liegenschaft_grund_bbox'] = asPolygonArray($plot->{"geom"});
                foreach($plot->{'fields'} as $field) {
                    $responseJson[$field->{'key'}] = $field->{'value'};
                }
            }
            $url = "https://map.geo.gl.ch/api/v1/plotinfo/plot/" . $responseJson["E-GRID"];
            $contents = file_get_contents($url);
            $output_array = array();
            preg_match_all('/<td>Gebaeude<\/td>\n.*<td><div class="legend" style="background-color: #ffc8c8;">&nbsp;<\/div><\/td>\n.*<td class="right-align">(.*) m<sup>2<\/sup><\/td>\n.*<td class="right-align">(.*) %<\/td>/', $contents, $output_array);
            $restes['flaeche_gebaude_grund'] = floatval($output_array[1][0]);
            $restes['flaeche_grund_gebaude_zu_liegenschaft_in_prozent']  = floatval($output_array[2][0]);
            $restes['flaeche_liegenschaft_zu_gebaude_in_prozent'] = 100.0 - $restes['flaeche_grund_gebaude_zu_liegenschaft_in_prozent'];
            $restes['flaeche_liegenschaft_grund'] = $restes['flaeche_gebaude_grund'];
            if ($restes['flaeche_liegenschaft_zu_gebaude_in_prozent'] != 0) {
                $restes['flaeche_liegenschaft_grund'] = $restes['flaeche_gebaude_grund'] * ($restes['flaeche_grund_gebaude_zu_liegenschaft_in_prozent'] / $restes['flaeche_liegenschaft_zu_gebaude_in_prozent']);
            }


            $url3 = 'https://map.geo.gl.ch/api/v1/featureinfo/mainmap?service=WMS&version=1.3.0&request=GetFeatureInfo&id=4e0a8158-7417-4ea3-8445-6957afee9109&layers=ch.gl.cadastre.av_liegenschaften&query_layers=ch.gl.cadastre.av_liegenschaften&x=51&y=51&i=51&j=51&height=101&width=101&srs=EPSG:2056&crs=EPSG:2056&info_format=JSON&with_geometry=true&with_maptip=false&feature_count=20&FI_POINT_TOLERANCE=16&FI_LINE_TOLERANCE=8&FI_POLYGON_TOLERANCE=4&bbox=' . $boundingbox;
            $contents = file_get_contents($url3);
            $output_array = array();
            preg_match_all('/<HtmlContent.*>(.*)<\/HtmlContent>/s', $contents, $output_array);
            $htmlContent = $output_array[0][0];
            $contents = str_replace($htmlContent, " ", $contents);
            $xml = new SimpleXMLElement($contents);
            $res = $xml->xpath("//Attribute[@name='nummer']/@value");
            $restes['grundbuch_nummer'] = (int)$res[0];
            $res = $xml->xpath("//Attribute[@name='grundbuch']/@value");
            $restes['grundbuch_name'] = (int)$res[0];
            $res = $xml->xpath("//Attribute[@name='flaeche']/@value");
            $restes['grundbuch_flaeche'] = (int)$res[0];

            $output_array = array();
            preg_match_all('/Eigentümer.*\n.*\n.*\n(.*)\(CH\)/', $htmlContent, $output_array);
            // print($output[1][0]);
            $restes['liegenschaft_eigentuemer'] = array();
            if (count($output_array) > 0) {
                foreach ($output_array[1] as $eigentuemer) {
                    $eigentuemer = str_replace("<br>", "", html_entity_decode($eigentuemer));
                    $eigentuemer = str_replace("&nbsp;", " ", $eigentuemer);
                    array_push($restes['liegenschaft_eigentuemer'], $eigentuemer);
                }
            }
            # try {
            #     # https://map.geo.gl.ch/api/v1/featureinfo/mainmap?service=WMS&version=1.3.0&request=GetFeatureInfo&id=d2ce624a-8918-411e-9189-923d2dfcd27c&layers=ch.gl.structure.gebaeudeinformation&query_layers=ch.gl.structure.gebaeudeinformation&x=51&y=51&i=51&j=51&height=101&width=101&srs=EPSG:2056&crs=EPSG:2056&bbox=2721135.469791667,1200782.4864583334,2721162.1927083335,1200809.2093750003&info_format=application%2Fjson&with_geometry=true&with_maptip=false&feature_count=20&FI_POINT_TOLERANCE=16&FI_LINE_TOLERANCE=8&FI_POLYGON_TOLERANCE=4
            #     $boundingbox = implode(",", $restes['flaeche_gebaude_bbox'])
            #     $url = 'https://map.geo.gl.ch/api/v1/featureinfo/mainmap?service=WMS&version=1.3.0&request=GetFeatureInfo&id=d2ce624a-8918-411e-9189-923d2dfcd27c&layers=ch.gl.structure.gebaeudeinformation&query_layers=ch.gl.structure.gebaeudeinformation&x=51&y=51&i=51&j=51&height=101&width=101&srs=EPSG:2056&crs=EPSG:2056&info_format=application%2Fjson&with_geometry=true&with_maptip=false&feature_count=20&FI_POINT_TOLERANCE=16&FI_LINE_TOLERANCE=8&FI_POLYGON_TOLERANCE=4&bbox=' . $boundingbox;
            #     $restes["url"] = $url;
            #    $contents = file_get_contents($url);
            #    $output_array = array();
            #    preg_match_all('/<Attribute name="bauperiode" value="Periode von (.*) bis (.*)"\/>/', $contents, $output_array);
            #    $bauperiode = array();
            #    array_push($bauperiode, floatval($output_array[1][0]), floatval($output_array[2][0]));
            #    $restes['bauperiode'] = $bauperiode;

            #    $output_array = array();
            #    preg_match_all('/<Attribute name="baujahr" value="(.*)"\/>/', $contents, $output_array);
            #    $restes['baujahr'] = $output_array[1][0];
            #} catch(Exception $e) {
            #    $restes['error'] =  $e->getMessage();
            #}

            $contents = json_encode($restes);
        }
    }
}

header('Content-Type: text/json');
header('X-Datasource: map.geo.gl.ch');
?>
<?php echo $contents; ?>

