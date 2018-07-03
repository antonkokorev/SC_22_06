function dirIpr() {

    (function () {
        console.warn("dirIpr");
        angular.module('scApp.ipr', [])

            .directive('dirIpr', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {},
                    templateUrl: that_.path + "modules/iprComponent/scIprView.html",
                    controller: iprController,
                    controllerAs: "ipr"
                };
            });

        function iprController(formGoalsService,iprService) {
            this.goalsData = formGoalsService.goalsData;
            this.ipr = {};

            // костыль для удаления
            this.indicators = [];
            this.competences = [];

            this.deleteGoal = (goal) => {
                this.indicators = formGoalsService.getIndicators();
                this.competences = formGoalsService.getCompetences();

                if (goal.iIndicatorId) {
                    var index = this.indicators.map(function (item) {
                        return item.iIndicatorId;
                    }).indexOf(goal.iIndicatorId);

                    this.indicators.splice(index, 1);
                    formGoalsService.setIndicators(this.indicators);
                } else {
                    let index = this.competences.map(function (item) {
                        return item.sCompetentionId;
                    }).indexOf(goal.sCompetentionId);

                    this.competences.splice(index, 1);
                    formGoalsService.setCompetences(this.competences);
                }

                formGoalsService.getGoals();
                this.goalsData = formGoalsService.goalsData;
            };

            this.showIpr = (goal) => {
                var hslider = document.querySelector(".ipr-h-slider");
                hslider.style.transform = "translateX(-50%)";
                this.ipr = iprService.getIpr(goal);

                console.log(this.ipr);
            }
        }

    }());
}


