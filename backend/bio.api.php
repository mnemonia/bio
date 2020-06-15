<?php
function sendDataToMissionB($data) {
// $data->{"energiedienstleister"}->{"label"}
}
function sendDataToWettbewerbGlarus($data) {

}
$stringData = file_get_contents('php://input');
$data = json_decode($stringData);
$token = htmlspecialchars($_GET['token']);
$contents = '{"success": true, "message": "Daten verteilt", "include": ' . $stringData . '}';
if ($token !== '4979764e-f018-4978-bd0b-41e741905b5d') {
   $contents = '{"success": false, "message": "token expired"}';
} else {
    sendDataToMissionB($data);
    sendDataToWettbewerbGlarus($data);
}

header('Content-Type: text/json');
?>
<?php echo $contents; ?>
