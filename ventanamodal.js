$(document).ready(function(){
	$(".config").click(function(){
		$(".overlay-container").fadeIn(function(){
			$(".window-container.zoomout").addClass("window-container-visible");
		});
	});

	$(".close").click(function(){
		$(".overlay-container").fadeOut().end().find(".window-container").removeClass("window-container-visible");
	});
});