khan_academy.archive_window = function() {

	var _window = '';
	var _tableview = '';
	
	var _get_playlists = function() {
		return database.get_topics();
	}

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
			playlist_id: playlist['id']
		});
		
		// on row click, open browse videos window
		row.addEventListener('click', function() {
			my_app.archive_videos_window.update( playlist['topic_id'] );
			my_app.main_window.get_tabgroup().tabs[1].open(my_app.archive_videos_window.get_window());
		});
		
		row.add(label);		
		return row;
	}

	var _update_tableview = function() {
		
		var playlists = _get_playlists();
		
		if ( null !== playlists ) {
			var rows = [];
			for ( i in playlists ) {
				rows.push( _create_tableview_row(playlists[i]) );
			}
						
			// Update TableViews
			_tableview.setData( rows );
		}
	}

	var _init = function() {
		_window = control_factory.create_window({
			'title': 'Archive'
		});
		_tableview = Titanium.UI.createTableView();
		
		_update_tableview();
		_window.add(_tableview);
	};
	
	return {// publicly accessible API

		init : function() {
			return _init();
		},
		update_data: function() {
			return _update_tableview();
		},
		get_window : function() {
			return _window;
		},
		get_tableview : function() {
			return _tableview;
		}
	};
};
