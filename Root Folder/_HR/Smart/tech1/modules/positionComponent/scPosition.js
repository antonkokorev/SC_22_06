function dirPosition() {

    (function () {
        console.warn("dirPosition");
        angular.module('scApp.position', [])
            .directive('dirPosition', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {},
                    templateUrl: that_.path + "modules/positionComponent/scPositionView.html",
                    controller: positionController,
                    controllerAs: "positionCtrl"
                };
            });

        function positionController($scope, positionsService, customElements, dataServices, appSettings) {

            //ИНТЕРФЕЙСНАЯ ЧАСТЬ
            //============================================
            //атрибуты
            //============================================
            let that = this;
            appSettings.sizeSwiperStyle="smallMenu";
            this.posModelData = dataServices.data;//данные
            this.mode = (appSettings.positionShowFrom === "model") ? "positionData" : "userPositionData";//выбранная модель
            this.appSettings = appSettings;
            //============================================
            //функции
            //============================================
            this.likeCurrentPosition = likeCurrentPosition;// добавление в избранное
            this.getPositionCompetences = getPositionCompetences;//переход на описание позиции
            this.setFilter = setFilter;
            this.getPositionDiscrPart=getPositionDiscrPart;// роутинг на нужный массив при апереходе по деталям позиции
            //***********************************************************************************************************
            function getPositionDiscrPart(){
                let result=[];
                let data=that.posModelData.jobProfileData;
                switch (appSettings.selectedMenuInPositionDetail) {
                    case 0:
                        result = data.aFunctions;
                        break;
                    case 1:
                        result = data.aCompetentions;
                        break;
                    case 2:
                        result= data.aExperience;
                        break;
                    case 3:
                        result = data.aEducation;
                        break;
                    case 4:
                        result= data.aSkills;
                        break;
                    case 5:
                        result = data.aLanguages;
                        break;
                    case 6:
                        result = data.aCertification;
                        break;
                }
                return result
            }

            function getPositionCompetences(index, position) {

                let slider = document.querySelector(".sc-main-slide_pos");
                slider.style.transform = "translateX(-50%)";
                appSettings.currentPositionInfo = position;
                appSettings.sizeSwiperStyle="bigMenu";
                dataServices.getJobProfile(position.sJobProfileId);
                appSettings.selectedMenuInPositionDetail=0;
            }

            function setFilter(obj) {
                return function (structure) {
                    let tags = that.posModelData;
                    let ps = that.appSettings;
                    let result = true;
                    if (structure.iTurnover < ps.fltOpenPosition[0] || structure.iTurnover > ps.fltOpenPosition[1]) result = false;
                    if (structure.iProbability < (ps.fltConformityPosition[0] / 100) || structure.iProbability > (ps.fltConformityPosition[1] / 100)) result = false;
                    if (ps.fltGradePosition[structure.iGrade]) result = false;
                    if (ps.fltOnlyLikedPosition === true && !structure.liked) result = false;
                    if (ps.fltOnlyVacantPosition === true && structure.iIsVacant === 0) result = false;
                    return result;
                }
            }





            function likeCurrentPosition(e, index, position) {
                let data = that.posModelData.positionData;
                if (data[index].liked) {
                    delete data[index].liked;
                    appSettings.countLikedPosition--;
                } else {
                    data[index].liked = true;
                    appSettings.countLikedPosition++;
                }
            }


        }
    }());
}


