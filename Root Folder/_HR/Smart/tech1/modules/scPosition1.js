function classPosition() {
    var eventBr = ($.browser.mobile) ? 'touchstart' : 'click';

    this.positionView = function () {
        var html =
            '        <div class="sc-main-slide">' +
            '            <div class="position-slide sc-v-slide">' +
            '                <div class="slide-row">' +
            '                    <div class="slide-position-col">' +
            '                        <h2 class="sc-slide-heading"> Все </h2>' +
            '                        <div class="position-all">';

        var positions = this.globalJSON.positions;

        positions.forEach(function (position) {

            html +=
                '<div class="position choose-position" data-grade="' + position.grade + '" data-turnover="' + position.turnover + '">' +
                '    <h3 class="position-heading"><span class="position-like"></span>' + position.position + ' </h3>' +
                //'    <p class="position-learn-more"> О позиции </p>' +
                '</div>';
        });

        html +=
            '                        </div>' +
            '                    </div>' +
            '                    <div class="slide-position-col chosen-positions">' +
            '                        <h2 class="sc-slide-heading"> <span class="position-liked"></span><span class="position-liked-number"></span></h2>' +
            '                    </div>' +
            '                </div>' +
            '            </div>' +
            '        </div>';

        return html;
    }

    this.positionController = function () {
// Выбор позиций
        /*
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
        */

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
    }
}