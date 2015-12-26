$(document).ready(function(){
	//Objetos de configuracion con todas las opciones aplicadas
	var idLista, idCanal, videoId;

	var objetoConfiguracionPlaylistItems = {
		part: "snippet,contentDetails",
		playlistId: idLista,
		maxResuts: videosPagina,
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
		fields: "items(snippet(publishedAt,title,description,thumbnails(medium)),contentDetails(duration,definition),statistics)"
	}

	$(".config").click(function(){
		$(".overlay-container").fadeIn(function(){
			$(".window-container.zoomout").addClass("window-container-visible");
		});
	});

	$(".close, .cerrar").click(function(){
		$(".overlay-container").fadeOut().end().find(".window-container").removeClass("window-container-visible");
	});

});