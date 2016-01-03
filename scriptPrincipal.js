$(document).ready(function(){
    //Variables usadas en los objetos de configuracion
    var idLista, idCanal, videoId, videosPagina, checkedCantidadVideos, checkedDuracionTotal;
    var totalSegundos = 0;
    var infoVideos = {};
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

    //Variables de configuracion para objeto channels
    var channelTitle = "title", 
        channelDescription = "description",//Opcional
        channelTumbnails = "thumbnails(medium)";//Opcional

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
        publishedAt = "publishedAt",//Opcional 
        title = "title",
        description = "description",//Opcional
        thumbnails = "thumbnails(medium)";//Opcional

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
    var duration = "duration", definition = "definition"//Opcional;
    
    //Function para formar la parte de contentDetails
    var videoContentDetails = function(){
        var separador = "";
        if(Boolean(definition) && Boolean(duration)){
            separador = ",";
        } else{
            separador = "";
        }
        var cadena = "contentDetails("+duration+separador+definition+")";
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
    var viewCount = "viewCount",//Opcional
        likeCount = "likeCount",//Opcional
        dislikeCount = "dislikeCount",//Opcional
        favoriteCount = "favoriteCount",//Opcional
        commentCount = "commentCount";//Opcional

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

            //Verifico si esta seleccionada la opcion para mostrar Cantidad de Videos
            var totalVideos = "";
            if(checkedCantidadVideos){
                totalVideos = "<p>Cantidad de Videos de la Lista: "+response.result.pageInfo.totalResults+"</p>"
                $(".infoLista").append(totalVideos);
            }
            

            //Verifico si esta seleccionada la opcion para mostrar Duracion total
            var textoDuracionTotal = "", calculoDuracionTotal = "";
            if($("#duracionTotal")[0].checked){
                textoDuracionTotal = "<p >Duracion Total de la Lista: <span class='duracion'></span></p>"
                $(".infoLista").append(textoDuracionTotal);                   
            }
            /*NOTA !!!****************************************************
            Este calculo lo hago de ultimo por que necesito haber cargado 
            Todo los videos **********************************************/

            //Obtener informacion del canal asignando el id del canal
            idCanal = response.result.items[0].snippet.channelId;
            objetoConfiguracionChannels.id = idCanal;
            //Haciendo la solicitud y procesando
            var requestChannels = gapi.client.youtube.channels.list(objetoConfiguracionChannels);
            requestChannels.then(function(responseChannels){
                //Verificando si se selecciono la opcion de mostrar titulo del canal
                if($("#tituloCanal")[0].checked){   
                   var textoTituloCanal = "<p>Titulo del Canal: "+responseChannels.result.items[0].snippet.title+"</p>"; 
                   $(".infoLista").append(textoTituloCanal);                   
                }

                //Verificando si se selecciono la opcion de mostrar descripcion del canal
                if($("#descripcionCanal")[0].checked){
                    var textoDescripcionCanal = "<p>Descripcion del Canal: "+responseChannels.result.items[0].snippet.description+"</p>"; 
                    $(".infoLista").append(textoDescripcionCanal);                      
                }

                //Verificando si se seleccion la opcion de mostrar thumbnails del canal
                if($("#thumbnailsCanal")[0].checked){
                    var imagenThumbnails = "<p><img src='"+responseChannels.result.items[0].snippet.thumbnails.medium.url+"' width='50'></p>";
                    $(".infoLista").append(imagenThumbnails);
                }
            });

            //Inserto el titulo de la lista de videos (lo puse aqui para se coloque al terminar el thumbnail del canal);
            $(".infoListaVideos").append("<h3>Lista de Videos</h3>");
            
            //Guardo la lista que contiene los id de los videos
            var listaIdVideos = response.result.items;
            //Bucle para hacer una peticion por cada video 
            for(var i = 0, t = listaIdVideos.length; i<t; i++){
                var idVideo = listaIdVideos[i].contentDetails.videoId;
                //Inserto el id del video en el objeto de configuracion
                objetoConfiguracionVideo.id = idVideo;
                $(".infoListaVideos").append("<div class='video"+i+"'></div>");
                peticionVideo(i); //llamo a la funcion que hace la peticion y procesa la informacion
            }
           
        }, function(response){
            console.log(response); //funcion para mostrar errores
        });
    }

    //Funcion para hacer la peticion y procesar la informacion de los videos
    var peticionVideo = function(indice){
        var requestVideo = gapi.client.youtube.videos.list(objetoConfiguracionVideo);
                requestVideo.then(function(responseVideos){
                    infoVideos = responseVideos.result;
                    //Verifico si la opcion de mostrar titulo fue seleccionada
                    
                    if($("#videoTitulo")[0].checked){
                        var textoVideoTitulo = "<p>"+responseVideos.result.items[0].snippet.title+"</p>";
                        $(".video"+indice).append(textoVideoTitulo);
                    }

                    //Verifico si la opcion de mostar descripccion fue seleccionada
                    if($("#descripcionVideo")[0].checked){
                        var textoDescripcionVideo = "<p>Descripción:</p><p>"+responseVideos.result.items[0].snippet.description+"</p>";
                        $(".video"+indice).append(textoDescripcionVideo);
                    }

                    //Veirifico si la opcion de mostrar thumbnails fue seleccionada
                    if($("#thumbnailsVideo")[0].checked){
                        var imagenThumbnails = "<p><img src='"+responseVideos.result.items[0].snippet.thumbnails.medium.url+"' width='50'></p>";
                        $(".video"+indice).append(imagenThumbnails);
                    }

                    //Verifico si la opcion de mostrar duracion del video fue seleccionada
                    if($("#duracionVideo")[0].checked){
                        var tiempo = formatoTiempo(responseVideos.result.items[0].contentDetails.duration);
                        var textoDuracionVideo = "<p>Duracion del Video: "+tiempo+"</p>";
                        $(".video"+indice).append(textoDuracionVideo);
                    }

                    //Verifico si la opcion de mostrar la fecha de publicacion fue seleccionada
                    if($("#fechaPublicacion")[0].checked){
                        var fecha = responseVideos.result.items[0].snippet.publishedAt;
                        var textoFechaPublicacion = "<p>Fecha de publicacion: "+fecha.substring(0,10)+"</p>";
                        $(".video"+indice).append(textoFechaPublicacion);
                    }

                    //Verifico si la opcion de mostrar calidad del video fue seleccionada
                    if($("#calidadVideo")[0].checked){
                        var textoCalidadVideo = "<p>Calidad del Video: "+responseVideos.result.items[0].contentDetails.definition+"</p>";
                        $(".video"+indice).append(textoCalidadVideo);
                    }

                    //Verifico si la opcion de mostrar cantidad de visualizaciones fue seleccionada
                    if($("#cantidadVisualizaciones")[0].checked){
                        var textoCantidadVisualizaciones = "<p>Cantidad de visualizaciones: "+responseVideos.result.items[0].statistics.viewCount+"</p>";
                        $(".video"+indice).append(textoCantidadVisualizaciones);
                    }

                    //Verifico si la opcion de mostrar cantidad de me gusta fue seleccionada
                    if($("#cantidadMeGusta")[0].checked){
                        var textoCantidadMeGusta = "<p>Cantidad de Me Gusta: "+responseVideos.result.items[0].statistics.likeCount+"</p>";
                        $(".video"+indice).append(textoCantidadMeGusta);
                    }

                    //Verifico si la opcion de mostrar cantidad de no me gusta fue seleccionada
                    if($("#cantidadNoMeGusta")[0].checked){
                        var textoCantidadNoMeGusta = "<p>Cantidad de No Me Gusta: "+responseVideos.result.items[0].statistics.dislikeCount+"</p>";
                        $(".video"+indice).append(textoCantidadNoMeGusta);
                    }

                    //Verifico si la opcion de mostrar la cantidad de comentarios fue seleccionada
                    if($("#cantidadComentarios")[0].checked){
                        var textoCantidadComentarios = "<p>Cantidad de Comentarios: "+responseVideos.result.items[0].statistics.commentCount+"</p>";
                        $(".video"+indice).append(textoCantidadComentarios);
                    }

                    //Verifico si la opcion de mostrar la cantidad de favoritos fue seleccionada
                    if($("#cantidadFavoritos")[0].checked){
                        var textoCantidadFavoritos = "<p>Cantidad de Favoritos: "+responseVideos.result.items[0].statistics.favoriteCount+"</p>";
                        $(".video"+indice).append(textoCantidadFavoritos);
                    }

                }, function(responseVideos){
                    console.log(responseVideos);//funcion para mostar errores
                });
                
    }

    function formatoTiempo(tiempoOrigen){
        var h = "00";
        var m = "00";
        var s = "00";

        if(tiempoOrigen.match(/[0-9][0-9]H|[0-9]H/)){
            h =  tiempoOrigen.match(/[0-9][0-9]H|[0-9]H/)[0].match(/[0-9][0-9]|[0-9]/);
        }
        
        if(tiempoOrigen.match(/[0-9][0-9]M|[0-9]M/)){
            m =  tiempoOrigen.match(/[0-9][0-9]M|[0-9]M/)[0].match(/[0-9][0-9]|[0-9]/);
        }
        
        if(tiempoOrigen.match(/[0-9][0-9]S|[0-9]S/)){
            s =  tiempoOrigen.match(/[0-9][0-9]S|[0-9]S/)[0].match(/[0-9][0-9]|[0-9]/);
        }
        
        var tiempo = h+":"+m+":"+s;
        var valorHora = parseInt(h);
        var valorMinutos = parseInt(m);
        var valorSegundos = parseInt(s);    
        calculoTotal(valorHora, valorMinutos, valorSegundos);
        return tiempo;
    }

    function calculoTotal(valorHora, valorMinutos, valorSegundos){
        totalSegundos += valorHora * 3600 + valorMinutos * 60 + valorSegundos;
        var calculoHora = Math.floor(totalSegundos / 3600);
        var calculoMinutos = (totalSegundos / 3600 - calculoHora) * 60;
        var calculoSegundos = (calculoMinutos - Math.floor(calculoMinutos)) * 60;

        if(calculoHora<10){ calculoHora = "0"+calculoHora; }

        if(Math.floor(calculoMinutos)<10){ 
            calculoMinutos = "0"+Math.floor(calculoMinutos); 
        } else{
            calculoMinutos = Math.floor(calculoMinutos);
        }

        if(calculoSegundos<10){ 
            calculoSegundos = "0"+Math.floor(calculoSegundos); 
        } else{
            calculoSegundos = Math.floor(calculoSegundos); 
        }
        var textoDuracionTotal = calculoHora+" : "+calculoMinutos+" : "+calculoSegundos;

    }

    //Accion para mostrar la informacion de la lista de reproduccion
    $(".dame").click(function(){
        //Aqui se arma el campo fields para el objeto de configuracion channels
        objetoConfiguracionChannels.fields = channels();

        //Aqui se arma el campo fields para el objeto de configuracion video
        objetoConfiguracionVideo.fields = "items("+videoSnippet()+","+videoContentDetails()+","+statistics()+")";

        //Inserto clases para modificar la pocicion de la caja de busqueda
        $("form p:first").addClass("resultado");
        $("form h2:first").addClass("titulo");
        $(".dame").addClass("dame-result");
        $(".config").addClass("config-result");

        //Borrar la informacion cada vez que se muestra un resultado nuevo
        $(".infoLista").empty();
        $(".infoListaVideos").empty();

        gapi.client.setApiKey("AIzaSyARaWBizwChYj0ROHcQHaj23de5d2wj9NQ");
        gapi.client.load("youtube", "v3").then(peticion);
    }); 

     
});