<?php
/*a rajouter
controle de session
*/
$champ = $_GET['champ'];
unset($_GET['champ']);
$args="?" . http_build_query($_GET);

$url = 'https://aviation.meteo.fr/wms/map/';
switch ($champ) {
    case 'model.uv_height':
    case 'model.ff_raf_height':
    case 'model.uv_isobaric':
    case 'model.t_sol_arome':
    case 'model.td_height':
    case 'model.rrtt':
    case 'model.ngtt':
    case 'gafor.visi_metropole':
    case 'gafor.plafond_metropole':
    case 'model.h_coulim':
    case 'model.vv2_isobaric':
    case 'model.sat_isp':
    case 'model.nebul_bas':
    case 'model.nebul_moyen':
    case 'model.nebul_haut':
    case 'zt.t':
    case 'zt.z':
    case 'satellite.ir_hrv':
    case 'radar.reflectivity_fm':
    case 'foudre.impact':
    case 'satellite.ir_polynesie_goes17':
    case 'satellite.ir_polynesie_goes17':
    $url .= $champ.'/'.$args;   
    break; 
    default:
    exit();    
}

$ch = curl_init();
// configuration des options
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 0) ;
//curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
// exécution de la session
//$res = 
curl_exec($ch);

//$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
//echo  $code;
//print_r(curl_getinfo($ch));

//if ($code==200)    header("Content-Type: image/png");
//echo $res;
// fermeture des ressources
curl_close($ch);
?>


