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
	'175': '410', '185': '400', '300': '300', '350': '270', '400': '240', '450': '210',
	'465': '200', '500': '180', '550': '160', '600': '140', '650': '120', '700': '100',
	'750': '080', '800': '065', '850': '050', '900': '030', '925': '027', '950': '020'
}

function get_hPa_by_FL(value) {
	if (typeof (hpa_fl[value]) == 'undefined') { return ''; }
	return ' - FL' + hpa_fl[value];
};



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
	if (zoom == null) zoom = 9;
	var extent = [42, -15.20, 48, -10];

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

		$('select').formSelect({ classes: 'leftplus', dropdownOptions: { coverTrigger: false } });
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


				if (coupe_trajet_en_cours.name == "En cours") {
					coupe_trajet_en_cours.name = "(" + coupe_trajet_en_cours.etapes[0].icao + ")->(" + coupe_trajet_en_cours.etapes[coupe_trajet_en_cours.etapes.length - 1].icao + ")";
				}
				$('#title_coupe_trajet').html($_coupe_trajet + " " + coupe_trajet_en_cours.name);




				var url = '';
				$.each(coupe_trajet_en_cours.etapes, function (k, v) {
					if (url != '') url += ",";
					url += v.lat + ',' + v.lon;
				});
				url += "/";
				url += coupe_trajet_en_cours.depart / 1000 + '/' + coupe_trajet_en_cours.duree / (1000 * 60 * 60) + '/';
				url += coupe_trajet_en_cours.fl + '/';

				let service_wms = 'https://int-aviation.meteo.fr/'
				let p = '';
				let t_layer = [];
				let route;
				if (localisation.origin=='fr') route = 'wms/vertical-section/path2/';
				else route = 'wms/vertical-section/path2_tro/';
				

				$.each(coupe_trajet_en_cours.parametres, function (k, v) {
					if (p != '' && v) p += "," + k;
					else if (p == '' && v) p += k;

					if (v) t_layer.push(new ol.layer.Image({
						source: new ol.source.ImageStatic(
							{
								url: service_wms + route + url + k,
								projection: projection,
								imageExtent: extent,
								crossOrigin: null
							})
					}));
				});
				


				$('#coupe_trajet_to_window').off('click');
				$('#coupe_trajet_to_window').on('click', function () {
					newwindow("coupe_trajet.html?name=" + coupe_trajet_en_cours.name + "&url_base=" + url + "&parametres=" + p + "&language=" + context.language + "&origin="+localisation.origin);
					$('#vue_trajet').modal('close');
				});

				var map = new ol.Map({
					target: 'vue_trajet_ol',
					controls: [],
					layers: t_layer,
					view: new ol.View({
						projection: projection,
						center: ol.extent.getCenter(extent),
						zoom: 1.5,
						maxZoom: 8
					})
				});
				map.on('rendercomplete', function (evt) {

					$('#wait_coupe_trajet').hide();
				});
				$.each(t_layer, function (k, v) {
					console.log(v.getSource());
					v.getSource().on('imageloadstart', function () {
						$('#wait_coupe_trajet').show();
					});
					v.getSource().on('imageloaderror', function () {
						$('#wait_coupe_trajet').hide();
					});
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

				if (coupe_terrain_en_cours.name == "En cours") {
					coupe_terrain_en_cours.name = "(" + coupe_terrain_en_cours.terrain.icao + ")";
				}

				$('#title_coupe_terrain').html($_coupe_terrain + " " + coupe_terrain_en_cours.name);

			
				var url = '';
				url += coupe_terrain_en_cours.terrain.lat + "/" + coupe_terrain_en_cours.terrain.lon + "/";
				url += coupe_terrain_en_cours.depart / 1000 + '/' + coupe_terrain_en_cours.duree / (1000 * 60 * 60) + '/';
				url += coupe_terrain_en_cours.fl + '/';
				
				
				let service_wms = 'https://int-aviation.meteo.fr/'
				let p = '';
				let t_layer = [];
				let route;
				if (localisation.origin=='fr') route = 'wms/vertical-section/terrain2/';
				else route = 'wms/vertical-section/terrain2_tro/';
				
				$.each(coupe_terrain_en_cours.parametres, function (k, v) {
					if (p != '' && v) p += "," + k;
					else if (p == '' && v) p += k;

					if (v) t_layer.push(new ol.layer.Image({
						source: new ol.source.ImageStatic(
							{
								url: service_wms + route + url + k,
								projection: projection,
								imageExtent: extent,
								crossOrigin: null
							})
					}));
				});
				


				$('#coupe_terrain_to_window').off('click');
				$('#coupe_terrain_to_window').on('click', function () {
					newwindow("coupe_terrain.html?name=" + coupe_terrain_en_cours.name + "&url_base=" + url +"&parametres="+ p + "&language=" + context.language+ "&origin="+ localisation.origin);
					$('#vue_terrain').modal('close');
				});



				var map = new ol.Map({
					target: 'vue_terrain_ol',
					controls: [],
					layers: t_layer,
					view: new ol.View({
						projection: projection,
						center: ol.extent.getCenter(extent),
						zoom: 1.5,
						maxZoom: 8
					})
				});

				map.on('rendercomplete', function (evt) {

					$('#wait_coupe_terrain').hide();
				});
				$.each(t_layer, function (k, v) {
					console.log(v.getSource());
					v.getSource().on('imageloadstart', function () {
						$('#wait_coupe_terrain').show();
					});
					v.getSource().on('imageloaderror', function () {
						$('#wait_coupe_terrain').hide();
					});
				});


			}
		});
		var slider = document.getElementById('speed_obs');

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
			$("#value_speed_obs").text((+values[handle] / 1000) + ' ' + $_seconde);
			context.change_delay_obs(+values[handle]);
			if (slider_animate) slider_animate.change_delay(context.delay_obs);
		});


		var slider = document.getElementById('speed_previ');

		noUiSlider.create(slider, {
			start: context.delay_previ,
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
			$("#value_speed_previ").text((+values[handle] / 1000) + ' ' + $_seconde);
			context.change_delay_previ(+values[handle]);


			if (slider_animate) slider_animate.change_delay(context.delay_previ);
		});
		apply_language();

	});


}


function force_origin(origin) {
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
	localStorage.setItem('localisation', JSON.stringify(contenu));
	//window.location.assign("./index.html");
}
function check_localisation() {


	if (localStorage.getItem('version') == null || localStorage.getItem('version') != version || localStorage.getItem('localisation') == null) {
		localStorage.setItem('version', version);
		init_localisation();
	}

	else {

		let href = new URL(location.href);
		let search_params = new URLSearchParams(href.search);

		if (search_params.has('origin')) {
			let origin = search_params.get('origin');

			force_origin(origin);


		}


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
	let service_wms = 'http://int-aviation.meteo.fr/';

	var layer_uv_height = {
		source:
		{
			url: service_wms + 'wms/map/model.uv_height',
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
	};
	var layer_ff_raf_height = {
		source:
		{
			url: service_wms + 'wms/map/model.ff_raf_height',
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
	};
	var layer_uv_isobaric = {
		source:
		{
			url: service_wms + 'wms/map/model.uv_isobaric',
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
	};
	var layer_t_sol_arome = {
		source:
		{
			url: service_wms + 'wms/map/model.t_sol_arome',
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

	};
	var layer_td_height = {
		source:
		{
			url: service_wms + 'wms/map/model.td_height',
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

	};
	var layer_rrtt = {
		source:
		{
			url: service_wms + 'wms/map/model.rrtt',
			params: { champ: 'model.rrtt', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.6,
		tag: "prevision",
		id: 'rrtt',
		libelle: $_layer_rrtt,
		menu_id: 'menu_precip',
		zIndex: 7,
		visible: false

	};
	var layer_ngtt = {
		source:
		{
			url: service_wms + 'wms/map/model.ngtt',
			params: { champ: 'model.ngtt', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.6,
		tag: "prevision",
		id: 'ngtt',
		libelle: $_layer_ngtt,
		menu_id: 'menu_precip',
		zIndex: 8,
		visible: false

	};
	var layer_rflctvt_isobaric = {
		source:
		{
			url: service_wms + 'wms/map/vertical_section.rflctvt_isobaric',
			params: { champ: 'vertical_section.rflctvt_isobaric', ELEVATION: 925, TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.5,
		tag: "prevision",
		id: 'vs_rflt_iso',
		libelle: $_layer_vs_rflt_iso,
		menu_id: 'menu_precip',
		zIndex: 9,
		visible: false,
		elevationLevels: { 'min': 500, '11%': 550, '22%': 600, '33%': 650, '44%': 700, '55%': 750, '66%': 800, '77%': 850, '88%': 900, 'max': 925 },
		elevationUnit: 'hpa'

	};
	var layer_visi_metropole = {
		source:
		{
			url: service_wms + 'wms/map/gafor.visi_metropole',
			params: { champ: 'gafor.visi_metropole', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.6,
		tag: "prevision",
		id: 'gafor_visi_metro',
		libelle: $_layer_visi_metro,
		menu_id: 'menu_aero',
		zIndex: 10,
		visible: false

	};
	var layer_plafond_metropole = {
		source:
		{
			url: service_wms + 'wms/map/gafor.plafond_metropole',
			params: { champ: 'gafor.plafond_metropole', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.6,
		tag: "prevision",
		id: 'gafor_plafond_metro',
		libelle: $_layer_plafond_metro,
		menu_id: 'menu_aero',
		zIndex: 11,
		visible: false

	};
	var layer_h_coulim = {
		source:
		{
			url: service_wms + 'wms/map/model.h_coulim',
			params: { champ: 'model.h_coulim', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 1,
		tag: "prevision",
		id: 'h_coulim',
		libelle: $_layer_hcl,
		menu_id: 'menu_aero',
		zIndex: 12,
		visible: false

	};
	var layer_vv2_isobaric = {
		source:
		{
			url: service_wms + 'wms/map/model.vv2_isobaric',
			params: { champ: 'model.vv2_isobaric', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), ELEVATION: 700, RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 1,
		tag: "prevision",
		id: 'vv2_isobaric',
		libelle: $_layer_vv2,
		menu_id: 'menu_aero',
		zIndex: 13,
		visible: false,
		elevationLevels: { 'min': 300, '7%': 350, '14%': 400, '21%': 450, '28%': 500, '35%': 550, '42%': 600, '50%': 650, '57%': 700, '64%': 750, '71%': 800, '78%': 850, '85%': 900, '89%': 925, '92%': 950, 'max': 1000 },
		elevationUnit: 'hpa'

	};
	var layer_hu_isobaric = {
		source:
		{
			url: service_wms + 'wms/map/vertical_section.hu_isobaric',
			params: { champ: 'vertical_section.hu_isobaric', ELEVATION: 1000, TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.6,
		tag: "prevision",
		id: 'vs_hu_iso',
		libelle: $_layer_hu,
		menu_id: 'menu_nuage',
		zIndex: 6,
		visible: false,
		elevationLevels: { 'min': 500, '9%': 550, '18%': 600, '27%': 650, '36%': 700, '45%': 750, '54%': 800, '63%': 850, '72%': 900, '81': 925, '90%': 950, 'max': 1000 },
		elevationUnit: 'hpa'

	};
	var layer_sat_isp = {
		source:
		{
			url: service_wms + 'wms/map/model.sat_isp',
			params: { champ: 'model.sat_isp', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.6,
		tag: "prevision",
		id: 'sat_isp',
		libelle: $_layer_sat_isp,
		menu_id: 'menu_nuage',
		zIndex: 14,
		visible: false

	};
	var layer_nebul_bas = {
		source:
		{
			url: service_wms + 'wms/map/model.nebul_bas',
			params: { champ: 'model.nebul_bas', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.6,
		tag: "prevision",
		id: 'nebul_bas',
		libelle: $_layer_nebul_bas,
		menu_id: 'menu_nuage',
		zIndex: 15,
		visible: false

	};
	var layer_nebul_moyen = {
		source:
		{
			url: service_wms + 'wms/map/model.nebul_moyen',
			params: { champ: 'model.nebul_moyen', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.6,
		tag: "prevision",
		id: 'nebul_moyen',
		libelle: $_layer_nebul_moyen,
		menu_id: 'menu_nuage',
		zIndex: 16,
		visible: false

	};

	var layer_nebul_haut = {
		source:
		{
			url: service_wms + 'wms/map/model.nebul_haut',
			params: { champ: 'model.nebul_haut', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.6,
		tag: "prevision",
		id: 'nebul_haut',
		libelle: $_layer_nebul_haut,
		menu_id: 'menu_nuage',
		zIndex: 17,
		visible: false

	};
	var layer_t = {
		source:
		{
			url: service_wms + 'wms/map/zt.t',
			params: { champ: 'zt.t', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), ELEVATION: 500, RUN: context.date_run_arpege.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arpege',
		opacity: 0.6,
		tag: "prevision",
		id: 't_arpege',
		libelle: $_t_layer_arpege,
		menu_id: 'menu_analyse_generale',
		zIndex: 18,
		visible: false,
		elevationLevels: { 'min': 500, '33%': 700, '66%': 850, 'max': 1000 },
		elevationUnit: 'hpa'

	};
	var layer_z = {
		source:
		{
			url: service_wms + 'wms/map/zt.z',
			params: { champ: 'zt.z', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), ELEVATION: 500, RUN: context.date_run_arpege.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arpege',
		opacity: 1,
		tag: "prevision",
		id: 'z_arpege',
		libelle: $_z_layer_arpege,
		menu_id: 'menu_analyse_generale',
		zIndex: 19,
		visible: false,
		elevationLevels: { 'min': 500, '33%': 700, '66%': 850, 'max': 1000 },
		elevationUnit: 'hpa'

	};
	var layer_ir_hrv = {
		source:
		{
			url: service_wms + 'wms/map/satellite.ir_hrv',
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

	};
	var layer_reflectivity_fm = {
		source:
		{
			url: service_wms + 'wms/map/radar.reflectivity_fm',
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

	};
	var layer_impact = {
		source:
		{
			url: service_wms + 'wms/map/foudre.impact',
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

	};
	/************************************************************************ */

	var layer_uv_height_tro = {
		source:
		{
			url: service_wms + 'wms/map/model.uv_height_tro',
			params: { champ: 'model.uv_height_tro', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
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
	};
	var layer_ff_raf_height_tro = {
		source:
		{
			url: service_wms + 'wms/map/model.ff_raf_height_tro',
			params: { champ: 'model.ff_raf_height_tro', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
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
	};
	var layer_uv_isobaric_tro = {
		source:
		{
			url: service_wms + 'wms/map/model.uv_isobaric_tro',
			params: { champ: 'model.uv_isobaric_tro', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), ELEVATION: 700, RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
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
	};
	var layer_t_sol_arome_tro = {
		source:
		{
			url: service_wms + 'wms/map/model.t_sol_arome_tro',
			params: { champ: 'model.t_sol_arome_tro', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
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

	};
	var layer_td_height_tro = {
		source:
		{
			url: service_wms + 'wms/map/model.td_height_tro',
			params: { champ: 'model.td_height_tro', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
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

	};
	var layer_rrtt_tro = {
		source:
		{
			url: service_wms + 'wms/map/model.rrtt_tro',
			params: { champ: 'model.rrtt_tro', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.6,
		tag: "prevision",
		id: 'rrtt',
		libelle: $_layer_rrtt,
		menu_id: 'menu_precip',
		zIndex: 7,
		visible: false

	};

	var layer_rflctvt_isobaric_tro = {
		source:
		{
			url: service_wms + 'wms/map/vertical_section.rflctvt_isobaric_tro',
			params: { champ: 'vertical_section.rflctvt_isobaric_tro', ELEVATION: 925, TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.5,
		tag: "prevision",
		id: 'vs_rflt_iso',
		libelle: $_layer_vs_rflt_iso,
		menu_id: 'menu_precip',
		zIndex: 9,
		visible: false,
		elevationLevels: { 'min': 500, '11%': 550, '22%': 600, '33%': 650, '44%': 700, '55%': 750, '66%': 800, '77%': 850, '88%': 900, 'max': 925 },
		elevationUnit: 'hpa'

	};
	var layer_visi_tro = {
		source:
		{
			url: service_wms + 'wms/map/gafor.visi_tro',
			params: { champ: 'gafor.visi_tro', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.6,
		tag: "prevision",
		id: 'gafor_visi_metro',
		libelle: $_layer_visi_metro,
		menu_id: 'menu_aero',
		zIndex: 10,
		visible: false

	};
	var layer_plafond_tro = {
		source:
		{
			url: service_wms + 'wms/map/gafor.plafond_tro',
			params: { champ: 'gafor.plafond_tro', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.6,
		tag: "prevision",
		id: 'gafor_plafond_metro',
		libelle: $_layer_plafond_metro,
		menu_id: 'menu_aero',
		zIndex: 11,
		visible: false

	};
	var layer_h_coulim_tro = {
		source:
		{
			url: service_wms + 'wms/map/model.h_coulim_tro',
			params: { champ: 'model.h_coulim_tro', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 1,
		tag: "prevision",
		id: 'h_coulim',
		libelle: $_layer_hcl,
		menu_id: 'menu_aero',
		zIndex: 12,
		visible: false

	};
	var layer_vv2_isobaric_tro = {
		source:
		{
			url: service_wms + 'wms/map/model.vv2_isobaric_tro',
			params: { champ: 'model.vv2_isobaric_tro', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), ELEVATION: 700, RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 1,
		tag: "prevision",
		id: 'vv2_isobaric',
		libelle: $_layer_vv2,
		menu_id: 'menu_aero',
		zIndex: 13,
		visible: false,
		elevationLevels: { 'min': 300, '7%': 350, '14%': 400, '21%': 450, '28%': 500, '35%': 550, '42%': 600, '50%': 650, '57%': 700, '64%': 750, '71%': 800, '78%': 850, '85%': 900, '89%': 925, '92%': 950, 'max': 1000 },
		elevationUnit: 'hpa'

	};
	var layer_hu_isobaric_tro = {
		source:
		{
			url: service_wms + 'wms/map/vertical_section.hu_isobaric_tro',
			params: { champ: 'vertical_section.hu_isobaric_tro', ELEVATION: 1000, TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.6,
		tag: "prevision",
		id: 'vs_hu_iso',
		libelle: $_layer_hu,
		menu_id: 'menu_nuage',
		zIndex: 6,
		visible: false,
		elevationLevels: { 'min': 500, '9%': 550, '18%': 600, '27%': 650, '36%': 700, '45%': 750, '54%': 800, '63%': 850, '72%': 900, '81': 925, '90%': 950, 'max': 1000 },
		elevationUnit: 'hpa'

	};
	var layer_nebul_bas_tro = {
		source:
		{
			url: service_wms + 'wms/map/model.nebul_bas_tro',
			params: { champ: 'model.nebul_bas_tro', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.6,
		tag: "prevision",
		id: 'nebul_bas',
		libelle: $_layer_nebul_bas,
		menu_id: 'menu_nuage',
		zIndex: 15,
		visible: false

	};
	var layer_nebul_moyen_tro = {
		source:
		{
			url: service_wms + 'wms/map/model.nebul_moyen_tro',
			params: { champ: 'model.nebul_moyen_tro', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.6,
		tag: "prevision",
		id: 'nebul_moyen',
		libelle: $_layer_nebul_moyen,
		menu_id: 'menu_nuage',
		zIndex: 16,
		visible: false

	};

	var layer_nebul_haut_tro = {
		source:
		{
			url: service_wms + 'wms/map/model.nebul_haut_tro',
			params: { champ: 'model.nebul_haut_tro', TIME: context.date_reference.toISOString().replace('.000Z', 'Z'), RUN: context.date_run_arome.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		modele: 'arome',
		opacity: 0.6,
		tag: "prevision",
		id: 'nebul_haut',
		libelle: $_layer_nebul_haut,
		menu_id: 'menu_nuage',
		zIndex: 17,
		visible: false

	};
	var layer_impact_world = {
		source:
		{
			url: service_wms + 'wms/map/foudre.impact_world',
			params: { champ: 'foudre.impact_world', TIME: context.date_reference.toISOString().replace('.000Z', 'Z') },
			ratio: 1, serverType: 'geoserver'
		},
		opacity: 1,
		tag: "observation",
		id: 'foudre_fr',
		libelle: $_layer_foudre_fr,
		menu_id: 'menu_imagerie',
		zIndex: 3,
		visible: false

	};
	var t_layer = {
		fr: [
			layer_uv_height,
			layer_ff_raf_height,
			layer_uv_isobaric,
			layer_t_sol_arome,
			layer_td_height,
			layer_rrtt,
			layer_ngtt,
			layer_rflctvt_isobaric,
			layer_visi_metropole,
			layer_plafond_metropole,
			layer_h_coulim,
			layer_vv2_isobaric,
			layer_hu_isobaric,
			layer_sat_isp,
			layer_nebul_bas,
			layer_nebul_moyen,
			layer_nebul_haut,
			layer_t,
			layer_z,
			layer_ir_hrv,
			layer_reflectivity_fm,
			layer_impact

		]
		,
		ma: [
			layer_uv_height_tro,
			layer_ff_raf_height_tro,
			layer_uv_isobaric_tro,
			layer_t_sol_arome_tro,
			layer_td_height_tro,
			layer_rrtt_tro,
			layer_rflctvt_isobaric_tro,
			layer_visi_tro,
			layer_plafond_tro,
			layer_h_coulim_tro,
			layer_vv2_isobaric_tro,
			layer_hu_isobaric_tro,
			layer_nebul_bas_tro,
			layer_nebul_moyen_tro,
			layer_nebul_haut_tro,
			layer_t,
			layer_z,
			layer_impact_world,
			{
				source:
				{
					url: service_wms + 'wms/map/radar.reflectivity_ag',
					params: { champ: 'radar.reflectivity_ag', TIME: context.date_reference.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				opacity: 0.6,
				tag: "observation",
				id: 'radar_fr',
				libelle: $_layer_radar_fr,
				menu_id: 'menu_imagerie',
				zIndex: 2,
				visible: true

			}
		],
		ga: [
			layer_uv_height_tro,
			layer_ff_raf_height_tro,
			layer_uv_isobaric_tro,
			layer_t_sol_arome_tro,
			layer_td_height_tro,
			layer_rrtt_tro,
			layer_rflctvt_isobaric_tro,
			layer_visi_tro,
			layer_plafond_tro,
			layer_h_coulim_tro,
			layer_vv2_isobaric_tro,
			layer_hu_isobaric_tro,
			layer_nebul_bas_tro,
			layer_nebul_moyen_tro,
			layer_nebul_haut_tro,
			layer_t,
			layer_z,
			layer_impact_world,
			{
				source:
				{
					url: service_wms + 'wms/map/radar.reflectivity_ag',
					params: { champ: 'radar.reflectivity_ag', TIME: context.date_reference.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				opacity: 0.6,
				tag: "observation",
				id: 'radar_fr',
				libelle: $_layer_radar_fr,
				menu_id: 'menu_imagerie',
				zIndex: 2,
				visible: true

			}],
		gy: [
			layer_uv_height_tro,
			layer_ff_raf_height_tro,
			layer_uv_isobaric_tro,
			layer_t_sol_arome_tro,
			layer_td_height_tro,
			layer_rrtt_tro,
			layer_rflctvt_isobaric_tro,
			layer_visi_tro,
			layer_plafond_tro,
			layer_h_coulim_tro,
			layer_vv2_isobaric_tro,
			layer_hu_isobaric_tro,
			layer_nebul_bas_tro,
			layer_nebul_moyen_tro,
			layer_nebul_haut_tro,
			layer_t,
			layer_z,
			layer_impact_world,
			{
				source:
				{
					url: service_wms + 'wms/map/radar.reflectivity_ag',
					params: { champ: 'radar.reflectivity_ag', TIME: context.date_reference.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				opacity: 0.6,
				tag: "observation",
				id: 'radar_fr',
				libelle: $_layer_radar_fr,
				menu_id: 'menu_imagerie',
				zIndex: 2,
				visible: true

			}],
		re: [
			layer_uv_height_tro,
			layer_ff_raf_height_tro,
			layer_uv_isobaric_tro,
			layer_t_sol_arome_tro,
			layer_td_height_tro,
			layer_rrtt_tro,
			layer_rflctvt_isobaric_tro,
			layer_visi_tro,
			layer_plafond_tro,
			layer_h_coulim_tro,
			layer_vv2_isobaric_tro,
			layer_hu_isobaric_tro,
			layer_nebul_bas_tro,
			layer_nebul_moyen_tro,
			layer_nebul_haut_tro,
			layer_t,
			layer_z,
			layer_impact_world,
			{
				source:
				{
					url: service_wms + 'wms/map/radar.reflectivity_re',
					params: { champ: 'radar.reflectivity_re', TIME: context.date_reference.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				opacity: 0.6,
				tag: "observation",
				id: 'radar_fr',
				libelle: $_layer_radar_fr,
				menu_id: 'menu_imagerie',
				zIndex: 2,
				visible: true

			}],
		my: [
			layer_uv_height_tro,
			layer_ff_raf_height_tro,
			layer_uv_isobaric_tro,
			layer_t_sol_arome_tro,
			layer_td_height_tro,
			layer_rrtt_tro,
			layer_rflctvt_isobaric_tro,
			layer_visi_tro,
			layer_plafond_tro,
			layer_h_coulim_tro,
			layer_vv2_isobaric_tro,
			layer_hu_isobaric_tro,
			layer_nebul_bas_tro,
			layer_nebul_moyen_tro,
			layer_nebul_haut_tro,
			layer_t,
			layer_z,
			layer_impact_world
		],
		nc: [
			layer_uv_height_tro,
			layer_ff_raf_height_tro,
			layer_uv_isobaric_tro,
			layer_t_sol_arome_tro,
			layer_td_height_tro,
			layer_rrtt_tro,
			layer_rflctvt_isobaric_tro,
			layer_visi_tro,
			layer_plafond_tro,
			layer_h_coulim_tro,
			layer_vv2_isobaric_tro,
			layer_hu_isobaric_tro,
			layer_nebul_bas_tro,
			layer_nebul_moyen_tro,
			layer_nebul_haut_tro,
			layer_t,
			layer_z,
			layer_impact_world,

			{
				source:
				{
					url: service_wms + 'wms/map/radar.reflectivity_nc',
					params: { champ: 'radar.reflectivity_nc', TIME: context.date_reference.toISOString().replace('.000Z', 'Z') },
					ratio: 1, serverType: 'geoserver'
				},
				opacity: 0.6,
				tag: "observation",
				id: 'radar_fr',
				libelle: $_layer_radar_fr,
				menu_id: 'menu_imagerie',
				zIndex: 2,
				visible: true

			}],
		po: [
			layer_uv_height_tro,
			layer_ff_raf_height_tro,
			layer_uv_isobaric_tro,
			layer_t_sol_arome_tro,
			layer_td_height_tro,
			layer_rrtt_tro,
			layer_rflctvt_isobaric_tro,
			layer_visi_tro,
			layer_plafond_tro,
			layer_h_coulim_tro,
			layer_vv2_isobaric_tro,
			layer_hu_isobaric_tro,
			layer_nebul_bas_tro,
			layer_nebul_moyen_tro,
			layer_nebul_haut_tro,
			layer_t,
			layer_z,
			layer_impact_world,
			{

				source:
				{
					url: service_wms + 'wms/map/satellite.ir_polynesie_goes17',
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
		sp: [

			layer_t,
			layer_z,
			layer_impact_world
		],


	};

	$('#menu_vent').html('');
	$('#menu_precip').html('');
	$('#menu_nuage').html('');
	$('#menu_tempe').html('');
	$('#menu_aero').html('');
	$('#menu_imagerie').html('');
	$('#menu_analyse_generale').html('');
	$('#cpt_layer_menu_vent').html('0');
	$('#cpt_layer_menu_precip').html('0');
	$('#cpt_layer_menu_nuage').html('0');
	$('#cpt_layer_menu_tempe').html('0');
	$('#cpt_layer_menu_aero').html('0');
	$('#cpt_layer_menu_imagerie').html('0');
	$('#cpt_layer_menu_analyse_generale').html('0');

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
		p += "<div class='col s4 offset-s2'><span id=\"value_opacity_" + layer.id + "\" class='small_span '>Opacite</span></div><div id=\"opacity_" + layer.id + "\" class='col s5 blue'></div>";
		p += "<div class='col s1 '></div>";

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
		$('select').formSelect({ classes: 'leftplus', dropdownOptions: { coverTrigger: false } });

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
				if (t.length > 0) slider_animate.update(context.date_start_previ_arpege, context.date_min_previ_arpege, context.date_max_previ_arpege, context.step_previ_arpege, context.delay_previ);
				else slider_animate.update(context.date_start_previ_arome, context.date_min_previ_arome, context.date_max_previ_arome, context.step_previ_arome, context.delay_previ);
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
			//$('#Lance_coupe_trajet').hide();
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
				slider_animate.update(context.date_start_previ_arpege, context.date_min_previ_arpege, context.date_max_previ_arpege, context.step_previ_arpege, context.delay_previ);

			}
			else slider_animate.update(context.date_start_previ_arome, context.date_min_previ_arome, context.date_max_previ_arome, context.step_previ_arome, context.delay_previ);

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
	$('#menu_preference_language select').formSelect({ classes: 'leftplus', dropdownOptions: { coverTrigger: false } });

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

	$('#menu4 > div > label').text($_speed_animation_obs);

	$('#menu3 > div:eq( 2 ) > label:eq( 0 )').text($_speed_animation_previ);

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
	$('#menu_preference_geo select').formSelect({ classes: 'leftplus', dropdownOptions: { coverTrigger: false } });
	$('#menu_preference_repere label')[0].innerText = $_choix_repere;

	$('#menu_preference_repere select option:eq( 0 )').text($_repere_dep);
	$('#menu_preference_repere select option:eq( 1 )').text($_repere_front);
	$('#menu_preference_repere select option:eq( 2 )').text($_repere_grat);
	$('#menu_preference_repere select option:eq( 3 )').text($_repere_aero);

	$('#menu_preference_repere select option:eq( 0 )').prop('selected', true);
	$('#menu_preference_repere select option:eq( 1 )').prop('selected', false);
	$('#menu_preference_repere select option:eq( 2 )').prop('selected', false);
	$('#menu_preference_repere select option:eq( 3 )').prop('selected', false);

	$('#menu_preference_repere select').formSelect({ classes: 'leftplus', dropdownOptions: { coverTrigger: false } });
	$('#id_version').text($_version + " " + version)

	$('#label_choix_run_arome').text($_label_choix_run_arome);
	$('#label_choix_run_arpege').text($_label_choix_run_arpege);
	$('#menu2_content').html($_coupe_trajet_vide);
	$('#menu2 div:eq( 0 ) label').text($_liste_trajets_enregistres);
	$('#menu1 div:eq( 0 ) label').text($_liste_terrains_enregistres);
	$('#menu1_content').html($_coupe_terrain_vide);

	$("#menu3 > div:eq( 0 ) > label").text($_choix_date_arome);
	$("#menu3 > div:eq( 1 ) > label").text($_choix_date_arpege);

	maj_liste_trajet_enregistre();
	maj_liste_terrain_enregistre();

	$('select').formSelect({ classes: 'leftplus', dropdownOptions: { coverTrigger: false } });


	//mise a jour des contenu menu3 et menu4 prevision et observation
	//en fonction des elements presents dans le menu
	//menu3 prevision
	let show_slider_vitesse_anim = false;
	for (let i = 0; i < 2; i++) {
		let t = $("#menu3 > ul:eq( " + i + " ) > li");
		let show_slider_date_run = false;
		$.each(t, function (k, v) {
			if (v.children[1].childElementCount == 0) $(v).hide();
			else { show_slider_date_run = true; show_slider_vitesse_anim = true; }
		});

		if (show_slider_date_run == false) {
			$("#menu3 > div:eq( " + i + " )").hide();
			$("#menu3 > hr:eq( " + i + " )").hide();
		}
	}
	if (show_slider_vitesse_anim == false) $("#menu3 > div:eq( " + 2 + " )").hide();

	//menu4 observation
	show_slider_vitesse_anim = false;
	t = $("#menu4 > ul:eq( " + 0 + " ) > li");

	$.each(t, function (k, v) {
		if (v.children[1].childElementCount == 0) $(v).hide();
		else { show_slider_vitesse_anim = true; }
	});

	if (show_slider_vitesse_anim == false) {
		$("#menu4 > div:eq( " + 0 + " )").hide();
		$("#menu4> hr:eq( " + 0 + " )").hide();

	}



}
function maj_liste_trajet_enregistre(name = "") {


	$('#menu2 div:eq( 0 ) select').children('option').remove();


	let t = localStorage.getItem('liste_coupe_trajet_' + localisation.origin);

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
	$('select').formSelect({ classes: 'leftplus', dropdownOptions: { coverTrigger: false } });
}
function maj_liste_terrain_enregistre(name = "") {


	$('#menu1 div:eq( 0 ) select').children('option').remove();


	let t = localStorage.getItem('liste_coupe_terrain_' + localisation.origin);

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
	$('select').formSelect({ classes: 'leftplus', dropdownOptions: { coverTrigger: false } });
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



	slider_animate = new animate_Controller(id_slider, context.date_start_previ_arome, context.date_min_previ_arome, context.date_max_previ_arome, context.step_previ_arome, context.delay_previ, mymap);

	$('#echeance_string').html(formatdateutc(context.date_reference));
	slider_animate.slider.noUiSlider.on('update', function (values, handle) {


		if (handle != 1) return;
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
	//context.mode='prevision';
	choix_mode(context.mode);
	$('#menu5').sidenav('close');


}



function open_vertical_profil(coord) {

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
	maj_liste_trajet_enregistre();
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

	//maj_liste_trajet_enregistre($('#menu2 div:eq( 0 ) select').val());
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

	let key = $('#terrain').val().toUpperCase();
	let search = null;
	$.each(coupe_terrain_en_cours.list, function (i, v) {



		if (v.icao == key) { search = v; return false; }
	});

	if (search) {

		coords_tracage = ol.proj.fromLonLat([search.lon, search.lat], 'EPSG:3857');
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


