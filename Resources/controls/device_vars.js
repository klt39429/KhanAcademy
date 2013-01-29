var PLATFORM = (Titanium.Platform.osname.match(/ipad/gi)) ? 'ipad' : 'iphone';

var DV_CONST = {
	scroll_view_offset: {
		'iphone': 0,
		'ipad': 75
	},
	scroll_view_space: {
		'iphone': 15,
		'ipad': 25
	},
	scroll_view_image_offset: {
		'iphone': 10,
		'ipad': 30
	},
	scroll_view_title_font: {
		'iphone': 24,
		'ipad': 35
	}
};

khan_academy.dv = function(name) {
	return DV_CONST[name][PLATFORM];
};
