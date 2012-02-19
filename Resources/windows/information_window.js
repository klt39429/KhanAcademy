khan_academy.information_window = function() {

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
			filter: playlist['standalone_title'] + " " + playlist['description'] + " " + playlist['tags'].join(" ")
		});
		
		// on row click, open browse videos window
		row.addEventListener('click', function() {
			_open_browse_videos_window( playlist['id'] );
		});
		
		row.add(label);		
		return row;
	}

	var _create_khan_academy_section = function() {
		
		var section = Titanium.UI.createTableViewSection({
			headerTitle: 'About KhanAcademy'
		});
		section.add(control_factory.create_description_row("A free world-class education for anyone anywhere."));
		section.add(control_factory.create_description_row("The Khan Academy is an organization on a mission. We're a not-for-profit with the goal of changing education for the better by providing a free world-class education to anyone anywhere."));
		section.add(control_factory.create_description_row("All of the site's resources are available to anyone. It doesn't matter if you are a student, teacher, home-schooler, principal, adult returning to the classroom after 20 years, or a friendly alien just trying to get a leg up in earthly biology. The Khan Academy's materials and resources are available to you completely free of charge."));
		
		return section;
	}

	var _create_khan_archiver_section = function() {
		
		var section = Titanium.UI.createTableViewSection({
			headerTitle: 'About Khan Archiver'
		});
		section.add(control_factory.create_description_row("This app is not an official app for KhanAcademy.com nor does it have any affiliations with KhanAcademy."));
		section.add(control_factory.create_description_row("Khan Archiver is completely free for purchase and free from advertisement. It is a product of my admiration towards KhanAcademy's invaluable educational resources. (They are so awesome that they were featured on TED talk and backed by Bill Gates)")); 
		section.add(control_factory.create_description_row("The app simply retrieves library and videos from KhanAcademy and puts it into mobile app for easier access on the go."));
		section.add(control_factory.create_description_row("To follow app updates or contribute, please visit:\nhttp://www.ethandev.com/khan-archiver"));
		section.add(control_factory.create_description_row("It's also open source and available at:\nhttps://github.com/klt39429/KhanAcademy/.\nFeel free to fork/clone/ or branch. Let me know if you want me to give you write authorization (using Titanium/Appcelerator)."));
		
		return section;
	}
	
	var _init = function() {
		_window = control_factory.create_window({
			'title': 'Information'
		});
		
		_searchbar = control_factory.create_searchbar();
		
		_tableview = Titanium.UI.createTableView({
			style: 1,
			data: [_create_khan_archiver_section(), _create_khan_academy_section()]
		});
		
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
