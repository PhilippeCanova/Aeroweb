class Controller {

    constructor(target_carto,target_slider,start, min, max, step, delay ,lat,lon,zoom,origin) {
    
        this.target_carto = target_carto;
        this.target_slider = target_slider;
        this.date_ref = start;
        this.origin=origin;

        this.map = new map_Controler(this.target_carto, lon, lat, zoom, '');
        this.animate =new animate_Controller(this.target_slider,this.date_ref, min, max, step, delay ,this.map) ;

        



    }
}