khan_academy.browse_videos_window = function() {

	var _window = '';
	var _tableview = '';
	
	var _get_playlist_info = function( playlist_id ) {
		Titanium.API.info( playlist_id );
		var file_name = '/data/library_list.json';
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, file_name);
 
		if (file.exists()) {
  			playlist_infos = JSON.parse(file.read());
  			
  			for ( i in playlist_infos ) {
  				if ( playlist_infos[i]['id'] == playlist_id ) {
  					return playlist_infos[i];
  				}
  			}
  			return null
		}
		else {
			return null;
		}
	}

	var _table_header_section = function( playlist_info ) {

		var header_label = Titanium.UI.createLabel({
			text: playlist_info['standalone_title'],
			height: 'auto',
			font: {
				fontSize: 14,
				fontWeight: 'bold'
			},
			color: 'red',
			top: 8,
			left: 10
		});
		
		var content_label = Titanium.UI.createLabel({
			text: playlist_info['description'],
			height: 'auto',
			font: {
				fontSize: 12
			},
			top: 34,
			left: 20,
			right: 10,
			bottom: 10
		});
		
		var row = Titanium.UI.createTableViewRow({
			height: 'auto'
		})
		row.add(header_label);
		row.add(content_label);
		
		var section = Titanium.UI.createTableViewSection();
		section.add(row);		
		
		return section;
	}

	/*
	 * Show options to WATCH or DOWNLOAD
	 */
	var _video_row_clicked = function( video ) {
		
		var video_option = new modal_popup( 0.3, 0.8 );
		video_option.init();
		
		// Download the movie
		var download_button = Titanium.UI.createButton({
			'title' : 'Download',
			'left' : 'auto',
			'right' : 'auto',
			'width' : 200,
			'height': 40,
			'top' : 20
		});

		// Watch the movie
		var watch_button = Titanium.UI.createButton({
			'title' : 'Watch',
			'left' : 'auto',
			'right' : 'auto',
			'width' : 200,
			'height': 40,
			'bottom' : 20
		});
		watch_button.addEventListener( 'click', function(){
			var active_movie = Titanium.Media.createVideoPlayer({
				backgroundColor:'#000',
				//movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
				//scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
				autoplay:true,
				fullscreen:true,
				url: video['download_urls']['mp4']
			});
			active_movie.addEventListener( 'complete', function(){
				_window.remove( active_movie );
			});
			
			// Close the pop up window, add the player to current window and play it
			video_option.close();
			_window.add( active_movie ); 
			active_movie.play();
		});
		
		video_option.add_item( watch_button );
		video_option.add_item( download_button );
		video_option.open();
	};

	var _table_content_section = function( playlist_info ) {
		
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
				_video_row_clicked(video);
			});
			
			return row;
		}
		
		var videos = playlist_info['videos'];
		var section = Titanium.UI.createTableViewSection();
		
		for ( i in videos ) {
			section.add( _create_content_row(videos[i]) );
		}
					
		return section;
	}

	var _update_tableview = function( playlist_info ) {
		_tableview.setData([
			 _table_header_section( playlist_info ),
			 _table_content_section( playlist_info )	
		]);
	}

	var _init = function() {
		_window = Titanium.UI.createWindow({
			title : 'Videos'
		});
		_tableview = Titanium.UI.createTableView({
			style: 1
		});
		_window.add(_tableview);
	};
	
	var _update = function( playlist_id ) {
		var playlist_info = _get_playlist_info( playlist_id );
		
		_window.setTitle( playlist_info['standalone_title'] );
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
