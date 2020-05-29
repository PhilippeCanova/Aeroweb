class coupe_terrain_Controller {

    constructor(terrain, id_cible) {

        this.name = "En cours";
        this.terrain = terrain;
        this.id_cible = id_cible;
        this.list = [terrain];
        this.date = Date.now();

        // this.parametres = { axes: true, relief: true, t: true, hu: true, rflctvt: false, uv_alt: true };
        this.parametres = { axes: true, relief: true, t: true, hu: false, rflctvt: false, vv2: false, iso_m10: false, iso_0: false, iso_p5: false, theta: false, tke: false, hcl: false, uv_alt: true };



        this.duree = 1000 * 60 * 60 * 6;
        this.fl = '100';
        this.depart = null;
        this.render();
    }
    update(terrain) {

        this.terrain = terrain;
        this.list = [terrain];

        this.render();

    }
    load_from_storage(index) {
        if (localStorage.getItem('liste_coupe_terrain_' + localisation.origin) == null) {

            return;
        }
        else {

            var t = jQuery.parseJSON(localStorage.getItem('liste_coupe_terrain_' + localisation.origin))[index];

            this.name = t.name;
            this.terrain = t.terrain;
            this.id_cible = t.id_cible;
            this.list = t.list;
            this.parametres = t.parametres;
            this.duree = t.duree;
            this.fl = t.fl;

            this.render();
        }

    }
    save(name = "") {


        this.name = name;
        this.date = Date.now();
        if (localStorage.getItem('liste_coupe_terrain_' + localisation.origin) == null) {

            var t = [this];

        }
        else {



            var t = jQuery.parseJSON(localStorage.getItem('liste_coupe_terrain_' + localisation.origin));



            let i = 0;

            $.each(t, function (k, v) {
                i = k;

                if (v.name == name) { return false; }
                i++;
            });

            t.splice(i, 1, this);
        }

        if (t.length > 5) {

            let date_min = Date.now();
            let i = null;
            $.each(t, function (k, v) {

                if (v.date <= date_min) {
                    date_min = v.date;

                    i = k;
                }

            });

            if (i != null) t.splice(i, 1);

        }



        localStorage.setItem('liste_coupe_terrain_' + localisation.origin, JSON.stringify(t))

    }

    render() {


        var html = '';
        var me = this;
        html += "<div class='row ' >";

        html += "<div class='input-field col s10'>";
        html += "<i class='material-icons prefix'>edit_location</i>";
        html += "<input  type='text' id='terrain' class='autocomplete etape' style='border:0px'>";
        html += "<label for='terrain'>";
        this.list = [this.terrain];
        html += $_terrain;
        html += "</label>";
        html += "</div>";

        html += "</div>";





        html += "<div class='row ' style='margin-left:0.25rem;margin-right:0.25rem;'>";

        html += "<div class='input-field col s12'>";
        html += "<select multiple onchange=\"$.each(coupe_terrain_en_cours.parametres,function(k,v){coupe_terrain_en_cours.parametres[k]=false;});$.each($(this).formSelect('getSelectedValues'),function(k,v){coupe_terrain_en_cours.parametres[v]=true;});coupe_terrain_en_cours.parametres['uv_alt']=true;coupe_terrain_en_cours.parametres['axes']=true;coupe_terrain_en_cours.parametres['relief']=true;\">";

        if (localisation.origin == 'fr') {
            html += "<option value='t' ";
            this.parametres.t == true ? html += 'selected' : html += '';
            html += ">" + $_t + "</option>";
        }

        html += "<option value='hu' ";
        this.parametres.hu == true ? html += 'selected' : html += '';
        html += ">" + $_hu + "</option>";

        html += "<option value='rflctvt'";
        this.parametres.rflctvt == true ? html += 'selected' : html += '';
        html += ">" + $_rflctvt + "</option>";

       

        html += "<option value='vv2'";
        this.parametres.vv2 == true ? html += 'selected' : html += '';
        html += ">" + $_vv2 + "</option>";

        html += "<option value='iso_m10'";
        this.parametres.iso_m10 == true ? html += 'selected' : html += '';
        html += ">" + $_iso_m10 + "</option>";

        html += "<option value='iso_0'";
        this.parametres.iso_0 == true ? html += 'selected' : html += '';
        html += ">" + $_iso_0 + "</option>";

        if (localisation.origin == 'fr') {
            html += "<option value='iso_p5'";
            this.parametres.iso_p5 == true ? html += 'selected' : html += '';
            html += ">" + $_iso_p5 + "</option>";

            html += "<option value='theta'";
            this.parametres.theta == true ? html += 'selected' : html += '';
            html += ">" + $_theta + "</option>";
        }
        html += "<option value='tke'";
        this.parametres.tke == true ? html += 'selected' : html += '';
        html += ">" + $_tke + "</option>";

        html += "<option value='hcl'";
        this.parametres.hcl == true ? html += 'selected' : html += '';
        html += ">" + $_hcl + "</option>";

        html += "<option value='uv_alt' ";
        this.parametres.uv_alt == true ? html += 'selected disabled' : html += 'disabled';
        html += ">" + $_uv_alt + "</option>";


        html += "</select>";

        html += "<label>" + $_choix_parametre_terrain + "</label>";
        html += "</div>";

        html += "<label class='col s6 center' style=''>" + $_du + "</label>";
        html += "<label class='col s6 center' style=''>" + $_au + "</label>";
        html += "<label id='date_depart_terrain' style='line-height:40px;' class='col s6 center'>Date de depart</label>";
        html += "<label id='date_arrivee_terrain' style='line-height:40px;' class='col s6 center'>Date arrivee</label>";

        html += "<div id='slider_echeance_terrain' class='col s12'></div>";


        html += "<div class='input-field col s12' style='margin-top:36px;'>";
        html += "<select onchange=\"coupe_terrain_en_cours.fl=$(this).val();\">";
        html += "<option value='050' ";
        this.fl == '050' ? html += 'selected' : html += '';
        html += ">FL050</option>";
        html += "<option value='100' ";
        this.fl == '100' ? html += 'selected' : html += '';
        html += ">FL100</option>";
        html += "<option value='200' ";
        this.fl == '200' ? html += 'selected' : html += '';
        html += ">FL200</option>";
        html += "<option value='300' ";
        this.fl == '300' ? html += 'selected' : html += '';
        html += ">FL300</option>";
        html += "<option value='400' ";
        this.fl == '400' ? html += 'selected' : html += '';
        html += ">FL400</option>";

        html += "</select>";
        html += "<label>" + $_niveau_de_vol + "</label>";
        html += "</div>";
        html += "</div>";




        html += "<div class='row mynav'>";
        html += "<div class='col s6 center'>";
        html += " <a href='#!' onclick=\"if (Valider_terrain_oaci()) $('#vue_terrain').modal('open');\"><i class='mybutton Small material-icons'>check</i></a>";
        html += "</div>";
        html += "<div class='col s6 center'>";
        html += "<a class='modal-trigger' href='#save_terrain' ><i class='mybutton Small material-icons'>save</i></a>";
        html += "</div>";

        html += "</div>";

        $('#' + this.id_cible).html(html)





        $('select').formSelect({ classes: 'leftplus', dropdownOptions: { coverTrigger: false } });

        M.updateTextFields();

        var dateSlider = document.getElementById('slider_echeance_terrain');
        noUiSlider.create(dateSlider, {
            range: {
                min: context.date_min_previ_arome,
                max: context.date_max_previ_arome
            },
            behaviour: 'drag',
            connect: true,
            margin: 60 * 60 * 1000,
            limit: 24 * 60 * 60 * 1000,
            step: 60 * 60 * 1000,
            start: [context.date_start_previ_arome, context.date_start_previ_arome + me.duree],
            format: wNumb({
                decimals: 0
            })
        });

        var dateValues = [
            document.getElementById('date_depart_terrain'),
            document.getElementById('date_arrivee_terrain')
        ];

        dateSlider.noUiSlider.on('update', function (values, handle) {
            dateValues[handle].innerHTML = formatdateutcshort(new Date(+values[handle]));
            me.duree = +values[1] - values[0]
            me.depart = values[0];
        });


        console.log(this);

        let data = { icao: me.terrain.icao, lon: me.terrain.lon, lat: me.terrain.lat, coord: 'coord' };

        $('#terrain').autocomplete({
            data: data,
            minLength: 1
        });

        $('#terrain').val(data.icao);


        $('#terrain').on('change', function () {


            let oaci = $('#terrain').val().toUpperCase();
            let search = false;
            $.each(me.list, function (i, v) {
                if (v.icao == oaci) { search = true; }
            });

            if (search == false) {
                $('#menu1 main div div i.prefix:eq( ' + 0 + ' )').addClass('red-text');
            }
            else {
                $('#menu1 main div div i.prefix:eq( ' + 0 + ' )').removeClass('red-text');
                Valider_terrain_oaci();
            }
        });
        $('#terrain').on('focus', function () {
            $('#menu1 main div div i.prefix:eq( ' + 0 + ' )').removeClass('red-text')
        });
        $('#terrain').on('keyup', function () {

            let oaci = $('#terrain').val().toUpperCase();
            //$('#etape' + key).css('background-color', 'white');
            if (oaci.length >= 2) {


                $.getJSON("https://int-aviation.meteo.fr/get_oaci_json.php?oaci=" + oaci, function (data) {
                    var instance = M.Autocomplete.getInstance(document.getElementById("terrain"));

                    data.unshift(me.list[0])
                    me.list = data;


                    let mydata = {};
                    $.each(data, function (i, v) {
                        mydata[v.icao] = null;
                    });

                    instance.updateData(mydata);
                    instance.open();
                });
            }

        });






        M.updateTextFields();











        //$('select').formSelect();







    }
    remove(callback = null) {
        this.depart = null;
        this.terrain = null;
        if (callback) callback.call(this);
    }
}