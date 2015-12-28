$(document).ready(function(){
    //Variables usadas en los objetos de configuracion
    var idLista, idCanal, videoId, videosPagina, checkedCantidadVideos, checkedDuracionTotal;

    //*******************************************************************************
    //Objeto de configuracion para playListItems (opciones)

    //Objeto de Configuracion para playListItems, siempre se necesitara la misma informacion
    var objetoConfiguracionPlaylistItems = {
        part: "snippet,contentDetails",
        playlistId: "",
        maxResults: videosPagina,
        fields: "items(snippet(channelId),contentDetails),pageInfo"
    }
 
    //Se carga el valor por defeto a la opcion maxResults (numero de videos por pagina)
    videosPagina = $("#videosPagina").attr("value");
    objetoConfiguracionPlaylistItems.maxResults = videosPagina;

    //Configura los numeros de videos por pagina
    $("#videosPagina").change(function(){
        objetoConfiguracionPlaylistItems.maxResults = this.value;
    });

    //Configura si se muestran la cantidad de videos (solo se usa para mostrar)
    checkedCantidadVideos = true;

<<<<<<< HEAD
    $("#cantidadVideos").click(function(){
        if(this.checked){
            checkedCantidadVideos = true;
        }
        else{
            checkedCantidadVideos = false;  
        }
    });

    //Configura si se calcula duracion total de la lista de reproduccion
    checkedDuracionTotal = true;
    
    $("#duracionTotal").click(function(){
        if(this.checked){
            checkedDuracionTotal = true;
        }
        else{
            checkedDuracionTotal = false;   
        }
    });

    //*******************************************************************************
    //Objeto de configuracion para channels (armado y opciones)
=======
    //Objeto de Configuracion basico para playListItems
    var objetoConfiguracionPlaylistItems = {
        part: "snippet,contentDetails",
        playlistId: idLista,
        maxResults: videosPagina,
        fields: "items(snippet(channelId),contentDetails),pageInfo" //no se necesita configura lo que se solicita
    }
>>>>>>> 079fb114aaaad431e88c4ec86d65010ebef7a033

    //Variables de configuracion para objeto channels
    var channelTitle = "title", 
        channelDescription = "",
        channelTumbnails = "";

    //Objecto de configuracion para la api channels    
    var objetoConfiguracionChannels = {
        part: "snippet",
        id: idCanal
    }
    
    //Function para armar el campo fields del objeto
    var channels = function(){
        var separador1 = "", separador2 = "";
        if(Boolean(channelTitle) && Boolean(channelDescription)){ separador1 = ","; }
        if(Boolean(channelTumbnails) && (Boolean(channelTitle) || Boolean(channelDescription))){ separador2 = ","; }        

        var cadena = "items(snippet("+channelTitle+separador1+channelDescription+separador2+channelTumbnails+"))";

        return cadena;
    }
    
    //Configura si solicito el titulo del Canal
    $("#tituloCanal").click(function(){
        if(!this.checked){
            channelTitle = "";
        }
        else{
            channelTitle = "title";
        }
    });

    //Configura si solicito la descripcion del Canal
    $("#descripcionCanal").click(function(){
        if(this.checked){
            channelDescription = "description";
        }
        else{
            channelDescription = "";
        }
    });

    //Configura si solicito el Tumbnails del canal
    $("#thumbnailsCanal").click(function(){
        if(this.checked){
            channelTumbnails = "thumbnails(medium)";
        }
        else{
            channelTumbnails = "";
        }
    });

    //*******************************************************************************
    //Objeto de configuracion para video (armado y opciones)

    var objetoConfiguracionVideo = {
        part: "contentDetails,snippet,statistics",
        id: videoId,
        fields: ""
    }

    var //variables de snippet para video
        publishedAt = "", 
        title = "title",
        description = "",
        thumbnails = "thumbnails(medium)";

    //Funcion para formar la parte de snippet
    var videoSnippet = function(){
        var separador1 = "", separador2 = "", separador3 = "";

        if(Boolean(publishedAt) && Boolean(title)){ separador1 = ","; }

        if(Boolean(description) && (Boolean(publishedAt) || Boolean(title))){ separador2 = ","; }

        if(Boolean(thumbnails) && (Boolean(publishedAt) || Boolean(title) || Boolean(description))){
            separador3 = ",";
        }

        var cadena = "snippet("+publishedAt+separador1+title+separador2+description+separador3+thumbnails+")"
        return cadena;   
    };

    //Configura si solicito el titulo del video
    $("#videoTitulo").click(function(){
        if(!this.checked){
            title = "";            
        }
        else{
            title = "title";
        }        
    });

    //Configura si solicito la descripcion del video
    $("#descripcionVideo").click(function(){
        if(this.checked){
            description = "description";
        }
        else{
            description = "";
        }     
    });

    //Configura si solicito el thumbnails del video
    $("#thumbnailsVideo").click(function(){
        if(!this.checked){
            thumbnails = "";
        }
        else{
            thumbnails = "thumbnails(medium)";
        }       
    });

    //Configura si solicito la fecha de publicacion del video
    $("#fechaPublicacion").click(function(){
        if(this.checked){
            publishedAt = "publishedAt";
        }
        else{
            publishedAt = "";
        }
    });

    //Variables para formar la parte de contentDetails
    var duration = "duration", definition = "";
    
    //Function para formar la parte de contentDetails
    var videoContentDetails = function(){
        var separador = "";
        if(Boolean(definition) && Boolean(duration)){
            separador = ",";
        } else{
            separador = "";
        }
        var cadena = "contentDetails("+duration+separador+definition+"))";
        return cadena;
    };

    //Configura si solicita la duracion del video
    $("#duracionVideo").click(function(){
        if(!this.checked){
            duration = "";
        } else{
            duration = "duration";
        }
    });

    //Configura si solicita la calidad del video
    $("#calidadVideo").click(function(){
        if(this.checked){
            definition = "definition";
        } else{
            definition = "";
        }
    });

    //Variables para armar la parte de estadistica
    var viewCount = "",
        likeCount = "",
        dislikeCount = "",
        favoriteCount = "", 
        commentCount = "";

    //Funcion para armar la parte de statistics
    var statistics = function(){
        var separador1 = "", separador2 = "", separador3 = "", separador4 = "";

        if(Boolean(likeCount) && Boolean(viewCount)){
            separador1 = ",";
        }
        if(Boolean(dislikeCount) && (Boolean(viewCount) || Boolean(likeCount))){
            separador2 = ",";
        }
        if(Boolean(favoriteCount) && (Boolean(viewCount) || Boolean(likeCount) || Boolean(dislikeCount))){
            separador3 = ",";
        }
        if(Boolean(commentCount) && (Boolean(viewCount) || Boolean(likeCount) || Boolean(dislikeCount) || Boolean(favoriteCount))){
            separador4 = ",";
        }

        var cadena = "statistics("+viewCount+separador1+likeCount+separador2+dislikeCount+separador3+favoriteCount+separador4+commentCount+")";
        return cadena;
    };

    //Configura si solicita la cantidad de visualizaciones
    $("#cantidadVisualizaciones").click(function(){
        if(this.checked){
            viewCount = "viewCount";
        }
        else{
            viewCount = "";
        }
    });

    //Configura si solicita la cantidad de like
    $("#cantidadMeGusta").click(function(){
        if(this.checked){
            likeCount = "likeCount";
        }
        else{
            likeCount = "";
        }
    });

    //Configura si solicita la cantidad de dislike
    $("#cantidadNoMeGusta").click(function(){
        if(this.checked){
            dislikeCount = "dislikeCount";
        }
        else{
            dislikeCount = "";
        }
    });

    //Configura si solicita la cantidad de comentarios
    $("#cantidadComentarios").click(function(){
        if(this.checked){
            commentCount = "commentCount";
        }
        else{
            commentCount = "";
        }
    });
        
    //Configura si solicita la cantida de favoritos
    $("#cantidadFavoritos").click(function(){
        if(this.checked){
            favoriteCount = "favoriteCount";
        }
        else{
            favoriteCount = "";
        }
    });

    //******************************************************************************
    
    //Ventana modal
    $(".config").click(function(){
        $(".overlay-container").fadeIn(function(){
            $(".window-container.zoomout").addClass("window-container-visible");
        });
    });

    //Cerrar la ventana modal dando click en la x o en el boton cerrar
    $(".close, .cerrar-letra").click(function(){
        $(".overlay-container").fadeOut().end().find(".window-container").removeClass("window-container-visible");
    });

    //Cerrar la ventna modal dando click fuera de la ventana
    $(".overlay-container").click(function(e){
        if(this === e.target){
            $(".overlay-container").fadeOut().end().find(".window-container").removeClass("window-container-visible");
        }   
    });

    //Cerrar la ventana modal presionando la tecla enter
    $("body").keypress(function(e){
        if(e.which === 13){
            $(".overlay-container").fadeOut().end().find(".window-container").removeClass("window-container-visible");
        }
    });

    //*************************************************************************************
    //Funcion donde se realiza y procesa la peticion
    var peticion = function(){

       var totalSegundos = 0;
        
        //Obtengo el id en caso de que sea de una url
        var idUrlLista = $("#idUrlLista").val();
        if(idUrlLista.lastIndexOf("=") === -1){
            idLista = idUrlLista;
        }
        else{
            idLista = idUrlLista.substring(idUrlLista.lastIndexOf("=")+1);
        }

        //Le asigno la id al objeto de configuracion
        objetoConfiguracionPlaylistItems.playlistId = idLista;

        //Se realiza la peticion de la playlistItems y luego se procesa
        var request = gapi.client.youtube.playlistItems.list(objetoConfiguracionPlaylistItems);
        request.then(function(response){

<<<<<<< HEAD
            //Verifico si esta seleccionada la opcion para mostrar Cantidad de Videos
            var totalVideos = "";
            if(checkedCantidadVideos){
                totalVideos = "Cantidad de Videos de la Lista: "+response.result.pageInfo.totalResults+"<br>"
            }

            //Verifico si esta seleccionada la opcion para mostrar Duracion total
            var duracionTotal = "";
            /*NOTA !!!****************************************************
            Este calculo lo hago de ultimo por que necesito haber cargado 
            Todo los videos **********************************************/

            //Verifico si esta seleccionada la opcion para mostrar Titulo del Canal
            var tituloCanal = "";
            

            $(".resultados").html(totalVideos);

            console.log(response);
            
        }, function(response){
            console.log(response);
        });
    }

    //Accion para mostrar la informacion de la lista de reproduccion
    $(".dame").click(function(){
        //Aqui se arma el campo fields para el objeto de configuracion channels
        objetoConfiguracionChannels.fields = channels();

        //Aqui se arma el campo fields para el objeto de configuracion video
        objetoConfiguracionVideo.fields = "items("+videoSnippet()+","+videoContentDetails()+","+statistics()+")";

        $("form p:first").addClass("resultado");
        $("form h2:first").addClass("titulo");
        $(".dame").addClass("dame-result");
        $(".config").addClass("config-result");
=======
    //Boton para solicitar la informacion de la lista de reproduccion
    $(".dame").click(function(){

        //Parte para armar el objeto de configuracion para channels
        var separador1 = "", separador2 = "";
        if(Boolean(channelTitle) && Boolean(channelDescription)){ separador1 = ","; }
        if(Boolean(channelTumbnails) && (Boolean(channelTitle) || Boolean(channelDescription))){ separador2 = ","; }
        objetoConfiguracionChannels.fields = "items(snippet("+channelTitle+separador1+channelDescription+separador2+channelTumbnails+"))";

        //Parte para armar el objeto de configuracion video
        objetoConfiguracionVideo.fields = "items("+videoSnippet()+","+videoContentDetails()+","+statistics()+")";
        
        console.log(objetoConfiguracionPlaylistItems);
        console.log(objetoConfiguracionChannels);
        console.log(objetoConfiguracionVideo);
    });
>>>>>>> 079fb114aaaad431e88c4ec86d65010ebef7a033

        gapi.client.setApiKey("AIzaSyARaWBizwChYj0ROHcQHaj23de5d2wj9NQ");
        gapi.client.load("youtube", "v3").then(peticion);
    });  
});