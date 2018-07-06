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

        function positionController($scope, positionsService, positionSettings, $timeout, menuSettings,customElements,dataServises) {

            //ИНТЕРФЕЙСНАЯ ЧАСТЬ
            //============================================
            //атрибуты
            //============================================
            let that = this;
            this.iGrade = dataServises.data.profileData.iGrade;
            this.posModelData = getModelData();
            this.positionSettings = positionSettings;//данные фильтрации
            this.competences_h_slider = document.querySelector(".sc-main-slide_pos");
            this.competenceCurrent = null;//текущая выбранная позиция
            this.currentIndex = null;//индекс выбранной позиции
            this.menuSettings = menuSettings;
            this.currentPositionCompetences = null;
            this.positionDiscr = {};
            this.positionDiscrPart = {};
            this.selectedMenu = positionSettings.selectedMenu;


            //============================================
            //вотчеры
            //============================================
            $scope.$watch(function () {
                return positionSettings.selectedMenu
            }, function (newVal, oldVal) {
                try {
                    that.selectedMenu = positionSettings.selectedMenu;
                    switch (that.selectedMenu) {
                        case 0:
                            that.positionDiscrPart = that.positionDiscr.aFunctions;
                            break;
                        case 1:
                            that.positionDiscrPart = that.positionDiscr.aCompetentions;
                            break;
                        case 2:
                            that.positionDiscrPart = that.positionDiscr.aExperience;
                            break;
                        case 3:
                            that.positionDiscrPart = that.positionDiscr.aEducation;
                            break;
                        case 4:
                            that.positionDiscrPart = that.positionDiscr.aSkills;
                            break;
                        case 5:
                            that.positionDiscrPart = that.positionDiscr.aLanguages;
                            break;
                        case 6:
                            that.positionDiscrPart = that.positionDiscr.aCertification;
                            break;
                    }
                } catch (e) {
                }


            });

            //============================================
            //функции
            //============================================
            this.likeCurrentPosition = likeCurrentPosition;// добавление в избранное
            this.getPositionCompetences = getPositionCompetences;//переход на описание позиции
            this.setFilter = setFilter;

            //***********************************************************************************************************


            function getPositionCompetences(index, position) {
                positionSettings.showMenu = true;
                that.competences_h_slider.style.transform = "translateX(-50%)";
                positionSettings.positionStaticMenu = position;
                that.currentIndex = index;
                customElements.updateSwiper(500);
                dataServises.jobProfile(position.sJobProfileId).then(function (data) {
                    that.positionDiscr = data;
                    that.positionDiscrPart = that.positionDiscr.aFunctions;
                    console.log(data)
                })
            }

            function setFilter(obj) {
                return function (structure) {
                    let tags = that.posModelData;
                    let ps = that.positionSettings;
                    let result = true;
                    if (structure.iTurnover < ps.open[0] || structure.iTurnover > ps.open[1]) result = false;
                    if (structure.iProbability < (ps.conformity[0] / 100) || structure.iProbability > (ps.conformity[1] / 100)) result = false;
                    if (ps.grade[structure.iGrade]) result = false;
                    if (ps.onlyLiked === true && !structure.liked) result = false;
                    if (ps.onlyVacant==true && structure.iIsVacant == 0)result=false;
                    return result;
                }
            }

            function getModelData() {
                return (positionSettings.show === "model") ? dataServises.data.positionData : dataServises.data.userPositionData;
            }

            function likeCurrentPosition(e, index, position) {
                let data = that.posModelData.data;
                (data[index].liked) ? delete data[index].liked : data[index].liked = true;
                positionSettings.countLiked = dataServises.getLiked().length;
                menuSettings[0].selectedPositions = positionSettings.countLiked;

            }


        }
    }());
}


