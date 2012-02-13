var database = function( video ) {

	var _self = this;
	var _db = '';
	var _rows = '';

	/*
	 * Generic Data functions:
	 * 		open / close
	 */
	var _init = function() {
		Ti.Database.install( '/KAD.sqlite', 'KAD' );
		_db = Ti.Database.open( 'KAD' );
	};

	var _close = function() {
		_db.close();
	};
	
	var _close_rows = function() {
		_rows.close();	
	};
	
	/*
	 * Additional functions:
	 */
	var _insert_video = function( video ) {
		_db.execute( "INSERT INTO videos (id, url, description, topic_id, standalone_title) VALUES(?,?,?,?,?)", 
			video['youtube_id'], video['url'], video['description'], video['topic_id'], video['standalone_title'] );
		return _db.lastInsertRowId;
	};
	
	var _get_topics = function() {
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
		return topics;
	};
	
	var _get_videos_by_topic_id = function( topic_id ) {
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
		return videos;		
	}
	
	return {// publicly accessible API
		init: function() {
			return _init();
		},
		db : function() {
			return _db();
		},
		insert_video: function( video ) {
			return _insert_video( _insert_video ); 
		},
		get_topics: function() {
			return _get_topics();
		},
		get_videos_by_topic_id: function( topic_id ) {
			return _get_videos_by_topic_id( topic_id );
		}
	};
};
