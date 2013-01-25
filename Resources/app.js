khan_academy = {};
Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK;

Ti.include( "controls/include.js" );
Ti.include( "windows/include.js" );
Ti.include( "utils.js" );

my_app = {
	
	// additional view
	activity_indicator: new khan_academy.activity_indicator(),

	// the main 4 windows
	download_window: new khan_academy.download_window(),
	browse_window: new khan_academy.browse_window(),
	archive_window: new khan_academy.archive_window(),
	information_window: new khan_academy.information_window(),
	
	// subsequently loaded window
	browse_videos_window: new khan_academy.browse_videos_window(),
	archive_videos_window: new khan_academy.archive_videos_window(),
	
	// the main window with tab group
	main_window : new khan_academy.main_window(),
	
	// data manager
	data_manager: new khan_academy.data_manager()
};


var init_windows = function(){
	my_app.activity_indicator.init();
	
	my_app.download_window.init();
	my_app.browse_window.init();
	my_app.archive_window.init();
	my_app.information_window.init();
	
	my_app.browse_videos_window.init();
	my_app.archive_videos_window.init();
	
	my_app.main_window.init();	
};

// We will retrieve data at the beginning if not exists - to ensure that we always have it availalbe
// Other windows can only be loaded once the data is retrieved for the first time
my_app.data_manager.init();
my_app.data_manager.try_retrieve_data( init_windows, false );
