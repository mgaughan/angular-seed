(function () {

	angular
		.module('tc')
		.controller('TinderChartsController', TinderChartsController);

		TinderChartsController.$inject = ['Watchlist', 'SavedCharts', '$scope'];

		function TinderChartsController(Watchlist, SavedCharts, $scope){
			var vm = this,
				watchlist = Watchlist.getWatchlist(),
				savedCharts = SavedCharts.getSavedCharts();
			vm.watchlist = watchlist;
			vm.savedCharts = savedCharts;

			vm.activeSecurity = watchlist[0];
			vm.activeSavedChart = savedCharts[0];

			$scope.$watchGroup(
				['vm.activeSecurity', 'vm.activeSavedChart'], 
				updateChart
			);

			function updateChart(newValues){
				if(newValues.length < 2){
					return;
				}
				var security = newValues[0],
					savedChart = newValues[1];

				console.log('Loading chart %s with %s.', savedChart, security);
			};
		};

})();