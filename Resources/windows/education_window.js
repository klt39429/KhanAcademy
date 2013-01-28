khan_academy.education_window = function() {

	var _window, _refresh_button, _search_button;

	var _get_data = function() {
		//
		// Get test data
		//
		var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'/data/test_data.dat');
		var data = JSON.parse(file.read());
		data = data.Results;

		return data;
	};

	var _load_search = function() {
		my_app.activity_indicator.open();
		var data = _get_data();
		my_app.search_result_window.update( data );
		my_app.main_window.get_tabgroup().tabs[3].open(my_app.search_result_window.get_window());
		my_app.activity_indicator.close();
	};

	var _init = function() {
		_window = control_factory.create_window({
			'title': 'Education',
			'layout': 'veritical',
			'backgroundColor': 'white'
		});

		_search_button = Ti.UI.createButton({
			'title' : 'Search',
			'left' : '30',
			'right' : '30'
		});
		_search_button.addEventListener('click', _load_search);

		_window.add(_search_button);
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
