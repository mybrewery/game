'use strict';

define(function(){
	return {
		grid : 10,
		colors : [
			'#f44336',
		  	'#9c27b0',
		  	'#cddc39',
		  	'#e91e63',
		  	'#00bcd4',
		  	'#ff9800'
		],
		cellStyles : ['selected'],
		size : 0.8,
		directions : [{
            x : 1,
            y : 0
        }, {
            x : -1,
            y : 0
        }, {
            x : 0,
            y : 1
        }, {
            x : 0,
            y : -1
        }]
	};
});