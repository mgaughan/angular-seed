(function () {
    'use strict';

    angular
    	.module('tc.watchlist')
    	.factory('Watchlist', watchlist);

    function watchlist(){

    	return {
    		getWatchlist: getWatchlist
    	};

    	function getWatchlist(){
    		return [
    			'AAPL',
    			'GOOG',
    			'FB',
    			'MRKT',
                'MSFT',
                'SPY',
                'RCMT',
                'WAGE',
                'F',
                'GM',
                'BMF',
                'NFX',
                'HAL'
    		];
    	};
    }

})();
