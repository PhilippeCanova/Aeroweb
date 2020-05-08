<?php
/*a rajouter
controle de session
*/
$champ = $_GET['champ'];
$args= "?".implode("&",$_GET);

$url = 'http://aviation.meteo.fr/wms/map/';
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
    $url .= $args;        
}
echo $url;
