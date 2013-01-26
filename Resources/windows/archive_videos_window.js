khan_academy.archive_videos_window = function() {

	var _window = '', _tableview = '', _edit_button, _cancel_button, _searchbar;
	
	/*
	 * Get a list of videos from this playlist
	 * Sort it according to the library order
	 */
	var _get_playlist_info = function( playlist_id ) {
		var playlist_info = my_app.data_manager.get_playlist_info( playlist_id ),
			videos = database.get_videos_by_topic_id( playlist_id ),
			videos_by_id = {},
			sorted_videos = [],
			youtube_id = '';

		// Try to sort the videos;
		try {
			for (i=0; i<videos.length; i++) {
				videos_by_id[videos[i].id] = videos[i];
			}

			for (i=0; i<playlist_info.videos.length; i++) {
				youtube_id = playlist_info.videos[i].youtube_id || '';
				if (videos_by_id.hasOwnProperty(youtube_id)) {
					sorted_videos.push(videos_by_id[youtube_id]);
					delete videos_by_id[youtube_id];
				}
			}
			for (var i in videos_by_id) {
				sorted_videos.push(videos_by_id[i]);
			}

			return sorted_videos;
		} catch(err) {
			return videos;
		}

	};

	/*
	 * Delete a row from table:
	 * 		remove it from sqllite3
	 * 		delete the file
	 * @input: video_url is filename on local phone
	 */
	var _remove = function( video_url ) {
		// remove file from database
		database.delete_video_by_url( video_url );
		
		// remove file from local
		var video_file = Titanium.Filesystem.getFile( Titanium.Filesystem.applicationDataDirectory + "../Library/Caches/", video_url );
		if ( video_file.exists() ){
			video_file.deleteFile();
		}
	};

	/*
	 * Play the video
	 */
	var _video_row_clicked = function( video ) {
		Ti.API.info(video['url']);
		var pv = new play_video( Titanium.Filesystem.applicationDataDirectory + "../Library/Caches/"  +  video['url'] );
		pv.init();
		pv.play();
	};

	var _table_content_section = function( playlist ) {

		var _create_content_row = function( video ) {
			
			// Create row
			var label = Titanium.UI.createLabel({
				text: video['title'],
				height: 'auto',
				font: {
					fontSize: 14,
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
				video_url: video['url'],
				remove_video: _remove,
				filter: video['title']
			});
			row.add(label);
			
			row.addEventListener('singletap', function(){
				if ( false === row.hasChild ) {
					alert( "This section does not have any videos" );
				}
				else {
					_video_row_clicked( video );
				}
			});
			
			row.addEventListener('longpress', function(){
				social_media.open( video );
			});			
			
			return row;
		}
		
		var section = Titanium.UI.createTableViewSection();
		
		for ( i in playlist ) {
			section.add( _create_content_row( playlist[i]) );
		}
					
		return section;
	}

	var _update_tableview = function( playlist_info ) {
		_tableview.setData([
			 _table_content_section( playlist_info )	
		]);
	}

	var _create_tableview = function() {
		_tableview = Titanium.UI.createTableView({
			style: 1,
			editable: true,
			allowsSelectionDuringEditing: true,
			search: _searchbar,
			searchHidden: true,
			filterAttribute: 'filter'
		});
		
		_tableview.addEventListener( 'delete', function(e){
			e.row.remove_video(e.row.video_url);
		});
	};

	var _init = function() {
		_window = control_factory.create_window({
			'title': 'Videos'
		});
	
			
		_searchbar = control_factory.create_searchbar();
		_create_tableview();
		_window.add(_tableview);
		
		control_factory.create_editting_buttons( _edit_button, _cancel_button, _tableview, _window);
	};
	
	var _update = function( playlist_id ) {
		var playlist_info = _get_playlist_info( playlist_id );
		
		_window.setTitle( playlist_info[0]['standalone_title'] );
		_update_tableview( playlist_info );
	}
	
	return {// publicly accessible API

		init : function() {
			return _init();
		},
		update: function( playlist_id ) {
			return _update( playlist_id );
		},
		get_window : function() {
			return _window;
		},
		get_tableview : function() {
			return _tableview;
		}
	};
};
