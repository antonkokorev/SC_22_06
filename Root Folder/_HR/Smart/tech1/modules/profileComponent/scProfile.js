function dirProfile() {

    (function () {
        console.warn("dirProfile");
        angular.module('profileModule', [])

            .directive('profile', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {profileData:"=profilemodeldata"},
                    templateUrl: that_.path + "modules/profileComponent/profile.html",
                    controller: profileController,
                    controllerAs: "profile"
                };
            });

        function profileController($scope, $timeout, requestService, updateSwiper, timelineService) {

            console.warn('profileController');
            this.competencesTypes = ["Corp", "Role", "Func"];
            //this.data =$scope.data ;
            this.showAdditionalSkill = false;
            this.additionalSkills = [];
            this.additionalSkill = {};

            this.range = function (n) {
                return new Array(n);
            };




            /*   var url = "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs?entity=empProfileNoCallback&user=";
               requestService(url).then((data) => {
                   this.data = data;
                   $timeout(function() {
                       updateSwiper();
                       timelineService.renderTimelineLine(".profile-education");
                       timelineService.renderTimelineLine(".profile-results");
                   }, 0);
                   console.log({"data": data})
               });*/

            $(window).resize(function() {
                timelineService.renderTimelineLine(".profile-education");
                timelineService.renderTimelineLine(".profile-results");
            });

            var addSkillLabels = document.querySelectorAll(".add-skill-label");

            this.addNewSkill = (e) => {
                if (this.showAdditionalSkill && e.target.classList.contains("clicked")) {

                    // Отправить запрос
                    if (this.additionalSkill.name && this.additionalSkill.rate) {
                        this.additionalSkills.push(this.additionalSkill);
                        this.additionalSkill = {};
                    }

                    e.target.classList.remove("clicked");

                    addSkillLabels.forEach((label) => {
                        label.classList.remove("checked");
                    });
                } else {
                    e.target.classList.add("clicked");
                }
                this.showAdditionalSkill = !this.showAdditionalSkill;

                updateSwiper();
            }

            this.rateNewSkill = (e, n) => {

                addSkillLabels.forEach((label) => {
                    label.classList.remove("checked");
                });

                addSkillLabels.forEach((label, index) => {
                    if (index + 1 <= n) {
                        label.classList.add("checked");
                    }
                });
            }
        }
    }());
}


