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

        function swHeaderController($scope, $state,customElements,appSettings,dataServices) {
            //ИНТЕРФЕЙСНАЯ ЧАСТЬ
            //============================================
            //атрибуты
            //============================================

            var that = this;
            this.state =appSettings.$state;// текущий роутер
            this.appSettings =appSettings;
            this.data=dataServices.data;
            this.settings = appSettings.currentPositionInfo;
            this.selected = appSettings.selectedMenuInPositionDetail;
            this.menu = ["Функции", "Компетенции", "Опыт работы", "Образование","Навыки", "Языки", "Сетификаты"];
            //============================================
            //функции
            //============================================
            this.likeClick = likeClick;//фильтр по лайкам
            this.yankiGoHome = yankiGoHome;//назад на 1 экран
            this.menuClick = menuClick;
            this.likePos = likePos;
            this.yankiGoHomeCompetences=yankiGoHomeCompetences;
            this.getHeaderComp=getHeaderComp;
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
                    function getHeaderComp(){
                       return  (appSettings.competenceCurrentPage==1)?appSettings.competenceHeaderPosName:appSettings.competenceHeaderCompName;
                    }





            function menuClick(index) {
                that.selected = index;
                appSettings.selectedMenuInPositionDetail = index;
                customElements.updateSwiper();
            }

            function yankiGoHome() {
              //  positionSettings.showMenu = false;
                appSettings.sizeSwiperStyle="smallMenu";
                var teg = document.querySelector(".sc-main-slide_pos");
                teg.style.transform = "translateX(0%)";
                customElements.updateSwiper();

            }
            function yankiGoHomeCompetences(){
                appSettings.competenceCurrentPage+=-1;
                if(appSettings.competenceCurrentPage==0)appSettings.sizeSwiperStyle="";
                customElements.resetSwiper(200);
            }

            function likeClick() {
                appSettings.fltOnlyLikedPosition = ! appSettings.fltOnlyLikedPosition
                customElements.resetSwiper();


            }


        }
    }());
}


