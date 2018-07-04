function dirPosition() {

    (function () {
        console.warn("dirPosition");
        angular.module('scApp.position', [])

            .directive('dirPosition', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {},
                    // bindToController: true,
                    templateUrl: that_.path + "modules/positionComponent/scPositionView.html",
                    controller: positionController,
                    controllerAs: "positionCtrl"
                };
            });

        function positionController($scope, requestService, positionsService, getPosition, getProfile, positionSettings, $timeout, updateSwiper, getCustomData) {

            //ИНТЕРФЕЙСНАЯ ЧАСТЬ
            //============================================
            //атрибуты
            //============================================
            var that = this;
            this.iGrade = getProfile.profileData.user.iGrade;
            this.posModelData = getModelData();
            this.positionSettings = positionSettings;//данные фильтрации
            this.competences_h_slider = document.querySelector(".sc-main-slide_pos");
            this.competenceCurrent = null;//текущая выбранная позиция
            this.currentIndex = null;//индекс выбранной позиции
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
                            that.positionDiscrPart = that.positionDiscr.aSkills;
                            break;
                        case 4:
                            that.positionDiscrPart = that.positionDiscr.aLanguages;
                            break;
                        case 5:
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
                console.log("");

                positionSettings.showMenu = true;
                that.competences_h_slider.style.transform = "translateX(-50%)";
                positionSettings.positionStaticMenu = position;
                that.currentIndex = index;
                $timeout(updateSwiper, 0);
                getCustomData.jobProfile(position.sJobProfileId).then(function (data) {
                    that.positionDiscr = data;
                    that.positionDiscrPart = that.positionDiscr.aCompetentions;


                    console.log(data)
                })


            };


            function setFilter(obj) {
                return function (structure) {
                    let tags = that.posModelData;
                    let ps = that.positionSettings
                    let result = true;
                    if (structure.iTurnover < ps.open[0] || structure.iTurnover > ps.open[1]) result = false;
                    if (structure.iProbability < (ps.conformity[0] / 100) || structure.iProbability > (ps.conformity[1] / 100)) result = false;
                    if (ps.grade[structure.iGrade]) result = false;
                    if (ps.onlyLiked == true && !structure.liked) result = false;

                    return result;
                }
            }

            function getModelData() {
                return (positionSettings.show == "model") ? getPosition.positionData : getPosition.userPositionData;
            }

            function likeCurrentPosition(e, index, position) {
                let data = that.posModelData.data;
                (data[index].liked) ? delete data[index].liked : data[index].liked = true;
                positionSettings.countLiked = getPosition.getLiked().length;
            }

            //***********************************************************************************************************
        }
    }());
}


