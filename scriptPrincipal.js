$(document).ready(function(){
    
    var idLista, idCanal, videoId, videosPagina, checkedCantidadVideos, checkedDuracionTotal;

    /*
    Objetos de configuracion con todas las opciones aplicadas
    var objetoConfiguracionPlaylistItems = {
        part: "snippet,contentDetails",
        playlistId: idLista,
        maxResults: videosPagina,
        fields: "items(snippet(channelId),contentDetails),pageInfo"
    }

    var objetoConfiguracionChannels = {
        part: "snippet",
        id: idCanal,
        fields: "items(snippet(title,description,thumbnails(medium)))"
    }

    var objetoConfiguracionVideo = {
        part: "contentDetails,snippet,statistics",
        id: videoId,
        fields: "items(snippet(publishedAt,title,description,thumbnails(medium)),contentDetails(duration,definition),statistics(viewCount,likeCount,dislikeCount,favoriteCount,commentCount))"
    }
    */

    
    //Objeto de Configuracion elemental
    var objetoConfiguracionPlaylistItems = {
        part: "snippet,contentDetails",
        playlistId: idLista,
        maxResults: videosPagina,
        fields: "items(snippet(channelId),contentDetails),pageInfo"
    }

    //Variables de configuracion para objeto
    var channelTitle = "title", 
        channelDescription = "",
        channelTumbnails = "";

    var objetoConfiguracionChannels = {
        part: "snippet",
        id: idCanal
    }

    //Variables de configuracion para objeto
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
    }

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
        console.log(videoSnippet());
    });

    var videoContentDetails = "contentDetails(duration))",
        statistics = "";
        
    var objetoConfiguracionVideo = {
        part: "contentDetails,snippet,statistics",
        id: videoId,
        fields: "items("+videoSnippet()+","+videoContentDetails+","+statistics
    }

    videosPagina = $("#videosPagina").attr("value");
    objetoConfiguracionPlaylistItems.maxResults = videosPagina;

    //Configura los numeros de videos por pagina
    $("#videosPagina").change(function(){
        objetoConfiguracionPlaylistItems.maxResults = this.value;
    });

    //Configura si se muestran la cantidad de videos (solo se usa para mostrar)
    checkedCantidadVideos = true;

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

    //Configura si solicito el titulo del video


    $(".config").click(function(){
        $(".overlay-container").fadeIn(function(){
            $(".window-container.zoomout").addClass("window-container-visible");
        });
    });

    $(".close, .cerrar").click(function(){
        $(".overlay-container").fadeOut().end().find(".window-container").removeClass("window-container-visible");
    });

    $(".dame").click(function(){

        //Objeto de Configuracion para channnels
        var separador1 = "", separador2 = "";

        if(Boolean(channelTitle) && Boolean(channelDescription)){ separador1 = ","; }

        if(Boolean(channelTumbnails) && (Boolean(channelTitle) || Boolean(channelDescription))){ separador2 = ","; }

        objetoConfiguracionChannels.fields = "items(snippet("+channelTitle+separador1+channelDescription+separador2+channelTumbnails+"))";

        console.log(objetoConfiguracionVideo);

    });

    
});