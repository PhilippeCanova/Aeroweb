<!DOCTYPE html>
<html>

<head>
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="nouislider/nouislider.min.css" media="screen,projection" />
    <link type="text/css" rel="stylesheet" href="materialize/css/materialize.min.css" media="screen,projection" />
    <style type="text/css">
        .noUi-horizontal {
            height: 15px;
        }

        .noUi-handle::after,
        .noUi-handle::before {

            width: 0px;

        }
        .noUi-handle{
        border-radius: 15px;
        }
        .noUi-horizontal .noUi-handle,
        .noUi-vertical .noUi-handle {
            width: 30px;
            height: 25px;
            background-color: blue;
        }
    </style>
    <link type="text/css" rel="stylesheet" href="ressources/css/index.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="UTF-8">
    <script type="text/javascript" src="jquery/jquery-3.1.1.min.js"></script>
    <script src="ressources/js/jquery-localisation.min.js" type="text/javascript" type="text/javascript"></script>

    <script type="text/javascript" src="ressources/js/context_controller.js"></script>
    <script type="text/javascript" src="ressources/js/index_coupe_trajet.js"></script>



    <script>
    </script>
</head>

<body onload="init_materialize();init_animate('slider_echeance');">
    <header class="myheader" id='header'>
        <div id="menu3" class="sidenav">

            <ul class="collapsible">

                <li class="active">
                    <div class="collapsible-header"><i class="material-icons">explore</i><span>Vent</span><span id='cpt_layer_menu_vent' class="cpt_layer badge">0</span></div>
                    <div class="collapsible-body row" id='menu_vent'>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header"><i class="material-icons">grain</i><span>Pluie</span><span id='cpt_layer_menu_precip' class="cpt_layer badge">0</span></div>
                    <div class="collapsible-body row" id='menu_precip'>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header"><i class="material-icons">filter_drama</i><span>Nuages</span><span id='cpt_layer_menu_nuage' class="cpt_layer badge">0</span></div>
                    <div class="collapsible-body row" id='menu_nuage'>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header"><i class="material-icons">wb_sunny</i><span>tempe</span><span id='cpt_layer_menu_tempe' class="cpt_layer badge">0</span></div>
                    <div class="collapsible-body row" id='menu_tempe'>
                    </div>
                </li>

                <li>
                    <div class="collapsible-header"><i class="material-icons">local_airport</i><span>aero</span><span id='cpt_layer_menu_aero' class="cpt_layer badge">0</span></div>
                    <div class="collapsible-body row" id='menu_aero'>
                    </div>
                </li>



            </ul>

            <div class='row'>
                <label class='col s12 center label-title' id='label_choix_run_arome'>Choix du run</label>
                <div class='col s2' id='switch_run_prevision_arome'></div>
                <div id='choix_run_arome' class='col s8 center small_span'></div>
            </div>
            <hr>


            <ul class="collapsible">
                <li>
                    <div class="collapsible-header"><i class="material-icons">album</i><span>Analyse_generale</span><span id='cpt_layer_menu_analyse_generale' class="cpt_layer badge">0</span></div>
                    <div class="collapsible-body row" id='menu_analyse_generale'>
                    </div>
                </li>
            </ul>
            <div class='row'>
                <label class='col s12 center label-title' id='label_choix_run_arpege'>Choix du run</label>
                <div class='col s2' id='switch_run_prevision_arpege'></div>
                <div id='choix_run_arpege' class='col s8 center small_span'></div>
            </div>
        </div>
        <nav class="mynav">
            <div class="nav-wrapper">
                <a href="#" id='titre_menu' class="brand-logo center ">Coupe trajet</a>
                <a href="#" data-target="menu3" id="menu_droit" class="sidenav-trigger right show-on-medium-and-up show-on-medium-and-down  "><i class="material-icons mybutton">view_headline</i></a>

                <a href="" target="new" id="vigilance_link" class='center hide-on-small-only'><img src="" id='vigilance_picto' height='100%' class='center' alt=""></a>
            </div>
        </nav>
    </header>
    <main>

    </main>
    <footer id='footer' class="myfooter" style="height:85px;">
        <div class='row valign-wrapper'>
            <div class='col s3 m2 l1 center '>
                <img src="ressources/images/logo-mf.png" height='85px' class='center ' alt="">
            </div>
            <div class='col s9 m10 l11'>
                <div class='row '>
                    <div class='col s6 center  white-text' id='date_depart'>du</div>
                    <div class='col s6 center  white-text' id='date_arrivee'>au</div>
                    <div class='col s1 m1 l1'></div>
                    <div id="slider_echeance" class='col s10 m10 l10'></div>


                </div>
            </div>
        </div>
    </footer>
    <script type="text/javascript" src="./materialize/js/materialize.min.js"></script>
    <script type="text/javascript" src="nouislider/nouislider.min.js"></script>
    <script type="text/javascript" src="nouislider/wNumb.min.js"></script>
</body>

</html>