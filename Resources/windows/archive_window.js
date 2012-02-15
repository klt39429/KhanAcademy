khan_academy.archive_window = function() {

	var _window, _tableview, _refresh_button;
	
	var _get_playlists = function() {
		return database.get_topics();
	}

	var _open_archive_videos_window = function( topic_id ) {
		my_app.activity_indicator.open();
		my_app.archive_videos_window.update( topic_id );
		my_app.main_window.get_tabgroup().tabs[1].open(my_app.archive_videos_window.get_window());
		my_app.activity_indicator.close();
	};

	var _create_tableview_row = function( playlist ) {
		// Create row
		var label = Titanium.UI.createLabel({
			text: playlist['standalone_title'],
			height: 'auto',
			font: {
				fontSize: 18,
				fontWeight: 'bold'
			},
			top: 10,
			bottom: 10,
			left: 10,
			right: 20
		});
		var row = Titanium.UI.createTableViewRow({
			height: 'auto',
			hasChild: true,
			playlist_id: playlist['id'],
			filter: playlist['standalone_title']
		});
		
		// on row click, open browse videos window
		row.addEventListener('click', function() {
			_open_archive_videos_window( playlist['topic_id'] );
		});
		
		row.add(label);		
		return row;
	}

	var _update_tableview = function() {
		
		var playlists = _get_playlists();
		
		if ( null !== playlists ) {
			var rows = [];
			for ( i in playlists ) {
				rows.push( _create_tableview_row(playlists[i]) );
			}
						
			// Update TableViews
			_tableview.setData( rows );
		}
	}

	var _create_refresh_button = function() {
		_refresh_button = Titanium.UI.createButton({
			systemButton : Titanium.UI.iPhone.SystemButton.REFRESH
		});
		_refresh_button.addEventListener( 'click', function(){
			_update_tableview();	
		});
	};

	var _create_searchbar = function() {
		_searchbar = Titanium.UI.createSearchBar({
			barColor: '#5E8C1B',
			showCancel: false,
			hintText: 'search'
		});
		
		_searchbar.addEventListener('change', function(e){
			e.value;
		});
		_searchbar.addEventListener('return', function(e){
			_searchbar.blur();
		});		
		_searchbar.addEventListener('cancel', function(e){
			_searchbar.blur();
		});		
	};

	var _init = function() {
		_window = control_factory.create_window({
			'title': 'Archive'
		});

		_create_searchbar();

		_tableview = Titanium.UI.createTableView({
			search: _searchbar,
			searchHidden: true,
			filterAttribute: 'filter'

		});
		_update_tableview();
		_window.add(_tableview);
		
		_create_refresh_button();
		_window.setLeftNavButton(_refresh_button);
	};
	
	return {// publicly accessible API

		init : function() {
			return _init();
		},
		update_data: function() {
			return _update_tableview();
		},
		get_window : function() {
			return _window;
		},
		get_tableview : function() {
			return _tableview;
		}
	};
};
