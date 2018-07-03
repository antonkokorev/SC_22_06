function dirSwHeader() {

    (function () {
        console.warn("dirSwHeader");
        angular.module('scApp.swHeader', [])
            .directive('dirSwHeader', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {},
                    templateUrl: that_.path + "modules/swiperHeaderComponent/scSwHeaderView.html",
                    controller: swHeaderController,
                    controllerAs: "swHeader"
                };
            });

        function swHeaderController($scope,$state,positionSettings,getPosition) {



            //ИНТЕРФЕЙСНАЯ ЧАСТЬ
            //============================================
            //атрибуты
            //============================================
            var that=this;
            this.state ="";// текущий роутер
            this.likeCount=positionSettings.countLiked;
            //============================================
            //функции
            //============================================
            this.likeClick=likeClick;//фильтр по лайкам
            //============================================
            //вотчеры
            //============================================
            $scope.$watch(function(){
                return $state.$current.name
            }, function(newVal, oldVal){
                that.state=newVal;
            });

            $scope.$watch(function(){
                return positionSettings.countLiked
            }, function(newVal, oldVal){
                that.likeCount=newVal;
            });
            //***********************************************************************************************************

            function likeClick(){
                positionSettings.onlyLiked=!positionSettings.onlyLiked
            }


        }
    }());
}


