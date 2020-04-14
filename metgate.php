<?php


class Metgate {
  public $username = 'mf_pca';
  public $password = 'N45YX3gxc';

  public function request($url) {
      $this_debut = time();
      $ch = curl_init($url);
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_USERPWD, "$this->username:$this->password");
      curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
      $response = curl_exec($ch);
      $this->temps_execution = time() - $this_debut;
  return $response;
  }

  public function filter_or ($filtres) {
      // $filtres est le tableau des filtres à encapsuler
      $bloc = '';
      $bloc = $bloc .  "<fes:Or>";
      foreach ($filtres as $cle => $filtre) {
          $bloc = $bloc . $filtre;
      }
      $bloc = $bloc .  "</fes:Or>";
      return $bloc;
  }

  public function set_filter($filtre) {
      $bloc = '';
      $bloc = $bloc . "<fes:Filter xmlns:fes='http://www.opengis.net/fes/2.0'>";
      $bloc = $bloc . $filtre;
      $bloc = $bloc . "</fes:Filter>";
      return '&filter=' . urlencode($bloc);
  }

  public function filter_id_like($id) {
        $bloc = '<fes:PropertyIsLike wildCard="*"  singleChar="." escapeChar="\"><fes:ValueReference>id</fes:ValueReference><fes:Literal>'.$id.'</fes:Literal></fes:PropertyIsLike>';
        return $bloc;
  }

  public function filter_id_egal($id) {
    $bloc = "<fes:PropertyIsEqualTo><fes:ValueReference>id</fes:ValueReference><fes:Literal>".$id."</fes:Literal></fes:PropertyIsEqualTo>";
    return $bloc;
  }

  public function filter_bbox($bbox) {
     return '&bbox='. $bbox;
  }
}

class Metar {
  /* Definit un metar à partir de l'élément xml */
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
    function __construct() {
        $this->url = "http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=GetFeature&typeName=LA_last";
    }
    function format_stations_filter($OACIs) {

      //Détermine les filtres à appliquer
      $filtres = array();
      foreach ($OACIs as $key => $OACI) {
            $filtres[] = $this->filter_id_egal($OACI);
      }

      // Déternine s'il faut une condition OR
      $bloc = '';
      if ( count($OACIs) > 1) {
        $bloc = $bloc .  $this->filter_or($filtres);
      } else {
        $bloc = $filtres[0];
      }

      // Formate la fin de l'url pour ajouter le filtre
      return $this->set_filter($bloc);
    }


    public function parse_metar($response) {
        //echo $response;
        $arr = array();

        $sxe = new SimpleXMLElement($response);
        
        $metars = array();

        foreach ($sxe->children("wfs", TRUE) as $child)
        { 
            $type = $child->getName();
            if ($type == 'member') {
              $la = $child->children("LA", TRUE);
              $arr[] = new Metar($la);
            }
        }
    
        return $arr;

    }
    
    public function keep_last($arr) {
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

    public function get_last_metar_by_id($OACIs) {
      $url = $this->url;
      $url = $url . $this->format_stations_filter($OACIs);
      $response = $this->request($url);
      $arr = $this->parse_metar($response);
      return $this->keep_last($arr);
    }

    public function get_last_metar_by_bbox($bbox) {
      $url = $this->url;
      $url = $url . $this->filter_bbox($bbox);
      $response = $this->request($url);
      $arr = $this->parse_metar($response);
      return $this->keep_last($arr);
    }

    public function get_last_metar_by_id_pattern($pattern) {
      $url = $this->url;
      $url = $url . $this->set_filter($this->filter_id_like($pattern));
      $response = $this->request($url);
      $arr = $this->parse_metar($response);
      return $this->keep_last($arr);
    }

    

}

// Décrit paramètres METAR
// $url = "http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=DescribeFeatureType&typeName=LS_last";
      
$analyse = false;
$metarconteneur = new GetMetar();

$message = htmlspecialchars($_GET["message"]);

$debut = time();
$retour_requete = null;
if ( $message == "METAR") {
  if (isset($_GET["stations"]) && $_GET["stations"] != '') {
        $stations = htmlspecialchars($_GET["stations"]);
        $stations = explode(",", $stations);
        $metars = $metarconteneur->get_last_metar_by_id($stations);

  } else if (isset($_GET["bbox"]) && $_GET["bbox"] != '') {
        $metars = $metarconteneur->get_last_metar_by_bbox($_GET["bbox"]);

  } else if (isset($_GET["stations_pattern"]) && $_GET["stations_pattern"] != '') {
        $metars = $metarconteneur->get_last_metar_by_id_pattern($_GET["stations_pattern"]);
  }


  if ($analyse) {
      echo count($metars); echo "<br>";
      echo $metarconteneur->temps_execution; echo " s"; echo "<br>";
      echo time()-$debut; echo " s"; echo "<br>";
      die();
  }

  $json = json_encode($metars);
  header('Content-Type: application/json');
  echo $json;


} else {
  echo "Paramètre message absent ou message non traité ! Valeurs acceptées : METAR";
  die();
}

//LFBA,LFKJ,LFCI,LFJR,LFBU,LFLP,LFLW,LFLA,LFMV,LFKB,LFOB,LFBE,LFMU,LFBZ,LFBD,LFLD,LFRB,LFSL,LFRK,LFCC,LFAC,LFKC,LFMD,LFMK,LFCK,LFOK,LFLB,LFLX,LFRC,LFOU,LFLC,LFGA,LFRG,LFSD,LFRD,LFGJ,LFSG,LFKF,LFLS,LFEY,LFBH,LFRO,LFOV,LFOH,LFRM,LFHP,LFAT,LFQQ,LFBL,LFRH,LFLY,LFLL,LFML,LFHM,LFJL,LFBK,LFMT,LFRU,LFSB,LFRS,LFMN,LFTW,LFBN,LFPG,LFPI,LFPB,LFPO,LFBP,LFBX,LFMP,LFBI,LFKO,LFRQ,LFRN,LFLO,LFDN,LFCR,LFOP,LFRT,LFMH,LFRZ,LFST,LFBT,LFTH,LFBO,LFOT,LFQB,LFLU,LFAV,LFLV,TFFR,TFFF,NTTT,FMEE,SOCA,NWWW
//http://localhost/metgate/metgate.php?message=METAR&stations=LFSL,LFRK,LFCC,LFAC,LFKC,LFMD,LFMK,LFCK,LFOK,LFLB,LFLX,LFRC,LFOU




//echo $response;

       // echo (string) $FeatureCollection;
       //$json = json_encode($response);
       //echo $json;
      

        //$json = json_encode($FeatureCollection->{'member'}->{"LA:LA_last"});
        //echo $json;
       // $array = json_decode($json,TRUE);
        //print_r($array);
        /*foreach (${wfs}FeatureCollection as $character) {
          echo $character;
        }*/


?>