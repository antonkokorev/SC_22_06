function dirInstruments() {

    (function () {
        console.warn("dirInstruments");
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

        function instrumentsController(formGoalsService, customElements, dataServices) {
            let that=this;
            this.preloader = dataServices.preloader;
            this.currentGoal = dataServices.currentGoal;
            this.instrumentsData = dataServices.instrumentsData;
            this.currentMenu=0;
            this.allGoals = formGoalsService.data;

            // var url = "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs?entity=competentionInstrument&competentionId="+ this.currentGoal.sCompetentionId +"&user=";
            // dataServices.requestService(url).then((data) => {
            //     this.tools = data;
            //     console.log(data);
            // });

            this.toolsHeadings = ["Практические советы", "Книги", "Обучающие видео", "Очные курсы"];


            let sections = document.querySelector(".tools-sections");
            let underline = document.querySelector(".tools-underline");

            this.switchTool = (index) => {
                that.currentMenu=index;
                sections.style.transform = "translateX(-" + 25 * index + "%)";
                underline.style.left = 25 * index + "%";
                customElements.resetSwiper(100);
            };

            this.addToIpr = (item) => {
                dataServices.setInstrument(this.currentGoal.goal, this.allGoals);
            }

        }

    }());
}


