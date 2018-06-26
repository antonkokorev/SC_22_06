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
            .service("profileSrv", function ($http) {
                this.getProfile = function (user) {
                    var _url = "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs?entity=empProfileNoCallback&user=" + user;
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


        function profileController($scope, $timeout, profileSrv, swiperService) {
            console.warn('profileController');
            this.competencesTypes = ["Corp", "Role", "Func"];
            this.data = {};


            this.range = function (n) {
                return new Array(n);
            };

            profileSrv.getProfile(that_.user).then((data) => {
                this.data = data;
                $timeout(swiperService.updateSwiper, 0);
                console.log({"data": data})
            });

            function renderTimelineLine(parent) {

                // Перерисовка линии таймлайна
                var first_circle = $(parent + " .timeline-circle").first();
                var last_circle = $(parent + " .timeline-circle").last();

                var line_y_offset = ($(parent + " .timeline-center").first().height() - first_circle.height()) / 2;
                var line_x_offset = first_circle.position().left + first_circle.width() / 2;

                var line_y1 = first_circle.offset().top;
                var line_y2 = last_circle.offset().top + last_circle.height();

                var line_height = line_y2 - line_y1;

                $(parent + " .timeline-line").css({
                    "height": line_height,
                    "top": 0,
                    "left": line_x_offset
                })
            };
        }
    }());
}


