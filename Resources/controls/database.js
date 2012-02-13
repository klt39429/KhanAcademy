var database = ( function() {

	Ti.Database.install( '/KAD.sqlite', 'KAD' );
	
	var _self = this;
	var _db = '';
	var _rows = '';

	/*
	 * Generic Data functions:
	 * 		open / close
	 */
	var _init = function() {
		_db = Ti.Database.open( 'KAD' );
	};

	var _close = function() {
		_db.close();
		delete _db;
		delete _rows;
	};
	
	/*
	 * Additional functions:
	 */
	var _insert_video = function( video ) {
		_init();
		Titanium.API.info( video );
		_db.execute( "INSERT INTO videos (id, title, url, description, topic_id, standalone_title) VALUES(?,?,?,?,?,?)", 
			video['youtube_id'],  video['title'], video['url'], video['description'], video['topic_id'], video['standalone_title'] );
		_close();
	};
	
	var _get_topics = function() {
		_init();
		_rows = _db.execute("SELECT DISTINCT topic_id, standalone_title FROM videos");
	
		var topics = [];
		
		while ( _rows.isValidRow() ) {
			topics.push({
				'topic_id' : _rows.fieldByName( 'topic_id' ),
				'standaline_title' : _rows.fieldByName( 'standalone_title' )
			});
			_rows.next();
		} 
	
		_rows.close();
		_close();
		return topics;
	};
	
	var _get_videos_by_topic_id = function( topic_id ) {
		_init();
		_rows = db.execute( "SELECT * FROM videos WHERE topic_id = ?", topic_id );
		
		var videos = [];
		
		while ( _rows.isValidRow() ) {
			videos.push({
				'id' : _rows.fieldByName( 'id' ),
				'url' : _rows.fieldByName( 'url' ),
				'description' : _rows.fieldByName( 'description' ),
				'topic_id' : _rows.fieldByName( 'topic_id' ),
				'standaline_title' : _rows.fieldByName( 'standalone_title' )
			});
			_rows.next();
		} 
	
		_rows.close();
		_close();
		return videos;		
	}
	
	return {// publicly accessible API
		insert_video: function( video ) {
			return _insert_video( video ); 
		},
		get_topics: function() {
			return _get_topics();
		},
		get_videos_by_topic_id: function( topic_id ) {
			return _get_videos_by_topic_id( topic_id );
		}
	};
}) ();
