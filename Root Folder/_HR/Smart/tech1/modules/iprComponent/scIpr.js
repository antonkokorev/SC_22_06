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

        function iprController(formGoalsService,iprService,customElements) {
            this.toolsHeadings = ["Практические советы", "Книги", "Обучающие видео", "Очные курсы"];
           let that=this;
            this.goalsData = formGoalsService.goalsData;
            this.ipr = {};
            this.currentMenu=0;
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
                customElements.updateSwiper(100);
            };

            this.showIpr = (goal) => {
                var hslider = document.querySelector(".ipr-h-slider");
                hslider.style.transform = "translateX(-50%)";
                this.iprData = iprService.getIpr(goal);

                console.log(this.iprData);
            };

            var sections = document.querySelector(".ipr-sections");
            var underline = document.querySelector(".ipr-underline");

            this.switchTool = (index) => {
                sections.style.transform = "translateX(-" + 25 * index + "%)";
                underline.style.left = 25 * index + "%";  that.currentMenu=index;
                customElements.resetSwiper(100);

            };

            this.backToGoals = () => {
                var hslider = document.querySelector(".ipr-h-slider");
                hslider.style.transform = "translateX(0%)";
                sections.style.transform = "translateX(0%)";
                underline.style.left = "0%";
                customElements.resetSwiper(100);
            }
        }

    }());
}


