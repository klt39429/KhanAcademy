/*
 * Make a call to a url online
 */

var server_call = function( url, postdata, call_back_obj ) {
	
	var xhr;
	
	var _init = function(){
		
		xhr = Ti.Network.createHTTPClient({
			timeout:20000});
			
		xhr.call_back_obj = call_back_obj;
		
		xhr.open('GET',url);

		xhr.onload = function()
		{
			if (xhr.call_back_obj != null)
			{
				xhr.call_back_obj.onload( xhr.responseText );
			} 
		};
	
		
		xhr.onerror = function(e) 
		{
			if ((null != xhr.call_back_obj) && (null != xhr.call_back_obj.onerror))
			{
				xhr.call_back_obj.onerror(xhr.responseText);
			}
			else
			{
				alert(xhr.responseText);
			}
		};
		
		xhr.setRequestHeader('Cookie', Titanium.App.cookie);
		
	};    

	var _send_request = function() {
		xhr.send(postdata);
	};
	
	return {
		init: function(){
			return _init();
		},
		send_request: function(){
			return _send_request();
		}
	};
};