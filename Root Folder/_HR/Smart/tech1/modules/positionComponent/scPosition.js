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

        function positionController($scope, requestService, positionsService, getPosition, getProfile, positionSettings) {

            //ИНТЕРФЕЙСНАЯ ЧАСТЬ
            //============================================
            //атрибуты
            //============================================
            var that = this;
            this.iGrade=getProfile.profileData.user.iGrade;
            this.posModelData=getModelData();
            this.positionSettings = positionSettings;//данные фильтрации
            this.countLike = 0;//количество пролайканых позиций
            this.onlyLiked = "";
            //============================================
            //функции
            //============================================
            this.likeCurrentPosition=likeCurrentPosition;// добавление в избранное
            this.likeClick=likeClick;
            this.setFilter=setFilter;
            //***********************************************************************************************************
            function setFilter(obj){
               return function (structure) {
                        let tags = that.posModelData;
                        let ps=that.positionSettings
                        let result = true;
                  if (structure.iTurnover<ps.open[0]|| structure.iTurnover>ps.open[1])result=false;
                  if (structure.iProbability< (ps.conformity[0]/100)|| structure.iProbability>(ps.conformity[1]/100))result=false;
                  if (ps.grade[structure.iGrade])result=false;
                  //if (that.onlyLiked==true && !structure.liked)result=false;

                        return result;
                    }

            }
            function getModelData(){
                return (positionSettings.show=="model")?getPosition.positionData:getPosition.userPositionData;
            }
            function likeCurrentPosition(e, index, position){
                let data= that.posModelData.data;
                (data[index].liked)?delete data[index].liked: data[index].liked=true;
                that.countLike =getPosition.getLiked().length
            }
            function likeClick(){
                that.onlyLiked = (that.onlyLiked=="")?true:"";
            }
            //***********************************************************************************************************
        }
    }());
}


