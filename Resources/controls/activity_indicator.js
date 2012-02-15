khan_academy.activity_indicator = function() {

	var _self = this;
	var _window, _view, _act_ind;

	var _init = function() {
		// Create window
		_window = Titanium.UI.createWindow({
		});

		_act_ind = Titanium.UI.createActivityIndicator({
			style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
			message: 'Loading ...',
			color: 'white',
			font:{fontFamily:'Arial', fontSize:18, fontWeight:'bold'},
			height: '100%',
			width: 'auto'
		});

		_view = Titanium.UI.createView({
			width: '100%',
			height: '100%',
			opacity: 0.75,
			backgroundColor: 'black'
		});
		_view.add( _act_ind );
		_window.add( _view );	
	};
	
	var _open = function() {
		_window.open();
		_act_ind.show();	
	};
	
	var _close = function() {
		_act_ind.hide();
		_window.close();
	};
	
	return {// publicly accessible API
		init: function() {
			return _init();
		},
		close: function(){
			return _close();
		},
		open: function(){
			return _open();
		},
		get_window : function() {
			return _window;
		}
	};
};
