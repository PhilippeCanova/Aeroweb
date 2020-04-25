class slider_run_Controller {
    constructor(target,start, min) {
        

        this.target =target;
        this.start= start ;//Date.UTC(date_reference.getUTCFullYear(), date_reference.getUTCMonth(), date_reference.getUTCDate(), date_reference.getUTCHours(),date_reference.getUTCMinutes(),date_reference.getUTCSeconds(),0);
        this.min= min; //Date.UTC(date_reference_precedente.getUTCFullYear(), date_reference_precedente.getUTCMonth(), date_reference_precedente.getUTCDate(), date_reference_precedente.getUTCHours(),date_reference_precedente.getUTCMinutes(),date_reference_precedente.getUTCSeconds(),0);
        this.slider_run = document.getElementById(this.target);
        noUiSlider.create(this.slider_run, {
          start: this.start,
          range: {
            'min': this.min,
            'max': this.start
          },
          snap:true,
          format: wNumb({
            decimals: 0
          })
        });
    }
    
    update(start, min ) {
      var obj={};
      if (start != this.start)
      {
        this.start = start;
        obj.start=this.start;
        obj.range = { 'min': this.min, 'max': this.start };
      }
      if (min != this.min)
      {
        this.min = min;
        obj.range = { 'min': this.min, 'max': this.start };
      }
      if (obj!={}) 
        {
          this.slider_run.noUiSlider.updateOptions(obj);
          return true;//changement
        }
        else return false;//pas de changement
    }
    delete(){

       
        $("#"+this.target).html('');
        this.slider_run.noUiSlider.destroy();


    }


}


