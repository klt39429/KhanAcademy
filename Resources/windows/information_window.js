khan_academy.information_window = function() {

	var HeaderView = function(text) {
		var view = Ti.UI.createView({
			height: 40
		});
		var label = Ti.UI.createLabel({
			top: 10,
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			font: {fontSize: 25, fontWeight: 'bold'},
			color: '#C04C80',
			text: text
		});
		view.add(label);
		return view;
	};

	var text_row = function(text) {
		var row = Titanium.UI.createTableViewRow({
		});
		var label = Ti.UI.createTextArea({
			editable: false,
			backgroundColor: 'transparent',
			left: 10, 
			right: 10,
			bottom: 10,
			font: {fontSize: 14, fontWeight: 'normal'},
			color: '#445555',
			value: text
		});
		label.autoLink = Ti.UI.AUTOLINK_ALL;
		row.add(label);
		return row;
	};
	
	var AcademyView = function() {
		var table_view = Ti.UI.createTableView({
			headerView: new HeaderView('About Khan Academy'),
			separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
			separatorColor: 'transparent'
		});
		var content = [
			"A free world-class education for anyone anywhere.",
			"The Khan Academy is an organization on a mission. We're a not-for-profit with the goal of changing education for the better by providing a free world-class education to anyone anywhere.",
			"All of the site's resources are available to anyone. It doesn't matter if you are a student, teacher, home-schooler, principal, adult returning to the classroom after 20 years, or a friendly alien just trying to get a leg up in earthly biology. The Khan Academy's materials and resources are available to you completely free of charge."
		];

		row_data = [];
		for (var i=0; i<content.length; i++) {
			row_data.push(text_row(content[i]));
		}
		table_view.setData(row_data);

		return table_view;
	};

	var ArchiverView = function() {
		var table_view = Ti.UI.createTableView({
			headerView: new HeaderView('About Khan Archiver'),
			separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
			separatorColor: 'transparent'
		});
		var content = [
			"This app is not an official app for KhanAcademy.com nor does it have any affiliations with KhanAcademy.",
			"Khan Archiver is completely free. It is a product of my admiration towards KhanAcademy's invaluable educational resources. (They are so awesome that they were featured on TED talk and backed by Bill Gates)",
			"The app simply retrieves library and videos from KhanAcademy and puts it into mobile app for easier access on the go.",
			"For comments or feedbacks, please follow:\nhttp://www.ethandev.com/khan-archiver\nkhoi@ethandev.com",
			"It's also open source and available at:\nhttps://github.com/klt39429/KhanAcademy/.\nFeel free to clone or branch. Let me know if you want me to give you write authorization (using Titanium/Appcelerator)."
		];

		row_data = [];
		for (var i=0; i<content.length; i++) {
			row_data.push(text_row(content[i]));
		}
		table_view.setData(row_data);

		return table_view;
	};

	var _init = function() {
		_window = control_factory.create_window({
			'title': 'Information'
		});

		var _academy_view = new AcademyView(),
			_archiver_view = new ArchiverView();

		var _scroll_view = Titanium.UI.createScrollableView({
			views:[_archiver_view, _academy_view],
			showPagingControl:true,
			pagingControlHeight:15,
			pagingControlAlpha: 0.5,
			currentPage:0
		});
		_window.add(_scroll_view);
	};
	
	return {// publicly accessible API

		init : function() {
			return _init();
		},
		get_window : function() {
			return _window;
		}
	};
};


