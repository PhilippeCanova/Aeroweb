<?php
$ch = curl_init();
$oaci=strtoupper($_GET['oaci']);
curl_setopt($ch, CURLOPT_URL, "https://int-aviation.meteo.fr/get_oaci_json.php?oaci=".$oaci);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);
$data=curl_exec($ch);
curl_close($ch);
$t=json_decode($data);
$obj=new stdClass();
$obj->icao="Point";
$obj->lon = 0.2;
$obj->lat= 0.4;
$obj->name="Coord";
array_unshift($t,$obj);
$data=json_encode($t);
header ( "Content-Type: application/json" );
header ( 'Last-Modified: ' . gmdate ( 'D, d M Y H:i:s' ) . ' GMT' );
header ( 'Cache-Control: no-store, no-cache, must-revalidate' );
header ( 'Pragma: anytextexceptno-cache', true );
header ( 'Expires: 0' );
header ( 'Content-length: ' . strlen ( $data ) );
header ("Access-Control-Allow-Origin: *");

echo $data;
