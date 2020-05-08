
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
			start: this.start,
			step: this.step,

			range: {
				min: this.min,
				max: this.max
			},
			format: wNumb({
				decimals: 0
			})
		});

	


	}

	
	update(start, min, max, step, delay) {

		var obj = {};

		
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
			this.delay = delay;
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
	getvalue() {
		return this.slider.noUiSlider.get();
	}
	setvalue(value) {
		this.slider.noUiSlider.set(value);

	}
	next() {

		if (this.map_controller.mymap.etat == '1') {
			var v = this.getvalue();
			if (v >= this.start) v = +v + this.step;
			else v = +v + this.step;
			if (v > this.max) v = this.min;
			this.setvalue(v);
		}
	}
	prev() {
		if (this.map_controller.mymap.etat == '1') {
			var v = this.getvalue();
			if (v > this.start) v = +v - this.step;
			else v = +v - this.step;
			if (v < this.min) v = this.max;
			this.setvalue(v);
		}
	}
	end() {

		this.setvalue(this.max);
	}
	first() {
		this.setvalue(this.min);
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
