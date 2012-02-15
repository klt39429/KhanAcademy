khan_academy = {};

Ti.include( "controls/include.js" );
Ti.include( "windows/include.js" );
Ti.include( "utils.js" );

my_app = {
	
	// additional view
	activity_indicator: new khan_academy.activity_indicator(),

	// the main 3 windows
	download_window: new khan_academy.download_window(),
	browse_window: new khan_academy.browse_window(),
	archive_window: new khan_academy.archive_window(),
	
	// subsequently loaded window
	browse_videos_window: new khan_academy.browse_videos_window(),
	archive_videos_window: new khan_academy.archive_videos_window(),
	
	// the main window with tab group
	main_window : new khan_academy.main_window()
};

my_app.activity_indicator.init();

my_app.download_window.init();
my_app.browse_window.init();
my_app.archive_window.init();

my_app.browse_videos_window.init();
my_app.archive_videos_window.init();

my_app.main_window.init();

