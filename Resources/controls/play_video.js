var play_video = function( video ) {

	var _self = this;
	var _window = '';
	var _player = '';

	var _play = function() {
		// Close the pop up window, add the player to current window and play it
		_window.add( _player );
		_window.open(); 
		_player.play();	
	};
	
	var _init = function() {
		// Create window
		_window = '';
		_window = Titanium.UI.createWindow({
		});
		
		// Create the player
		_player = Titanium.Media.createVideoPlayer({
			backgroundColor:'#000',
			autoplay:true,
			fullscreen:true,
			movieControlMode:Titanium.Media.VIDEO_CONTROL_EMBEDDED,
			url: video
		});
		
		// Close window after playback is completed
        _player.addEventListener( 'fullscreen', function(e) { // When fullscreen status is changed.
        	Ti.API.info( "fullscreen mode changed" );
            if ( false == e.entering ) { // User pressed 'done' or video finished.
                _player.stop();
                _window.close();
                delete _self;
            }
        });
	}
	
	return {// publicly accessible API
		init: function() {
			return _init();
		},
		play : function() {
			return _play();
		},
		get_window : function() {
			return _window;
		}
	};
};
