function dirCompetences() {
    (function () {
        console.warn("dirCompetences");
        angular.module('scApp.competences', [])
            .directive('dirCompetences', function () {
                return {
                    scope: {},
                    templateUrl: that_.path + "modules/competencesComponent/scCompetrncesView.html",
                    controller: competencesController,
                    controllerAs: "competences"
                };
            });

        function competencesController(requestService, updateSwiper, $timeout) {
            this.data = {};

            var url = "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs?entity=positionCompetentionsNoCallback&position=[30007047,30006541]&user=";
            requestService(url)
                .then(data => {
                    this.data = data;
                    console.log(data);
                });

            this.positionCurrent = null;
            this.currentIndex = null;
            this.currentPositionCompetences = [];

            var competences_h_slider = document.querySelector(".competences-by-position");

            this.getPositionCompetences = function (index, position) {
                competences_h_slider.style.transform = "translateX(-33.3333%)";
                this.positionCurrent = position;
                this.currentIndex = index;
                this.currentPositionCompetences = this.data.aPositions[index].aCompetentions;
                $timeout(updateSwiper, 0);
            };

            this.competenceCurrent = null;
            this.currentCompetencesIndicators = [];

            this.getCompetencesIndicators = function (index, competence) {
                competences_h_slider.style.transform = "translateX(-66.6666%)";
                this.competenceCurrent = competence;
                this.currentCompetencesIndicators = this.data.aPositions[this.currentIndex].aCompetentions[index].aIndicators;
                $timeout(updateSwiper, 0);
            };

            this.getBack = function (n) {
                competences_h_slider.style.transform = "translateX(-" + 33.3333 * n + "%)";
            }
        }
    }());
}

/*  this.competencesController = function() {
      var that = this;

      angular.module('scApp').controller('competencesController', ['$scope', function ($scope) {
          //debugger;
          $scope.model = that.result;

          $scope.positionCurrent = null;
          $scope.currentPositionCompetences = [];

          var competences_h_slider = document.querySelector(".competences-by-position");

          $scope.getPositionCompetences = function (index, position) {
              competences_h_slider.style.transform = "translateX(-33%)";

              $scope.positionCurrent = position;
              $scope.currentPositionCompetences = $scope.model.aPositions[index].aCompetentions;

              setTimeout(function () {
                  window.cpos_swiper.update();
              }, 300);
          };

          $scope.getBack = function (n) {
              competences_h_slider.style.transform = "translateX(-" + 33.3333 * n + "%)";
          }
      }]);

  }
      /*
      // Функция сортировки
      function orderByConformity(a, b) {
          if (a.conformity > b.conformity) {
              return -1;
          }
          if (a.conformity < b.conformity) {
              return 1;
          }
          // a должно быть равным b
          return 0;
      }


      // Слайдер компетенций
      var competences_h_slider = document.querySelector(".competences-by-position");
      var competence_position = competences_h_slider.querySelectorAll(".competence-position");

      for (var i = 0; i < competence_position.length; i++) {
          competence_position[i].addEventListener(eventBr, function () {
              var competences = that.globalJSON.competence;
              var index = this.getAttribute("data-index");

              var html =
                  '<h2 class="sc-slide-heading position-name"> ' + competences[index].position + ' </h2>' +
                  '<div class="back-button-competence back1"> Назад</div>';


              var sortedCompetences = competences[index].competences.sort(orderByConformity);
              sortedCompetences.forEach(function (competence, i) {
                  html +=
                      '<div class="competence-position-current" data-index="' + index + '" data-nested="' + i + '">' +
                      '    <h3 class="competence-position-heading">' + competence.label + '</h3>' +
                      '    <p class="competence-position-conformity"> Соответствие <span class="conformity-bold">' + competence.conformity + '</span></p>' +
                      '    <p class="competence-position-competences"> Индикаторы </p>' +
                      '</div>';
              });

              $(".competences-by-position-current").append(html);

              var back_1 = document.querySelector(".back1");
              back_1.addEventListener(eventBr, function () {
                  competences_h_slider.style.transform = "translateX(-0%)";
                  setTimeout(function () {
                      $(".competences-by-position-current").empty();
                  }, 300);
              });

              // Прокрутка слайдера
              competences_h_slider.style.transform = "translateX(-33.3333333%)";

              var competence_position_current = competences_h_slider.querySelectorAll(".competence-position-current");
              for (var j = 0; j < competence_position_current.length; j++) {
                  competence_position_current[j].addEventListener(eventBr, function () {
                      var competences = that.globalJSON.competence;
                      var index = this.getAttribute("data-index");
                      var indexNested = this.getAttribute("data-nested");


                      var html =
                          '<h2 class="sc-slide-heading competence-name">' + competences[index].competences[indexNested].label + '</h2>' +
                          '<div class="back-button-competence back2"> Назад </div>';

                      competences[index].competences[indexNested].indicators.forEach(function (indicator) {
                          html += '<p class="competence-about">' + indicator + '</p>';
                      });

                      $(".competences-by-position-competence").append(html);

                      var back_2 = document.querySelector(".back2");
                      back_2.addEventListener(eventBr, function () {
                          competences_h_slider.style.transform = "translateX(-33.33333%)";
                          setTimeout(function () {
                              $(".competences-by-position-competence").empty();
                          }, 300);
                      });

                      // Прокрутка слайдера
                      competences_h_slider.style.transform = "translateX(-66.66666%)";

                  })
              }
          })
      }
*/

