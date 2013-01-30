var PLATFORM = (Titanium.Platform.osname.match(/ipad/gi)) ? 'ipad' : 'iphone';

var DV_CONST = {
	//
	// ScrollView offset vars
	//
	scroll_view_offset: {
		iphone: 0,
		ipad: 75
	},
	scroll_view_space: {
		iphone: 15,
		ipad: 25
	},
	scroll_view_image_offset: {
		iphone: 10,
		ipad: 60
	},
	scroll_view_title_font: {
		iphone: 24,
		ipad: 35
	},

	//
	// ScrollView offset vars
	//
	title_offset: {
		iphone: 10,
		ipad: 35
	},
	title_width: {
		iphone: 270,
		ipad: 600
	},
	title_font: {
		iphone: 14,
		ipad: 20
	},
	content_offset: {
		iphone: 20,
		ipad: 65
	},
	content_width: {
		iphone: 270,
		ipad: 600
	},
	content_font: {
		iphone: 12,
		ipad: 16
	}
};

khan_academy.dv = function(name) {
	return DV_CONST[name][PLATFORM];
};
