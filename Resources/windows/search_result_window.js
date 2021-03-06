khan_academy.search_result_window = function() {
	var _window, _listview, _detailview, _tabbar;
	
	var _init = function() {
		_window = control_factory.create_window({
			'title': 'Search Results'
		});
		
		_searchbar = control_factory.create_searchbar();

		_listview = new ListView();
		_detailview = new DetailView();
		_window.add(_detailview);
		_window.add(_listview);

		_tabbar = _create_tabbar();
		_window.setTitleControl(_tabbar);
	};
	
	var _create_tabbar = function() {
		_tabbar = Titanium.UI.iOS.createTabbedBar({
			labels: ['List', 'Details'],
			index: 0,
			style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
			backgroundColor: '#5E8C1B'
		});

		// Click event for tabbar
		_tabbar.addEventListener('click', function(e) {
			if (0 === e.index) {
				_window.animate({view: _listview, 
					transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
				});
			} else if (1 === e.index) {
				_window.animate({view: _detailview, 
					transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
				});
			}
		});

		return _tabbar;
	};

	var _update = function( data ) {
		_listview.update(data);
		_detailview.update(data);
	};

	return {// publicly accessible API

		init : function() {
			return _init();
		},
		update: function( data ) {
			return _update( data );
		},
		get_window : function() {
			return _window;
		}
	};
};

var ListView = function() {
	_listview = Titanium.UI.createTableView({
		searchHidden: true,
		filterAttribute: 'filter'
	});

	var _create_row = function(brand) {
		var _image = Ti.UI.createImageView({
			top: 10,
			bottom: 10,
			left: 10,
			right: 10,
			image: brand.logos.full
		});

		var _row = Ti.UI.createTableViewRow({
			height: 80
		});
		_row.addEventListener('click', function() {
			Titanium.Platform.openURL(brand.urls.conversion_url);
		});
		_row.add(_image);
		return _row;
	};

	_listview.update = function( data ) {
		var rows = [];
		for (var i in data.results) {
			rows.push(_create_row(data.results[i].Brand));
		}
		_listview.setData( rows );
	};

	return _listview;
};

var DetailView = function() {
	var _detailview = Titanium.UI.createScrollableView({
		showPagingControl:true,
		backgroundColor: 'white',
		pagingControlHeight:15,
		pagingControlAlpha: 0.5,
		currentPage:0
	});

	var _create_view = function( brand ) {
		var _label = Ti.UI.createLabel({
			top: khan_academy.dv('scroll_view_space'),
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			font: {fontSize: khan_academy.dv('scroll_view_title_font'), fontWeight: 'bold'},
			color: '#C04C80',
			left: 10,
			right: 10,
			text: brand.name
		});
		var _image = Ti.UI.createImageView({
			top: khan_academy.dv('scroll_view_space'),
			left: khan_academy.dv('scroll_view_image_offset'),
			right: khan_academy.dv('scroll_view_image_offset'),
			image: brand.logos.full
		});
		_image.addEventListener('click', function() {
			Titanium.Platform.openURL(brand.urls.conversion_url);
		});
		var _description = Ti.UI.createTextArea({
			top: khan_academy.dv('scroll_view_space'),
			editable: false,
			backgroundColor: 'transparent',
			left: 10, 
			right: 10,
			font: {fontSize: 14, fontWeight: 'normal'},
			color: '#445555',
			value: brand.short_description.decode_html()
		});
		_learn_more = Ti.UI.createButton({
			top: khan_academy.dv('scroll_view_space'),
			bottom: khan_academy.dv('scroll_view_space'),
			title : 'Learn More',
			height : 45,
			left: 10,
			right: 10,
			backgroundImage: '/images/btn_bg.png',
			color: '#C04C80',
			font: {fontSize: 18, fontWeight: 'bold'}
		});
		_learn_more.addEventListener('click', function() {
			Titanium.Platform.openURL(brand.urls.conversion_url);
		});

		var _view = Ti.UI.createScrollView({
			top: 'auto',
			bottom: 'auto',
			layout: 'vertical',
			scrollabe: true,
			backgroundColor: 'white',
			left: khan_academy.dv('scroll_view_offset'),
			right: khan_academy.dv('scroll_view_offset')
		});
		_view.add(_label);
		_view.add(_image);
		_view.add(_description);
		_view.add(_learn_more);
		return _view;
	};

	_detailview.update = function( data ) {
		var _views = [];
	
		for (var i in data.results) {
			_views.push(_create_view(data.results[i].Brand));
		}
		_detailview.views = _views;
	};
	
	return _detailview;
};
