class map_Controler {

	constructor(target, h, lon, lat, zoom, extent, mouse_position) {

		this.etat = "0";
		this.target = target;
		this.nb_point_max = 5;
		var mousePositionControl = new ol.control.MousePosition({
			coordinateFormat: ol.coordinate.createStringXY(4),
			projection: 'EPSG:4326',
			// commentmethodName the following two lines to have the mouse position
			// be placed within the map.
			//className: 'custom-mouse-position',
			//target: document.getElementById(mouse_position),
			undefinedHTML: '&nbsp;'
		});

		/* ************************************************************************
		**      Traçage des coupe terrain
		*/
		this.sourcePoint = new ol.source.Vector({ wrapX: false });


		this.layerPoint = new ol.layer.Vector({
			source: this.sourcePoint,
			zIndex: 200,
			style: new ol.style.Style({
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				}),
				stroke: new ol.style.Stroke({
					color: 'red',
					width: 2
				}),
				image: new ol.style.Circle({
					radius: 7,
					fill: new ol.style.Fill({
						color: '#ffcc33'
					})
				})
			})
		});

		this.drawPoint = new ol.interaction.Draw({
			source: this.sourcePoint,
			type: 'Point',
		});

		this.modifyPoint = new ol.interaction.Modify({ source: this.sourcePoint });

		this.sourcePoint.on('addfeature', function (evt) {
			let features = mymap.sourcePoint.getFeatures();
			if (features.length > 1) {
				mymap.sourcePoint.removeFeature(features[0])
			}
			open_vertical_profil(evt.feature.getGeometry().getCoordinates());
		});
		this.modifyPoint.on('modifyend', function (evt) {
			let features = mymap.sourcePoint.getFeatures();
			open_vertical_profil(features[0].getGeometry().getCoordinates());
		});


		/* ************************************************************************
		**      Traçage des coupe trajet
		*/
		this.sourceLine = new ol.source.Vector({ wrapX: false });
		this.layerLine = new ol.layer.Vector({
			source: this.sourceLine,
			zIndex: 200,

			style: new ol.style.Style({
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				}),
				stroke: new ol.style.Stroke({
					color: 'red',
					width: 2
				}),
				image: new ol.style.Circle({
					radius: 7,
					fill: new ol.style.Fill({
						color: '#ffcc33'
					})
				})
			})
		});
		this.drawLine = new ol.interaction.Draw({
			source: this.sourceLine,
			type: 'LineString',
			maxPoints: this.nb_point_max

		});
		let me = this;
		this.modifyLine = new ol.interaction.Modify({
			source: this.sourceLine,

			insertVertexCondition: function () {
				return (me.sourceLine.getFeatures()[0].getGeometry().getCoordinates().length < me.nb_point_max);


			}
		});

		this.drawLine.on('drawstart', function (evt) {
			let features = mymap.sourceLine.getFeatures();
			if (features.length > 0) {
				mymap.sourceLine.removeFeature(features[0])
			}
			start_track_profil();
		});

		this.sourceLine.on('addfeature', function (evt) {
			open_track_profil(evt.feature.getGeometry().getCoordinates());
		});

		this.modifyLine.on('modifyend', function (evt) {
			let features = mymap.sourceLine.getFeatures();
			open_track_profil(features[0].getGeometry().getCoordinates());
		});

		/* ************************************************************************
		**      Création de la map
		*/


		$('#' + this.target).height(h);
		this.mymap = new ol.Map({

			layers: [

			],
			target: target,
			controls: [mousePositionControl],
			view: new ol.View({
				projection: 'EPSG:3857',//'EPSG:4326',
				center: ol.proj.fromLonLat([lon, lat]),
				zoom: zoom,
				minZoom: 1,
				maxZoom: 9,
				extent: ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857')

			})
		});


		/*this.osm_layer = new ol.layer.Tile({
			source: new ol.source.OSM()
		});*/

		//https://aviation.meteo.fr/dmap-carto/aeroweb-vfr/level8/y91/x129.png
		this.fond = new ol.layer.Tile({
			source: new ol.source.XYZ({
				url: 'https://aviation.meteo.fr/dmap-carto/aeroweb-vfr/level{z}/y{y}/x{x}.png'

			})
		})
		this.departement = new ol.layer.Tile({
			source: new ol.source.XYZ({
				url: 'https://aviation.meteo.fr/wms/tile/vector.departement/{z}/{y}/{x}.png'

			}),
			opacity: 1,
			tag: 'repere',
			id: 'departement',
			visible: true,
			zIndex: 100
		})
		this.country = new ol.layer.Tile({
			source: new ol.source.XYZ({
				url: 'https://aviation.meteo.fr/wms/tile/vector.country/{z}/{y}/{x}.png'

			}),
			opacity: 1,
			tag: 'repere',
			id: 'country',
			visible: false,
			zIndex: 101
		})
		this.graticule = new ol.layer.Tile({
			source: new ol.source.XYZ({
				url: 'https://aviation.meteo.fr/wms/tile/vector.graticule/{z}/{y}/{x}.png'

			}),
			opacity: 1,
			tag: 'repere',
			id: 'graticule',
			visible: false,
			zIndex: 102
		})
		this.crna_airports = new ol.layer.Tile({
			source: new ol.source.XYZ({
				url: 'https://aviation.meteo.fr/wms/tile/vector.crna_airports/{z}/{y}/{x}.png'

			}),
			opacity: 1,
			tag: 'repere',
			id: 'airport',
			visible: false,
			zIndex: 103
		})
		/*
		var url="http://aviation.meteo.fr/wms/vertical-section/path/48.09275716032735/-3.5375976562499996/46.9502622421856/0.7910156250000014/1588075200/1/100/hu,uv_alt";
		var extent = [5, 40, -5, 40+(10/1.88)];
		var projection = new ol.proj.Projection({
			code: 'xkcd-image',
			units: 'pixels',
			extent: ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
		});

		this.coupe_trajet =new ol.layer.Image({
			source: new ol.source.ImageStatic({
				url: url,
				//projection: projection,
				crossOrigin: null,
        		imageExtent: ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
			}),
			opacity: 1,
			tag: 'coupe',
			id: 'couche_1',
			visible: true,
			zIndex: 200
		})
*/
		//this.mymap.addLayer(this.osm_layer);
		
		this.mymap.addLayer(this.fond);
		this.mymap.addLayer(this.layerPoint);
		this.mymap.addLayer(this.layerLine);
		this.mymap.addLayer(this.departement);
		this.mymap.addLayer(this.country);
		this.mymap.addLayer(this.graticule);
		this.mymap.addLayer(this.crna_airports);
		//this.mymap.addLayer(this.coupe_trajet);
		var x = this.mymap
		this.mymap.on('rendercomplete', function (evt) {
			x.etat = '1';


		});

	}
	change_run(run, type = ['prevision'], modele) {
		var layers = this.mymap.getLayers();

		layers.forEach(function (element, index, array) {

			if (type.indexOf(element.get('tag')) >= 0 && element.get('modele') == modele)
				element.getSource().updateParams({ 'RUN': run });
		});


	}

	change_echeance(ech, type = ['prevision', 'observation']) {
		var layers = this.mymap.getLayers();

		layers.forEach(function (element, index, array) {

			if (type.indexOf(element.get('tag')) >= 0)
				element.getSource().updateParams({ 'TIME': ech });
		});


	}
	change_opacity(tag, id, value) {
		var layers = this.mymap.getLayers();

		layers.forEach(function (element, index, array) {

			if (element.get('tag') == tag && element.get('id') == id) {
				element.setOpacity(value);
				element.set('my_opacity', value, true);
			}
		});
	}
	add_mylayer(layer) {


		var source = new ol.source.ImageWMS(layer.source);
		var params = {
			source: source,
			opacity: layer.opacity,
			tag: layer.tag,
			id: layer.id,
			my_opacity: layer.opacity,
			zIndex: layer.zIndex,
			visible: layer.visible
		}
		if (layer.modele) params.modele = layer.modele;
		var mylayer = new ol.layer.Image(params)

		this.mymap.addLayer(mylayer);


		var x = this.mymap
		source.on('imageloadstart', function () {
			x.etat = '0';

		});
		source.on('imageloadend', function () {

			mylayer.setOpacity(mylayer.get('my_opacity'));

		});
		source.on('imageloaderror', function () {
			x.etat = '1';
			mylayer.setOpacity(0);
		});
	}

	setDrawMode(typeDraw = null) {
		if (typeDraw == null) {
			this.mymap.removeInteraction(this.drawLine);
			this.mymap.removeInteraction(this.modifyLine);
			this.mymap.removeInteraction(this.drawPoint);
			this.mymap.removeInteraction(this.modifyPoint);
			this.layerLine.setVisible(false);
			this.layerPoint.setVisible(false);
		} else if (typeDraw == "LineString") {
			this.mymap.addInteraction(this.drawLine);
			this.mymap.addInteraction(this.modifyLine);
			this.mymap.removeInteraction(this.drawPoint);
			this.mymap.removeInteraction(this.modifyPoint);
			this.layerLine.setVisible(true);
			this.layerPoint.setVisible(false);

		} else if (typeDraw == "Point") {
			this.mymap.removeInteraction(this.drawLine);
			this.mymap.removeInteraction(this.modifyLine);
			this.mymap.addInteraction(this.drawPoint);
			this.mymap.addInteraction(this.modifyPoint);
			this.layerLine.setVisible(false);
			this.layerPoint.setVisible(true);

		}


	}

	delete() {

		var layerArray, len, layer;
		layerArray = this.mymap.getLayers().getArray(),
			len = layerArray.length;
		while (len > 0) {
			layer = layerArray[len - 1];
			this.mymap.removeLayer(layer);
			len = layerArray.length;
		}


		$('#' + this.target).html('');
		this.mymap = null;

	}
	set_layer_visible(id) {
		var layers = this.mymap.getLayers();
		layers.forEach(function (element, index, array) {
			if (element.get('id') == id) {
				element.setVisible(true);

			}
		});
	}
	set_layer_invisible(id) {
		var layers = this.mymap.getLayers();
		layers.forEach(function (element, index, array) {
			if (element.get('id') == id) {
				element.setVisible(false);

			}

		});
	}
	set_all_layer_invisible(type = ['prevision', 'observation']) {
		var layers = this.mymap.getLayers();
		layers.forEach(function (element, index, array) {
			if (type.indexOf(element.get('tag')) >= 0) {
				element.setVisible(false);

			}

		});
	}
	set_all_layer_visible(type = ['prevision', 'observation']) {
		var layers = this.mymap.getLayers();
		layers.forEach(function (element, index, array) {
			if (type.indexOf(element.get('tag')) >= 0) {
				element.setVisible(true);

			}

		});
	}
}
