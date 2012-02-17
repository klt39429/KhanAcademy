khan_academy.download_window = function() {

	var _window = '', _tableview = '', _edit_button, _cancel_button;

	var _create_tableview = function() {
		_tableview = Titanium.UI.createTableView({
			editable: true,
			allowsSelectionDuringEditing: true
		});
		
		_tableview.addEventListener( 'delete', function(e){
			e.row.stop();
		});
	};

	var _init = function() {
		_window = '';
		_window = control_factory.create_window({
			'title': 'Downloads'
		});
		
		_create_tableview();
		_window.add(_tableview);
		
		control_factory.create_editting_buttons( _edit_button, _cancel_button, _tableview, _window);
	};
	
	
	return {// publicly accessible API

		init : function() {
			return _init();
		},
		get_window : function() {
			return _window;
		},
		get_tableview : function() {
			return _tableview;
		}
	};
};
