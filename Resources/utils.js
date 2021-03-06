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

utils.confirm_message = function(title, message, callback) {
	var alert = Titanium.UI.createAlertDialog({
		title: title,
		message: message,
		buttonNames: ['No', 'Yes']
	});
 
	alert.addEventListener('click', function(e) {
		// Click on YES, make a call back
		if ( 1 === e.index ) {
			callback();
		}
	});
 
	alert.show();
};

String.prototype.toCamelCase = function () {
	return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

String.prototype.decode_html = function() {
    var map = {"gt":">" /* , … */};
	var clean = this.replace( /<[^>]+>/g, '' );
    return clean.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, function($0, $1) {
        if ($1[0] === "#") {
            return String.fromCharCode($1[1].toLowerCase() === "x" ? parseInt($1.substr(2), 16)  : parseInt($1.substr(1), 10));
        } else {
            return map.hasOwnProperty($1) ? map[$1] : $0;
        }
    });
};
