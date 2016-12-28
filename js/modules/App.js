'use strict';
define(['modules/Field', 'postal'], function(Field, postal){

	var App = function(){
		console.log(postal);
		
		this.modules = {
			field : new Field(document.body)
		}

	};

	return App;

});