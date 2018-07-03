function dirInstruments() {

    (function () {
        console.warn("dirHeader");
        angular.module('scApp.instruments', [])

            .directive('dirInstruments', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {},
                    templateUrl: that_.path + "modules/instrumentsComponent/scInstrumentsView.html",
                    controller: instrumentsController,
                    controllerAs: "instruments"
                };
            });

        function instrumentsController($timeout, requestService, updateSwiper, formGoalsService, instrumentsService) {

            //this.currentGoal = formGoalsService.getGoals()[0];
            this.tools = []; //instrumentsService.instrumentsData

            // var url = "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs?entity=competentionInstrument&competentionId="+ this.currentGoal.sCompetentionId +"&user=";
            // requestService(url).then((data) => {
            //     this.tools = data;
            //     console.log(data);
            // });


            this.toolsHeadings = ["Практические советы", "Книги", "Обучающие видео", "Очные курсы"];

            var sections = document.querySelector(".tools-sections");
            var underline = document.querySelector(".tools-underline");

            this.switchTool = (index) => {
                sections.style.transform = "translateX(-" + 25 * index + "%)";
                underline.style.left = 25 * index + "%";
            }

        }

    }());
}


