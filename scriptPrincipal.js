function iniciar(){
	objetoConfiguracionLista = {};
	var configuracion = document.getElementById("configuracion");
	configuracion.addEventListener("click", mostrar, false);

	var botonDame = document.getElementById("dame");
	dame.addEventListener("click", objetoConfiguracion, false);

}

function mostrar(){
	var cajaConfiguracion = document.getElementById("cajaConfiguracion");
	cajaConfiguracion.style.display = "block";

	var ventanaFlotante = document.getElementById("ventana-flotante");
	ventanaFlotante.style.display = "block";
}

function objetoConfiguracion(){
	objetoConfiguracionLista.playlistId = idLista;
	objetoConfiguracionLista.maxResult = document.getElementById("videosPagina").value;

	alert(objetoConfiguracionLista.maxResult);

}

window.addEventListener("load", iniciar, false);