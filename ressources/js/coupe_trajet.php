<!DOCTYPE html>
<html>

<head>
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="materialize/css/materialize.min.css" media="screen,projection" />
    <link type="text/css" rel="stylesheet" href="ol/ol.css" />
    <link type="text/css" rel="stylesheet" href="ressources/css/index.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="UTF-8">
    <script type="text/javascript" src="jquery/jquery-3.1.1.min.js"></script>
    <script src="ressources/js/jquery-localisation.min.js" type="text/javascript" type="text/javascript"></script>
    <script type="text/javascript" src="ol/ol.js"></script>

    <script>
        function init() {

            let href = new URL(location.href);
            let search_params = new URLSearchParams(href.search);

            if (search_params.has('language')) $.localise('ressources/js/strings', { language: search_params.get('language')});
            else $.localise('ressources/js/strings', { language: 'fr'});

            let Title = $_coupe_trajet+ " ";
            if (search_params.has('name')) Title+=search_params.get('name');
            else Title+="?????";
            $('#title_coupe_trajet').html(Title);

            var url = 'https://aviation.meteo.fr/wms/vertical-section/path/';
            if (search_params.has('url')) url+=search_params.get('url');
            else return false;


            $('.preloader-wrapper').show();
            var extent = [0, 0, 774, 649];
            var projection = new ol.proj.Projection({
                code: 'xkcd-image',
                units: 'pixels',
                extent: extent
            });



            //let Title = '<?php echo $_GET['name']; ?>';
            //$('#title_coupe_trajet').html(Title);
            //var url = 'https://aviation.meteo.fr/wms/vertical-section/path/' + '<?php echo $_GET['url']; ?>';

            var source = new ol.source.ImageStatic({
                url: url,
                projection: projection,
                imageExtent: extent,
                crossOrigin: null
            });

            var map = new ol.Map({
                target: 'vue_trajet_ol',
                controls: [],
                layers: [
                    new ol.layer.Image({
                        source: source

                    })
                ],
                view: new ol.View({
                    projection: projection,
                    center: ol.extent.getCenter(extent),
                    zoom: 1.5,
                    maxZoom: 8
                })
            });
            source.on('imageloadstart', function() {


                $('.preloader-wrapper').show();

            });
            source.on('imageloadend', function() {

                $('.preloader-wrapper').hide();

            });
            source.on('imageloaderror', function() {

                $('.preloader-wrapper').hide();

            });
        }
    </script>
</head>

<body onload='init();'>
    <header class="myheader mynav" id='header'>

        <img src="ressources/images/logo-mf.png" height='70px' class='left ' alt="">
        <h4 id='title_coupe_trajet' class='white-text'> </h4>


    </header>
    <main>
        <div id='vue_trajet_ol' style='padding:0px;height:650px'>

        </div>




        <div id='wait_coupe_trajet' class="preloader-wrapper big active" style="position:absolute;  top:50%; left:50%; margin-left: -32px ;margin-top:  -32px;">
            <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    </main>
</body>

</html>