function dirProfile() {

    (function () {
        console.warn("dirProfile");
        angular.module('profileModule', [])

            .directive('profile', function ($location,profileSrv) {
                return {
                    restrict: 'AE',
                    scope:{},
                    templateUrl: that_.path+"modules/profile.html",//that_.profileView(),
                    controller:  profileController,
                    controllerAs: "profile"
                };
            });


        angular.module('profileModule')
            .service("profileSrv", function($http){
                this.getProfile = function(user){
                    var _url = "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs?entity=empProfileNoCallback&user="+user;
                    var _headers = {
                        'Authorization': "Basic ZG9tb3poYWtvX212OjEyMzQ1VGdi",
                        'Accept': 'application/json; charset=utf-8',
                        'Content-Type': 'application/json; charset=utf-8'
                    };
                    var promise=  $http({
                        method: 'GET',
                        url: _url,
                        headers: _headers
                    }).then(function(response){
                        return response.data
                    });
                    return promise
                };
            });



        function profileController(profileSrv) {
            console.warn('profileController');
            this.competencesTypes = ["Corp", "Role", "Func"];





            this.range = function(n) {
                return new Array(n);
            };


            profileSrv.getProfile(that_.user).then((data)=>{
                this.data=data;
                console.log({"data":data})
            });


        }
    }());
}


