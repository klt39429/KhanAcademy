var VERTICAL_SPACING = 10; 

var utils = {};

/**********************************************************************
 * Get an object that is right above of the desired object
 * return new 'top' position for that object
 **********************************************************************/
utils.offset_vertical = function( obj, vertical_spacing ) {
	
	if ( null === vertical_spacing ) {
		vertical_spacing = VERTICAL_SPACING;
	}
	return parseInt(obj.top, 10) + parseInt(obj.height, 10) + vertical_spacing;  
};

utils.debug_json = function(json_var) {
	Titanium.API.info("The data object contains: " + JSON.stringify(json_var));
};
