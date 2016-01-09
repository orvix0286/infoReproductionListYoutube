$(document).ready(function(){

 var funcionInicial = function(){
        //Inserto clases para modificar la pocicion de la caja de busqueda
        $("form p:first").addClass("resultadoBuscador");
        $("form h2:first").css("display", "none");
        $(".dame").addClass("dame-result");

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
