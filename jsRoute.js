/**
 * Inspired by https://github.com/timotta/TralhaController
 */
var route = {

	routes: [],
	funcs: [],
	actualURL: '',
	interval: null,

	add: function(route, func){
		this.routes.push(route);
		this.funcs.push(func);
	},

	init: function(){
		if(!this.interval){
			this.interval = setInterval( function() { route._check(); }, 400 );
		}
	},

	_check: function() {
		if( this.actualURL != document.location.href ) {
			this.actualURL = document.location.href;
			this._update();
		}
	},
	
	_update: function(){
		var hash = location.hash.slice(1);

		for(i=0; i< this.routes.length; i++){
			var re = new RegExp(this.routes[i]);
			var match = hash.match(re);

			if(match){
				this.funcs[i](match[0]);
				return true;
			}
		}

		console.log("404 - Route not found!");
	}
};

