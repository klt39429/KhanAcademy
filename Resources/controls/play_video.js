var play_video = function( video ) {

	var _self = this;
	var _window = '';
	var _player = '';

	var _play = function() {
		// Close the pop up window, add the player to current window and play it
		_window.add( _player );
		_window.open(); 
		Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
		_player.play();	
	};
	
	var _init = function() {
		// Create window
		_window = '';
		_window = Titanium.UI.createWindow({
			orientationModes: [Titanium.UI.PORTRAIT,
				Titanium.UI.UPSIDE_PORTRAIT,
				Titanium.UI.LANDSCAPE_LEFT,
				Titanium.UI.LANDSCAPE_RIGHT,
				Titanium.UI.FACE_UP,
				Titanium.UI.FACE_DOWN]
		});
		
		// Create the player
		_player = Titanium.Media.createVideoPlayer({
			backgroundColor:'#000',
			autoplay:true,
			fullscreen:true,
			mediaControlStyle : Titanium.Media.VIDEO_CONTROL_DEFAULT,
			url: video
		});
		
		// Close window after playback is completed
		_player.addEventListener( 'fullscreen', function(e) { // When fullscreen status is changed.
			if ( false === e.entering ) { // User pressed 'done' or video finished.
				_player.stop();
				_window.close();
				delete _self;
			}
		});
	};
	
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
