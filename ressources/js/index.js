var localisation = null;
var mymap = null;
var slider_animate = null;
var slider_run_arome = null;
var slider_run_arpege = null;

var coupe_trajet_en_cours = null;
var coupe_terrain_en_cours = null;

var version = '1.0';
var context = new context_Controller();

hpa_fl = {
	'300': '300','350': '270','400': '240','450': '210','500': '180','550': '160','600': '140','650': '120','700': '100','750': '80', '800': '65', '850': '50', '900': '30', '925': '27', '950': '20', '1000': '5'
}

function get_hPa_by_FL(value) {
	if (typeof (hpa_fl[value]) == 'undefined') { return ''; }
	return ' - FL ' + hpa_fl[value];
};

function access_direct(origin, side_nav_id) {

	if (origin == "fr") contenu = vigilance_metropole();
	else if (origin == "ma") contenu = vigilance_martinique();
	else if (origin == "ga") contenu = vigilance_guadeloupe();
	else if (origin == "gy") contenu = vigilance_guyanne();
	else if (origin == "re") contenu = vigilance_reunion();
	else if (origin == "my") contenu = vigilance_mayotte();
	else if (origin == "nc") contenu = vigilance_nouvelle_caledonie();
	else if (origin == "po") contenu = vigilance_polynesie();
	else if (origin == "sp") contenu = vigilance_saint_pierre_et_miquelon();
	else contenu = vigilance_metropole();

	localStorage.setItem('liste_coupe_trajet', JSON.stringify([]));
	localStorage.setItem('liste_coupe_terrain', JSON.stringify([]));

	localisation_is_checked(contenu);

	load_controller();
	$('#' + side_nav_id).sidenav('close');

}

function vigilance_metropole(latitude = null, longitude = null, zoom = null) {
	if (latitude == null) latitude = 46.99;
	if (longitude == null) longitude = 2.45;
	if (zoom == null) zoom = 1;
	//var extent = [-9, 38.5, 10, 54];
	var extent = [-70, 20, 45, 70];
	var contenu = { origin: 'fr', center: { lat: latitude, lon: longitude }, extent: extent, zoom_factor: zoom, picto: 'http://www.meteofrance.com/integration/sim-portail/generated/integration/img/vigilance/mn.gif', text: "<strong>Vigilance<br>France Métropole</strong>", link: 'http://vigilance.meteofrance.com', masque_vigilance: 'masque_metropole.png' };
	return contenu;
}
function vigilance_martinique(latitude = null, longitude = null, zoom = null) {

	if (latitude == null) latitude = 14.67;
	if (longitude == null) longitude = -61.03;
	if (zoom == null) zoom = 6;
	var extent = [-86, -30, -32, 34];
	var contenu = { origin: 'ma', center: { lat: latitude, lon: longitude }, extent: extent, zoom_factor: zoom, picto: 'http://vigilance.meteofrance.com/data/PBVV99_TFFF_.png', text: "<strong>Vigilance<br>Antilles-Guyane</strong>", link: 'http://www.meteofrance.gp/vigilance-antilles-guyane', masque_vigilance: 'masque_guadeloupe.png' };
	return contenu;
}
function vigilance_guadeloupe(latitude = null, longitude = null, zoom = null) {

	if (latitude == null) latitude = 16.25;
	if (longitude == null) longitude = -61.57;
	if (zoom == null) zoom = 6;
	var extent = [-86, -30, -32, 34];
	var contenu = { origin: 'ga', center: { lat: latitude, lon: longitude }, extent: extent, zoom_factor: zoom, picto: 'http://vigilance.meteofrance.com/data/PBVV99_TFFF_.png', text: "<strong>Vigilance<br>Antilles-Guyane</strong>", link: 'http://www.meteofrance.gp/vigilance-antilles-guyane', masque_vigilance: 'masque_guadeloupe.png' };
	return contenu;
}
function vigilance_guyanne(latitude = null, longitude = null, zoom = null) {

	if (latitude == null) latitude = 3.88;
	if (longitude == null) longitude = -53.13;
	if (zoom == null) zoom = 6;
	var extent = [-86, -30, -32, 34];
	var contenu = { origin: 'gy', center: { lat: latitude, lon: longitude }, extent: extent, zoom_factor: zoom, picto: 'http://vigilance.meteofrance.com/data/PBVV99_TFFF_.png', text: "<strong>Vigilance<br>Antilles-Guyane</strong>", link: 'http://www.meteofrance.gp/vigilance-antilles-guyane', masque_vigilance: 'masque_guadeloupe.png' };
	return contenu;
}
function vigilance_reunion(latitude = null, longitude = null, zoom = null) {

	if (latitude == null) latitude = -21.14;
	if (longitude == null) longitude = 55.53;
	if (zoom == null) zoom = 8;
	var extent = [43, -26, 66, -15];
	var contenu = { origin: 're', center: { lat: latitude, lon: longitude }, extent: extent, zoom_factor: zoom, picto: 'http://vigilance.meteofrance.com/data/PBVV97_FMEE_.png', text: "<strong>Vigilance<br>La Réunion</strong>", link: 'http://www.meteofrance.re/vigilance-reunion', masque_vigilance: 'masque_reunion.png' };
	return contenu;
}
function vigilance_mayotte(latitude = null, longitude = null, zoom = null) {

	if (latitude == null) latitude = -12.79;
	if (longitude == null) longitude = 45.14;
	if (zoom == null) zoom = 11;
	var extent = [44, -13.20, 46, -12];

	var contenu = { origin: 'my', center: { lat: latitude, lon: longitude }, extent: extent, zoom_factor: zoom, picto: 'http://vigilance.meteofrance.com/data/PBVV98_FMEE_.png', text: "<strong>Vigilance<br>Mayotte</strong>", link: 'http://www.meteofrance.yt/vigilance-mayotte', masque_vigilance: 'masque_mayotte.png' };
	return contenu;
}
function vigilance_nouvelle_caledonie(latitude = null, longitude = null, zoom = null) {

	if (latitude == null) latitude = -21.55;
	if (longitude == null) longitude = 165.64;
	if (zoom == null) zoom = 8;
	var extent = [130, -45, 180, -11];

	var contenu = { origin: 'nc', center: { lat: latitude, lon: longitude }, extent: extent, zoom_factor: zoom, picto: 'http://www.meteo.nc/prod/vigilance/timbre_VIGI02PROD.png', text: "<strong>Vigilance<br>Nouvelle Calédonie</strong>", link: 'http://www.meteo.nc/vigilance/accueil.php', masque_vigilance: 'masque_NC.png' };
	return contenu;
}
function vigilance_polynesie(latitude = null, longitude = null, zoom = null) {

	if (latitude == null) latitude = -17.65;
	if (longitude == null) longitude = -149.48;
	if (zoom == null) zoom = 9;


	var extent = [-161, -25, -134, -9];

	var contenu = { origin: 'po', center: { lat: latitude, lon: longitude }, extent: extent, zoom_factor: zoom, picto: 'http://meteo.pf/sites/default/files/meteo_data/bulletins/cartes/mini_vigilance.png', text: "<strong>Vigilance<br>Polynesie francaise</strong>", link: 'https://meteo.pf/fr/vigilance-meteo', masque_vigilance: 'masque_pf.png' };

	return contenu;
}
function vigilance_saint_pierre_et_miquelon(latitude = null, longitude = null, zoom = null) {



	if (latitude == null) latitude = 46.97;
	if (longitude == null) longitude = -56.33;
	if (zoom == null) zoom = 10;
	var extent = [-59, 45, -52, 48];

	var contenu = { origin: 'sp', center: { lat: latitude, lon: longitude }, extent: extent, zoom_factor: zoom, picto: 'http://www.meteofrance.pm/commun/vigilance.png', text: "<strong>Vigilance<br>Saint Pierre et Miquelon</strong>", link: 'http://www.meteofrance.pm/vigi.php', masque_vigilance: 'masque_SPM.png' };

	return contenu;
}
function init_materialize() {

	$(document).ready(function () {
		$('select').formSelect();
		$('.sidenav').sidenav({ edge: 'right', draggable: false });
		$('.collapsible').collapsible();
		$('.fixed-action-btn').floatingActionButton({ direction: 'left' });
		$(".dropdown-trigger").dropdown();
		$('.modal').modal();
		$('#save_trajet').modal({
			onOpenEnd: function () {
				let Title = $_donne_nom_trajet;
				$('#save_trajet h4').html(Title);
				Title = "(" + coupe_trajet_en_cours.etapes[0].icao + ")->(" + coupe_trajet_en_cours.etapes[coupe_trajet_en_cours.etapes.length - 1].icao + ")";
				$('#save_trajet input').val(Title);
			}
		});
		$('#save_terrain').modal({
			onOpenEnd: function () {
				let Title = $_donne_nom_terrain;
				$('#save_terrain h4').html(Title);
				Title = "(" + coupe_terrain_en_cours.terrain.icao + ")";
				$('#save_terrain input').val(Title);
			}
		});
		$('#vue_trajet').modal({
			startingTop: '0%', endingTop: '0%', onOpenEnd: function () {
				$('#vue_trajet_ol').html('');

				var extent = [0, 0, 774, 649];
				var projection = new ol.proj.Projection({
					code: 'xkcd-image',
					units: 'pixels',
					extent: extent
				});


				//if (coupe_trajet_en_cours.name=="En cours") {
				coupe_trajet_en_cours.name = "(" + coupe_trajet_en_cours.etapes[0].icao + ")->(" + coupe_trajet_en_cours.etapes[coupe_trajet_en_cours.etapes.length - 1].icao + ")";
				//}
				$('#title_coupe_trajet').html(coupe_trajet_en_cours.name);




				//var url = 'https://aviation.meteo.fr/wms/vertical-section/path/';
				var url = '';
				url += coupe_trajet_en_cours.etapes[0].lat + "/" + coupe_trajet_en_cours.etapes[0].lon + "/";
				url += coupe_trajet_en_cours.etapes[coupe_trajet_en_cours.etapes.length - 1].lat + "/" + coupe_trajet_en_cours.etapes[coupe_trajet_en_cours.etapes.length - 1].lon + "/";
				url += coupe_trajet_en_cours.depart / 1000 + '/' + coupe_trajet_en_cours.duree / (1000 * 60 * 60) + '/';
				url += coupe_trajet_en_cours.fl + '/';
				let p = '';
				$.each(coupe_trajet_en_cours.parametres, function (k, v) {
					if (p != '' && v) p += "," + k;
					else if (p == '' && v) p += k;
				});
				url += p;
				$('#coupe_trajet_to_window').off('click');
				$('#coupe_trajet_to_window').on('click', function () {
<<<<<<< HEAD
					newwindow("coupe_trajet.html?name=" + coupe_trajet_en_cours.name + "&url=" + url + "&language=" + context.language);
=======
					newwindow("coupe_trajet.php?name=" + coupe_trajet_en_cours.name + "&url=" + url + "&language=" + context.language,coupe_trajet_en_cours.name);
>>>>>>> 71a9a1c0118488e76731054791221835be69d1a2
					$('#vue_trajet').modal('close');
				});


				var source = new ol.source.ImageStatic({
					url: 'https://aviation.meteo.fr/wms/vertical-section/path/' + url,
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
				source.on('imageloadstart', function () {


					$('#wait_coupe_trajet').show();
<<<<<<< HEAD
=======

				});
				source.on('imageloadend', function () {

					$('#wait_coupe_trajet').hide();

				});
				source.on('imageloaderror', function () {

					$('#wait_coupe_trajet').hide();

				});

			}
		});

		$('#vue_terrain').modal({
			startingTop: '0%', endingTop: '0%', onOpenEnd: function () {

				$('#vue_terrain_ol').html('');

				var extent = [0, 0, 774, 649];
				var projection = new ol.proj.Projection({
					code: 'xkcd-image',
					units: 'pixels',
					extent: extent
				});


				//if (coupe_trajet_en_cours.name=="En cours") {
				coupe_terrain_en_cours.name = "(" + coupe_terrain_en_cours.terrain.icao + ")";
				//}

				$('#title_coupe_terrain').html(coupe_terrain_en_cours.name);

				//var url = 'https://aviation.meteo.fr/wms/vertical-section/terrain/';
				var url = '';
				url += coupe_terrain_en_cours.terrain.lat + "/" + coupe_terrain_en_cours.terrain.lon + "/";
				url += coupe_terrain_en_cours.depart / 1000 + '/' + coupe_terrain_en_cours.duree / (1000 * 60 * 60) + '/';
				url += coupe_terrain_en_cours.fl + '/';
				let p = '';
				$.each(coupe_terrain_en_cours.parametres, function (k, v) {
					if (p != '' && v) p += "," + k;
					else if (p == '' && v) p += k;
				});
				url += p;
				$('#coupe_terrain_to_window').off('click');
				$('#coupe_terrain_to_window').on('click', function () {
					newwindow("coupe_terrain.php?name=" + coupe_terrain_en_cours.name + "&url=" + url + "&language=" + context.language,coupe_terrain_en_cours.name);
					$('#vue_terrain').modal('close');
				});


				var source = new ol.source.ImageStatic({
					url: 'https://aviation.meteo.fr/wms/vertical-section/terrain/' + url,
					projection: projection,
					imageExtent: extent,
					crossOrigin: null
				});

				var map = new ol.Map({
					target: 'vue_terrain_ol',
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
				source.on('imageloadstart', function () {


					$('#wait_coupe_terrain').show();
>>>>>>> 71a9a1c0118488e76731054791221835be69d1a2

				});
				source.on('imageloadend', function () {

<<<<<<< HEAD
					$('#wait_coupe_trajet').hide();
=======
					$('#wait_coupe_terrain').hide();
>>>>>>> 71a9a1c0118488e76731054791221835be69d1a2

				});
				source.on('imageloaderror', function () {

<<<<<<< HEAD
					$('#wait_coupe_trajet').hide();
=======
					$('#wait_coupe_terrain').hide();
>>>>>>> 71a9a1c0118488e76731054791221835be69d1a2

				});




			}
		});

<<<<<<< HEAD
		$('#vue_terrain').modal({
			startingTop: '0%', endingTop: '0%', onOpenEnd: function () {

				$('#vue_terrain_ol').html('');

				var extent = [0, 0, 774, 649];
				var projection = new ol.proj.Projection({
					code: 'xkcd-image',
					units: 'pixels',
					extent: extent
				});


				//if (coupe_trajet_en_cours.name=="En cours") {
				coupe_terrain_en_cours.name = "(" + coupe_terrain_en_cours.terrain.icao + ")";
				//}

				$('#title_coupe_terrain').html(coupe_terrain_en_cours.name);

				//var url = 'https://aviation.meteo.fr/wms/vertical-section/terrain/';
				var url = '';
				url += coupe_terrain_en_cours.terrain.lat + "/" + coupe_terrain_en_cours.terrain.lon + "/";
				url += coupe_terrain_en_cours.depart / 1000 + '/' + coupe_terrain_en_cours.duree / (1000 * 60 * 60) + '/';
				url += coupe_terrain_en_cours.fl + '/';
				let p = '';
				$.each(coupe_terrain_en_cours.parametres, function (k, v) {
					if (p != '' && v) p += "," + k;
					else if (p == '' && v) p += k;
				});
				url += p;
				$('#coupe_terrain_to_window').off('click');
				$('#coupe_terrain_to_window').on('click', function () {
					newwindow("coupe_terrain.html?name=" + coupe_terrain_en_cours.name + "&url=" + url + "&language=" + context.language);
					$('#vue_terrain').modal('close');
				});


				var source = new ol.source.ImageStatic({
					url: 'https://aviation.meteo.fr/wms/vertical-section/terrain/' + url,
					projection: projection,
					imageExtent: extent,
					crossOrigin: null
				});

				var map = new ol.Map({
					target: 'vue_terrain_ol',
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
				source.on('imageloadstart', function () {


					$('#wait_coupe_terrain').show();

				});
				source.on('imageloadend', function () {

					$('#wait_coupe_terrain').hide();

				});
				source.on('imageloaderror', function () {

					$('#wait_coupe_terrain').hide();

				});




			}
		});
		var slider = document.getElementById('speed_obs' );

		noUiSlider.create(slider, {
			start: context.delay_obs,
			step: 100,
			padding: 0,
			margin: 0,
			orientation: 'horizontal',
			range: {
				min: 100,
				max: 3000
			},
			format: wNumb({
				decimals: 0
			})
		});



		slider.noUiSlider.on('update', function (values, handle) {
			$("#value_speed_obs").text((+values[handle] / 1000) + ' '+'seconde(s)');
			context.change_delay_obs(+values[handle]);
			slider_animate.change_delay(context.delay_obs);
		});

		var slider = document.getElementById('speed_previ_arome' );

		noUiSlider.create(slider, {
			start: context.delay_previ_arome,
			step: 100,
			padding: 0,
			margin: 0,
			orientation: 'horizontal',
			range: {
				min: 100,
				max: 3000
			},
			format: wNumb({
				decimals: 0
			})
		});



		slider.noUiSlider.on('update', function (values, handle) {
			$("#value_speed_previ_arome").text((+values[handle] / 1000) + ' '+'seconde(s)');
			context.change_delay_previ_arome(+values[handle]);
			slider_animate.change_delay(context.delay_previ_arome);
		});

		var slider = document.getElementById('speed_previ_arpege' );

		noUiSlider.create(slider, {
			start: context.delay_previ_arpege,
			step: 100,
			padding: 0,
			margin: 0,
			orientation: 'horizontal',
			range: {
				min: 100,
				max: 3000
			},
			format: wNumb({
				decimals: 0
			})
		});



		slider.noUiSlider.on('update', function (values, handle) {
			$("#value_speed_previ_arpege").text((+values[handle] / 1000) + ' '+'seconde(s)');
			context.change_delay_previ_arpege(+values[handle]);
			slider_animate.change_delay(context.delay_previ_arpege);
		});
=======

>>>>>>> 71a9a1c0118488e76731054791221835be69d1a2
		apply_language();
		//M.AutoInit();
	});


}
function check_localisation() {
	if (localStorage.getItem('version') == null || localStorage.getItem('version') != version || localStorage.getItem('localisation') == null) {
		localStorage.setItem('version', version);
		init_localisation();
	}

	else {
		var loc = jQuery.parseJSON(localStorage.getItem('localisation'));
		localisation_is_checked(loc);
	}

}
function localisation_is_checked(loc) {
	localStorage.setItem('localisation', JSON.stringify(loc));

	localisation = loc;


	$('#vigilance_picto').attr('src', localisation.picto);
	$('#vigilance_link').attr('href', localisation.link);
	$('#vigilance_picto_masque').attr('src', './ressources/images/' + localisation.masque_vigilance);

	context.update(localisation.origin);
	if (mymap == null && slider_animate == null) {

		load_controller();
	}

}


function get_vigilance(latitude, longitude, zoom) {


	if (((latitude >= 0 && latitude <= 34) || (latitude >= -30 && latitude <= 0)) && longitude >= -86 && longitude <= -32) contenu = vigilance_guadeloupe(latitude, longitude, zoom);
	//martinique
	else if (((latitude >= 0 && latitude <= 34) || (latitude >= -30 && latitude <= 0)) && longitude >= -86 && longitude <= -32) contenu = vigilance_martinique(latitude, longitude, zoom);
	//guyane 
	else if (((latitude >= 0 && latitude <= 34) || (latitude >= -30 && latitude <= 0)) && longitude >= -86 && longitude <= -32) contenu = vigilance_guyanne(latitude, longitude, zoom);
	//Mayotte
	else if (latitude >= -13.20 && latitude <= -12 && longitude >= 44 && longitude <= 46) contenu = vigilance_mayotte(latitude, longitude, zoom);
	//reunion
	else if (latitude >= -46 && latitude <= 13 && longitude >= 1 && longitude <= 111) contenu = vigilance_reunion(latitude, longitude, zoom);

	//N caledonie var extent = [130, -45, 180, -11];
	else if (latitude >= -45 && latitude <= -11 && (longitude >= 130 && longitude <= 180)) contenu = vigilance_nouvelle_caledonie(latitude, longitude, zoom);

	//Polynesievar extent = [-161, -25, -134, -9];
	else if (latitude >= -25 && latitude <= -9 && longitude >= -161 && longitude <= -134) contenu = vigilance_polynesie(latitude, longitude, zoom);
	//saint pierre et miquelon
	else if (latitude >= 45 && latitude <= 48 && longitude >= -59 && longitude <= -52) contenu = vigilance_saint_pierre_et_miquelon(latitude, longitude, zoom);
	else contenu = vigilance_metropole(latitude, longitude, zoom);
	return contenu;

}

function init_localisation() {
	localStorage.setItem('liste_coupe_trajet', JSON.stringify([]));
	localStorage.setItem('liste_coupe_terrain', JSON.stringify([]));
	if (navigator && navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(function (position) {
			var p = position.coords;
			contenu = get_vigilance(p.latitude, p.longitude);
			localisation_is_checked(contenu);
		}, function () {
			contenu = vigilance_metropole();
			localisation_is_checked(contenu);
		});

	}
	else {
		contenu = vigilance_metropole();
		localisation_is_checked(contenu);
	}

}




function maj_cpt_layer(menu_id) {

	var cpt = $('#' + menu_id + " div label input:checked").length;
	var sur = $('#' + menu_id + " div label input").length;
	//var t = cpt + "/" + sur + " " + $_layer;
	var t = cpt;
	//if (cpt > 1) t += 's';

	$('#cpt_layer_' + menu_id).text(t);

}

function init_carto(id_div) {


	extent = localisation.extent;
	var h = $(document).height() - $("#header").height() - $("#footer").height();
	mymap = new map_Controler(id_div, h, localisation.center.lon, localisation.center.lat, localisation.zoom_factor, extent, '');



	var t_layer = {
		fr: [

			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'model.uv_height', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
					ratio: 1,
					serverType: 'geoserver'
				},
				modele: 'arome',
				opacity: 1,
				tag: "prevision",
				id: 'uv_height',
				libelle: $_layer_uv_10m,
				menu_id: 'menu_vent',
				zIndex: 1,
				visible: true
			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'model.ff_raf_height', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				modele: 'arome',
				opacity: 0.6,
				tag: "prevision",
				id: 'ff_raf_height',
				libelle: $_layer_rafale,
				menu_id: 'menu_vent',
				zIndex: 2,
				visible: false
			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'model.uv_isobaric', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), ELEVATION: 700, RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				modele: 'arome',
				opacity: 1,
				tag: "prevision",
				id: 'uv_isobaric',
				libelle: $_layer_uv_alt,
				menu_id: 'menu_vent',
				zIndex: 3,
				visible: false,
				elevationLevels: { 'min': 500, '10%': 550, '20%': 600, '30%': 650, '40%': 700, '50%': 750, '60%': 800, '70%': 850, '80%': 900, '90%': 925, 'max': 950 },
				elevationUnit: 'hpa'
			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'model.t_sol_arome', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				modele: 'arome',
				opacity: 0.6,
				tag: "prevision",
				id: 't_sol_arome',
				libelle: $_layer_t,
				menu_id: 'menu_tempe',
				zIndex: 4,
				visible: false

			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'model.td_height', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				modele: 'arome',
				opacity: 0.6,
				tag: "prevision",
				id: 'td',
				libelle: $_layer_td,
				menu_id: 'menu_tempe',
				zIndex: 5,
				visible: false

			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'model.rrtt', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				modele: 'arome',
				opacity: 0.6,
				tag: "prevision",
				id: 'rrtt',
				libelle: $_layer_rrtt,
				menu_id: 'menu_precip',
				zIndex: 6,
				visible: false

			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'model.ngtt', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				modele: 'arome',
				opacity: 0.6,
				tag: "prevision",
				id: 'ngtt',
				libelle: $_layer_ngtt,
				menu_id: 'menu_precip',
				zIndex: 7,
				visible: false

			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'gafor.visi_metropole', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				modele: 'arome',
				opacity: 0.6,
				tag: "prevision",
				id: 'gafor_visi_metro',
				libelle: $_layer_visi_metro,
				menu_id: 'menu_aero',
				zIndex: 8,
				visible: false

			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'gafor.plafond_metropole', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				modele: 'arome',
				opacity: 0.6,
				tag: "prevision",
				id: 'gafor_plafond_metro',
				libelle: $_layer_plafond_metro,
				menu_id: 'menu_aero',
				zIndex: 9,
				visible: false

			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'model.h_coulim', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				modele: 'arome',
				opacity: 1,
				tag: "prevision",
				id: 'h_coulim',
				libelle: $_layer_hcl,
				menu_id: 'menu_aero',
				zIndex: 10,
				visible: false

			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'model.vv2_isobaric', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), ELEVATION: 700, RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				modele: 'arome',
				opacity: 1,
				tag: "prevision",
				id: 'vv2_isobaric',
				libelle: $_layer_vv2,
				menu_id: 'menu_aero',
				zIndex: 11,
				visible: false,
				elevationLevels: { 'min': 300, '7%': 350, '14%': 400, '21%': 450, '28%': 500, '35%': 550, '42%': 600, '50%': 650, '57%': 700, '64%': 750, '71%': 800, '78%': 850, '85%': 900, '89%': 925, '92%': 950, 'max': 1000 },
				elevationUnit: 'hpa'

			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'model.sat_isp', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				modele: 'arome',
				opacity: 0.6,
				tag: "prevision",
				id: 'sat_isp',
				libelle: $_layer_sat_isp,
				menu_id: 'menu_nuage',
				zIndex: 12,
				visible: false

			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'model.nebul_bas', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				modele: 'arome',
				opacity: 0.6,
				tag: "prevision",
				id: 'nebul_bas',
				libelle: $_layer_nebul_bas,
				menu_id: 'menu_nuage',
				zIndex: 13,
				visible: false

			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'model.nebul_moyen', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				modele: 'arome',
				opacity: 0.6,
				tag: "prevision",
				id: 'nebul_moyen',
				libelle: $_layer_nebul_moyen,
				menu_id: 'menu_nuage',
				zIndex: 14,
				visible: false

			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'model.nebul_haut', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				modele: 'arome',
				opacity: 0.6,
				tag: "prevision",
				id: 'nebul_haut',
				libelle: $_layer_nebul_haut,
				menu_id: 'menu_nuage',
				zIndex: 15,
				visible: false

			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'zt.t', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), ELEVATION: 500, RUN: context.date_run_arpege.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				modele: 'arpege',
				opacity: 0.6,
				tag: "prevision",
				id: 't_arpege',
				libelle: $_t_layer_arpege,
				menu_id: 'menu_analyse_generale',
				zIndex: 16,
				visible: false,
				elevationLevels: { 'min': 500, '33%': 700, '66%': 850, 'max': 1000 },
				elevationUnit: 'hpa'

			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'zt.z', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), ELEVATION: 500, RUN: context.date_run_arpege.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				modele: 'arpege',
				opacity: 1,
				tag: "prevision",
				id: 'z_arpege',
				libelle: $_z_layer_arpege,
				menu_id: 'menu_analyse_generale',
				zIndex: 17,
				visible: false,
				elevationLevels: { 'min': 500, '33%': 700, '66%': 850, 'max': 1000 },
				elevationUnit: 'hpa'

			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'satellite.ir_hrv', TIME: context.date_reference.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				opacity: 0.6,
				tag: "observation",
				id: 'ir_hrv_fr',
				libelle: $_layer_sat_ir_fr,
				menu_id: 'menu_imagerie',
				zIndex: 1,
				visible: false

			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'radar.reflectivity_fm', TIME: context.date_reference.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				opacity: 0.6,
				tag: "observation",
				id: 'radar_fr',
				libelle: $_layer_radar_fr,
				menu_id: 'menu_imagerie',
				zIndex: 2,
				visible: true

			},
			{
				source:
				{
					url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
					params: { champ: 'foudre.impact', TIME: context.date_reference.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				opacity: 1,
				tag: "observation",
				id: 'foudre_fr',
				libelle: $_layer_foudre_fr,
				menu_id: 'menu_imagerie',
				zIndex: 3,
				visible: false

			}

		]
		,
		ma: [],
		ga: [],
		gy: [],
		re: [],
		my: [],
		nc: [],
		po: [{
			source:
			{
				url: 'http://int-aviation.meteo.fr/aeroweb_maille_fine_carto.php',
				params: { champ: 'satellite.ir_polynesie_goes17', TIME: context.date_reference.toISOString().replace('.000Z', 'Z') },
				ratio: 1, serverType: 'geoserver'
			},
			opacity: 0.8,
			tag: "observation",
			id: 'ir_polynesie',
			libelle: $_title_imgobs_polynesie,
			menu_id: 'menu_imagerie',
			zIndex: 1,
			visible: true

		}
		],
		sp: [],


	};

	$('#menu_vent').html('');
	$('#menu_precip').html('');
	$('#menu_nuage').html('');
	$('#menu_tempe').html('');
	$('#menu_aero').html('');
	$('#menu_imagerie').html('');
	$('#menu_analyse_generale').html('');
	$('#cpt_layer_menu_vent').html('0' );
	$('#cpt_layer_menu_precip').html('0' );
	$('#cpt_layer_menu_nuage').html('0' );
	$('#cpt_layer_menu_tempe').html('0' );
	$('#cpt_layer_menu_aero').html('0' );
	$('#cpt_layer_menu_imagerie').html('0' );
	$('#cpt_layer_menu_analyse_generale').html('0' );

	$.each(t_layer[localisation.origin], function (key, layer) {



		mymap.add_mylayer(layer);



		var p = "<div class='col s12'>"

		p += "<div class='row' style='margin:0px 0px 0px 0px;'>";

		p += "<label class ='col s10'><input data_model='" + layer.modele + "'data='" + layer.id + "' data_type='" + layer.tag + "' id='switch_" + layer.id + "' type='checkbox'  ";
		if (layer.visible) p += "checked='false'";
		p += "/>";
		p += "<span class='small_span'>" + layer.libelle + "</span></label>";


		p += "<a class='s2' href='#!' onclick=\"newwindow('./aide.php?id=" + layer.id + "','aide');\"><i class='material-icons'>help_outline</i></a>";


		p += "</div>"


		p += "</div>";

		p += "<div class='col s4 '><span id=\"value_opacity_" + layer.id + "\" class='small_span '>Opacite</span></div><div id=\"opacity_" + layer.id + "\" class='col s7 blue'></div>";

		if (layer.elevationUnit && layer.elevationLevels) {
			p += "<div class='input-field col s12'id=\"level_" + layer.id + "\"><select  >";
			$.each(layer.elevationLevels, function (key, value) {
				p += "<option class='myselect'value='" + value + "' ";
				if (layer.source.params.ELEVATION == value) p += "selected";
				p += ">" + $_layer_elevationLabel + " " + value + " " + layer.elevationUnit + get_hPa_by_FL(value) + "</option>";
			});

			p += "</select><label></label></div>";
		}


		$('#' + layer.menu_id).append(p);

		var slider = document.getElementById('opacity_' + layer.id);

		noUiSlider.create(slider, {
			start: +layer.opacity,
			step: 0.1,
			padding: 0,
			margin: 0,
			orientation: 'horizontal',
			range: {
				min: 0,
				max: 1
			},
			format: wNumb({
				decimals: 1
			})
		});



		slider.noUiSlider.on('update', function (values, handle) {
			$("#value_opacity_" + layer.id).text($_layer_opacityLabel + ':' + (values[handle] * 100) + '%');

			mymap.change_opacity(layer.tag, layer.id, +values[handle]);

		});

		if (layer.elevationUnit && layer.elevationLevels) {

			var select = $("#level_" + layer.id + " select")[0];

			$(select).on('change', function () {

				var layers = mymap.mymap.getLayers();
				var val = $(this).val();
				layers.forEach(function (element, index, array) {

					if (element.get('tag') == layer.tag && element.get('id') == layer.id)
						element.getSource().updateParams({ 'ELEVATION': +val });

				});
			})


		}




		$("#switch_" + layer.id).on('click', function () {




			if ($("#switch_" + layer.id).prop('checked')) {
				$("*[id$='opacity_" + layer.id + "']").show();
				$("*[id$='level_" + layer.id + "']").show()
				mymap.set_layer_visible(layer.id);


			}
			else {
				$("*[id$='opacity_" + layer.id + "']").hide();
				$("*[id$='level_" + layer.id + "']").hide();
				mymap.set_layer_invisible(layer.id);

			}
			maj_cpt_layer(layer.menu_id);

			var t = $("input[data_model='arpege']:checked");
			if (context.mode == 'prevision') {
				if (t.length > 0) slider_animate.update(context.date_start_previ_arpege, context.date_min_previ_arpege, context.date_max_previ_arpege, context.step_previ_arpege, context.delay_previ_arpege);
				else slider_animate.update(context.date_start_previ_arome, context.date_min_previ_arome, context.date_max_previ_arome, context.step_previ_arome, context.delay_previ_arome);
			}
		});

		if (layer.visible == false) {
			$("*[id$='opacity_" + layer.id + "']").hide();
			$("*[id$='level_" + layer.id + "']").hide();
		}

		maj_cpt_layer(layer.menu_id);

	});

	



	mymap.mymap.on('moveend', function (evt) {


		var p = evt.map.getView().getCenter();
		var p2 = ol.proj.transform(p, 'EPSG:3857', 'EPSG:4326')

		var contenu = get_vigilance(p2[1], p2[0], evt.map.getView().getZoom());


		localisation_is_checked(contenu)
	});





}
function init_slider_run_arome(target) {



	var start = Date.parse(context.date_run_arome.toISOString());
	var min = Date.parse(context.date_run_arome_precedent.toISOString());

	slider_run_arome = new slider_run_Controller(target, start, min)


	slider_run_arome.slider_run.noUiSlider.on('update', function (values, handle) {


		$('#choix_run_arome').html(formatdateutc(new Date(+values[handle])));
		mymap.change_run(new Date(+values[handle]).toISOString().replace('.000Z', 'Z'), ['prevision'], 'arome');

	});
}
function init_slider_run_arpege(target) {



	var start = Date.parse(context.date_run_arpege.toISOString());
	var min = Date.parse(context.date_run_arpege_precedent.toISOString());

	slider_run_arpege = new slider_run_Controller(target, start, min)


	slider_run_arpege.slider_run.noUiSlider.on('update', function (values, handle) {


		$('#choix_run_arpege').html(formatdateutc(new Date(+values[handle])));
		mymap.change_run(new Date(+values[handle]).toISOString().replace('.000Z', 'Z'), ['prevision'], 'arpege');

	});
}
function resize_window() {

	var h = $(document).height() - $("#header").height() - $("#footer").height();
	$('#carto').height(h);
}
function choix_mode(mymode) {
	context.mode = mymode;
	$('nav div ul li a i').removeClass('red-text');

	switch (context.mode) {
		case 'coupe_verticale':
			mymap.setDrawMode('Point');
			//mymap.set_all_layer_invisible(['prevision','observation']);
			$('footer div.row div.col div.row div.col:gt( 0 )').hide();
			$('#play_stop i').text(slider_animate.stop());

			$('#menu_droit').attr('data-target', 'menu1');
			$('nav div ul li a i:eq( 2 )').addClass('red-text');
			$('#titre_small_menu').text($_coupe_terrain);
<<<<<<< HEAD
			//$('#Lance_coupe_trajet').hide();
=======
			$('#Lance_coupe_trajet').hide();
>>>>>>> 71a9a1c0118488e76731054791221835be69d1a2
			break;
		case 'coupe_trajet':
			mymap.setDrawMode('LineString');
			//mymap.set_all_layer_invisible(['prevision','observation']);
			$('footer div.row div.col div.row div.col:gt( 0 )').hide();
			$('#play_stop i').text(slider_animate.stop());
			$('#menu_droit').attr('data-target', 'menu2');
			$('nav div ul li a i:eq( 3 )').addClass('red-text');
			$('#titre_small_menu').text($_coupe_trajet);
			//if ($('#Lance_coupe_trajet').attr('data')) $('#Lance_coupe_trajet').show();
			//else $('#Lance_coupe_trajet').hide();
			break;
		case 'prevision':
			mymap.setDrawMode(null);
			mymap.set_all_layer_invisible(['observation']);
			var t = $("input[data_type='prevision']:checked");
			t.each(function (index, value) {
				var id = $(value).attr('data')
				mymap.set_layer_visible(id);
			});
			$('footer div.row div.col div.row div.col:gt( 0 )').show();
			$('#menu_droit').attr('data-target', 'menu3');
			$('nav div ul li a i:eq( 1 )').addClass('red-text');
			$('#titre_small_menu').text($_previsions);
			var t = $("input[data_model='arpege']:checked");
			if (t.length > 0) {
				slider_animate.update(context.date_start_previ_arpege, context.date_min_previ_arpege, context.date_max_previ_arpege, context.step_previ_arpege, context.delay_previ_arpege);

			}
			else slider_animate.update(context.date_start_previ_arome, context.date_min_previ_arome, context.date_max_previ_arome, context.step_previ_arome, context.delay_previ_arome);

			//$('#Lance_coupe_trajet').hide();
			break;
		case 'observation':
			mymap.setDrawMode(null);
			mymap.set_all_layer_invisible(['prevision']);
			var t = $("input[data_type='observation']:checked");
			t.each(function (index, value) {
				var id = $(value).attr('data')
				mymap.set_layer_visible(id);
			});
			$('footer div.row div.col div.row div.col:gt( 0 )').show();
			$('#menu_droit').attr('data-target', 'menu4');
			$('nav div ul li a i:eq( 0 )').addClass('red-text');
			$('#titre_small_menu').text($_observations);

			slider_animate.update(context.date_start_obs, context.date_min_obs, context.date_max_obs, context.step_obs, context.delay_obs)
			//$('#Lance_coupe_trajet').hide();
			break;
		case 'preference':
			mymap.setDrawMode(null);
			//mymap.set_all_layer_invisible(['prevision', 'observation']);
			$('#menu5').sidenav('open');
			$('footer div.row div.col div.row div.col:gt( 0 )').hide();
			$('#play_stop i').text(slider_animate.stop());
			$('#menu_droit').attr('data-target', 'menu5');
			$('nav div ul li a i:eq( 4 )').addClass('red-text');
			$('#titre_small_menu').text($_menu_preferences);
			//$('#Lance_coupe_trajet').hide();
			break;
			
	}




}
function update_context(with_toast = false) {
	var retour = context.update(localisation.origin);

	choix_mode(context.mode);

	if (retour.date_run_arome_change) slider_run_arome.update(Date.parse(context.date_run_arome.toISOString()), Date.parse(context.date_run_arome_precedent.toISOString()));
	if (retour.date_run_arpege_change) slider_run_arpege.update(Date.parse(context.date_run_arpege.toISOString()), Date.parse(context.date_run_arpege_precedent.toISOString()));
	//var close="<a onclick='M.Toast.getInstance(this.parentElement).dismiss();'>X</a><br>";
	var close = "";
	if (with_toast) {
		if (retour.date_run_arome_change == false && retour.date_run_arpege_change == false) {
			M.toast({ html: "<p>" + close + $_no_new_modele + "</p>", classes: 'rounded' });
		}
		else if (retour.date_run_arome_change == true && retour.date_run_arpege_change == true) {
			M.toast({ html: "<p>" + close + $_nouveau_modele_arome_dispo + close + "<br>" + $_nouveau_modele_arpege_dispo + "</p>", classes: 'rounded' });
		}
		else if (retour.date_run_arome_change == true) {
			M.toast({ html: "<p>" + close + $_nouveau_modele_arome_dispo + "</p>", classes: 'rounded' });
		}
		else if (retour.date_run_arpege_change == true) {
			M.toast({ html: "<p>" + close + $_nouveau_modele_arpege_dispo + "</p>", classes: 'rounded' });
		}
	}
	else {
		if (retour.date_run_arome_change == true && retour.date_run_arpege_change == true) {
			M.toast({ html: "<p>" + close + $_nouveau_modele_arome_dispo + close + "<br>" + $_nouveau_modele_arpege_dispo + "</p>", classes: 'rounded' });
		}
		else if (retour.date_run_arome_change == true) {
			M.toast({ html: "<p>" + close + $_nouveau_modele_arome_dispo + "</p>", classes: 'rounded' });
		}
		else if (retour.date_run_arpege_change == true) {
			M.toast({ html: "<p>" + close + $_nouveau_modele_arpege_dispo + "</p>", classes: 'rounded' });
		}
	}

}
function timestamp(year, month, day, hours) {
	return Date.UTC(year, month, day, hours, 0, 0, 0);
}
function formatdateutc(d) {
	var weekdays = [$_Dimanche, $_Lundi, $_Mardi, $_Mercredi, $_Jeudi, $_Vendredi, $_Samedi];
	var months = [$_Janvier, $_Fevrier, $_Mars, $_Avril, $_Mai, $_Juin, $_Juillet, $_Aout, $_Septembre, $_Octobre, $_Novembre, $_Decembre];
	var retour = weekdays[d.getUTCDay()]; retour += " ";

	if (d.getUTCDate() < 10) retour += "0";
	retour += d.getUTCDate(); retour += " ";
	retour += months[d.getUTCMonth()]; retour += " ";
	if (d.getUTCHours() < 10) retour += "0";
	retour += d.getUTCHours(); retour += "H"
	if (d.getUTCMinutes() < 10) retour += "0";
	retour += d.getUTCMinutes();
	retour += " UTC"
	return retour;


}
function formatdateutcshort(d) {
	var weekdays = [$_Dimanche_short, $_Lundi_short, $_Mardi_short, $_Mercredi_short, $_Jeudi_short, $_Vendredi_short, $_Samedi_short];
	var months = [$_Janvier_short, $_Fevrier_short, $_Mars_short, $_Avril_short, $_Mai_short, $_Juin_short, $_Juillet_short, $_Aout_short, $_Septembre_short, $_Octobre_short, $_Novembre_short, $_Decembre_short];
	var retour = weekdays[d.getUTCDay()]; retour += " ";

	if (d.getUTCDate() < 10) retour += "0";
	retour += d.getUTCDate(); retour += " ";
	retour += months[d.getUTCMonth()]; retour += " ";
	if (d.getUTCHours() < 10) retour += "0";
	retour += d.getUTCHours(); retour += "H"
	//if (d.getUTCMinutes() < 10) retour += "0";
	//retour += d.getUTCMinutes();
	retour += " UTC"
	return retour;


}



function apply_language() {

	//$('#menu_acces')[0].previousElementSibling.children[1].innerText = $_menu3_title1;
	$('#menu_vent')[0].previousElementSibling.children[1].innerText = $_menu3_title2;
	$('#menu_precip')[0].previousElementSibling.children[1].innerText = $_menu3_title3;
	$('#menu_nuage')[0].previousElementSibling.children[1].innerText = $_menu3_title4;
	$('#menu_tempe')[0].previousElementSibling.children[1].innerText = $_menu3_title5;
	$('#menu_aero')[0].previousElementSibling.children[1].innerText = $_menu3_title6;
	$('#menu_imagerie')[0].previousElementSibling.children[1].innerText = $_imagerie;

	$('#menu_analyse_generale')[0].previousElementSibling.children[1].innerText = $_analyse_generale;
	//$('#menu_preferences')[0].previousElementSibling.children[1].innerText = $_menu_preferences;
	$('#menu_preference_language label')[0].innerText = $_choix_language;
	$('#menu_preference_language select option')[0].innerText = $_francais;
	$('#menu_preference_language select option')[1].innerText = $_anglais;
	$('#menu_preference_language select').val(context.language);
	$('#menu_preference_language select').formSelect();

	$('#nav-mobile li a label')[0].innerText = $_observations;
	$('#nav-mobile li a label')[1].innerText = $_previsions;
	$('#nav-mobile li a label')[2].innerText = $_coupe_terrain;
	$('#nav-mobile li a label')[3].innerText = $_coupe_trajet;
	$('#nav-mobile li a label')[4].innerText = $_menu_preferences;

	$('#small_menu li a:eq( 0 )').text($_observations);
	$('#small_menu li a:eq( 1 )').text($_previsions);
	$('#small_menu li a:eq( 2 )').text($_coupe_terrain);
	$('#small_menu li a:eq( 3 )').text($_coupe_trajet);
	$('#small_menu li a:eq( 4 )').text($_menu_preferences);



	$('#menu_preference_geo label')[0].innerText = $_choix_geo;
	$('#menu_preference_geo select option')[0].innerText = $_fr;
	$('#menu_preference_geo select option')[1].innerText = $_re;
	$('#menu_preference_geo select option')[2].innerText = $_my;
	$('#menu_preference_geo select option')[3].innerText = $_ga;
	$('#menu_preference_geo select option')[4].innerText = $_ma;
	$('#menu_preference_geo select option')[5].innerText = $_gy;
	$('#menu_preference_geo select option')[6].innerText = $_po;
	$('#menu_preference_geo select option')[7].innerText = $_nc;
	$('#menu_preference_geo select option')[8].innerText = $_sp;

	$('#menu_preference_geo select').val(localisation.origin);
	$('#menu_preference_geo select').formSelect();
	$('#menu_preference_repere label')[0].innerText = $_choix_repere;

	$('#menu_preference_repere select option:eq( 0 )').text($_repere_dep);
	$('#menu_preference_repere select option:eq( 1 )').text($_repere_front);
	$('#menu_preference_repere select option:eq( 2 )').text($_repere_grat);
	$('#menu_preference_repere select option:eq( 3 )').text($_repere_aero);

	$('#menu_preference_repere select option:eq( 0 )').prop('selected', true);
	$('#menu_preference_repere select option:eq( 1 )').prop('selected', false);
	$('#menu_preference_repere select option:eq( 2 )').prop('selected', false);
	$('#menu_preference_repere select option:eq( 3 )').prop('selected', false);

	$('#menu_preference_repere select').formSelect();
	$('#id_version').text($_version + " " + version)

	$('#label_choix_run_arome').text($_label_choix_run_arome);
	$('#label_choix_run_arpege').text($_label_choix_run_arpege);
	$('#menu2_content').html($_coupe_trajet_vide);
	$('#menu2 div:eq( 0 ) label').text($_liste_trajets_enregistres);
	$('#menu1 div:eq( 0 ) label').text($_liste_terrains_enregistres);
	$('#menu1_content').html($_coupe_terrain_vide);
	maj_liste_trajet_enregistre();
	maj_liste_terrain_enregistre();

	$('select').formSelect();




}
function maj_liste_trajet_enregistre(name = "") {


	$('#menu2 div:eq( 0 ) select').children('option').remove();


	let t = localStorage.getItem('liste_coupe_trajet');

	if (t == null) {

		$('#menu2 div:eq( 0 ) select').append($('<option>', {
			value: '',
			diabled: true,
			selected: true,
			text: $_aucun_trajet
		}));

	}
	else {

		t = jQuery.parseJSON(t);


		//|| !mymap.sourceLine.getFeatures()[0]
		if (t.length == 0 || !mymap.sourceLine.getFeatures()[0]) {
			$('#menu2 div:eq( 0 ) select').append($('<option>', {
				value: '',
				diabled: true,
				selected: true,
				text: $_aucun_trajet
			}));
		}
		else {

			let obj = { value: 'k', text: $_choix_trajet, selected: true, disabled: true };
			$('#menu2 div:eq( 0 ) select').append($('<option>', obj));
			$.each(t, function (k, v) {


				let obj = { value: k, text: v.name };
				if (v.name == name) obj['selected'] = true;
				$('#menu2 div:eq( 0 ) select').append($('<option>', obj));

			});
		}

	}
	$('select').formSelect();
}
function maj_liste_terrain_enregistre(name = "") {


	$('#menu1 div:eq( 0 ) select').children('option').remove();


	let t = localStorage.getItem('liste_coupe_terrain');

	if (t == null) {

		$('#menu1 div:eq( 0 ) select').append($('<option>', {
			value: '',
			diabled: true,
			selected: true,
			text: $_aucun_terrain
		}));

	}
	else {

		t = jQuery.parseJSON(t);


		//|| !mymap.sourceLine.getFeatures()[0]
		if (t.length == 0 || !mymap.sourceLine.getFeatures()[0]) {
			$('#menu1 div:eq( 0 ) select').append($('<option>', {
				value: '',
				diabled: true,
				selected: true,
				text: $_aucun_terrain
			}));
		}
		else {

			let obj = { value: 'k', text: $_choix_terrain, selected: true, disabled: true };
			$('#menu1 div:eq( 0 ) select').append($('<option>', obj));
			$.each(t, function (k, v) {


				let obj = { value: k, text: v.name };
				if (v.name == name) obj['selected'] = true;
				$('#menu1 div:eq( 0 ) select').append($('<option>', obj));

			});
		}

	}
	$('select').formSelect();
}
function load_trajet_from_storage(index) {
	if (coupe_trajet_en_cours == null) {
		coupe_trajet_en_cours = new coupe_trajet_Controller([], "menu2_content");

	}
	coupe_trajet_en_cours.load_from_storage(index);
	Valider_trajet_oaci()
}
function load_terrain_from_storage(index) {
	if (coupe_terrain_en_cours == null) {
		coupe_terrain_en_cours = new coupe_terrain_Controller([], "menu1_content");

	}
	coupe_terrain_en_cours.load_from_storage(index);
	Valider_terrain_oaci();
}
function init_animate(id_slider) {



	slider_animate = new animate_Controller(id_slider, context.date_start_previ_arome, context.date_min_previ_arome, context.date_max_previ_arome, context.step_previ_arome, context.delay_previ_arome, mymap);

	$('#echeance_string').html(formatdateutc(context.date_reference));
	slider_animate.slider.noUiSlider.on('update', function (values, handle) {

		if (mymap == null) return;

		var d = new Date(+values[handle]);



		$('#echeance_string').html(formatdateutc(d));
		mymap.change_echeance(d.toISOString().replace('.000Z', 'Z'), [context.mode]);

	});
	$('#play i').text(slider_animate.stop());
}
function load_controller() {


	if (mymap) mymap.delete();
	mymap = null;
	if (slider_animate) slider_animate.delete();
	slider_animate = null;
	if (slider_run_arome) slider_run_arome.delete();
	slider_run_arome = null;
	if (slider_run_arpege) slider_run_arpege.delete();
	slider_run_arpege = null;

	$('#play_stop i').text('play_arrow');

	if (mymap == null) init_carto('carto');

	if (slider_animate == null) init_animate('slider_echeance');

	if (slider_run_arome == null) init_slider_run_arome('switch_run_prevision_arome');

	if (slider_run_arpege == null) init_slider_run_arpege('switch_run_prevision_arpege');
	choix_mode(context.mode);

}



function open_vertical_profil(coord) {
	console.log('Lance une coupe terrain avec les coordonnées:');
	console.log(ol.proj.toLonLat(coord, 'EPSG:3857'));
	var obj = {};
	let p = ol.proj.toLonLat(coord, 'EPSG:3857');
	obj.lon = p[0];
	obj.lat = p[1];
	let libelle = Math.abs(p[1]).toFixed(2);
	libelle += $_symbol_degre;
	if (p[1] > 0) libelle += $_N; else libelle += $_S;
	libelle += "/"
	libelle += Math.abs(p[0]).toFixed(2);
	libelle += $_symbol_degre;
	if (p[0] > 0) libelle += $_E; else libelle += $_O;
	obj.icao = libelle;
	obj.name = 'coord';
	if (coupe_terrain_en_cours == null) coupe_terrain_en_cours = new coupe_terrain_Controller(obj, "menu1_content");
	else {

		coupe_terrain_en_cours.update(obj);
	}
	maj_liste_terrain_enregistre();
	$('#menu1').sidenav('open');
}
function start_track_profil() {


	if (coupe_trajet_en_cours) coupe_trajet_en_cours.remove(maj_coupe_trajet_en_cours);
}
function open_track_profil(coord) {


	var t = [];
	$.each(coord, function (key, c) {
		var obj = {};
		let p = ol.proj.toLonLat(c, 'EPSG:3857');

		obj.lon = p[0];
		obj.lat = p[1];
		let libelle = Math.abs(p[1]).toFixed(2);
		libelle += $_symbol_degre;
		if (p[1] > 0) libelle += $_N; else libelle += $_S;
		libelle += "/"
		libelle += Math.abs(p[0]).toFixed(2);
		libelle += $_symbol_degre;
		if (p[0] > 0) libelle += $_E; else libelle += $_O;
		obj.icao = libelle;
		obj.name = 'coord';
		t.push(obj);
	});

	//coupe_trajet_en_cours = new coupe_trajet_Controller(t, "menu2_content");
	if (coupe_trajet_en_cours == null) coupe_trajet_en_cours = new coupe_trajet_Controller(t, "menu2_content");
	else {

		coupe_trajet_en_cours.update(t);
	}
	maj_liste_trajet_enregistre();
	$('#menu2').sidenav('open');


}
function test() {
	var feature = mymap.sourceLine.getFeatures()[0];
	//let geometry=feature[0].getGeometry().getCoordinates();//new ol.geom.Geometry ([[-2,48],[2,48],[-4,45]]);
	var coords = feature.getGeometry().getCoordinates();
	coords[0][0] = 352999.79856;
	feature.getGeometry().setCoordinates(coords);
	//		open_track_profil(features[0].getGeometry().getCoordinates());
}

function Valider_trajet_oaci() {
	var feature = mymap.sourceLine.getFeatures()[0];

	let coords_tracage = [];
	let coords = [];
	let erreur = false;

	$.each(coupe_trajet_en_cours.list, function (i, v) {
		let key = $('#etape' + i).val().toUpperCase();
		let search = null;
		$.each(v, function (i1, v2) {
			if (v2.icao == key) { search = v2; return true; }
		});
		if (search) {
			coords.push(search);
			coords_tracage.push(ol.proj.fromLonLat([search.lon, search.lat], 'EPSG:3857'));

		}
		else {
			$('#liste_etape div div i:eq( ' + i + ' )').addClass('red-text');
			erreur = true;
			return false;
		}

	});
	if (erreur == false) {

		coupe_trajet_en_cours.etapes = coords;
		feature.getGeometry().setCoordinates(coords_tracage);
		mymap.mymap.getView().setCenter(coords_tracage[0]);
		return true;
	}
	else {
		return false;
	}
}
function Valider_terrain_oaci() {
	let coords_tracage = null;
	
	let erreur = false;
	var feature = mymap.sourcePoint.getFeatures()[0];
	console.log(coupe_terrain_en_cours);
	let key = $('#terrain').val().toUpperCase();
	let search = null;
	$.each(coupe_terrain_en_cours.list, function (i, v) {



		if (v.icao == key) { search = v; return false; }
	});
	
	if (search) {
		
		coords_tracage=ol.proj.fromLonLat([search.lon, search.lat], 'EPSG:3857');
		//coords_tracage.push([search.lon, search.lat]);


	} else {
		$('#menu1_content main div div i:eq( ' + 0 + ' )').addClass('red-text');
		
		return false;

	}
	
	coupe_terrain_en_cours.terrain = search;
	
	feature.getGeometry().setCoordinates(coords_tracage);
	mymap.mymap.getView().setCenter(coords_tracage);
	
	return true;

}

function add_etape(key) {
	coupe_trajet_en_cours.add_etape(key);
	Valider_trajet_oaci();
}
function remove_etape(key) {
	coupe_trajet_en_cours.remove_etape(key);
	Valider_trajet_oaci();
}
function maj_coupe_trajet_en_cours() {
	$('#liste_etape').html('');
	var html = this.render()
	$('#liste_etape').html(html);

}
function save_trajet_oaci(name) {


	coupe_trajet_en_cours.save(name);

	maj_liste_trajet_enregistre(name);




}
function save_terrain_oaci(name) {


	coupe_terrain_en_cours.save(name);

	maj_liste_terrain_enregistre(name);




}


function newwindow(url, name) {

	window.open(url, name, 'top=0,left=0,width=1024,height=768,menubar=no,status=no,scrollbars=yes');

}
