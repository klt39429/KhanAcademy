var social_media = ( function() {
	
	var _window_popup, _twitter_button, _facebook_button, _dialog, _dialog_options;
	var _video;
	
	var _update_twitter = function() {

		var str = 'url=' + _video['download_url'];
		str += '&text=Check out this awesome video: ' + _video['title']; 
		str += '&hashtags=KhanAcademy,EthanDev';
		//str += '&via=http://www.ethandev.com/khanacademy';
		
		var web_view = Titanium.UI.createWebView({
			url:'https://twitter.com/intent/tweet?' + str
		});
	
		var twitter_popup;
		if ( Titanium.Platform.osname == 'iphone' ) {
			twitter_popup = new modal_popup( 0.9,1 );
		}
		else if ( Titanium.Platform.osname == 'ipad' ) {
			twitter_popup = new modal_popup( 0.6,0.6 );
		}
		twitter_popup.init();
		twitter_popup.move_close_button_inside();
		
		twitter_popup.add_item( web_view );
		twitter_popup.open();	
	
		web_view.addEventListener('load',function(e)
		{
			if (e.url.indexOf("twitter.com/intent/tweet/complete") != -1)
			{
				twitter_popup.close();
				_window_popup.close();
				twitter_popup = null;
			}
		});
	};
	
	/*
	 * Update Facebook
	 */
	var _update_facebook = function() {
		
		var data = {
		    link: _video['ka_url'],
		    name: _video['title'],
		    message: 'Check out this awesome educational material',
		    caption: _video['title'],
		    picture: _video['image_url'],
		    description: _video['decsription']
		};
		
		Titanium.Facebook.dialog( "feed", data, function(e) {
    		if ( e.success ) {
				alert( "Message uploaded successfully on Facebook");
    		}
    		else if ( e.error ){
    			alert( "Something went wrong. Please try it again");
    		}
		});		
	};

	var _init = function() {
		
		Titanium.Facebook.appid = "234919916599478";
		
		//
		// Pop up
		//
		_dialog_options = {
			options:['Facebook', 'Twitter', 'Cancel'],
			title:'Sharing via',
			cancel:2
		};
		_dialog = Titanium.UI.createOptionDialog(_dialog_options);
		_dialog.addEventListener('click',function(e) {
			switch (e.index) {
				case 0:
					_update_facebook();
					break;
				case 1:
					_update_twitter();
					break;
				default:
					break;
			}
		});
	};
	
	var _open = function( video ) {
		_video = video;
		_dialog.show();
	};
	
	var _close = function() {
		_window_popup.close();
	};
	
	return {
		init: function() {
			return _init();
		},
		open: function( video ) {
			return _open( video );
		},
		close: function() {
			return _close();
		}
	}
}) ();

social_media.init();
