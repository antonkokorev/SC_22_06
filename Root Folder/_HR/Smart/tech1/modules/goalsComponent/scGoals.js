

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


        }
    }());
}