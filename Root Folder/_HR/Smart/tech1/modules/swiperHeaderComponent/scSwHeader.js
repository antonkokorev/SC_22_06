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

        function swHeaderController($scope, $state, positionSettings,customElements,appSettings) {



            //ИНТЕРФЕЙСНАЯ ЧАСТЬ
            //============================================
            //атрибуты
            //============================================

            var that = this;
            this.state = "";// текущий роутер
            this.sText = "Для вас";
            this.appSettings =appSettings;






            this.showMenu = positionSettings.showMenu;
            this.settings = positionSettings.positionStaticMenu;

            this.vacant = positionSettings.iIsVacant;
            this.selected = positionSettings.selectedMenu;
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
            $scope.$watch(function () {
                return $state.$current.name
            }, function (newVal, oldVal) {
                that.state = newVal;
            });

            $scope.$watch(function () {
                return positionSettings.countLiked
            }, function (newVal, oldVal) {
                that.likeCount = newVal;
            });

            $scope.$watch(function () {
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

            });

            //***********************************************************************************************************
            function likePos() {
               if (positionSettings.positionStaticMenu.liked) {
                   delete positionSettings.positionStaticMenu.liked;
                   appSettings.countLikedPosition--;
               }else{
                   positionSettings.positionStaticMenu.liked = true;
                   appSettings.countLikedPosition++;
               }

            }

            function menuClick(index) {
                that.selected = index;
                positionSettings.selectedMenu = index;
                customElements.updateSwiper();
            }

            function yankiGoHome() {
                positionSettings.showMenu = false;

                var teg = document.querySelector(".sc-main-slide_pos");
                teg.style.transform = "translateX(0%)";
                customElements.updateSwiper();

            }

            function likeClick() {
                positionSettings.onlyLiked = !positionSettings.onlyLiked

            }


        }
    }());
}


