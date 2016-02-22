(function () {
    'use strict';

    angular
    	.module('tc.savedCharts')
    	.factory('SavedCharts', savedCharts);

    function savedCharts(){

    	return {
    		getSavedCharts: getSavedCharts
    	};

    	function getSavedCharts(){
    		return [
    			'Today',
    			'Fundamentals',
    			'Bollinger Bands',
    			'Last Week'
    		];
    	};
    }

})();
