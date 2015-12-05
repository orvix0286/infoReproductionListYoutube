function iniciar(){
	var configuracion = document.getElementById("configuracion");
	configuracion.addEventListener("click", mostrar, false);
}

function mostrar(){
	var cajaConfiguracion = document.getElementById("cajaConfiguracion");
	cajaConfiguracion.style.display = "block";
}

window.addEventListener("load", iniciar, false);