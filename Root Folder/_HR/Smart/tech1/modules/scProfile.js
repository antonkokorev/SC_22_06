function dirProfile() {

    (function () {
        console.warn("dirProfile");
        angular.module('profileModule', [])

            .directive('profile', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {},
                    templateUrl: that_.path + "modules/views/profile.html",//that_.profileView(),
                    controller: profileController,
                    controllerAs: "profile"
                };
            });

        function profileController($scope, $timeout, requestService, swiperService, timelineService) {
            console.warn('profileController');
            this.competencesTypes = ["Corp", "Role", "Func"];
            this.data = {};
            this.showAdditionalSkill = false;


            this.range = function (n) {
                return new Array(n);
            };

            var url = "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs?entity=empProfileNoCallback&user=";
            requestService.request(url).then((data) => {
                this.data = data;
                $timeout(function() {
                    swiperService.updateSwiper();
                    timelineService.renderTimelineLine(".profile-education");
                    timelineService.renderTimelineLine(".profile-results");
                }, 0);
                console.log({"data": data})
            });

            $(window).resize(function() {
                timelineService.renderTimelineLine(".profile-education");
                timelineService.renderTimelineLine(".profile-results");
            });

            this.addNewSkill = function(e) {
                this.showAdditionalSkill = !this.showAdditionalSkill;
            }


        }
    }());
}


