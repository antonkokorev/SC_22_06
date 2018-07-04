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
            this.showAchievementLine = true;

            this.aboutField = "";
            this.showAboutForm = false;

            this.range = function (n) {
                return new Array(n);
            };

            $(window).resize(function () {
                timelineService.renderTimelineLine(".profile-education");
                timelineService.renderTimelineLine(".profile-results");
                timelineService.renderTimelineLine(".profile-achievements");
            });


            var addSkillLabels = document.querySelectorAll(".add-skill-label");

            this.addNewSkill = (e) => {
                if (this.showAdditionalSkill && e.target.classList.contains("clicked")) {

                    // Отправить запрос
                    if (this.additionalSkill.name && this.additionalSkill.rate) {
                        this.additionalSkills.push(this.additionalSkill);

                        const data = {};
                        data.rating = this.additionalSkill.rate;
                        data.name = this.additionalSkill.name;
                        data.entity = "skill";
                        data.user = that_.user;

                        getProfile.postRequest(data);

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

                $timeout(updateSwiper, 0);
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
                    console.log(this.additionalAchievement);

                    // Отправить запрос
                    if (this.additionalAchievement.what && this.additionalAchievement.when && this.additionalAchievement.where) {
                        this.additionalAchievements.push(this.additionalAchievement);

                        const data = {};
                        data.year = this.additionalAchievement.when;
                        data.place = this.additionalAchievement.where;
                        data.name = this.additionalAchievement.what;
                        data.entity = "selfachievement";
                        data.user = that_.user;

                        getProfile.postRequest(data);

                        this.additionalAchievement = {};

                        if ((this.additionalAchievements.length + this.data.user.aSelfAchievments.length) > 1) {
                            this.showAchievementLine = true;
                            $timeout(function() {
                                timelineService.renderTimelineLine(".profile-achievements");
                            }, 0)
                        }
                    }
                    e.currentTarget.classList.remove("clicked");
                } else {
                    e.currentTarget.classList.add("clicked");
                }

                this.showAdditionalAchievement = !this.showAdditionalAchievement;
                $timeout(updateSwiper, 0);
            };

            this.addAboutMe = (e) => {
                if (this.aboutField && e.currentTarget.classList.contains("clicked")) {
                     // Отправить запрос
                    if (this.aboutField.length > 0 ) {
                        const data = {};
                        data.year = this.aboutField;
                        data.entity = "description";
                        data.user = that_.user;

                        getProfile.postRequest(data);
                    }
                    e.currentTarget.classList.remove("clicked");
                } else {
                    e.currentTarget.classList.add("clicked");
                }

                this.showAboutForm = !this.showAboutForm;
                $timeout(updateSwiper, 0);
            };

            this.updateSw = updateSwiper;
        }
    }());
}


