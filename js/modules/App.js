'use strict';
define(['modules/Field'], function(Field){

	var App = function(){
		this.modules = {
			field : new Field(document.body)
		}

	};

	return App;

});