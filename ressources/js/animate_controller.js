
class animate_Controller {


	constructor(target, start, min, max, step, delay, map_controller) {


		
		this.delay = delay; //animation delay
		this.timer = null; //timer animation
		this.start = start;
		this.min = min;
		this.max = max;
		this.step = step;
		this.target = target;
		this.slider = document.getElementById(target);
		this.map_controller = map_controller;
		noUiSlider.create(this.slider, {
			

			range: {
				min: this.min,
				max: this.max
			},
			start: [+this.min ,+this.start , +this.max],
			tooltips: [{to: function(v){return formatdateutc(new Date(v));}},false,{to: function(v){return formatdateutc(new Date(v));}}],
			step: this.step,
			connect: true,
			animate:false,
			format: wNumb({
				decimals: 0
			})
		});

		var touch_area = this.slider.querySelectorAll('.noUi-touch-area');
		if (touch_area[0]) touch_area[0].classList.add('bg_grey');
		if (touch_area[2]) touch_area[2].classList.add('bg_grey');


	}

	
	update(start, min, max, step, delay) {

		var obj = {};
		let mini = this.getvalue(0);
		let maxi = this.getvalue(2);
		let old_min=this.min;
		let old_max=this.max;
		if (min != this.min) {
			
			this.min = min;
			
			obj.range = { 'min': this.min, 'max': this.max };
		}
		if (max != this.max) {
			
			this.max = max;
			
			
			obj.range = { 'min': this.min, 'max': this.max };
		}
		if (start < this.min ||start >this.max) {
			this.start = start;
			obj.start = this.start;
		}
		if (step != this.step) {
			this.step = step;
			obj.step = this.step;
		}
		if (delay != this.delay) {
			this.delay = delay;

		}

		if (obj != {}) {

			this.slider.noUiSlider.updateOptions(obj);
			if (delay != this.delay) this.delay = delay;
			if (mini == old_min) this.setvalue(this.min,0);
			if (maxi == old_max) this.setvalue(this.max,2);

			return true;//changement
		}
		else {
			if (delay != this.delay) {
				this.delay = delay;
				return true; //changement

			}
			else return false;//aucun changement
		}
	}
	delete() {
		this.stop();
		$("#" + this.target).html('');
		this.slider.noUiSlider.destroy();



	}
	getvalue(index=1) {
		if(index == -1) return this.slider.noUiSlider.get();
		return this.slider.noUiSlider.get()[index];
	}
	setvalue(value,index=1) {

		var t= this.getvalue(-1);
		t[index]=value;
		this.slider.noUiSlider.set(t);

	}
	next() {

		
		if (this.map_controller.mymap.etat == '1') {
			
			var v = this.getvalue(1);
			console.log(v);
			v = +v + this.step;
			if (v > this.getvalue(2)) v = this.getvalue(0);
			this.setvalue(v);
		}
	}
	prev() {
		if (this.map_controller.mymap.etat == '1') {
			var v = this.getvalue(1);
			
			v = +v - this.step;
			if (v < this.getvalue(0)) v = this.getvalue(2);
			this.setvalue(v);
		}
	}
	end() {
		this.setvalue(this.getvalue(2));
	}
	first() {
		this.setvalue(this.getvalue(0));
	}
	play() {
		this.next();
		var x = this;
		this.timer = setInterval(function () { x.next(); }, this.delay);
		return 'pause';
	}
	stop() {
		if (this.timer) { clearInterval(this.timer); this.timer = null; }
		return 'play_arrow';
	}
	play_stop() {

		if (this.timer) {
			return this.stop();
		}
		else {
			//this.slider.setAttribute('disabled',true);
			return this.play();
		}

	}
	change_delay(delay){
		this.delay=delay;
		if (this.timer) {this.stop();
			
			this.play();
		}
		
	}
	
}
