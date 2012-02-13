khan_academy.download_window = function() {

	var _window = '';
	var _tableview = '';

	var _init = function() {
		_window = '';
		_window = control_factory.create_window({
			'title': 'Downloads'
		});
		
		_tableview = Titanium.UI.createTableView();
		_window.add(_tableview);
	};
	
	
	return {// publicly accessible API

		init : function() {
			return _init();
		},
		get_window : function() {
			return _window;
		},
		get_tableview : function() {
			return _tableview;
		}
	};
};
