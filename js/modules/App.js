'use strict';
define([
	'modules/Field', 
	'postal'
	], function(Field, postal){

	var App = function(){
		
		//App subscribtions
		this.subscribtion = {
			cellClick : postal.subscribe({
				channel : 'cells',
				topic : 'clicked',
				callback : function(data){
					console.log(this.modules.field.sibsGet(data.cell));
				}.bind(this)
			})
		};

		//App modules init
		this.modules = {
			field : new Field(document.body)
		};

	};

	return App;

});