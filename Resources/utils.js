var VERTICAL_SPACING = 10; 

var utils = new Object();

/**********************************************************************
 * Get an object that is right above of the desired object
 * return new 'top' position for that object
 **********************************************************************/
utils.offset_vertical = function( obj, vertical_spacing ) {
	
	if ( null == vertical_spacing ) {
		vertical_spacing = VERTICAL_SPACING;
	}
	return parseInt(obj.top) + parseInt(obj.height) + vertical_spacing;  
};
