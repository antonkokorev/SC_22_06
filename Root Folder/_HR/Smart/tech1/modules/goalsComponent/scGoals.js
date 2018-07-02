

function dirGoals() {
    (function () {
        console.warn("dirGoals");
        angular.module('scApp.goals', [])
            .directive('dirGoals', function () {
                return {
                    scope: {},
                    templateUrl: that_.path + "modules/goalsComponent/scGoalsView.html",
                    controller: goalsController,
                    controllerAs: "goals"
                };
            });

        function goalsController(formGoalsService) {

            this.indicators = formGoalsService.getIndicators();
            this.competences = formGoalsService.getCompetences();

            this.goals = formGoalsService.getGoals();
            console.log(this.goals);

            this.deleteGoal = (goal) => {
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

                this.goals = formGoalsService.getGoals();
            }

        }
    }());
}