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
	
	/*
	 * Create edit and cancel buttons for tableview
	 * to be displade on rightNav
	 */
	var _create_editting_buttons = function( _tableview, _window ){
		_edit_button = Titanium.UI.createButton({
			title:'Edit'
		});
		_edit_button.addEventListener('click', function(){
			_window.setRightNavButton(_cancel_button);
			_tableview.editing = true;
		});
		
		_cancel_button = Titanium.UI.createButton({
			title:'Done',
			style:Titanium.UI.iPhone.SystemButtonStyle.DONE
		});
		_cancel_button.addEventListener('click', function(){
			_window.setRightNavButton(_edit_button);
			_tableview.editing = false;
		});
		
		_window.setRightNavButton(_edit_button);		
	}

	var _init = function() {
		_window = '';
		_window = control_factory.create_window({
			'title': 'Downloads'
		});
		
		_create_tableview();
		_create_editting_buttons( _tableview, _window );
		_window.add(_tableview);
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
