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

        function swHeaderController($scope, $state,customElements,appSettings,dataServises) {



            //ИНТЕРФЕЙСНАЯ ЧАСТЬ
            //============================================
            //атрибуты
            //============================================

            var that = this;
            this.state = $state.current.name;// текущий роутер
            this.sText = "Для вас";
            this.appSettings =appSettings;
            this.data=dataServises.data;
            this.showMenu = appSettings.headerType;//none
            this.settings = appSettings.currentPositionInfo;



        //    this.vacant = positionSettings.iIsVacant;
           this.selected = appSettings.selectedMenuInPositionDetail;
            this.menu = ["Функции", "Компетенции", "Опыт работы", "Образование","Навыки", "Языки", "Сетификаты"];
            //============================================
            //функции
            //============================================
            this.likeClick = likeClick;//фильтр по лайкам
            this.yankiGoHome = yankiGoHome;//назад на 1 экран
            this.menuClick = menuClick;
            this.likePos = likePos;
            //============================================
            //вотчеры
            //============================================
          /*  $scope.$watch(function () {
                return $state.$current.name
            }, function (newVal, oldVal) {
                that.state = newVal;
            });
*/
            /*$scope.$watch(function () {
                return positionSettings.countLiked
            }, function (newVal, oldVal) {
                that.likeCount = newVal;
            });*/

          /*  $scope.$watch(function () {
                return positionSettings.showMenu
            }, function (newVal, oldVal) {
                that.showMenu = newVal;
                if (that.showMenu) {
                    that.settings = positionSettings.positionStaticMenu;
                    that.sText = that.settings.sJobProfileName;
                    that.vacant = that.settings.iIsVacant;
                } else {
                    that.sText = "Для вас";
                    that.vacant = 1;
                }

            });*/

            //***********************************************************************************************************
            function likePos() {
               if (appSettings.currentPositionInfo.liked) {
                   delete appSettings.currentPositionInfo.liked;
                   appSettings.countLikedPosition--;
               }else{
                   appSettings.currentPositionInfo.liked = true;
                   appSettings.countLikedPosition++;
               }

            }

            function menuClick(index) {
                that.selected = index;
                appSettings.selectedMenuInPositionDetail = index;
                customElements.updateSwiper();
            }

            function yankiGoHome() {
              //  positionSettings.showMenu = false;

                var teg = document.querySelector(".sc-main-slide_pos");
                teg.style.transform = "translateX(0%)";
                customElements.updateSwiper();

            }

            function likeClick() {
                appSettings.fltOnlyLikedPosition = ! appSettings.fltOnlyLikedPosition

            }


        }
    }());
}


