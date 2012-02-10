khan_academy.download_window = function() {

	var _window = '';

	var _init = function() {
		_window = '';
		_window = Titanium.UI.createWindow({
			title : 'Downloads'
		});
	};
	
	
	return {// publicly accessible API

		init : function() {
			return _init();
		},
		get_window : function() {
			return _window;
		}
	};
};
