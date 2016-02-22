(function(){

    var selectList = {
        bindings: {
            items: '<',
            activeItem: '='
        },
        templateUrl: 'app/select-list/select-list.view.html',
        controller: 'SelectListController as vm'
    };

    function SelectListController() {
        var vm = this;

        vm.updateActiveItem = updateActiveItem;

        function updateActiveItem(value){
            vm.activeItem = value;
        };

        return this;
    };

    angular
        .module('tc.selectList')
        .component('selectList', selectList)
        .controller('SelectListController', SelectListController)

}());