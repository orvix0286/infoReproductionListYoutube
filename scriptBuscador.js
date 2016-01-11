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
