khan_academy.browse_videos_window = function() {

	var _window, _tableview, _searchbar, playlists_info;
	
	var _get_playlist_info = function( playlist_id ) {
		var playlist = my_app.data_manager.get_playlist_info( playlist_id ); 
		return playlist;
	}

	var _table_header_section = function( playlist_info ) {

		var header_label = Titanium.UI.createLabel({
			text: playlist_info.standalone_title.toCamelCase(),
			font: {
				fontSize: khan_academy.dv('title_font'),
				fontWeight: 'bold'
			},
			color: '#C04C80',
			left: khan_academy.dv('title_offset'),
			width: khan_academy.dv('title_width'),
			top: 10
		});
		
		var content_label = Titanium.UI.createLabel({
			text: playlist_info.description,
			font: {
				fontSize: khan_academy.dv('content_font')
			},
			color: '#445555',
			left: khan_academy.dv('content_offset'),
			width: khan_academy.dv('content_width'),
			bottom: 10
		});
		
		var row = Titanium.UI.createTableViewRow({
			height: Ti.UI.SIZE,
			layout: 'vertical'
		});
		row.add(header_label);
		row.add(content_label);
		
		var section = Titanium.UI.createTableViewSection({
			height: Ti.UI.SIZE,
			rows: [row]
		});
		
		return section;
	};

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
		
		var optionsDialogOpts = {
			options:['Download', 'Watch', 'Cancel'],
			cancel:2
		};
		var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);

		dialog.addEventListener('click',function(e) {
			switch (e.index) {
				case 0:
					_download_video( video );			
					break;
				case 1:
					var pv = new play_video( video.download_urls.mp4 );
					pv.init();
					pv.play();
					break;
				default:
					break;
			}
		});
		dialog.show();
	};

	var _table_content_section = function( playlist_info, downloaded_videos ) {
		
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
				color: (downloaded_videos.indexOf( video.youtube_id ) === -1) ? 'black' : 'blue',
				className: 'browse-video'
			});
			var row = Titanium.UI.createTableViewRow({
				height: 'auto',
				hasChild: ( undefined != video['download_urls'] 
						&&  undefined != video['download_urls']['mp4']),
				filter: video['title']
			});
			row.add(label);
			
			row.addEventListener('singletap', function(){
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

	var _update_tableview = function( playlist_info, downloaded_videos ) {
		_tableview.setData([
			_table_header_section( playlist_info ),
			_table_content_section( playlist_info, downloaded_videos )	
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
		var downloaded_videos = database.get_videos_by_topic_id( playlist_id );
		downloaded_videos = _.pluck(downloaded_videos, 'id');
		
		_window.setTitle( playlist_info.standalone_title.toCamelCase() );
		_update_tableview( playlist_info, downloaded_videos );
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
