khan_academy.archive_videos_window = function() {

	var _window = '';
	var _tableview = '';
	
	var _get_playlist_info = function( playlist_id ) {
		return database.get_videos_by_topic_id( playlist_id );
	}

	/*
	 * Play the video
	 */
	var _video_row_clicked = function( video ) {
		Ti.API.info(video['url']);
		var pv = new play_video( Titanium.Filesystem.applicationDataDirectory + video['url'] );
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
				hasChild: true
			});
			row.add(label);
			
			row.addEventListener('click', function(){
				if ( false == row.hasChild ) {
					alert( "This section does not have any videos" );
				}
				else {
					_video_row_clicked( video );
				}
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

	var _init = function() {
		_window = control_factory.create_window({
			'title': 'Videos'
		});
		_tableview = Titanium.UI.createTableView({
			style: 1
		});
		_window.add(_tableview);
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
