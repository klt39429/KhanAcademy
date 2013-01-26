khan_academy.browse_window = function() {

	var _window, _searchbar, _refresh_button;

	// these variables are responsible for building the table index and scrollbar
	var _tableview, _tbindex , _last_char_code;
	
	var _get_playlists = function() {
		return my_app.data_manager.get_all_playlists();
	};

	var _open_browse_videos_window = function( playlist_id ){
		my_app.activity_indicator.open();
		my_app.browse_videos_window.update( playlist_id );
		my_app.main_window.get_tabgroup().tabs[0].open(my_app.browse_videos_window.get_window());
		my_app.activity_indicator.close();
	};

	var _create_tableview_row = function( playlist, inx ) {
		// Create row
		var label = Titanium.UI.createLabel({
			text: playlist.standalone_title,
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

		//
		// Get title header
		//
		var this_char_code = playlist.standalone_title.toUpperCase().charCodeAt(0);
		if ( this_char_code < 65 || this_char_code > 90 ) this_char_code = 35;

		var row = Titanium.UI.createTableViewRow({
			height: 'auto',
			hasChild: true,
			playlist_id: playlist.id,
			filter: playlist.standalone_title + " " + playlist.description + " " + playlist.tags.join(" ")
		});
		if ( this_char_code !== _last_char_code ) {
			row.header = String.fromCharCode( this_char_code );
			_tbindex.push({
				title: String.fromCharCode( this_char_code ),
				index: inx
			});
		}
		_last_char_code = this_char_code;
		
		// on row click, open browse videos window
		row.addEventListener('click', function() {
			_open_browse_videos_window( playlist['id'] )
		});
		
		row.add(label);		
		return row;
	}

	var _create_refresh_button = function() {
		_refresh_button = Titanium.UI.createButton({
			systemButton : Titanium.UI.iPhone.SystemButton.REFRESH
		});
		_refresh_button.addEventListener( 'click', function(){
			utils.confirm_message('Refresh Library', 'This will override the current library and may cause mismatched videos. Are you sure?', function() {
				my_app.data_manager.try_retrieve_data( _update_tableview, true );	
			});
		});
	};

	var _update_tableview = function() {
		
		var playlists = _get_playlists();
		if ( null !== playlists ) {
			_last_char_code = -1;
			_tbindex = [];
			var rows = [];
			for ( var i in playlists ) {
				rows.push( _create_tableview_row(playlists[i], i) );
			}
						
			_tableview.setData( rows );
			_tableview.setIndex(_tbindex);
		}
	};

	var _init = function() {
		_window = control_factory.create_window({
			'title': 'Browse'
		});
		
		_searchbar = control_factory.create_searchbar();
		
		_tableview = Titanium.UI.createTableView({
			search: _searchbar,
			searchHidden: true,
			filterAttribute: 'filter'
		});
		
		_update_tableview();
		_window.add(_tableview);
		
		_create_refresh_button();
		_window.setLeftNavButton(_refresh_button);		
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
