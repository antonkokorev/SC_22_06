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

        function iprController(formGoalsService) {
            this.goalsData = formGoalsService.goalsData;

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
            }
        }

    }());
}


