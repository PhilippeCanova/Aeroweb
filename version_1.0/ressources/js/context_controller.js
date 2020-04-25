class context_Controller {

    constructor() {
        this.date_reference = null;

        this.date_start_previ_arome = null;
        this.date_min_previ_arome = null;
        this.date_max_previ_arome = null;
        this.step_previ_arome = null;
        this.delay_previ_arome = null;

        this.date_start_previ_arpege = null;
        this.date_min_previ_arpege = null;
        this.date_max_previ_arpege = null;
        this.step_previ_arpege = null;
        this.delay_previ_arpege = null;


        this.date_run_arome = null;
        this.date_run_arome_precedent = null;

        this.date_run_arpege = null;
        this.date_run_arpege_precedent = null;

        this.date_start_obs = null;
        this.date_min_obs = null;
        this.date_max_obs = null;
        this.step_obs = null;
        this.delay_obs = null;



        this.language = 'fr';
        this.mode = 'prevision';
        this.update();


    }
    update(origin = 'fr') {

        function get_H_for_arpege(now) {
            var H = 0;
            if (now.getUTCHours() > 21) { H = 21; }
            else if (now.getUTCHours() > 18) { H = 18; }
            else if (now.getUTCHours() > 15) { H = 15; }
            else if (now.getUTCHours() > 12) { H = 12; }
            else if (now.getUTCHours() > 9) { H = 9; }
            else if (now.getUTCHours() > 6) { H = 6; }
            else if (now.getUTCHours() > 3) { H = 3; }
            else if (now.getUTCHours() > 0) { H = 0; }
            return H;
        }
        var retour = { date_run_arome_change: false, date_run_arpege_change: false, date_obs_change: false };

        this.date_reference = new Date();
        this.date_reference.setUTCMinutes(0);
        this.date_reference.setUTCSeconds(0);
        this.date_reference.setUTCMilliseconds(0);

        this.step_previ_arome = 60 * 60 * 1000;
        this.delay_previ_arome = 500;

        var now = new Date();
        var x = "";
        if (now.getUTCHours() < 10) x += "0"
        x += now.getUTCHours() + "h";
        if (now.getUTCMinutes() < 10) x += "0";
        x += now.getUTCMinutes();

        if (x >= "22h45" && x <= "23h59") {
            var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 18, 0, 0, 0));
            if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
            this.date_run_arome = d;
            this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0, 0));
            if (this.date_run_arpege != null && this.date_run_arpege.toISOString() != d.toISOString()) retour.date_run_arpege_change = true;
            this.date_run_arpege = d;
            this.date_run_arpege_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0, 0));

        }
        else if (x >= "00h00" && x <= "05h45") {
            var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 18, 0, 0, 0));
            if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
            this.date_run_arome = d;
            this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 12, 0, 0, 0));
            if (this.date_run_arpege != null && this.date_run_arpege.toISOString() != d.toISOString()) retour.date_run_arpege_change = true;
            this.date_run_arpege = d;
            this.date_run_arpege_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 12, 0, 0, 0));

     }
        else if (x > "05h00" && x <= "11h05") {
            var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 3, 0, 0, 0));
            if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
            this.date_run_arome = d;
            this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 18, 0, 0, 0));
            if (this.date_run_arpege != null && this.date_run_arpege.toISOString() != d.toISOString()) retour.date_run_arpege_change = true;
            this.date_run_arpege = d;
            this.date_run_arpege_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 18, 0, 0, 0));


        }
        else if (x > "11h05" && x <= "15h45") {
            var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 6, 0, 0, 0));
            if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString() )        retour.date_run_arome_change = true;
            this.date_run_arome = d;
            this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 3, 0, 0, 0));
            if (this.date_run_arpege != null && this.date_run_arpege.toISOString() != d.toISOString()) retour.date_run_arpege_change = true;
            this.date_run_arpege = d;
            this.date_run_arpege_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 3, 0, 0, 0));

        }
        else if (x > "15h45" && x <= "22h45") {
            var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0, 0));
            if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
            this.date_run_arome = d;
            this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 6, 0, 0, 0));
            if (this.date_run_arpege != null && this.date_run_arpege.toISOString() != d.toISOString()) retour.date_run_arpege_change = true;
            this.date_run_arpege = d;
            this.date_run_arpege_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 6, 0, 0, 0));

           
        }

        this.date_start_previ_arome = Date.UTC(this.date_reference.getUTCFullYear(), this.date_reference.getUTCMonth(), this.date_reference.getUTCDate(), this.date_reference.getUTCHours(), 0, 0, 0);
        this.date_min_previ_arome = Date.UTC(this.date_run_arome.getUTCFullYear(), this.date_run_arome.getUTCMonth(), this.date_run_arome.getUTCDate(), this.date_run_arome.getUTCHours(), 0, 0, 0);
        this.date_max_previ_arome = Date.UTC(this.date_run_arome.getUTCFullYear(), this.date_run_arome.getUTCMonth(), this.date_run_arome.getUTCDate()+2,0, 0, 0, 0);

     
        
        this.date_start_previ_arpege = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), get_H_for_arpege(now), 0, 0, 0);
        this.date_min_previ_arpege = Date.UTC(this.date_run_arpege.getUTCFullYear(), this.date_run_arpege.getUTCMonth(), this.date_run_arpege.getUTCDate(), this.date_run_arpege.getUTCHours(), 0, 0, 0);
        this.date_max_previ_arpege = Date.UTC(this.date_run_arpege.getUTCFullYear(), this.date_run_arpege.getUTCMonth(), this.date_run_arpege.getUTCDate()+2, 0, 0, 0, 0);




        this.step_previ_arpege = 3 * 60 * 60 * 1000;
        this.delay_previ_arpege = 500;
        //observation
        var minute = now.getUTCMinutes();
        if (minute >= 45) minute = 45;
        else if (minute >= 30) minute = 30;
        else if (minute >= 15) minute = 15;
        else minute = 0;

        var d= Date.UTC(this.date_reference.getUTCFullYear(), this.date_reference.getUTCMonth(), this.date_reference.getUTCDate(), this.date_reference.getUTCHours(), minute, 0, 0);;
        if (this.date_start_obs!=null && this.date_start_obs!=d) retour.date_obs_change=true;
        this.date_start_obs = d;
        
        var d=Date.UTC(this.date_reference.getUTCFullYear(), this.date_reference.getUTCMonth(), this.date_reference.getUTCDate(), this.date_reference.getUTCHours() - 6, 0, 0, 0);
        if (this.date_min_obs!=null && this.date_min_obs!=d) retour.date_obs_change=true;
        this.date_min_obs = d;
        var d = Date.UTC(this.date_reference.getUTCFullYear(), this.date_reference.getUTCMonth(), this.date_reference.getUTCDate(), this.date_reference.getUTCHours(),minute, 0, 0);
        if (this.date_max_obs!=null && this.date_max_obs!=d) retour.date_obs_change=true;
        this.date_max_obs = d;
       
       
        if (origin == 'po') this.step_obs = 60 * 60 * 1000;
        else this.step_obs = 15 * 60 * 1000;
        this.delay_obs = 1000;
        this.set_language(this.language);

       
        return retour;

    }
    set_language(lg) {
        this.language = lg;
        $.localise('ressources/js/strings', { language: this.language });


    }
}
