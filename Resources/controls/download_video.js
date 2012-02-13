var download_video = function( video ){

	var self = this;
	var _window;
	var _http_client;
	var _row, _indicator, _image, _title, _status, _size_label;
	
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
	
	var _create_http_client = function() {
		
		_http_client = Titanium.Network.createHTTPClient();
		_http_client.setTimeout(10000);

		_http_client.onload = function(e)
		{
			Ti.API.info(_http_client.file);
			
			// Set badge
			var download_tab = my_app.main_window.get_tabgroup().tabs[2];
			if ( 1 == download_tab.badge || null == download_tab.badge ) {
				download_tab.setBadge( null );
			}
			else {
				download_tab.setBadge( download_tab.badge - 1 );
			}
			
			_indicator.hide();
			_status.text = "Download Completed";
			
			_size_label = Titanium.UI.createLabel({
				text: 'Size: ' + _get_size_format( _http_client.getResponseHeader('Content-Length') ),
				top: _status.top - 20,
				left: _status.left,
				height: _status.height,
				font: _status.font
			});
			_row.add( _size_label );
		};
		
		_http_client.ondatastream = function(e)
		{
			var length_format =  _get_size_format( e.progress * _http_client.getResponseHeader('Content-Length') );
			_status.text = 'Downloaded: ' + length_format + " / " + _get_size_format(_http_client.getResponseHeader('Content-Length')); 
			
			_indicator.value = e.progress ;
		};
		
		_http_client.onerror = function(e)
		{
			Ti.UI.createAlertDialog({title:'XHR', message:'Error: ' + e.error}).show();
		};
		
		_http_client.open('GET',video['download_urls']['mp4']);
		_http_client.file = Titanium.Filesystem.getFile(
			Titanium.Filesystem.applicationDataDirectory + video['download_urls']['mp4'].replace(/^.*[\\\/]/, ''));
		_http_client.send();		
				
		return _http_client;
	}
	
	var _create_row = function() {
		
		_row = Titanium.UI.createTableViewRow({
			height: 'auto'
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
		_row.add( image_outside_view );
		
		_title = Titanium.UI.createLabel({
			text: video['title'],
			top: 10,
			left: 130,
			height: 15,
			font:{fontSize:13, fontWeight:'bold'},
		});
		_row.add( _title );
		
		_indicator = Titanium.UI.createProgressBar({
			width:150,
			min:0,
			max:1,
			value:0,
			style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
			top:0,
			left: 130,
		});
		_row.add( _indicator );
		_indicator.show();
		
		_status = Titanium.UI.createLabel({
			text: "",
			top: 50,
			left: 130,
			height: 15,
			font:{fontSize:11, fontWeight:'normal'},			
		});
		_row.add( _status );
		
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
		}
	};

}