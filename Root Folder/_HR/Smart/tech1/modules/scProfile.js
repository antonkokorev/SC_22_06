function classProfile() {

    this.profileView = function () {

        var profileHtml =
            '  <div class="sc-main-slide">' +
            '    <div id="sc-profile" ng-controller="profileController" class="profile-slide sc-v-slide">' +
            '      <div class="swiper-container swiper-profile-container">' +
            '        <div class="swiper-wrapper">' +
            '          <div class="swiper-slide">' +
            '                   <h2 class="sc-slide-heading profile-name">{{model.sFullName}}</h2>' +

            '                   <div class="slide-profile-col">' +
            '                        <div class="slide-profile-obligation-info">' +
            '                            <h3 class="sc-slide-middle-heading"> Текущая должность </h3>' +
            '                               <p class="sc-profile-obligation"> {{model.sPosition}} </p> ' +
            '                               <p class="sc-profile-obligation-from"> на текущей позиции {{jobExperience}}</p> ' +
            '                        </div>' +
            '                    </div>' +

            '                    <div class="slide-profile-col">' +
            '                        <div class="slide-profile-competences">' +
            '                            <h3 class="sc-slide-middle-heading"> Компетенции </h3>' +
            '                            <h4 class="sc-profile-competences-heading">Корпоративные</h4>' +
            '                            <div class="sc-profile-competences-wrapper clearfix">' +
            '                               <div class="profile-competence" ng-repeat="competence in model.aCompetentions" ng-if="competence.sType === competencesTypes[0]">' +
            '                                <p class="profile-competence-label"> {{competence.sFullName}} </p>' +
            '                                <p class="profile-competence-ratings"><span class="profile-competence-rating"> {{competence.iRate360}} </span></p>' +
            '                               </div>' +
            '                            </div>' +
            '                            <h4 class="sc-profile-competences-heading">Ролевые</h4>' +
            '                            <div class="sc-profile-competences-wrapper clearfix">' +
            '                               <div class="profile-competence" ng-repeat="competence in model.aCompetentions" ng-if="competence.sType === competencesTypes[1]">' +
            '                                <p class="profile-competence-label"> {{competence.sFullName}} </p>' +
            '                                <p class="profile-competence-ratings"><span class="profile-competence-rating"> {{competence.iRate360}} </span></p>' +
            '                               </div>' +
            '                            </div>' +
            '                            <h4 class="sc-profile-competences-heading">Профессиональные</h4>' +
            '                            <div class="sc-profile-competences-wrapper clearfix">' +
            '                               <div class="profile-competence" ng-repeat="competence in model.aCompetentions" ng-if="competence.sType === competencesTypes[2]">' +
            '                                <p class="profile-competence-label"> {{competence.sFullName}} </p>' +
            '                                <p class="profile-competence-ratings"><span class="profile-competence-rating"> {{competence.iRate360}} </span></p>' +
            '                               </div>' +
            '                            </div>' +
            '                       </div>' +
            '                    </div>' +

            '                    <div class="slide-profile-col">' +
            '                        <div class="slide-profile-skills">' +
            '                            <h3 id="id_nav" class="sc-slide-middle-heading"> Навыки </h3>' +

            '                            <div class="profile-skill-col" ng-repeat="skill in model.aSkills">' +
            '                                    <h4 class="profile-skill-label"> {{skill.sName}} </h4>' +
            '                                    <div class="profile-skill-rating slide-row">' +
            '										                     <p class="profile-skill-name">Оценка</p>' +
            '                                        <div class="profile-skill-stars">' +
            '                                            <div class="profile-skill-stars-filled-wrapper" style="width: {{skill.iManagerRate * 20}}% ">' +
            '                                                <div class="profile-skill-stars-filled">' +
            '                                                   <div class="profile-skill-star"></div>' +
            '                                                    <div class="profile-skill-star"></div>' +
            '                                                    <div class="profile-skill-star"></div>' +
            '                                                    <div class="profile-skill-star"></div>' +
            '                                                    <div class="profile-skill-star"></div>' +
            '                                                </div>' +
            '                                            </div>' +
            '                                            <div class="profile-skill-stars-rated">' +
            '                                                <div class="profile-skill-star"></div>' +
            '                                                <div class="profile-skill-star"></div>' +
            '                                                <div class="profile-skill-star"></div>' +
            '                                                <div class="profile-skill-star"></div>' +
            '                                                <div class="profile-skill-star"></div>' +
            '                                            </div>' +
            '                                        </div>' +
            '                                     </div>' +

            '                                     <div class="profile-skill-rating slide-row">' +
            '                                        <p class="profile-skill-name">Самооценка</p>' +
            '                                        <div class="profile-skill-stars">' +
            '                                            <div class="profile-skill-stars-filled-wrapper" style="width:{{skill.iPersonRate * 20}}% ">' +
            '                                                <div class="profile-skill-stars-filled">' +
            '                                                   <div class="profile-skill-star"></div>' +
            '                                                    <div class="profile-skill-star"></div>' +
            '                                                    <div class="profile-skill-star"></div>' +
            '                                                    <div class="profile-skill-star"></div>' +
            '                                                    <div class="profile-skill-star"></div>' +
            '                                                </div>' +
            '                                            </div>' +
            '                                            <div class="profile-skill-stars-rated">' +
            '                                                <div class="profile-skill-star"></div>' +
            '                                                <div class="profile-skill-star"></div>' +
            '                                                <div class="profile-skill-star"></div>' +
            '                                                <div class="profile-skill-star"></div>' +
            '                                                <div class="profile-skill-star"></div>' +
            '                                            </div>' +
            '                                        </div>' +
            '                                    </div>' +
            '                            </div>' +

            '                        </div>' +
            '                    </div>' +


            '                    <div class="slide-profile-col">' +
            '                        <div class="slide-profile-skills">' +
            '                            <h3 class="sc-slide-middle-heading"> Дополнительные навыки </h3>' +

            '                            <div class="add-block">' +
            '                              <div class="add-skill-hr hide"></div>' +
            '                                 <div class="add-skill-form hide">' +
            '                                   <input type="text" class="add-new-skill-input" placeholder="Опишите свой навык" ng-model="additionalSkillName">   ' +
            '                                  <div class="add-skill-checkbox">' +
            '                                     <p class="add-skill-checkbox-label"> Самооценка </p>' +
            '                                     <div class="add-skill-checkbox-wrapper">' +
            '                                       <input id="1star" type="radio" name="self-rating" class="add-skill-check">' +
            '                                       <label for="1star" class="add-skill-label"></label>' +
            '                                       <input id="2star" type="radio" name="self-rating" class="add-skill-check">' +
            '                                       <label for="2star" class="add-skill-label"></label>' +
            '                                       <input id="3star" type="radio" name="self-rating" class="add-skill-check">' +
            '                                       <label for="3star" class="add-skill-label"></label>' +
            '                                       <input id="4star" type="radio" name="self-rating" class="add-skill-check">' +
            '                                       <label for="4star" class="add-skill-label"></label>' +
            '                                       <input id="5star" type="radio" name="self-rating" class="add-skill-check">' +
            '                                       <label for="5star" class="add-skill-label"></label>' +
            '                                     </div>' +
            '                                   </div>' +
            '                                 </div>        ' +
            '                                 <div class="add-new-skill add-buttons color-red" ng-click="addNewSkill($event)"> Добавить </div>' +
            '                              </div>' +

            '                           </div>' +
            '                    </div>' +

            '                    <div class="slide-profile-col">' +
            '                        <div class="slide-profile-achievements">' +
            '                            <h3 class="sc-slide-middle-heading"> Достижения в развитии </h3>' +
            '                            <div class="add-additional-skill add-buttons color-red"> Добавить </div>' +
            '                        </div>' +
            '                    </div>' +

            '                    <div class="slide-profile-col">' +
            '                        <div class="slide-profile-achievements">' +
            '                            <h3 class="sc-slide-middle-heading"> Карьера </h3>' +
            '                            <div id="id_education" class="profile-education">' +

            '                                <div class="timeline"> ' +
            '                                  <div class="timeline-line"></div>' +
            '                                  <div class="timeline-element" ng-repeat="job in model.aJobs">' +
            '                                    <div class="timeline-when"> {{job.sFrom}} - {{job.sTo}}</div>' +
            '                                    <div class="timeline-center">' +
            '                                      <div class="timeline-circle"></div>' +
            '                                    </div>' +
            '                                    <div class="timeline-what">' +
            '                                      <h3 class="timeline-what-heading"> {{job.sPosition}} </h3>' +
            '                                       <p class="timeline-what-text"> {{job.sPosition}}, {{job.sDepartment}} </p>' +
            '                                    </div>' +
            '                                  </div>' +
            '                                </div>' +

            '                         </div>' +
            '                       </div>' +
            '                    </div>' +

            '                    <div class="slide-profile-col">' +
            '                        <div class="slide-profile-results">' +
            '                            <h3 class="sc-slide-middle-heading"> Мои результаты деятельности </h3>' +
            '                            <div class="profile-results">' +
            '                                <div class="timeline"> ' +
            '                                  <div class="timeline-line"></div>' +
            '                                  <div class="timeline-element" ng-repeat="result in model.aResults">' +
            '                                    <div class="timeline-when"> {{result.iYear}}</div>' +
            '                                    <div class="timeline-center">' +
            '                                      <div class="timeline-circle"></div>' +
            '                                    </div>' +
            '                                    <div class="timeline-what">' +
            '                                      <h3 class="timeline-what-heading"> {{result.sAchivement}} </h3>' +
            '                                       <p class="timeline-what-text"> {{result.sDescription}} </p>' +
            '                                    </div>' +
            '                                  </div>' +
            '                                </div>' +
            '                            </div>' +
            '                        </div>' +
            '                    </div>' +

            '                    <div class="slide-profile-col">' +
            '                        <div class="slide-profile-achievements">' +
            '                            <h3 class="sc-slide-middle-heading"> Достижения </h3>' +
            '                            <div class="add-additional-skill add-buttons color-red"> Добавить </div>' +
            '                        </div>' +
            '                    </div>' +

            '                    <div class="slide-profile-col">' +
            '                        <div class="slide-profile-about">' +
            '                            <h3 class="sc-slide-middle-heading"> О себе </h3>' +
            '                            <div class="add-additional-skill add-buttons color-red"> Добавить </div>' +
            '                        </div>' +
            '                    </div>' +
            '        </div>' +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '</div>';

        return profileHtml;
    }


//============================================================================================================================================================================================

    this.profileController = function () {
        var eventBr = ($.browser.mobile) ? 'touchstart' : 'click';

        var that = this;
        var app = angular.module('profileComponent', []);

        app.controller('profileController', ['$scope', function ($scope) {
            var data = that.result;

            $scope.model = data;
            $scope.competencesTypes = ["Corp", "Role", "Func"];
            $scope.jobExperience = "";

            if (data.iCountExperienceYear === 1) {
                $scope.jobExperience = data.iCountExperienceYear + "год";
            }

            if (data.iCountExperienceYear > 1 && data.iCountExperienceYear < 5) {
                $scope.jobExperience = data.iCountExperienceYear + "года";
            }

            if (data.iCountExperienceYear > 5) {
                $scope.jobExperience = data.iCountExperienceYear + "лет";
            }


            $scope.addNewSkill = function (e) {

                var add_skill_line = document.querySelector(".add-skill-hr");
                var add_skill_form = document.querySelector(".add-skill-form");
                var checkboxes = document.querySelectorAll(".add-skill-form .add-skill-label");

                if (e.currentTarget.classList.contains("clicked")) {
                    alert("Добавляю новый скилл");
                    var input = add_skill_form.querySelector(".add-new-skill-input");
                    input.value = "";
                    for (var i = 0; i < checkboxes.length; i++) {
                        checkboxes[i].classList.remove("checked");
                    }
                    e.currentTarget.classList.remove("clicked");
                    add_skill_form.classList.add("hide");
                    add_skill_line.classList.add("hide");
                    return;
                }

                e.currentTarget.classList.add("clicked");
                add_skill_form.classList.remove("hide");
                add_skill_line.classList.remove("hide");

                for (var i = 0; i < checkboxes.length; i++) {
                    checkboxes[i].addEventListener(eventBr, function () {

                        for (var j = 0; j < checkboxes.length; j++) {
                            checkboxes[j].classList.remove("checked");
                        }

                        this.classList.add("checked");
                        if (e.currentTarget.previousElementSibling) {
                            $(this).prevAll().addClass("checked");
                        }
                    })
                }
            }
        }]);

        angular.element(function () {
            angular.bootstrap(document.getElementById("sc-profile"), ['profileComponent']);
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

        renderTimelineLine(".profile-education");
        renderTimelineLine(".profile-results");

        window.profile_swiper = new Swiper('.swiper-profile-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheel: true,
            freeMode: true
        });

        $(window).resize(function () {
            window.profile_swiper.update();
            renderTimelineLine(".profile-education");
            renderTimelineLine(".profile-results");
        });

    }


}
