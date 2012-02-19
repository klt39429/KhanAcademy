var control_factory = new Object();

/***********************************************************************
 * Create edit button / done button for tableview to delete rows
 * Pass by refrence and it change the two buttons variable
 * windows and tableviews are also passed along
 ***********************************************************************/
control_factory.create_editting_buttons = function( _edit_button, _cancel_button, _tableview, _window ) {
	_edit_button = Titanium.UI.createButton({
		title:'Edit'
	});
	_edit_button.addEventListener('click', function(){
		_window.setRightNavButton(_cancel_button);
		_tableview.editing = true;
	});
	
	_cancel_button = Titanium.UI.createButton({
		title:'Done',
		style:Titanium.UI.iPhone.SystemButtonStyle.DONE
	});
	_cancel_button.addEventListener('click', function(){
		_window.setRightNavButton(_edit_button);
		_tableview.editing = false;
	});
	
	_window.setRightNavButton(_edit_button);		
}

/***********************************************************************
 * Create search bar
 ***********************************************************************/
control_factory.create_searchbar = function() {
	var _searchbar = Titanium.UI.createSearchBar({
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
	
	return _searchbar;
}

/***********************************************************************
 * Add @params to @control like: width, height, title...
 * The key in params element has to match with control property
 ***********************************************************************/
control_factory.addParams = function(control, params) {
	
	for (var item in params) {
		control[item] = params[item];
	}

	return control;
}

/***********************************************************************
 * Create universial text field
 * With built-in params
 ***********************************************************************/
control_factory.createTextField = function(params) {
	
	var textfield = Ti.UI.createTextField({  
	    
	    color:'#336699',  

	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});
	
	return control_factory.addParams(textfield, params);  
}

/***********************************************************************
 * Create universial window
 * With built-in params
 ***********************************************************************/
control_factory.create_window = function(params){
	
	var win = Titanium.UI.createWindow({
		'barColor' : '#5E8C1B'  
	});

	return control_factory.addParams(win, params);
}

/***********************************************************************
 * Create universial button
 * With built-in params
 ***********************************************************************/
control_factory.createButton = function(params){
	
	var button = Titanium.UI.createButton({ });

	return control_factory.addParams(button, params);
}

/***********************************************************************
 * Create universial tab
 * With built-in params
 ***********************************************************************/
control_factory.createTab = function(params){
	
	var tab = Titanium.UI.createTab({  });

	return control_factory.addParams(tab, params);
}


/***********************************************************************
 * Create universial view
 * With built-in params
 ***********************************************************************/
control_factory.createView = function(params){
	
	var view = Titanium.UI.createView({  });

	return control_factory.addParams(view, params);
}

/***********************************************************************
 * Create universial label
 * With built-in params
 ***********************************************************************/
control_factory.createLabel = function(params){
	
	var label = Titanium.UI.createLabel({  });

	return control_factory.addParams(label, params);
}

/***********************************************************************
 * Create a profile panel that is shared by many views 
 ***********************************************************************/
control_factory.createProfilePanel = function(params){
	
	var imgProfile = Ti.UI.createView({
		backgroundImage: '../images/vaughn_blake.png',
		backgroundColor:"#000",
		borderWidth:3,
		borderColor:'#FFF',
		top:5,
		bottom:5,
		left:10,
		width: 90,
		heigth: 90,
		zIndex:1,
		borderRadius: 5
	});

	var lblName = control_factory.createLabel( new Object({
						'text' 	: 'Vaughn Blake',
						'top'		: 18,
						'left'  	: 120,
						'height'	: 25,
						'font' 		: {fontSize:20},
						'color'		: '#fff'
	}));
	
	var viewHeader = control_factory.createView( new Object({
						'top' : 5,
						'height' : 100
	}));
	
	viewHeader.add(imgProfile);
	viewHeader.add(lblName);
	/*
	if (params != null)
		return control_factory.addParams(viewHeader, params);
	*/
	
	return viewHeader;
}

/***********************************************************************
 * Create a regular button for table view 
 ***********************************************************************/
control_factory.regular_table_button = function(title, params) {
		
 	var button = Ti.UI.createButton({
		font : {'fontSize':25,'fontFamily':'Marker Felt', 'fontWeight':'bold'},
		title : title,
		left : 50,
		right: 50,
		top : 10,
		bottom: 10,
		backgroundImage : '../images/reg_button_off.png',
		backgroundSelectedImage : '../images/reg_button_on.png',
		color : '#222'
	});	
	
	return control_factory.addParams(button, params);;
}

/***********************************************************************
 * Create any text button  
 ***********************************************************************/
control_factory.regular_button = function(title, params) {
		
 	var button = Ti.UI.createButton({
		font : {'fontSize':25,'fontFamily':'Marker Felt', 'fontWeight':'bold'},
		title : title,
		backgroundImage : '../images/reg_button_off.png',
		backgroundSelectedImage : '../images/reg_button_on.png',
		color : '#222'
	});	
	
	return control_factory.addParams(button, params);;
}

/************************************************************************
 * These functions are used to generate a table row with header and content
 ************************************************************************/


control_factory.build_header_label = function(text) {
	var label = Titanium.UI.createLabel({
        text: text,
        color: '#E9B232',
        top: 5,
        left: 10,
        height: 15,
        font : {
            fontSize : 12,
            fontWeight: 'bold',
        }
	});
	return label;
}

control_factory.build_content_label = function(text) {
	var label = Titanium.UI.createLabel({
        text: text,
        height:'auto',
        color: 'black',
        top: 25,
        bottom: 10,
        left: 30,
        right: 20,
        font : {
            fontSize : 12
        }
	});
	return label;		
}

control_factory.build_text_row = function(header, content) {
	var row = Titanium.UI.createTableViewRow({height: 'auto'});
	row.add(this.build_header_label(header));
	row.add(this.build_content_label(content));
	return row;
}