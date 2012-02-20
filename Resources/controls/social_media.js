var social_media = ( function() {
	
	var _window_popup, _twitter_button, _facebook_button;
	var _video;
	
	var _update_twitter = function() {

		var str = 'url=' + _video['download_url'];
		str += '&text=Check out this awesome video: ' + _video['title']; 
		str += '&hashtags=KhanAcademy,EthanDev';
		//str += '&via=http://www.ethandev.com/khanacademy';
		
		var web_view = Titanium.UI.createWebView({
			url:'https://twitter.com/intent/tweet?' + str
		});
	
		var twitter_popup = new modal_popup( 0.9,1 );
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
	
	var _update_facebook = function() {
	    var data = {
		    name: _video['title'],
		    //message: 'Check out this awesome educational material',
		    caption: _video['title'],
		    picture: _video['image_url'],
		    //description: _video['decsription'],
		    link: _video['ka_url']
		};
		
		Titanium.Facebook.dialog("feed", data, function(e) {
			Titanium.Facebook.logout();
		    if (e.success && 0 == e.cancelled) {
		        alert("Message uploaded successfully on Facebook");
		    } 
		    else if (e.error) {
				alert(e.error);
		    }
		});
	};
	
	var _create_twitter_button = function() {
		_twitter_button = Ti.UI.createButton({
			backgroundImage: '/images/twitter.png',
			width: 70,
			height: 70,
			top: "auto",
			bottom: "auto",
			left: 10
		});
		_twitter_button.addEventListener( 'click', _update_twitter );
	};
	
	var _create_facebook_button = function() {
	
		_facebook_button = Ti.UI.createButton({
			backgroundImage: '/images/facebook.png',
			width: 70,
			height: 70,
			top: "auto",
			bottom: "auto",
			right: 10
		});
		_facebook_button.addEventListener( 'click', _update_facebook );
	};
	
	
	
	var _init = function() {
		
		Titanium.Facebook.appid = "234919916599478";
		
		_create_twitter_button();
		_create_facebook_button();
		
		_window_popup = new modal_popup( 0.2, 0.6 );
		_window_popup.init();
		
		_window_popup.add_item( _twitter_button );
		_window_popup.add_item( _facebook_button );
	}
	
	var _open = function( video ) {
		Titanium.API.info( video );
		_video = video;
		_window_popup.open();
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