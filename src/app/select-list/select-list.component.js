(function(){

    angular
        .module('tc.selectList')
        .component('selectList', selectList())
        .controller('SelectListController', SelectListController);

    function selectList() {
        return {
            bindings: {
                items: '<',
                activeItem: '='
            },
            templateUrl: 'app/select-list/select-list.view.html',
            controller: 'SelectListController as vm'
        }
    };

    function SelectListController() {
        var vm = this;

        vm.isActive = isActive;
        vm.updateActiveItem = updateActiveItem;

        function isActive(item){
            return item == vm.activeItem;
        };

        function updateActiveItem(value){
            vm.activeItem = value;
        };

        return this;
    };

})();