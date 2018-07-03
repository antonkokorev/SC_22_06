function dirPosition() {

    (function () {
        console.warn("dirPosition");
        angular.module('scApp.position', [])

            .directive('dirPosition', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {

                    },
                   // bindToController: true,
                    templateUrl: that_.path + "modules/positionComponent/scPositionView.html",
                    controller: positionController,
                    controllerAs: "positionCtrl"
                };
            });

        function positionController($scope, requestService, positionsService, getPosition, getProfile, positionSettings,$timeout) {

            //ИНТЕРФЕЙСНАЯ ЧАСТЬ
            //============================================
            //атрибуты
            //============================================
            var that = this;
            this.iGrade=getProfile.profileData.user.iGrade;
            this.posModelData=getModelData();
            this.positionSettings = positionSettings;//данные фильтрации
            this.competences_h_slider = document.querySelector(".position-details");
            this.competenceCurrent = null;//текущая выбранная позиция
            this.currentIndex=null;//индекс выбранной позиции
            this.currentPositionCompetences=null;
            //============================================
            //функции
            //============================================
            this.likeCurrentPosition=likeCurrentPosition;// добавление в избранное
            this.getPositionCompetences=getPositionCompetences;//переход на описание позиции
            this.setFilter=setFilter;
            //***********************************************************************************************************


            function getPositionCompetences  (index, position) {
                debugger

               that.competences_h_slider.style.transform = "translateX(-33.3333%)";
                that.positionCurrent = position;
                that.currentIndex = index;

                that.currentPositionCompetences = [];
                $timeout(updateSwiper, 0);
            };






            function setFilter(obj){
               return function (structure) {
                        let tags = that.posModelData;
                        let ps=that.positionSettings
                        let result = true;
                  if (structure.iTurnover<ps.open[0]|| structure.iTurnover>ps.open[1])result=false;
                  if (structure.iProbability< (ps.conformity[0]/100)|| structure.iProbability>(ps.conformity[1]/100))result=false;
                  if (ps.grade[structure.iGrade])result=false;
                  if (ps.onlyLiked==true && !structure.liked)result=false;

                        return result;
                    }
            }
            function getModelData(){
                return (positionSettings.show=="model")?getPosition.positionData:getPosition.userPositionData;
            }
            function likeCurrentPosition(e, index, position){
                let data= that.posModelData.data;
                (data[index].liked)?delete data[index].liked: data[index].liked=true;
                positionSettings.countLiked=getPosition.getLiked().length;
            }

            //***********************************************************************************************************
        }
    }());
}


