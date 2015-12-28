//Objetos de configuracion con todas las opciones aplicadas
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