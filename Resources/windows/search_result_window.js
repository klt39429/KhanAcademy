khan_academy.search_result_window = function() {

	var _window, _tableview;
	
	var _init = function() {
		_window = control_factory.create_window({
			'title': 'Search Results'
		});
		
		_searchbar = control_factory.create_searchbar();

		_tableview = Titanium.UI.createTableView({
			searchHidden: true,
			filterAttribute: 'filter'
		});
		_window.add(_tableview);
	};
	
	var _update = function( data ) {

		var rows = [];

		var _create_row = function(brand) {
			var _image = Ti.UI.createImageView({
				top: 10,
				bottom: 10,
				left: 10,
				right: 10,
				image: brand.logos.full
			});

			var _row = Ti.UI.createTableViewRow({
				height: 80
			});
			_row.addEventListener('click', function() {
				Titanium.Platform.openURL(brand.urls.conversion_url);
			});
			_row.add(_image);
			return _row;
		};

		for (var i in data.results) {
			rows.push(_create_row(data.results[i].Brand));
		}

		_tableview.setData( rows );
	};

	return {// publicly accessible API

		init : function() {
			return _init();
		},
		update: function( data ) {
			return _update( data );
		},
		get_window : function() {
			return _window;
		}
	};
};
