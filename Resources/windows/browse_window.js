khan_academy.browse_window = function() {

	var _window = '';
	var _tableview = '';
	
	var _get_playlists = function() {
		var file_name = '/data/playlists.json';
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, file_name);
 
		if (file.exists()) {
  			return JSON.parse(file.read());
		}
		else {
			return null;
		}
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
			my_app.browse_videos_window.update( playlist['id'] );
			my_app.main_window.get_tabgroup().tabs[0].open(my_app.browse_videos_window.get_window());
		});
		
		row.add(label);		
		return row;
	}

	var _create_tableview = function() {
		
		var playlists = _get_playlists();
		if ( null !== playlists ) {
			var rows = [];
			for ( i in playlists ) {
				rows.push( _create_tableview_row(playlists[i]) );
			}
						
			// Create TableViews
			_tableview = Titanium.UI.createTableView({
				data: rows
			});
		}
	}

	var _init = function() {
		_window = Titanium.UI.createWindow({
			title : 'Browse'
		});
		
		_create_tableview();
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
