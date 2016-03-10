var AppConfig = {
	registerModule: registerModule
};

function registerModule(name, dependencies){
	angular.module(name, dependencies || []);
};

(function () {
    'use strict';

    angular.module('as', []);

})();
