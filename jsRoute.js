/**
 * Inspired by https://github.com/timotta/TralhaController
 */
var route = {

	routes: [],
	funcs: [],
	currentHash: '',
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
		if( document.location.hash && this.currentHash != document.location.hash) {
			this.currentHash = document.location.hash.slice(1);
			this._update();
		}
	},
	
	_findAndExecute: function(route){
		for( var i = 0, l = this.routes.length; i < l; i++ ){
			var re = new RegExp(this.routes[i]);
			var match = route.match(re);

			if(match){
				this.funcs[i](match[0]);
				return true;
			}
		}
		return false;
	},
	
	_update: function(){
		var hash = this.currentHash;
		
		this._findAndExecute(hash);
	},
	
	call: function(route){
		this._findAndExecute(route);
	}
};
