/*
 * Get new json library from server
 * Divide library into sub playlists
 * 
 * playlist.json: only playlist information (Algebra, Bio, ...)
 * library.json: a comprehensive of playlists - under each playlist contains all videos belong to it 
 */

khan_academy.data_manager = function() {

	var _folder_name, _library, _playlist, _data_dir, _res_dir, _data_folder, _activity_indicator;
	var _callback_func;
	
	var _init = function() {
		
		// CONFIGURATION DATA
		_folder_name = "data";
		
		_playlist = {
			name: "playlists.json",
			url: 'http://www.khanacademy.org/api/v1/playlists'};
		_library = {
			name: "library.json",
			url: 'http://www.khanacademy.org/api/v1/playlists/library/list'};
			
		_data_dir = Titanium.Filesystem.applicationDataDirectory;
		_res_dir = Titanium.Filesystem.resourcesDirectory;
		Ti.API.info( _data_dir );

		// Create data_folder if not exsits
		_data_folder = _create_data_folder();
		
		_activity_indicator = new khan_academy.activity_indicator();
		_activity_indicator.init();
	};

	/*
	 * If is_force = true --> always try to retrieve new data from server
	 * If not, check if data folder exists
	 * after all that, call _callback_func();
	 */
	var _try_retrieve_data = function( callback_func, is_force ) {
		
		_callback_func = callback_func;
		var file = Titanium.Filesystem.getFile( _data_folder.nativePath, _library['name'] );
		
		if ( is_force ) {
			_retrieve_data( _library['name'], _library['url'] );
		}
		else if ( !file.exists() ) { // copy file from resource folder
			var res_file = Titanium.Filesystem.getFile( _res_dir, _folder_name + "/" + _library['name'] );
			var data_file = Titanium.Filesystem.getFile( _data_folder.nativePath , _library['name'] );
			if (res_file.exists()) {
  				var content = res_file.read();
  				data_file.write( content );
  				_break_into_playlists( content );
  				_callback_func();
			}
		}
		else {
			_callback_func();
		}
	};

	/*
	 * Create data folder under Application Data folder
	 */
	var _create_data_folder = function() {
		var data_folder = Titanium.Filesystem.getFile( _data_dir, _folder_name );
		if( !data_folder.exists() ){
  			data_folder.createDirectory();
		}
		
		return Titanium.Filesystem.getFile( _data_dir, _folder_name );
	};
	
	/*
	 * Break the library into smaller files, each of which corresponds to a playlist
	 * id: file-name for the playlist
	 * videos: content of the file
	 * 
	 * One file playlists.json contains collective playlist_info-only
	 */
	var _break_into_playlists = function( library_text  ) {
		var lib_data = JSON.parse( library_text );
		var playlists_info = [];
		
		
		for ( var i in lib_data ) {
			var topic_file = Titanium.Filesystem.getFile( _data_folder.nativePath, lib_data[i]['id'] + ".json" );
			topic_file.write( JSON.stringify(lib_data[i]), false);
			
			// Push playlist info only to create playlist file
			delete lib_data[i]['videos'];
			playlists_info.push(lib_data[i]);
		}
		
		// write playlist info file
		var playlist_file = Titanium.Filesystem.getFile( _data_folder.nativePath, _playlist['name'] );
		playlist_file.write( JSON.stringify(playlists_info), false);
		
		_activity_indicator.close();
	}
		
	/*
	 * Get files from API to Application Data folder
	 */
	var _retrieve_data = function( file_name, file_url ) {
		
		_activity_indicator.open();

		var data_file = Titanium.Filesystem.getFile( _data_folder.nativePath, file_name );

		// call back object after receiving stuff from server		
		var call_back_obj = {
			onload: function( result ) {
				// write result to data file
				data_file.write( result, false );
				_break_into_playlists( result );
				_callback_func();
			},
			onerror: function( result ) {
				_activity_indicator.close();
				alert( result );
				_callback_func();
			}
		}

		// send request to Khan
		var sc = new server_call( file_url, null, call_back_obj );
		sc.init();
		sc.send_request();
	};

	/*
	 * get content of file and return in json format
	 */
	var _get_file_json = function( file_name ) {
		var file = Titanium.Filesystem.getFile( _data_folder.nativePath , file_name );
		
		if (file.exists()) {
  			return JSON.parse(file.read());
		}
		else {
			return null;
		}		
	};
		
	return {// publicly accessible API

		init: function( callback_func ) {
			return _init( callback_func );
		},
		retrieve_library: function(){
			return _retrieve_data( _library['name'], _library['url'] );
		},
		get_playlist_info: function( playlist_id ){
			return _get_file_json( playlist_id + ".json" );
		},
		get_all_playlists: function(){
			return _get_file_json( _playlist['name'] );
		},
		try_retrieve_data: function( callback_func, is_force ) {
			return _try_retrieve_data( callback_func, is_force );
		}
	};
};
