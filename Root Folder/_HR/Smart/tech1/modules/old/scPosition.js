function classPosition() {
    var eventBr = ($.browser.mobile) ? 'touchstart' : 'click';
    /*   '    <div id="sc-profile" ng-controller="profileController" class="profile-slide sc-v-slide">' +*/
    this.positionView = function () {
        var html =
            '        <div id="sc-position" ng-controller="positionController"  class="sc-main-slide">' +
            '            <div class="position-slide sc-v-slide">' +
            '                <div class="slide-row">' +
            '                    <div class="slide-position-col">' +
            '                        <h2 class="sc-slide-heading"> {{all}} </h2>' +
            '                        <div class="position-all">' +

            '                  <div id="swiper-positions-container" class="swiper-container swiper-auto-container">' +
            '                    <div class="swiper-wrapper">' +
            '                      <div class="swiper-slide">' +


            '                           <div class="position choose-position" ng-repeat="position in model">' +
            '                               <h3 class="position-heading"> {{position.sJobProfileId}}</h3>' +
            '                               <p class="position-learn-more">{{position.sJobProfileName}} </p>' +
            '                               <p class="position-learn-more">' +
            '                                   <span class="position-more">Грейд {{position.iGrade}}</span>' +
            '                                   <span class="position-more">Оборачиваемость {{position.iTurnover}}</span>' +
            '                               </p>' +
            '                           </div>' +

            '                         </div>' +
            '                       </div>' +
            '                     </div>' +

            '                        </div>' +
            '                    </div>' +
            '                    <div class="slide-position-col chosen-positions">' +
            '                        <h2 class="sc-slide-heading"> Избранные </h2>' +
            '                    </div>' +
            '                </div>' +
            '            </div>' +
            '        </div>';

        return html;
    }

    this.positionController = function (show) {


        var that = this;
        angular.module('scApp').controller('positionController', ['$scope', function ($scope) {
            $scope.all = "Все";
            $scope.model = that_.services.position.result;
        }]);

// Выбор позиций
        var choose_position = document.querySelectorAll(".choose-position");
        var chosen_position = document.querySelector(".chosen-positions");
        choose_position.forEach(function (item) {
            item.addEventListener(eventBr, function () {
                if (item.classList.contains("disabled")) {
                    return;
                }

                var newItem = item.cloneNode(true);

                // Запрещаем повторный клик
                item.classList.add("disabled");

                newItem.firstElementChild.classList.add("color-red");
                newItem.addEventListener(eventBr, function () {
                    chosen_position.removeChild(newItem);
                    item.classList.remove("disabled");
                });
                chosen_position.appendChild(newItem);
            });
        });

        // Фильтры
        var filterInputs = document.querySelectorAll(".sc-menu-filter-input");

        filterInputs.forEach(function (filter) {

            filter.addEventListener("input", function () {
                for (var i = 0; i < choose_position.length; i++) {
                    var turnover = choose_position[i].getAttribute("data-turnover");
                    var grade = choose_position[i].getAttribute("data-grade");

                    if (filter.classList.contains("turnover-from") && turnover <= filter.value) {
                        choose_position[i].classList.add("hidden");
                    } else {
                        choose_position[i].classList.remove("hidden");
                    }

                    if (filter.classList.contains("turnover-to") && turnover >= filter.value) {
                        choose_position[i].classList.add("hidden");
                    } else {
                        choose_position[i].classList.remove("hidden");
                    }

                }
            });

        });

        window.positions_swiper = new Swiper('#swiper-positions-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheel: true,
            freeMode: true
        });

        $(window).resize(function () {
            window.positions_swiper.update();
        });
    }
}