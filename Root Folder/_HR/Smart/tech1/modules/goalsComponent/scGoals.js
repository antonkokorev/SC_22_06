

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

            this.goals = formGoalsService.getGoals();
            console.log(this.goals);
            //
            // this.deleteGoal = (index) => {
            //     this.goals.splice(index, 1);
            //     formGoalsService.formGoals(this.goals);
            // }

        }
    }());
}