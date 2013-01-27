khan_academy.archive_window = function() {

	var _window, _refresh_button, _edit_button, _cancel_button;
	var _tableview, _tbindex, _last_char_code;
	
	var _get_playlists = function() {
		return database.get_topics();
	};

	/*
	 * Delete a row from table:
	 *     remove it from sqllite3
	 *     delete all files
	 * @input: topic_id
	 */
	var _remove = function( topic_id ) {
		// Select all records in table to delete local files
		var videos = database.get_videos_by_topic_id( topic_id );
		for ( var i in videos ) {
			// remove file from local
			var video_file = Titanium.Filesystem.getFile( Titanium.Filesystem.applicationDataDirectory + "../Library/Caches/", videos[i]['url'] );
			if ( video_file.exists() ){
				video_file.deleteFile();
			}
		}
		database.delete_videos_by_topic_id( topic_id );
	};

	var _open_archive_videos_window = function( topic_id ) {
		my_app.activity_indicator.open();
		my_app.archive_videos_window.update( topic_id );
		my_app.main_window.get_tabgroup().tabs[1].open(my_app.archive_videos_window.get_window());
		my_app.activity_indicator.close();
	};

	var _create_tableview_row = function( playlist, inx ) {
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

		//
		// Get title header
		//
		var this_char_code = playlist.standalone_title.toUpperCase().charCodeAt(0);
		if ( this_char_code < 65 || this_char_code > 90 ) this_char_code = 35;

		var row = Titanium.UI.createTableViewRow({
			height: 'auto',
			hasChild: true,
			topic_id: playlist.topic_id,
			filter: playlist.standalone_title,
			remove_topic: _remove
		});

		//
		// Set index
		//
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
			_open_archive_videos_window( playlist['topic_id'] );
		});
		
		row.add(label);		
		return row;
	}

	var _update_tableview = function() {
		
		var playlists = _get_playlists();
		
		if ( null !== playlists ) {
			var rows = [];
			_tbindex = [];
			_last_char_code = -1;
			for (var i in playlists) {
				rows.push( _create_tableview_row(playlists[i], i) );
			}
						
			// Update TableViews
			_tableview.setData( rows );
			_tableview.setIndex(_tbindex);
		}
	}

	var _create_refresh_button = function() {
		_refresh_button = Titanium.UI.createButton({
			systemButton : Titanium.UI.iPhone.SystemButton.REFRESH
		});
		_refresh_button.addEventListener( 'click', function(){
			_update_tableview();	
		});
	};

	var _create_tableview = function() {
		_tableview = Titanium.UI.createTableView({
			search: _searchbar,
			searchHidden: true,
			filterAttribute: 'filter',
			editable: true,
			allowsSelectionDuringEditing: true			
		});
		_tableview.addEventListener( 'delete', function(e){
			e.row.remove_topic( e.row.topic_id );
		});		
	};

	var _init = function() {
		_window = control_factory.create_window({
			'title': 'Archive'
		});

		_searchbar = control_factory.create_searchbar();

		_create_tableview();
		_update_tableview();
		_window.add(_tableview);
		
		_create_refresh_button();
		_window.setLeftNavButton(_refresh_button);
		
		control_factory.create_editting_buttons( _edit_button, _cancel_button, _tableview, _window);
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
