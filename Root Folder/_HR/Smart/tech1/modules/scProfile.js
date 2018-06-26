function dirProfile() {

    (function () {
        console.warn("dirProfile");
        angular.module('profileModule', [])

            .directive('profile', function ($location, profileSrv) {
                return {
                    restrict: 'AE',
                    scope: {},
                    templateUrl: that_.path + "modules/profile.html",//that_.profileView(),
                    controller: profileController,
                    controllerAs: "profile"
                };
            });


        angular.module('profileModule')
            .service("profileSrv", function () {
                this.getProfile = function (user) {

                    var _headers = {
                        'Authorization': "Basic ZG9tb3poYWtvX212OjEyMzQ1VGdi",
                        'Accept': 'application/json; charset=utf-8',
                        'Content-Type': 'application/json; charset=utf-8'
                    };
                    var promise = $http({
                        method: 'GET',
                        url: _url,
                        headers: _headers
                    }).then(function (response) {
                        return response.data
                    }).catch(function (error) {
                        console.log(error);
                    });
                    return promise
                };
            });


        function profileController($scope, $timeout, requestService, swiperService, timelineService) {
            console.warn('profileController');
            this.competencesTypes = ["Corp", "Role", "Func"];
            this.data = {};


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




        }
    }());
}


