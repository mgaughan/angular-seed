(function () {

	angular
		.module('tc')
		.controller('TinderChartsController', TinderChartsController);

		TinderChartsController.$inject = ['Watchlist', 'SavedCharts'];

		function TinderChartsController(Watchlist, SavedCharts){
			var vm = this,
				watchlist = Watchlist.getWatchlist(),
				savedCharts = SavedCharts.getSavedCharts();

			vm.watchlist = watchlist;
			vm.savedCharts = savedCharts;

			vm.activeSecurity = watchlist[0];
			vm.activeSavedChart = savedCharts[0];

			

			function updateChart(value){
				var isWatchlist = watchlist.indexOf(value) !== -1;

				if(isWatchlist){
					vm.activeSecurity = value;	
				}
				else{
					vm.activeSavedChart = value;
				}
			};
		};

})();