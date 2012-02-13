khan_academy.main_window = function() {
	
	var _window = '';
	var _tabgroup = '';

	var _create_tabgroup = function() {
		
		_tabgroup = Titanium.UI.createTabGroup();

		var tab1 = Titanium.UI.createTab({
			icon : Titanium.UI.iPhone.SystemIcon.SEARCH,
			title : 'Browse',
			window : my_app.browse_window.get_window()
		});
		_tabgroup.addTab(tab1);

		var tab2 = Titanium.UI.createTab({
			icon : Titanium.UI.iPhone.SystemIcon.BOOKMARKS,
			title : 'Archive',
			window : my_app.archive_window.get_window()
		});
		_tabgroup.addTab(tab2);

		var tab3 = Titanium.UI.createTab({
			icon : Titanium.UI.iPhone.SystemIcon.DOWNLOADS,
			title : 'Downloads',
			window : my_app.download_window.get_window()
		});
		_tabgroup.addTab(tab3);
	}

	var _init = function() {
		_window = control_factory.create_window({
			'title': 'Khan Academy',
			'fullscreen': false
		});		
		_create_tabgroup();
		_tabgroup.open();
	};
	
	return {// publicly accessible API

		init : function() {
			return _init();
		},
		get_window : function() {
			return _window;
		},
		get_tabgroup : function() {
			return _tabgroup;
		}
		
	};

};
