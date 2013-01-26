khan_academy.browse_videos_window = function() {

	var _window, _tableview, _searchbar, playlists_info;
	
	var _get_playlist_info = function( playlist_id ) {
		return my_app.data_manager.get_playlist_info( playlist_id ); 
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
			left: 10,
			width: 270
		});
		
		var content_label = Titanium.UI.createLabel({
			text: playlist_info['description'],
			height: 'auto',
			font: {
				fontSize: 12
			},
			top: 10 + header_label.height,
			left: 20,
			width: 260,
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
	 * Download single video
	 */
	var _download_video = function( video ) {
		// Set badge
		var download_tab = my_app.main_window.get_tabgroup().tabs[2];
		if ( null === download_tab.badge ) {
			download_tab.setBadge( 1 );
		}
		else {
			download_tab.setBadge( download_tab.badge + 1 );
		}
		
		// Set download window
		var dlv = new download_video( video );
		dlv.init();
		
		var tableview = my_app.download_window.get_tableview();
		if ( tableview.data.length === 0 ) {
			tableview.appendRow( dlv.get_row() );
		}
		else {
			tableview.insertRowBefore( 0, dlv.get_row() );
		}
	};

	/*
	 * Show options to WATCH or DOWNLOAD
	 */
	var _video_row_clicked = function( video ) {
		
		var video_option;
		
		if ( Titanium.Platform.osname == 'iphone' ) {
			video_option = new modal_popup( 0.3, 0.8 );
		}
		else if ( Titanium.Platform.osname == 'ipad' ) {
			video_option = new modal_popup( 0.15, 0.4 );
		}
		
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
		download_button.addEventListener( 'click', function() {
			_download_video( video );			
			video_option.close();
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
			video_option.close();
			var pv = new play_video( video['download_urls']['mp4'] );
			pv.init();
			pv.play();
		});
		
		video_option.add_item( watch_button );
		video_option.add_item( download_button );
		video_option.open();
	};

	var _table_content_section = function( playlist_info ) {
		
		var _create_content_row = function( video ) {
			// append topic information
			video.topic_id = playlist_info['id'];
			video.standalone_title = playlist_info['standalone_title'];
			
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
				right: 20,
				className: 'browse-video'
			});
			var row = Titanium.UI.createTableViewRow({
				height: 'auto',
				hasChild: ( undefined != video['download_urls'] 
						&&  undefined != video['download_urls']['mp4']),
				filter: video['title']
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
			
			row.addEventListener('longpress', function(){
				var social_media_video = {
					'title': video['title'],
					'image_url': video['download_urls']['png'],
					'description': video['description'],
					'ka_url': video['ka_url']
				};
				social_media.open( social_media_video );
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
	};

	var _create_download_all_button = function() {
		var download_all = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.ORGANIZE
		});

		download_all.addEventListener('click', function() {
			utils.confirm_message('Download All', 'Are you sure that you want to download all videos in this topic?', function() {
				for ( var i in playlist_info.videos ) {
					_download_video( playlist_info.videos[i] );
				}
			});
		});

		return download_all;
	};

	var _init = function() {
		_window = control_factory.create_window({
			'title': 'Videos'
		});
		
		_searchbar = control_factory.create_searchbar();

		_tableview = Titanium.UI.createTableView({
			style: 1,
			search: _searchbar,
			searchHidden: true,
			filterAttribute: 'filter'
		});
		_window.setRightNavButton(_create_download_all_button());
		_window.add(_tableview);
	};
	
	var _update = function( playlist_id ) {
		playlist_info = _get_playlist_info( playlist_id );
		
		_window.setTitle( playlist_info.standalone_title );
		_update_tableview( playlist_info );
	};

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
