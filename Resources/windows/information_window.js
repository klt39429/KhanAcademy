khan_academy.information_window = function() {

	var _create_tableview_row = function( playlist ) {
		// Create row
		var label = Titanium.UI.createLabel({
			text: playlist['standalone_title'],
			height: 'auto',
			font: {
				fontSize: 18,
				fontWeight: 'bold'
			},
			top: 10,
			bottom: 10,
			left: 10,
			right: 20
		});
		var row = Titanium.UI.createTableViewRow({
			height: 'auto',
			hasChild: true,
			playlist_id: playlist['id'],
			filter: playlist['standalone_title'] + " " + playlist['description'] + " " + playlist['tags'].join(" ")
		});
		
		// on row click, open browse videos window
		row.addEventListener('click', function() {
			_open_browse_videos_window( playlist['id'] );
		});
		
		row.add(label);		
		return row;
	}

	var _init = function() {
		_window = control_factory.create_window({
			'title': 'Information'
		});
		
		_searchbar = control_factory.create_searchbar();
		
		_tableview = Titanium.UI.createTableView({
			style: 1
		});
		
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
