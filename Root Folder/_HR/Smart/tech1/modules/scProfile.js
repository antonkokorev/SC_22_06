function dirProfile() {

    (function () {
        console.warn("dirProfile");
        angular.module('profileModule', [])

            .directive('profile', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {},
                    templateUrl: that_.path + "modules/views/profile.html",
                    controller: profileController,
                    controllerAs: "profile"
                };
            });

        function profileController($scope, $timeout, requestService, updateSwiper, timelineService) {
            console.warn('profileController');
            this.competencesTypes = ["Corp", "Role", "Func"];
            this.data = {};
            this.showAdditionalSkill = false;
            this.additionalSkill = {};

            this.range = function (n) {
                return new Array(n);
            };

            var url = "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs?entity=empProfileNoCallback&user=";
            requestService.request(url).then((data) => {
                this.data = data;
                $timeout(function() {
                    updateSwiper();
                    timelineService.renderTimelineLine(".profile-education");
                    timelineService.renderTimelineLine(".profile-results");
                }, 0);
                console.log({"data": data})
            });

            $(window).resize(function() {
                timelineService.renderTimelineLine(".profile-education");
                timelineService.renderTimelineLine(".profile-results");
            });

            this.addNewSkill = (e) => {
                if (this.showAdditionalSkill) {
                    console.log(this.additionalSkill);
                    this.additionalSkill = {};
                }
                this.showAdditionalSkill = !this.showAdditionalSkill;
            }

            this.rateNewSkill = (e) => {

            }
        }
    }());
}


