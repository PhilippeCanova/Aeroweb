class coupe_trajet_Controller {

    constructor(t_etapes, id_cible) {

        this.etapes = t_etapes;
        this.id_cible = id_cible;
        this.list = [];
        let me=this;
        $.each(this.etapes, function(i,v){
                
                me.list.push([v])    
        });
        
        this.render();



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
                    html += "<a href='#!' onclick='remove_etape(" + key + ");' class='waves-effect waves-light'><i class='material-icons small'>remove</i></a>";
                    if (me.etapes.length < 5) html += "<br><a href='#!' onclick='add_etape(" + key + ");' class='waves-effect waves-light'><i class='material-icons small'>add</i></a>";
                    html += "</div>";
                }
                if (key == 1 && me.etapes.length == 2) {
                    html += "<div class ='col s2 '>";
                    html += "<br><a href='#!' onclick='add_etape(" + key + ");' class='waves-effect waves-light'><i class='material-icons small'>add</i></a>";
                    html += "</div>";
                }
              

            });

            html += "</div>";

            html += "<a href='#!' onclick=\"Valider_trajet_oaci();\" class='waves-effect waves-light btn'>"+$_valider_le_trajet+"</a>";

        }
        $('#' + this.id_cible).html(html)
       
        $.each(this.etapes, function (key, c) {
            //var data = { "POINT": null };
            let data={};
            let init="POINT";
            $.each(me.list[key],function(i1,v1){
              
               
                   
                    data[v1.icao]=null;
                    if (i1==0) {init=v1.icao;}
               

            })    
            $('#etape' + key).autocomplete({
                data: data,
                minLength: 1
            });

            $('#etape' + key).val(init);

            M.updateTextFields();
            $('#etape' + key).on('change', function () {
                let key= $(this).attr('index');
                let oaci = $('#etape' + key).val().toUpperCase();
                let search =false;
                $.each(me.list[key],function(i,v){
                    if (v.icao==oaci) {search=true;}
                });
                search==false ?$('#menu2 div div i:eq( ' + key + ' )').addClass('red-text'): $('#menu2 div div i:eq( ' + key + ' )').removeClass('red-text');
               
            });
            $('#etape' + key).on('focus', function () {
                $('#menu2 div div i:eq( ' + key + ' )').removeClass('red-text')
            });
            $('#etape' + key).on('keyup', function () {
                let key= $(this).attr('index');
                let oaci = $('#etape' + key).val().toUpperCase();
                $('#etape' + key).css('background-color','white');
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


    }
    remove(callback = null) {
        this.depart = null;
        this.etapes = [];
        this.arrivee = null;
        if (callback) callback.call(this)
    }
}