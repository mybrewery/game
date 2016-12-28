require.config({
	paths : {
		postal : '../node_modules/postal/lib/postal.min',
		lodash : '../node_modules/lodash/lodash'
	}
})

require(['modules/App'], function(App){
	var app = new App()
});