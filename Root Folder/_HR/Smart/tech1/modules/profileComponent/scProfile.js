function dirProfile() {

    (function () {
        console.warn("dirProfile");
        angular.module('scApp.profile', [])

            .directive('dirProfile', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {},
                    templateUrl: that_.path + "modules/profileComponent/scProfileView.html",
                    controller: profileController,
                    controllerAs: "profile"
                };
            });

        function profileController($scope, $state, $timeout, requestService, updateSwiper, timelineService, getProfile) {
            var that = this;
            this.data = getProfile.profileData;


            console.warn('profileController');
            this.competencesTypes = ["Corp", "Role", "Func"];
            //this.data =$scope.data ;
            this.showAdditionalSkill = false;
            this.showAdditionalAchievement = false;
            this.additionalSkills = [];
            this.additionalSkill = {};

            this.additionalAchievements = [];
            this.additionalAchievement = {};

            this.range = function (n) {
                return new Array(n);
            };

            $(window).resize(function () {
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

                    e.currentTarget.classList.remove("clicked");

                    addSkillLabels.forEach((label) => {
                        label.classList.remove("checked");
                    });
                } else {
                    e.currentTarget.classList.add("clicked");
                }
                this.showAdditionalSkill = !this.showAdditionalSkill;

                updateSwiper();
            };

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

            this.addNewAchievement = (e) => {
                if (this.additionalAchievement && e.currentTarget.classList.contains("clicked")) {

                    // Отправить запрос
                    if (this.additionalAchievement.name && this.additionalAchievement.when && this.additionalAchievement.where) {
                        this.additionalAchievements.push(this.additionalAchievement);
                        console.log(this.additionalAchievements);
                        this.additionalAchievement = {};
                    }
                    e.currentTarget.classList.remove("clicked");
                } else {
                    e.currentTarget.classList.add("clicked");
                }
                this.showAdditionalAchievement = !this.showAdditionalAchievement;
                updateSwiper();
            };
        }
    }());
}


