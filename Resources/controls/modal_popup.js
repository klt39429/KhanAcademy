var modal_popup = function(height_factor, width_factor){

	var self = this;
	var _window, _view, _close_button;
	
	var _close = function() {
		_window.close();
	}
	
	var _open = function() {
		_window.open();
	}
	
	var _move_close_button_inside = function() {
		_close_button.top = Ti.Platform.displayCaps.platformHeight * (1 - height_factor)/2 + 5; 
		_close_button.right = Ti.Platform.displayCaps.platformWidth * (1 - width_factor)/2 + 5;
	}
	
	var _init = function() {

		_view = Ti.UI.createImageView({
			borderWidth:1,
			borderRadius: 10,
			borderColor:'#FFF',
			width: Ti.Platform.displayCaps.platformWidth * width_factor,
			height: Ti.Platform.displayCaps.platformHeight * height_factor,
			backgroundColor : '#FFF'		
		});
		
		_close_button = Titanium.UI.createImageView({
			backgroundImage: '/images/close.png',
			top: Ti.Platform.displayCaps.platformHeight * (1 - height_factor)/2 - 40,
			right: Ti.Platform.displayCaps.platformWidth * (1 - width_factor)/2,
			width:25,
			height:25,
			zIndex:9999,
		});	
		_close_button.addEventListener("click", _close);
	
		_window = Ti.UI.createWindow({
			backgroundColor : '#40000000'	
		});
		_window.add( _close_button );
	
		_window.add(_view);
	}
	
	var _add_item = function( item ) {
		_view.add( item );
	}
	
	return {// publicly accessible API

		init : function() {
			return _init();
		},
		get_window : function() {
			return _window;
		},
		get_view : function() {
			return _view;
		},
		close: function() {
			return _close();
		},
		open: function() {
			return _open();
		},
		add_item : function( item ) {
			return _add_item( item );
		},
		move_close_button_inside : function() {
			return _move_close_button_inside();
		}
	};

}
