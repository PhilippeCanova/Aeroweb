var context = new context_Controller();
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
function init_materialize() {

    $(document).ready(function () {
        $('select').formSelect();
        $('.sidenav').sidenav({ edge: 'right' });
        $('.collapsible').collapsible();
        $('.fixed-action-btn').floatingActionButton({ direction: 'left' });
        $(".dropdown-trigger").dropdown();
        $('.modal').modal();
    });


}
function init_animate(id_slider) {

    dateSlider = document.getElementById(id_slider);
    noUiSlider.create(dateSlider, {
        // Create two timestamps to define a range.
        range: {
            min: context.date_min_previ_arome,
            max: context.date_max_previ_arome
        },
        behaviour: 'drag',
        connect:true,
        margin:60 * 60 * 1000,
        limit: 10 * 60 * 60 * 1000,
        // Steps of one week
        step: 60 * 60 * 1000,

        // Two more timestamps indicate the handle starting positions.
        start: [context.date_start_previ_arome, context.date_start_previ_arome + (60 * 60 * 1000)],

        // No decimals
        format: wNumb({
            decimals: 0
        })
    });


    var dateValues = [
        document.getElementById('date_depart'),
        document.getElementById('date_arrivee')
    ];

    dateSlider.noUiSlider.on('update', function (values, handle) {
        dateValues[handle].innerHTML = formatdateutc(new Date(+values[handle]));
       /* let diff= (+values[1]-values[0] )/ (60*60*1000);
       
        if (diff == 10)
        {
            if (handle==1) this.set([+values[1]- (60 * 60 *1000  ),null])
            if (handle==0) this.set([null,+values[0]+ (60 * 60 *1000)])
        }
        if (diff == 1)
        {
            if (handle==1) this.set([+values[1]- (60 * 60 *1000 *10),null])
            if (handle==0) this.set([null,+values[0]+ (60 * 60 *1000 *10)])
        }*/
    });



    //slider_animate = new animate_Controller(id_slider, context.date_start_previ_arome, context.date_min_previ_arome, context.date_max_previ_arome, context.step_previ_arome, context.delay_previ_arome, mymap);

    //$('#echeance_string').html(formatdateutc(context.date_reference));
	/*slider_animate.slider.noUiSlider.on('update', function (values, handle) {

		if (mymap == null) return;

		var d = new Date(+values[handle]);



		$('#echeance_string').html(formatdateutc(d));
		mymap.change_echeance(d.toISOString().replace('.000Z', 'Z'), [context.mode]);

	});
*/
}