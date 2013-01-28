khan_academy.main_window = function() {
	
	var _window = '';
	var _tabgroup = '';

	var _create_tabgroup = function() {
		
		_tabgroup = Titanium.UI.createTabGroup();

		var tab1 = Titanium.UI.createTab({
			icon : '/images/browse.png',
			title : 'Browse',
			window : my_app.browse_window.get_window()
		});
		_tabgroup.addTab(tab1);

		var tab2 = Titanium.UI.createTab({
			icon : '/images/archive.png',
			title : 'Archive',
			window : my_app.archive_window.get_window()
		});
		_tabgroup.addTab(tab2);

		var tab3 = Titanium.UI.createTab({
			icon : '/images/download.png',
			title : 'Downloads',
			window : my_app.download_window.get_window()
		});
		_tabgroup.addTab(tab3);

		var tab4 = Titanium.UI.createTab({
			icon : '/images/education.png',
			title : 'Education',
			window : my_app.education_window.get_window()
		});
		_tabgroup.addTab(tab4);

		var tab5 = Titanium.UI.createTab({
			icon : '/images/info.png',
			title : 'Information',
			window : my_app.information_window.get_window()
		});
		_tabgroup.addTab(tab5);
	};

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
