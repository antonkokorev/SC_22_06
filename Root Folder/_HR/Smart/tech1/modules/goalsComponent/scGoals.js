

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
                console.log(goal);


            }

        }
    }());
}