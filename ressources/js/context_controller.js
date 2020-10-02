class context_Controller {

    constructor() {
        this.date_reference = null;

        this.date_start_previ_arome = null;
        this.date_min_previ_arome = null;
        this.date_max_previ_arome = null;
        this.step_previ = null;
        this.delay_previ = null;

        this.date_start_previ_arpege = null;
        this.date_min_previ_arpege = null;
        this.date_max_previ_arpege = null;
        this.step_previ_arpege = null;


        this.date_run_arome = null;
        this.date_run_arome_precedent = null;

        this.date_run_arpege = null;
        this.date_run_arpege_precedent = null;

        this.date_start_obs = null;
        this.date_min_obs = null;
        this.date_max_obs = null;
        this.step_obs = null;
        this.delay_obs = null;

        let href = new URL(location.href);
        let search_params = new URLSearchParams(href.search);

        if (search_params.has('language')) {
            let lg = search_params.get('language');
            if (lg == 'fr' || lg == 'en') this.language = lg;
            else this.language = 'fr';

        }
        else {
            if (localStorage.getItem('language') == null) {

                this.language = 'fr';
            }
            else {
                let lg = localStorage.getItem('language');
                if (lg == 'fr' || lg == 'en') this.language = lg;
                else this.language = 'fr';
            }

        }
        localStorage.setItem('language', this.language);


        this.mode = 'prevision';
        this.update();


    }
    init_arome(now, hhmm, retour, origin = 'fr') {

        this.step_previ_arome = 60 * 60 * 1000;

        if (localStorage.getItem('delay_previ') == null) {
            localStorage.setItem('delay_previ', 1000);
        }
        this.delay_previ = localStorage.getItem('delay_previ');

        if (origin == 'fr') {
            if (hhmm > "22h45" && hhmm <= "23h59") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 18, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0, 0));

            }
            else if (hhmm >= "00h00" && hhmm <= "05h45") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 18, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 12, 0, 0, 0));

            }
            else if (hhmm > "05h00" && hhmm <= "11h05") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 3, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 18, 0, 0, 0));

            }
            else if (hhmm > "11h05" && hhmm <= "15h45") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 6, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 3, 0, 0, 0));

            }
            else if (hhmm > "15h45" && hhmm <= "22h45") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 6, 0, 0, 0));

            }
        }
        else if ((origin == "re") || (origin == "my")) {
            if (hhmm > "20h15" && hhmm <= "23h59") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 6, 0, 0, 0));

            }
            else if (hhmm >= "00h00" && hhmm <= "02h15") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 12, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 6, 0, 0, 0));
            }
            else if (hhmm > "02h15" && hhmm <= "08h15") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 18, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 12, 0, 0, 0));
            }
            else if (hhmm > "08h15" && hhmm <= "14h15") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() , 0, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 18, 0, 0, 0));
            }
            else if (hhmm > "14h15" && hhmm <= "20h15") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 6, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
            }

        }
        else if ((origin == "po") || (origin == "nc") || (origin == "gy") || (origin == "ma") || (origin == "ga")) {
            if (hhmm > "19h45" && hhmm <= "23h59") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 6, 0, 0, 0));

            }
            else if (hhmm >= "00h00" && hhmm <= "01h45") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 12, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 6, 0, 0, 0));
            }
            else if (hhmm > "01h45" && hhmm <= "07h45") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 18, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 12, 0, 0, 0));
            }
            else if (hhmm > "07h45" && hhmm <= "13h45") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 18, 0, 0, 0));
            }
            else if (hhmm > "13h45" && hhmm <= "19h45") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 6, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
            }

        }
        else if (origin == "sp") {
            if (hhmm > "19h45" && hhmm <= "23h59") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 6, 0, 0, 0));

            }
            else if (hhmm >= "00h00" && hhmm <= "01h45") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 12, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 6, 0, 0, 0));
            }
            else if (hhmm > "01h45" && hhmm <= "07h45") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 18, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 12, 0, 0, 0));
            }
            else if (hhmm > "07h45" && hhmm <= "13h45") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 18, 0, 0, 0));
            }
            else if (hhmm > "13h45" && hhmm <= "19h45") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 6, 0, 0, 0));
                if (this.date_run_arome != null && this.date_run_arome.toISOString() != d.toISOString()) retour.date_run_arome_change = true;
                this.date_run_arome = d;
                this.date_run_arome_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
            }
        }
        this.date_start_previ_arome = Date.UTC(this.date_reference.getUTCFullYear(), this.date_reference.getUTCMonth(), this.date_reference.getUTCDate(), this.date_reference.getUTCHours(), 0, 0, 0);
        this.date_min_previ_arome = Date.UTC(this.date_run_arome.getUTCFullYear(), this.date_run_arome.getUTCMonth(), this.date_run_arome.getUTCDate(), this.date_run_arome.getUTCHours(), 0, 0, 0);
        this.date_max_previ_arome = Date.UTC(this.date_run_arome.getUTCFullYear(), this.date_run_arome.getUTCMonth(), this.date_run_arome.getUTCDate() + 2, 0, 0, 0, 0);

    }
    init_arpege(now, hhmm, retour, origin = 'fr') {
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
        this.step_previ_arpege = 3 * 60 * 60 * 1000;
        if (localStorage.getItem('delay_previ') == null) {
            localStorage.setItem('delay_previ', 1000);
        }
        this.delay_previ = localStorage.getItem('delay_previ');
        if ((origin == 'fr') || (origin == "re") || (origin == "my") || (origin == "po") || (origin == "nc") || (origin == "gy") || (origin == "ma") || (origin == "ga") || (origin == "sp")) {
            if (hhmm > "22h35" && hhmm <= "23h59") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 18, 0, 0, 0));
                if (this.date_run_arpege != null && this.date_run_arpege.toISOString() != d.toISOString()) retour.date_run_arpege_change = true;
                this.date_run_arpege = d;
                this.date_run_arpege_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0, 0));

            }
            else if (hhmm >= "00h00" && hhmm <= "03h50") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 18, 0, 0, 0));
                if (this.date_run_arpege != null && this.date_run_arpege.toISOString() != d.toISOString()) retour.date_run_arpege_change = true;
                this.date_run_arpege = d;
                this.date_run_arpege_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 12, 0, 0, 0));

            }
            else if (hhmm > "03h50" && hhmm <= "10h35") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
                if (this.date_run_arpege != null && this.date_run_arpege.toISOString() != d.toISOString()) retour.date_run_arpege_change = true;
                this.date_run_arpege = d;
                this.date_run_arpege_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 18, 0, 0, 0));


            }
            else if (hhmm > "10h35" && hhmm <= "15h25") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 6, 0, 0, 0));
                if (this.date_run_arpege != null && this.date_run_arpege.toISOString() != d.toISOString()) retour.date_run_arpege_change = true;
                this.date_run_arpege = d;
                this.date_run_arpege_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));

            }
            else if (hhmm > "15h25" && hhmm <= "22h35") {
                var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0, 0));
                if (this.date_run_arpege != null && this.date_run_arpege.toISOString() != d.toISOString()) retour.date_run_arpege_change = true;
                this.date_run_arpege = d;
                this.date_run_arpege_precedent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 6, 0, 0, 0));


            }
        }
        this.date_start_previ_arpege = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), get_H_for_arpege(now), 0, 0, 0);
        this.date_min_previ_arpege = Date.UTC(this.date_run_arpege.getUTCFullYear(), this.date_run_arpege.getUTCMonth(), this.date_run_arpege.getUTCDate(), this.date_run_arpege.getUTCHours(), 0, 0, 0);
        this.date_max_previ_arpege = Date.UTC(this.date_run_arpege.getUTCFullYear(), this.date_run_arpege.getUTCMonth(), this.date_run_arpege.getUTCDate() + 2, 0, 0, 0, 0);

    }
    init_obs(now, retour, origin) {
        //observation
        var minute = now.getUTCMinutes();
        var hour = 0;

        if (origin == 'fr') {
            if (minute >= 50) minute = 45;
            else if (minute >= 35) minute = 30;
            else if (minute >= 20) minute = 15;
            else if (minute >= 5) minute = 0;
            else { minute = 45; hour = -1; }
        }
        else {

            if (minute < 10) { minute = 0; hour = -1; }
            else { minute = 0; }


        }

        var d = Date.UTC(this.date_reference.getUTCFullYear(), this.date_reference.getUTCMonth(), this.date_reference.getUTCDate(), this.date_reference.getUTCHours() + hour, minute, 0, 0);;
        if (this.date_start_obs != null && this.date_start_obs != d) retour.date_obs_change = true;
        this.date_start_obs = d;

        var d = Date.UTC(this.date_reference.getUTCFullYear(), this.date_reference.getUTCMonth(), this.date_reference.getUTCDate(), this.date_reference.getUTCHours() + hour - 24, minute, 0, 0);
        if (this.date_min_obs != null && this.date_min_obs != d) retour.date_obs_change = true;
        this.date_min_obs = d;

        var d = Date.UTC(this.date_reference.getUTCFullYear(), this.date_reference.getUTCMonth(), this.date_reference.getUTCDate(), this.date_reference.getUTCHours() + hour, minute, 0, 0);
        if (this.date_max_obs != null && this.date_max_obs != d) retour.date_obs_change = true;
        this.date_max_obs = d;


        if (origin == 'po') this.step_obs = 60 * 60 * 1000;
        else this.step_obs = 15 * 60 * 1000;
        if (localStorage.getItem('delay_obs') == null) {
            localStorage.setItem('delay_obs', 1000);
        }

        this.delay_obs = localStorage.getItem('delay_obs');

    }
    update(origin = 'fr') {


        var retour = { date_run_arome_change: false, date_run_arpege_change: false, date_obs_change: false };

        this.date_reference = new Date();
        this.date_reference.setUTCMinutes(0);
        this.date_reference.setUTCSeconds(0);
        this.date_reference.setUTCMilliseconds(0);



        var now = new Date();
        var hhmm = "";
        if (now.getUTCHours() < 10) hhmm += "0"
        hhmm += now.getUTCHours() + "h";
        if (now.getUTCMinutes() < 10) hhmm += "0";
        hhmm += now.getUTCMinutes();

        this.init_arome(now, hhmm, retour, origin);
        this.init_arpege(now, hhmm, retour, origin);



        this.init_obs(now, retour, origin);


        this.set_language(this.language);


        return retour;

    }
    set_language(lg) {
        this.language = lg;
        $.localise('ressources/js/strings', { language: this.language });


    }
    change_delay_obs(delay) {
        this.delay_obs = delay;
        localStorage.setItem('delay_obs', this.delay_obs);
    }
    change_delay_previ(delay) {
        this.delay_previ = delay;
        localStorage.setItem('delay_previ', this.delay_previ);
    }

}
