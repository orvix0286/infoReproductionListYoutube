$(document).ready(function(){


    
    var peticion = function(){

        var objetoConfiguracion = {
            part: "id,snippet",
            type: "playlist", 
            maxResults: "10",
            q: $("#textoBusqueda").val()
        };

        var request = gapi.client.youtube.search.list(objetoConfiguracion);
            request.then(function(response){
                var listaResultados = response.result.items;

                for(var i=0, t=listaResultados.length; i<t; i++){
                    var titulo = listaResultados[i].snippet.title;
                    var idListaReproduccion = listaResultados[i].id.playlistId;
                    sessionStorage["video"+i] = idListaReproduccion;
                    var cadenaTexto = "<div class='resultado"+i+"' data='"+idListaReproduccion+"'>"+titulo+"</div>";
                    $(".resultado").append(cadenaTexto);
                    $(".resultado"+i).click(function(){
                        sessionStorage.enlaceOrigen = $(this).attr("data");
                        window.open("index.html","_self");
                    });
                }
        });

    };
    

    var funcionInicial = function(){
        //Inserto clases para modificar la pocicion de la caja de busqueda
        $("form p:first").addClass("resultadoBuscador");
        $("form h2:first").css("display", "none");
        $(".dame").addClass("dame-result");

        gapi.client.setApiKey("AIzaSyARaWBizwChYj0ROHcQHaj23de5d2wj9NQ");
        gapi.client.load("youtube", "v3").then(peticion);
    };

    //Accion para mostrar la informacion de la lista de reproduccion
    $(".dame").click(function(){
        funcionInicial();
    });

    $(document).keypress(function(e){
        if(e.target.id === "textoBusqueda" && e.keyCode === 13){
            funcionInicial();
        }
    });
});
