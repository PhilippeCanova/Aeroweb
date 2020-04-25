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

  function filter_id_stations($OACIs) {

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
    return $bloc;
  }
}

class Message {
  public $params = array();

  function __construct($element) {
      foreach ($element->children($this->ns, TRUE) as $param){
  return $response;
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
class Metar extends Message {
  /* Definit un metar à partir de l'élément xml */
  function __construct($element) {
      $this->ns = "LA";
      parent::__construct($element);
  }
}
class Speci extends Message {
  /* Definit un metar à partir de l'élément xml */
  function __construct($element) {
      $this->ns = "LP";
      parent::__construct($element);
  }
}
class Airmet extends Message {
  /* Definit un metar à partir de l'élément xml */
  function __construct($element) {
      $this->ns = "LW";
      parent::__construct($element);
  }
}
class Tca extends Message {
  /* Definit un metar à partir de l'élément xml */
  function __construct($element) {
      $this->ns = "LK";
      parent::__construct($element);
  }
}
class Vaa extends Message {
  /* Definit un metar à partir de l'élément xml */
  function __construct($element) {
      $this->ns = "LU";
      parent::__construct($element);
  }
}
class Taf extends Message {
  /* Definit un Taf à partir de l'élément xml */

  function __construct($element) {
      parent::__construct($element);
  }
}
class TafCourt extends Taf {
  function __construct($element) {
    $this->ns = 'LC';
    parent::__construct($element);
  }
}
class TafLong extends Taf {
    function __construct($element) {
      $this->ns = 'LT';
      parent::__construct($element);
    }
}
class Sigmet extends Message {
  /* Definit un Taf à partir de l'élément xml */

  function __construct($element) {
      parent::__construct($element);
  }
}
class SigmetX extends Sigmet {
  function __construct($element) {
    $this->ns = 'LS';
    parent::__construct($element);
  }
}
class Sigmet_tca extends Sigmet {
    function __construct($element) {
      $this->ns = 'LY';
      parent::__construct($element);
    }
}
class Sigmet_vaa extends Sigmet {
  function __construct($element) {
    $this->ns = 'LV';
    parent::__construct($element);
  }
}


class MessageManager extends Metgate {   

    public function request_and_keep_last($url) {
        $response = $this->request($url);
        $arr = $this->parse_message($response);
        return $this->keep_last($arr);
    }
    
    public function get_last_message_by_id($OACIs) {
      $url = $this->url;
      $url = $url . $this->set_filter($this->filter_id_stations($OACIs));
      return $this->request_and_keep_last($url);
    }
  
    public function get_last_message_by_bbox($bbox) {
      $url = $this->url;
      $url = $url . $this->filter_bbox($bbox);
      return $this->request_and_keep_last($url);
    }
  
    public function get_last_message_by_id_pattern($pattern) {
      $url = $this->url;
      $url = $url . $this->set_filter($this->filter_id_like($pattern));
      return $this->request_and_keep_last($url);
    }

    public function keep_last($arr) {
      $last = array();
      foreach($arr as $key => $message) {
          $oaci = $message->params['id'];
          $time = $message->params['analysis_time'];
          if (array_key_exists($oaci, $arr)) {
              $previous = $arr[$oaci];
              if ($previous->params['analisys_time']< $time) {
                  $last[$oaci] = array($this->label=>$message->params);
              }
          } else {
            $last[$oaci] = array($this->label=>$message->params);
          }
      }
      return $last;
    }

    public function parse_message($response) {
          $arr = array();
          $sxe = new SimpleXMLElement($response);
          $metars = array();
          foreach ($sxe->children("wfs", TRUE) as $child)
          { 
              $type = $child->getName();
              if ($type == 'member') {
                $la = $child->children($this->ns, TRUE);
                $arr[] = new $this->type_enfant($la);
              }
          }
          return $arr;
    }
}

class MetarManager extends MessageManager {
  function __construct() {
        $this->tag = "LA";
        $this->url = "http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=GetFeature&typeName=".$this->tag."_last";
        $this->ns = $this->tag;
        $this->type_enfant = 'Metar';
        $this->label = "Metar";
  }
}
class SpeciManager extends MessageManager {
  function __construct() {
        $this->tag = "LP";
        $this->url = "http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=GetFeature&typeName=".$this->tag."_last";
        $this->ns = $this->tag;
        $this->type_enfant = 'Speci';
        $this->label = "Speci";
  }
}
class AirmetManager extends MessageManager {
  function __construct() {
        $this->tag = "LW";
        $this->url = "http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=GetFeature&typeName=".$this->tag."_last";
        $this->ns = $this->tag;
        $this->type_enfant = 'Airmet';
        $this->label = "Airmet";
  }
}
class VaaManager extends MessageManager {
  function __construct() {
        $this->tag = "LU";
        $this->url = "http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=GetFeature&typeName=".$this->tag."_last";
        $this->ns = $this->tag;
        $this->type_enfant = 'Vaa';
        $this->label = "Vaa";
  }
}
class TcaManager extends MessageManager {
  function __construct() {
        $this->tag = "LK";
        $this->url = "http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=GetFeature&typeName=".$this->tag."_last";
        $this->ns = $this->tag;
        $this->type_enfant = 'Tca';
        $this->label = "Tca";
  }
}
class TafLongManager extends MessageManager {
    function __construct() {
        $this->tag = "LT";
        $this->url = "http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=GetFeature&typeName=".$this->tag."_last";
        $this->ns = $this->tag;
        $this->type_enfant = 'TafLong';
        $this->label = "TafLong";
    }
}
class TafCourtManager extends MessageManager {
  function __construct() {
      $this->tag = "LC";
      $this->url = "http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=GetFeature&typeName=".$this->tag."_last";
      $this->ns = $this->tag;
      $this->type_enfant = 'TafCourt';
      $this->label = "TafCourt";
  }
}
class TafManager extends MessageManager {
    function __construct() {
        $this->managers = array(new TafLongManager(),  new TafCourtManager());
    }

    public function get_last_message_by_id($OACIs) {
        $reponse = [];
        foreach($this->managers as $key => $manager) {
            $messages = $manager->get_last_message_by_id($OACIs);
            foreach($messages as $oaci => $message) {
                if ( ! array_key_exists($oaci, $reponse)) { $reponse[$oaci] = array();}
                $reponse[$oaci][$manager->label] = $message[$manager->label];
            }
        }
        return $reponse;
    }

    public function get_last_message_by_bbox($bbox) {
      $reponse = [];
        foreach($this->managers as $key => $manager) {
            $messages = $manager->get_last_message_by_bbox($bbox);
            foreach($messages as $oaci => $message) {
                if ( ! array_key_exists($oaci, $reponse)) { $reponse[$oaci] = array();}
                $reponse[$oaci][$manager->label] = $message[$manager->label];
            }
        }
        return $reponse;
    }

    public function get_last_message_by_id_pattern($pattern) {
      $reponse = [];
        foreach($this->managers as $key => $manager) {
            $messages = $manager->get_last_message_by_id_pattern($pattern);
            foreach($messages as $oaci => $message) {
                if ( ! array_key_exists($oaci, $reponse)) { $reponse[$oaci] = array();}
                $reponse[$oaci][$manager->label] = $message[$manager->label];
            }
        }
        return $reponse;

    }
}
class SigmetXManager extends MessageManager {
  function __construct() {
      $this->tag = "LS";
      $this->url = "http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=GetFeature&typeName=".$this->tag."_last";
      $this->ns = $this->tag;
      $this->type_enfant = 'SigmetX';
      $this->label = "Sigmet";
  }
}
class SigmetVaaManager extends MessageManager {
  function __construct() {
      $this->tag = "LV";
      $this->url = "http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=GetFeature&typeName=".$this->tag."_last";
      $this->ns = $this->tag;
      $this->type_enfant = 'Sigmet_vaa';
      $this->label = "SigmetVAA";
  }
}
class SigmetTcaManager extends MessageManager {
  function __construct() {
      $this->tag = "LY";
      $this->url = "http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=GetFeature&typeName=".$this->tag."_last";
      $this->ns = $this->tag;
      $this->type_enfant = 'Sigmet_tca';
      $this->label = "SigmetTCA";
  }
}
class SigmetManager extends MessageManager {
  function __construct() {
      $this->managers = array(new SigmetXManager(),  new SigmetTcaManager(), new SigmetVaaManager());
  }

  public function get_last_message_by_id($OACIs) {
      $reponse = [];
      foreach($this->managers as $key => $manager) {
          $messages = $manager->get_last_message_by_id($OACIs);
          foreach($messages as $oaci => $message) {
              if ( ! array_key_exists($oaci, $reponse)) { $reponse[$oaci] = array();}
              $reponse[$oaci][$manager->label] = $message[$manager->label];
          }
      }
      return $reponse;
  }

  public function get_last_message_by_bbox($bbox) {
    $reponse = [];
      foreach($this->managers as $key => $manager) {
          $messages = $manager->get_last_message_by_bbox($bbox);
          foreach($messages as $oaci => $message) {
              if ( ! array_key_exists($oaci, $reponse)) { $reponse[$oaci] = array();}
              $reponse[$oaci][$manager->label] = $message[$manager->label];
          }
      }
      return $reponse;
  }

  public function get_last_message_by_id_pattern($pattern) {
    $reponse = [];
      foreach($this->managers as $key => $manager) {
          $messages = $manager->get_last_message_by_id_pattern($pattern);
          foreach($messages as $oaci => $message) {
              if ( ! array_key_exists($oaci, $reponse)) { $reponse[$oaci] = array();}
              $reponse[$oaci][$manager->label] = $message[$manager->label];
          }
      }
      return $reponse;

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
                  /*foreach ($la->children("LA", TRUE) as $param){
                      echo $param->getName() . "\n";
                  }*/

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
        /*foreach (${wfs}FeatureCollection as $character) {
          echo $character;
        }*/
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

// Décrit paramètres METAR
// $url = "http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=DescribeFeatureType&typeName=LS_last";
      
$analyse = false;


$message = htmlspecialchars($_GET["message"]);

$debut = time();
$retour_requete = null;
switch ($message) {
    case 'METAR':
        $messageconteneur = new MetarManager(); break;
    case 'TAF':
        $messageconteneur = new TafManager(); break;
    case 'SPECI':
        $messageconteneur = new SpeciManager(); break;
    case 'AIRMET':
        $messageconteneur = new AirmetManager(); break;
    case 'VAA':
        $messageconteneur = new VaaManager(); break;
    case 'TCA':
        $messageconteneur = new TcaManager(); break;
    case 'SIGMET':
        $messageconteneur = new SigmetManager(); break;
    case 'SIGMETX':
        $messageconteneur = new SigmetXManager(); break;
    case 'SIGMETVAA':
        $messageconteneur = new SigmetVaaManager(); break;
    case 'SIGMETTCA':
        $messageconteneur = new SigmetTcaManager(); break;
              
    default:
      echo "Paramètre message absent ou message non traité ! Valeurs acceptées : METAR, TAF, SPECI, AIRMET, VAA, TCA, SIGMET, SIGMETX, SIGMETTAC, SIGMETVAA";
      die();
}



  if (isset($_GET["stations"]) && $_GET["stations"] != '') {
        $stations = htmlspecialchars($_GET["stations"]);
        $stations = explode(",", $stations);
        $metars = $messageconteneur->get_last_message_by_id($stations);

  } else if (isset($_GET["bbox"]) && $_GET["bbox"] != '') {
        $metars = $messageconteneur->get_last_message_by_bbox($_GET["bbox"]);

  } else if (isset($_GET["stations_pattern"]) && $_GET["stations_pattern"] != '') {
        $metars = $messageconteneur->get_last_message_by_id_pattern($_GET["stations_pattern"]);
  }


  if ($analyse) {
      echo count($metars); echo "<br>";
      echo $messageconteneur->temps_execution; echo " s"; echo "<br>";
      echo time()-$debut; echo " s"; echo "<br>";
      die();
  }

  $json = json_encode($metars);
  header('Content-Type: application/json');
  echo $json;



$message = htmlspecialchars($_GET["message"]);
$stations = htmlspecialchars($_GET["stations"]);

$stations = explode(",", $stations);

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

//LFBA,LFKJ,LFCI,LFJR,LFBU,LFLP,LFLW,LFLA,LFMV,LFKB,LFOB,LFBE,LFMU,LFBZ,LFBD,LFLD,LFRB,LFSL,LFRK,LFCC,LFAC,LFKC,LFMD,LFMK,LFCK,LFOK,LFLB,LFLX,LFRC,LFOU,LFLC,LFGA,LFRG,LFSD,LFRD,LFGJ,LFSG,LFKF,LFLS,LFEY,LFBH,LFRO,LFOV,LFOH,LFRM,LFHP,LFAT,LFQQ,LFBL,LFRH,LFLY,LFLL,LFML,LFHM,LFJL,LFBK,LFMT,LFRU,LFSB,LFRS,LFMN,LFTW,LFBN,LFPG,LFPI,LFPB,LFPO,LFBP,LFBX,LFMP,LFBI,LFKO,LFRQ,LFRN,LFLO,LFDN,LFCR,LFOP,LFRT,LFMH,LFRZ,LFST,LFBT,LFTH,LFBO,LFOT,LFQB,LFLU,LFAV,LFLV,TFFR,TFFF,NTTT,FMEE,SOCA,NWWW
//http://localhost/metgate/metgate.php?message=METAR&stations=LFSL,LFRK,LFCC,LFAC,LFKC,LFMD,LFMK,LFCK,LFOK,LFLB,LFLX,LFRC,LFOU

// Pour avoir les METAR pour un pattern donné : 
// http://localhost/Aeroweb/metgate.php?message=METAR&stations_pattern=LF*
// http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=GetFeature&typeName=LA_last&filter=%3Cfes%3AFilter+xmlns%3Afes%3D%27http%3A%2F%2Fwww.opengis.net%2Ffes%2F2.0%27%3E%3Cfes%3APropertyIsLike+wildCard%3D%22%2A%22++singleChar%3D%22.%22+escapeChar%3D%22%5C%22%3E%3Cfes%3AValueReference%3Eid%3C%2Ffes%3AValueReference%3E%3Cfes%3ALiteral%3ELF%2A%3C%2Ffes%3ALiteral%3E%3C%2Ffes%3APropertyIsLike%3E%3C%2Ffes%3AFilter%3E



// Pour avoir les METAR pour une bbox donné :
// http://localhost/Aeroweb/metgate.php?message=METAR&bbox=-1,42,5,45
// http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=GetFeature&typeName=LA_last&bbox=-1,42,5,45

// Pour avoir les TAF pour une bbox donné :
// http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=GetFeature&typeName=LT_last&bbox=0,40,5,45
// http://localhost/Aeroweb/metgate.php?message=TAF&bbox=-2,40,5,45



// Pour avoir les METAR de stations données :
// http://localhost/Aeroweb/metgate.php?message=METAR&stations=LFPG,LFPO
// http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=GetFeature&typeName=LA_last&filter=%3Cfes%3AFilter+xmlns%3Afes%3D%27http%3A%2F%2Fwww.opengis.net%2Ffes%2F2.0%27%3E%3Cfes%3AOr%3E%3Cfes%3APropertyIsEqualTo%3E%3Cfes%3AValueReference%3Eid%3C%2Ffes%3AValueReference%3E%3Cfes%3ALiteral%3ELFPG%3C%2Ffes%3ALiteral%3E%3C%2Ffes%3APropertyIsEqualTo%3E%3Cfes%3APropertyIsEqualTo%3E%3Cfes%3AValueReference%3Eid%3C%2Ffes%3AValueReference%3E%3Cfes%3ALiteral%3ELFPO%3C%2Ffes%3ALiteral%3E%3C%2Ffes%3APropertyIsEqualTo%3E%3C%2Ffes%3AOr%3E%3C%2Ffes%3AFilter%3E


// GetCapabilities :   http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.1.0&request=GetCapabilities
// Description METAR Type : http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=DescribeFeatureType&typeName=LA_last
// Description TAF type :  http://metgate.meteo.fr/broker/wfs/?service=WFS&version=2.0.0&request=DescribeFeatureType&typeName=LT_last


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