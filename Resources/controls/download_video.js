var download_video = function( video ){

	var self = this;
	var _window;
	var _http_client;
	var _row, _indicator, _image, _title, _label_progress, _size_label;
	
	var _status;
	this.STATUS_PAUSED = 0;
	this.STATUS_DOWNLOADING = 1;
	this.STATUS_COMPLETED = 2;
	
	/*
	 * @input: length in bytes
	 * @ouput: either in MB or KB
	 */
	var _get_size_format = function( length ) {
		var size = length / 1024;
		if ( size < 1024 ) {
			return Math.round( size ) + " KB";
		}
		else {
			return ( Math.round( size / 1024 * 100 ) / 100 ) + " MB";
		}
	}
	
	/*
	 * Reduce the badge value
	 */
	var _reduce_badge = function() {
		var download_tab = my_app.main_window.get_tabgroup().tabs[2];
		if ( 1 == download_tab.badge || null == download_tab.badge ) {
			download_tab.setBadge( null );
		}
		else {
			download_tab.setBadge( download_tab.badge - 1 );
		}		
	};
	
	var _create_http_client = function() {
		
		_http_client = Titanium.Network.createHTTPClient();
		_http_client.setTimeout(10000);

		_http_client.onload = function(e)
		{
			Ti.API.info(_http_client.file);

			_reduce_badge();

			
			// GUI update
			_indicator.hide();
			_label_progress.text = "Download Completed";
			_size_label = Titanium.UI.createLabel({
				text: 'Size: ' + _get_size_format( _http_client.getResponseHeader('Content-Length') ),
				left: 5,
				color: '#445555',
				font: _label_progress.font,
				top: 10
			});
			_indicator.getParent().remove(_indicator);
			_indicator.getParent().add( _size_label );
			
			_status = self.STATUS_COMPLETED;

			// Save the video to the database
			var video_insert = video;
			video_insert.url =  video['download_urls']['mp4'].replace(/^.*[\\\/]/, '');
			database.insert_video( video_insert );
		};
		
		_http_client.ondatastream = function(e)
		{
			var length_format =  _get_size_format( e.progress * _http_client.getResponseHeader('Content-Length') );
			_label_progress.text = 'Downloaded: ' + length_format + " / " + _get_size_format(_http_client.getResponseHeader('Content-Length')); 
			
			_indicator.value = e.progress ;
		};
		
		_http_client.onerror = function(e)
		{
			Ti.UI.createAlertDialog({title:'Error', message:'The connection is lost.'}).show();
		};
		
		_http_client.open('GET',video['download_urls']['mp4']);
		_http_client.file = Titanium.Filesystem.getFile(
			Titanium.Filesystem.applicationDataDirectory + "../Library/Caches/"  + video['download_urls']['mp4'].replace(/^.*[\\\/]/, ''));
		_http_client.send();		
				
		_status = self.STATUS_DOWNLOADING;		
				
		return _http_client;
	}
	
	var _pause_download = function() {
		_http_client.abort();
		_status = self.STATUS_PAUSED;
		_label_progress.text = "Download paused";
	};
	
	/*
	 * stop = 
	 * 		abord download + remove the row
	 * 		delete self to free memory
	 */
	var _stop = function() {
		_http_client.abort();
		_reduce_badge();
		delete self;
	};
	
	var _resume_download = function() {
		_label_progress.text = "Resuming Download... ";
		_status = self.STATUS_DOWNLOADING;
		_create_http_client();
	}
	
	var _create_row = function() {
		
		// Pass stop function so it can be called from download_window
		_row = Titanium.UI.createTableViewRow({
			height: 'auto',
			stop: _stop
		});
		
		var image_outside_view = Titanium.UI.createView({
			backgroundColor: '#E4ECD5',
			top: 0,
			left: 0,
			width: 114,
			height: 80
		});
		_image = Titanium.UI.createImageView({
			image: video['download_urls']['png'],
			left: 'auto',
			right: 'auto',
			top: 'auto',
			bottom: 'auto', 
			width: 114
		});
		image_outside_view.add( _image );
		
		_title = Titanium.UI.createLabel({
			text: video['title'],
			top: 10,
			left: 5,
			height: 15,
			font:{fontSize:13, fontWeight:'bold'},
		});
		
		_indicator = Titanium.UI.createProgressBar({
			width:160,
			min:0,
			max:1,
			value:0,
			style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
			top:10,
			left: 5,
		});
		_indicator.show();
		
		_label_progress = Titanium.UI.createLabel({
			text: "",
			color: '#445555',
			top: 10,
			left: 5,
			height: 15,
			font:{fontSize:11, fontWeight:'normal'},			
		});
		

		var _right_view = Ti.UI.createView({
			left: 120,
			layout: 'vertical',
			right: 0,
			height: 80
		});
		_right_view.add( _title );
		_right_view.add( _indicator );
		_right_view.add( _label_progress );

		_row.add( image_outside_view );
		_row.add( _right_view );

		_row.addEventListener( 'click', function() {
			if ( self.STATUS_DOWNLOADING == _status ) {
				_pause_download();
			}
			else if ( self.STATUS_PAUSED == _status ) {
				_resume_download();
			}
		});
		
		return _row;
	};
	
	var _init = function() {
		_create_row();	
		_create_http_client();
	}
	
	return {// publicly accessible API

		init : function() {
			return _init();
		},
		get_row : function() {
			return _row;
		},
		get_status: function() {
			return _status;
		},
		get_http_client: function() {
			return _http_client;
		},
		stop: function() {
			return stop();	
		},
		status: function() {
			return _status;	
		}
	};

}
