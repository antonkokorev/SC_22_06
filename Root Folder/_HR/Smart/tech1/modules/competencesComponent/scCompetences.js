function dirCompetences() {
    (function () {
        console.warn("dirCompetences");
        angular.module('scApp.competences', [])
            .directive('dirCompetences', function () {
                return {
                    scope: {},
                    templateUrl: that_.path + "modules/competencesComponent/scCompetrncesView.html",
                    controller: competencesController,
                    controllerAs: "competences"
                };
            });

        function competencesController(requestService, $timeout, positionsService, formGoalsService, getPosition, customElements) {
            this.data = {};
            //console.log(positionsService.getLikedPositions());
            var liked = getPosition.getLiked().join(",")

            var url = "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs?entity=positionCompetentionsNoCallback&position=["+liked+"]&user=";
            requestService(url)
                .then(data => {
                    this.data = data;
                    //console.log(data);
                });

            this.positionCurrent = null;
            this.currentIndex = null;
            this.currentPositionCompetences = [];

            this.chosenIndicators = [];
            if (formGoalsService.getIndicators().length > 0) {
                this.chosenIndicators = formGoalsService.getIndicators()
            }

            console.log(this.chosenIndicators);

            this.chosenCompetences = formGoalsService.getCompetences() || [];
            if (formGoalsService.getCompetences().length > 0) {
                this.chosenCompetences = formGoalsService.getCompetences()
            }


            var competences_h_slider = document.querySelector(".competences-by-position");

            this.getPositionCompetences = function (index, position) {
                competences_h_slider.style.transform = "translateX(-33.3333%)";
                this.positionCurrent = position;
                this.currentIndex = index;
                this.currentPositionCompetences = this.data.aPositions[index].aCompetentions;
                customElements.updateSwiper();
            };

            this.competenceCurrent = null;
            this.currentCompetencesIndicators = [];


            // Установить класс для уже добавленных индикаторов
            this.getChosenIndicators = function (indicator) {
                let index = this.chosenIndicators.map(function (item) {
                    return item.iIndicatorId;
                }).indexOf(indicator.iIndicatorId);

                if (index >= 0) {
                    return "chosen";
                }
            };

            this.getChosenCompetences = function (competence) {
                let index = this.chosenCompetences.map(function (item) {
                    return item.sCompetentionId;
                }).indexOf(competence.sCompetentionId);

                if (index >= 0) {
                    return "chosen";
                }
            };


            this.getCompetencesIndicators = function (event, index, competence) {
                if (competence.sCompetentionType !== 'Corp') {

                    if (event.currentTarget.classList.contains("chosen")) {
                        event.currentTarget.classList.remove("chosen");

                        let index = this.chosenCompetences.map(function (item) {
                            return item.sCompetentionId;
                        }).indexOf(competence.sCompetentionId);

                        this.chosenCompetences.splice(index, 1);
                    } else {
                        event.currentTarget.classList.add("chosen");
                        this.chosenCompetences.push(competence);
                    }

                    formGoalsService.setCompetences(this.chosenCompetences);
                    formGoalsService.getGoals();
                    return;
                }

                competences_h_slider.style.transform = "translateX(-66.6666%)";
                this.competenceCurrent = competence;
                this.currentCompetencesIndicators = this.data.aPositions[this.currentIndex].aCompetentions[index].aIndicators;
                customElements.updateSwiper();
            };


            this.chooseIndicator = function (event, indicator, competence) {
                if (event.currentTarget.classList.contains("chosen")) {
                    event.currentTarget.classList.remove("chosen");

                    var index = this.chosenIndicators.map(function (item) {
                        return item.iIndicatorId;
                    }).indexOf(indicator.iIndicatorId);

                    this.chosenIndicators.splice(index, 1);

                } else {
                    event.currentTarget.classList.add("chosen");
                    indicator.sCompetentionName = competence.sCompetentionName;
                    indicator.sCompetentionId = competence.sCompetentionId;
                    this.chosenIndicators.push(indicator);
                }
                formGoalsService.setIndicators(this.chosenIndicators);
                formGoalsService.getGoals();
            };

            this.getBack = function (n) {
                competences_h_slider.style.transform = "translateX(-" + 33.3333 * n + "%)";
            };

            this.getColor = (i) => {
                if (i > 3) {
                    return "color-green";
                } else if (i < 3) {
                    return "color-red";
                } else {
                    return "color-yellow";
                }
            }

        }
    }());
}

