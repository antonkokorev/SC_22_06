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

        function profileController( customElements,dataServices,appSettings) {


            //ИНТЕРФЕЙСНАЯ ЧАСТЬ
            //============================================
            //атрибуты
            //============================================
            let that = this;
            appSettings.sizeSwiperStyle="smallMenu";
            this.data = dataServices.data;
            /*getProfile.profileData;*/
            this.competencesTypes = ["Corp", "Role", "Func"];
            this.showAdditionalSkill = false;
            this.showAdditionalAchievement = false;
            this.additionalSkills = [];
            this.additionalSkill = {};
            this.additionalAchievements = [];
            this.additionalAchievement = {};
            this.showAchievementLine = true;
            this.aboutField = "";
            this.showAboutForm = false;
            let addSkillLabels = document.querySelectorAll(".add-skill-label");

            //============================================
            //функции
            //============================================
            this.range = (n) => {
                return new Array(n)
            };
            this.addNewSkill = addNewSkill;//добавляет скилл(звездочки)
            this.rateNewSkill = rateNewSkill;//управляет звездами при добавлении
            this.addAboutMe = addAboutMe;//добавление AboutMe
            this.addNewAchievement = addNewAchievement;// добавление ачивки
            //***********************************************************************************************************
//_______________________________________


//_______________________________________
            function addNewSkill(e) {
                if (that.showAdditionalSkill && e.target.classList.contains("clicked")) {
                    // Отправить запрос
                    if (that.additionalSkill.name && that.additionalSkill.rate) {
                        // that.additionalSkills.push(that.additionalSkill);
                        const data = {};
                        data.rating = that.additionalSkill.rate;
                        data.name = that.additionalSkill.name;
                        data.entity = "skill";
                        data.user = that_.user;
                        // getProfile.postRequest(data);
                        dataServices.setProfile(data);
                        that.additionalSkill = {};
                    }
                    e.currentTarget.classList.remove("clicked");
                    addSkillLabels.forEach((label) => {
                        label.classList.remove("checked");
                    });
                } else {
                    e.currentTarget.classList.add("clicked");
                }
                that.showAdditionalSkill = !that.showAdditionalSkill;
            }

//_______________________________________
            function rateNewSkill(e, n) {
                addSkillLabels.forEach((label) => {
                    label.classList.remove("checked");
                });
                addSkillLabels.forEach((label, index) => {
                    if (index + 1 <= n) {
                        label.classList.add("checked");
                    }
                });
            }

//_______________________________________
            function addAboutMe(e) {
                customElements.updateSwiper(0);
                if (that.aboutField && e.currentTarget.classList.contains("clicked")) {
                    // Отправить запрос
                    if (that.aboutField.length > 0) {
                        const data = {};
                        data.year = that.aboutField;
                        data.entity = "description";
                        data.user = that_.user;
                        dataServices.setProfile(data);
                        // getProfile.postRequest(data);
                    }
                    e.currentTarget.classList.remove("clicked");
                } else {
                    e.currentTarget.classList.add("clicked");
                }

                that.showAboutForm = !that.showAboutForm;

            }

//_______________________________________
            function addNewAchievement(e) {
                if (that.additionalAchievement && e.currentTarget.classList.contains("clicked")) {
                    console.log(that.additionalAchievement);

                    // Отправить запрос
                    if (that.additionalAchievement.what && that.additionalAchievement.when && that.additionalAchievement.where) {

                        const data = {};
                        data.year = that.additionalAchievement.when;
                        data.place = that.additionalAchievement.where;
                        data.name = that.additionalAchievement.what;
                        data.entity = "selfachievement";
                        data.user = that_.user;


                        dataServices.setProfile(data);

                        that.additionalAchievement = {};

                        if ((that.additionalAchievements.length + that.data.profileData.aSelfAchievments.length) > 1) {
                            that.showAchievementLine = true;

                            customElements.updateSwiper(0);

                        }
                    }
                    e.currentTarget.classList.remove("clicked");
                } else {
                    e.currentTarget.classList.add("clicked");
                }
                that.showAdditionalAchievement = !that.showAdditionalAchievement;

            }


        }
    }());
}


