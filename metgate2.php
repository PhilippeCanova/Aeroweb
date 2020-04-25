<?php

/*
class Metgate {
  public $username = 'mf_pca';
  public $password = 'N45YX3gxc';

  public function request($url) {
      $ch = curl_init($url);
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_USERPWD, "$this->username:$this->password");
      curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
      $response = curl_exec($ch);
  return $response;
  }
}

class Metar {
  // Definit un metar à partir de l'élément xml 
  public $params = array();

  function __construct($element) {
      foreach ($element->children("LA", TRUE) as $param){
          $nom_param = $param->getName();
          if ($nom_param != 'opmet_msg') {
              $this->params[$nom_param] = (string) $param;

              $ch = $param->children("gml", TRUE);
              if (count($ch)>0) {
                  //bloc time or localization
                  $loc = $ch->children("gml", TRUE);
                  if (count($loc)>0) {
                      //localization
                      $this->params[$nom_param] = (string) $loc;
                  } else {
                      //time
                      $this->params[$nom_param] = (string) $ch;
                  }
              }
          } 
      }
  }
}

class GetMetar extends Metgate {
    function format_station_filter ($OACI) {
      $bloc = "<fes:PropertyIsEqualTo><fes:ValueReference>id</fes:ValueReference><fes:Literal>".$OACI."</fes:Literal></fes:PropertyIsEqualTo>";
      return $bloc;
    }

    function format_stations_filter($OACIs) {
      $bloc = "<fes:Filter xmlns:fes='http://www.opengis.net/fes/2.0'>";
      if ( count($OACIs) > 1) {
        $bloc = $bloc .  "<fes:Or>";
      }

      foreach ($OACIs as $key => $OACI) {
            $bloc = $bloc . $this->format_station_filter($OACI);
      }
      
      if ( count($OACIs) > 1 ) {
        $bloc = $bloc .  "</fes:Or>";
      }

      $bloc = $bloc . "</fes:Filter>";

      return $bloc;
    }


    public function parse_metar($response) {
        //echo $response;
        $arr = array();
echo $response;
        $sxe = new SimpleXMLElement($response);
        
        $metars = array();

        foreach ($sxe->children("wfs", TRUE) as $child)
        { 
            $type = $child->getName();
            if ($type == 'member') {
              $la = $child->children("LA", TRUE);
              $arr[] = new Metar($la);

                  //$jsonla = json_encode($la);


            }
        }
    
        return $arr;

        //echo $response;

       // echo (string) $FeatureCollection;
       //$json = json_encode($response);
       //echo $json;
      

        //$json = json_encode($FeatureCollection->{'member'}->{"LA:LA_last"});
        //echo $json;
       // $array = json_decode($json,TRUE);
        //print_r($array);

    }

    public function get_last_metar($OACIs) {
      
      $url = "http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=GetFeature&typeName=LA_last&filter=";

      $url = $url . urlencode($this->format_stations_filter($OACIs));

      $response = $this->request($url);

      $arr = $this->parse_metar($response);
      $last = array();
      foreach($arr as $key => $metar) {
          $oaci = $metar->params['id'];
          $time = $metar->params['analysis_time'];
          if (array_key_exists($oaci, $arr)) {
              $previous = $arr[$oaci];
              if ($previous->params['analisys_time']< $time) {
                  $last[$oaci] = $metar;
              }
          } else {
              $last[$oaci] = $metar;
          }
      }
      return $last;
    }

}
*/
// Décrit paramètres METAR
// $url = "http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=DescribeFeatureType&typeName=LS_last";
      
$message = htmlspecialchars($_GET["message"]);
$stations = htmlspecialchars($_GET["stations"]);

$stations = explode(",", $stations);

$username = 'mf_pca';
$password = 'N45YX3gxc';
$url = "http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=DescribeFeatureType&typeName=LS_last";
echo $url;
echo '<br>';

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, $username.":".$password);
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
$response = curl_exec($ch);
echo $ch;
echo '<br>';
echo $response;
/*
if ( $message == "METAR") {
  if (!$stations) {
    echo "Paramètre station absent ou mal formé !";
    die();
  }
  $metarconteneur = new GetMetar();


  $metars = $metarconteneur->get_last_metar($stations);
  

  $json = json_encode($metars);
  echo $json;

} else {
  echo "Paramètre message absent ou message non traité !";
  die();
}
*/
//LFBA,LFKJ,LFCI,LFJR,LFBU,LFLP,LFLW,LFLA,LFMV,LFKB,LFOB,LFBE,LFMU,LFBZ,LFBD,LFLD,LFRB,LFSL,LFRK,LFCC,LFAC,LFKC,LFMD,LFMK,LFCK,LFOK,LFLB,LFLX,LFRC,LFOU,LFLC,LFGA,LFRG,LFSD,LFRD,LFGJ,LFSG,LFKF,LFLS,LFEY,LFBH,LFRO,LFOV,LFOH,LFRM,LFHP,LFAT,LFQQ,LFBL,LFRH,LFLY,LFLL,LFML,LFHM,LFJL,LFBK,LFMT,LFRU,LFSB,LFRS,LFMN,LFTW,LFBN,LFPG,LFPI,LFPB,LFPO,LFBP,LFBX,LFMP,LFBI,LFKO,LFRQ,LFRN,LFLO,LFDN,LFCR,LFOP,LFRT,LFMH,LFRZ,LFST,LFBT,LFTH,LFBO,LFOT,LFQB,LFLU,LFAV,LFLV,TFFR,TFFF,NTTT,FMEE,SOCA,NWWW
//http://localhost/metgate/metgate.php?message=METAR&stations=LFSL,LFRK,LFCC,LFAC,LFKC,LFMD,LFMK,LFCK,LFOK,LFLB,LFLX,LFRC,LFOU

?>