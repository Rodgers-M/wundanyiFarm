$(document).ready(function(){

	$('.js-content').waypoint(function(direction){

		if(direction=="down"){

			$('#stickydiv').addClass('stickynav');
		} else{
			$('#stickydiv').removeClass('stickynav');
		}
	} , {
	//	offset: '15%;'
	});

});
