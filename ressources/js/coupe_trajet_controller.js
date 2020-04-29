class coupe_trajet_Controller {

    constructor(t_etapes, id_cible) {

        this.name = "En cours";
        this.etapes = t_etapes;
        this.id_cible = id_cible;
        this.list = [];
        var now = new Date();

        this.date = Date.now();
        let me = this;

        $.each(this.etapes, function (i, v) {

            me.list.push([v])
        });

        this.parametres = { hu: false, rflctvt: false, vv2: false, iso_m10: false, iso_0: false, iso_p5: false, theta: false, tke: false, iso_hcl: false, uv_alt: true };
        this.duree = 1000 * 60 * 60;
        this.fl = '100';
        this.depart= null;
        this.render();


    }
    update(t_etapes) {

      
        let me = this;
        if (t_etapes.length == me.etapes.length) {
            $.each(t_etapes, function (k, v) {

                let diff_lat = Math.abs(me.etapes[k].lat - v.lat).toFixed(6);
                let diff_lon = Math.abs(me.etapes[k].lon - v.lon).toFixed(6);
                if (+diff_lat > 0 || diff_lon > 0) {
                    me.etapes[k] = v;
                    me.list[k][0] = v;
                }
            });
        }
        else{
            me.etapes.splice(0,me.etapes.length);
            me.list.splice(0,me.list.length);
            $.each(t_etapes, function (k, v) {

                
                    me.etapes[k] = v;
                    me.list[k]=[v] ;
                
            });



        }
        this.render();
       
    }
    load_from_storage(index) {
        if (localStorage.getItem('liste_coupe_trajet') == null) {

            return;
        }
        else {

            var t = jQuery.parseJSON(localStorage.getItem('liste_coupe_trajet'))[index];

            this.name = t.name;
            this.etapes = t.etapes;
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
        if (localStorage.getItem('liste_coupe_trajet') == null) {

            var t = [this];

        }
        else {

          

            var t = jQuery.parseJSON(localStorage.getItem('liste_coupe_trajet'));
            


            let i = 0;

            $.each(t, function (k, v) {
                i = k;
                
                if (v.name == name) {  return false; }
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



        localStorage.setItem('liste_coupe_trajet', JSON.stringify(t))

    }
    remove_etape(key) {
        this.etapes.splice(key, 1);
        this.list.splice(key, 1);
        this.render();

    }
    add_etape(key) {




        this.etapes.splice(key, 0, this.etapes[key]);
        this.list.splice(key, 0, this.list[key]);

        this.render();

    }
    render() {
      
        var html = '';
        var me = this;
        if (this.etapes != null && this.etapes.length >= 2) {
            var me = this;


            html += "<ul id ='collapsible_trajet' class='collapsible expandable'>";
            html += "<li class='active'>";
            html += "<div class='collapsible-header'><i class='material-icons'>location_on</i><span>" + $_trajet + "</span></div>";
            html += "<div id='liste_etape' class='collapsible-body col s12'>";



            html += "<div class='row'>";
            $.each(this.etapes, function (key, c) {




                html += "<div class='input-field col s10'>";
                html += "<i class='material-icons prefix'>edit_location</i>";
                html += "<input  index='" + key + "'   type='text' id='etape" + key + "' class='autocomplete etape'>";
                html += "<label for='etape" + key + "'>";
                me.list[key] = [c];
                if (key == 0) html += $_depart;
                else if (key == me.etapes.length - 1) html += $_arrivee;
                else html += $_etape;
                html += "</label>";
                html += "</div>";
                if (key >= 1 && key <= me.etapes.length - 2) {
                    html += "<div class ='col s2 '>";
                    html += "<a href='#!' onclick='remove_etape(" + key + ");' class='waves-effect waves-light'><i class='material-icons Small'>remove</i></a>";
                    if (me.etapes.length < 5) html += "<br><a href='#!' onclick='add_etape(" + key + ");' class='waves-effect waves-light'><i class='material-icons Small'>add</i></a>";
                    html += "</div>";
                }
                if (key == 1 && me.etapes.length == 2) {
                    html += "<div class ='col s2 '>";
                    html += "<br><a href='#!' onclick='add_etape(" + key + ");' class='waves-effect waves-light'><i class='material-icons Small'>add</i></a>";
                    html += "</div>";
                }


            });

            html += "</div>";


            html += "</div>";
            html += "</li>";

            html += "<li>";
            html += "<div class='collapsible-header'><i class='material-icons'>settings</i><span>" + $_parametres + "</span></div>";
            html += "<div class='collapsible-body col s12'>";



            html += "<div class='row ' style='margin-left:0.25rem;margin-right:0.25rem;'>";

            html += "<div class='input-field col s12'>";
            html += "<select multiple onchange=\"$.each(coupe_trajet_en_cours.parametres,function(k,v){coupe_trajet_en_cours.parametres[k]=false;});$.each($(this).formSelect('getSelectedValues'),function(k,v){coupe_trajet_en_cours.parametres[v]=true;});coupe_trajet_en_cours.parametres['uv_alt']=true;\">";
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
            html += "<option value='iso_p5'";
            this.parametres.iso_p5 == true ? html += 'selected' : html += '';
            html += ">" + $_iso_p5 + "</option>";
            html += "<option value='theta'";
            this.parametres.theta == true ? html += 'selected' : html += '';
            html += ">" + $_theta + "</option>";
            html += "<option value='tke'";
            this.parametres.tke == true ? html += 'selected' : html += '';
            html += ">" + $_tke + "</option>";
            html += "<option value='iso_hcl'";
            this.parametres.iso_hcl == true ? html += 'selected' : html += '';
            html += ">" + $_hcl + "</option>";
            html += "<option value='uv_alt' ";
            this.parametres.uv_alt == true ? html += 'selected disabled' : html += 'disabled';
            html += ">" + $_uv_alt + "</option>";
            html += "</select>";

            html += "<label>" + $_choix_parametre_trajet + "</label>";
            html += "</div>";
            html += "<label class='col s6 center' style='line-height:1px'>" + $_depart + "</label>";
            html += "<label class='col s6 center' style='line-height:1px'>" + $_arrivee + "</label>";
            html += "<label id='date_depart_trajet' class='col s6 center'>Date de depart</label>";
            html += "<label id='date_arrivee_trajet' class='col s6 center'>Date arrivee</label>";

            html += "<div id='slider_echeance_trajet' class='col s12'></div>";


            html += "<div class='input-field col s12'>";
            html += "<select id='niveau_de_sol_trajet' onchange=\"coupe_trajet_en_cours.fl=$(this).val();\">";
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


            html += "</div>";
            html += "</li>";
            html += "</ul>";

            html += "<div class='row mynav'>";
            html += "<div class='col s6 center'>";
            html += " <a href='#!' onclick=\"if (Valider_trajet_oaci()) $('#vue_trajet').modal('open');\"><i class='mybutton Small material-icons'>check</i></a>";
            html += "</div>";
            html += "<div class='col s6 center'>";
            html += "<a class='modal-trigger' href='#save_trajet' ><i class='mybutton Small material-icons'>save</i></a>";
            html += "</div>";

            html += "</div>";


            $('#' + this.id_cible).html(html)


            $('#collapsible_trajet').collapsible();
            /*
                        var elem = document.querySelector('#collapsible_trajet');
                        var instance = M.Collapsible.init(elem, {
                            accordion: false
                        });*/

            $('select').formSelect();
            M.updateTextFields();

            var dateSlider = document.getElementById('slider_echeance_trajet');
            noUiSlider.create(dateSlider, {
                range: {
                    min: context.date_min_previ_arome,
                    max: context.date_max_previ_arome
                },
                behaviour: 'drag',
                connect: true,
                margin: 60 * 60 * 1000,
                limit: 10 * 60 * 60 * 1000,
                step: 60 * 60 * 1000,
                start: [context.date_start_previ_arome, context.date_start_previ_arome + me.duree],
                format: wNumb({
                    decimals: 0
                })
            });
            var dateValues = [
                document.getElementById('date_depart_trajet'),
                document.getElementById('date_arrivee_trajet')
            ];
            dateSlider.noUiSlider.on('update', function (values, handle) {
                dateValues[handle].innerHTML = formatdateutcshort(new Date(+values[handle]));
                me.duree = +values[1] - values[0]
                me.depart = values[0];
            });

            $.each(this.etapes, function (key, c) {
                //var data = { "POINT": null };
                let data = {};
                let init = "POINT";
                $.each(me.list[key], function (i1, v1) {



                    data[v1.icao] = null;
                    if (i1 == 0) { init = v1.icao; }


                })
                $('#etape' + key).autocomplete({
                    data: data,
                    minLength: 1
                });

                $('#etape' + key).val(init);


                $('#etape' + key).on('change', function () {

                  
                    let oaci = $('#etape' + key).val().toUpperCase();
                    let search = false;
                    $.each(me.list[key], function (i, v) {
                        if (v.icao == oaci) { search = true; }
                    });

                    if (search == false) {
                        $('#menu2 div div i.prefix:eq( ' + key + ' )').addClass('red-text');
                    }
                    else {
                        $('#menu2 div div i.prefix:eq( ' + key + ' )').removeClass('red-text');
                        Valider_trajet_oaci();
                    }
                });
                $('#etape' + key).on('focus', function () {
                    $('#menu2 div div i.prefix:eq( ' + key + ' )').removeClass('red-text')
                });
                $('#etape' + key).on('keyup', function () {
                    let key = $(this).attr('index');
                    let oaci = $('#etape' + key).val().toUpperCase();
                    //$('#etape' + key).css('background-color', 'white');
                    if (oaci.length >= 2) {


                        $.getJSON("https://int-aviation.meteo.fr/get_oaci_json.php?oaci=" + oaci, function (data) {
                            var instance = M.Autocomplete.getInstance(document.getElementById("etape" + key));

                            data.unshift(me.list[key][0])
                            me.list[key] = data;


                            let mydata = {};
                            $.each(data, function (i, v) {
                                mydata[v.icao] = null;
                            });

                            instance.updateData(mydata);
                            instance.open();
                        });
                    }
                });






            });
            M.updateTextFields();







        }




        //$('select').formSelect();







    }
    remove(callback = null) {
        this.depart = null;
        this.etapes = [];
        this.arrivee = null;
        if (callback) callback.call(this)
    }
}