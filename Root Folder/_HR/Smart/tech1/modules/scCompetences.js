function classCompetences() {
    var eventBr = ($.browser.mobile) ? 'touchstart' : 'click';

    this.competencesView = function() {
        var html =
            '        <!--Компетенции-->' +
            '        <div class="sc-main-slide">' +
            '            <div class="competences-slide sc-v-slide">' +
            '                <div class="competences-by-position">' +
            '                    <div class="competences-h-slide competences-by-position-list">';

        var competences = this.globalJSON.competence;

        competences.forEach(function (competence, index) {
            html +=
                '                        <div class="competence-position" data-index="' + index + '">' +
                '                            <h3 class="competence-position-heading"> ' + competence.position + ' </h3>' +
                '                            <p class="competence-position-conformity"> Соответствие <span' +
                '                                    class="conformity-bold"> ' + competence.conformity + ' </span></p>' +
                '                            <p class="competence-position-competences"> Компетенции </p>' +
                '                        </div>'
        });

        html +=
            '                    </div>' +
            '                    <div class="competences-h-slide competences-by-position-current"></div>' +
            '                    <div class="competences-h-slide competences-by-position-competence"></div>' +
            '                </div>' +
            '                <div class="competence-by-intersections">' +
            '                    <div class="competence-position-current">' +
            '                        <h3 class="competence-position-heading"> Системное мышление и решение проблем </h3>' +
            '                        <p class="competence-position-conformity"> Соответствие <span' +
            '                                class="conformity-bold"> 87% </span></p>' +
            '                        <p class="competence-position-intersection"> Встречается в <span class="conformity-bold"> 2 позициях </span>' +
            '                        </p>' +
            '                        <p class="competence-position-competences"> Индикаторы </p>' +
            '                    </div>' +

            '                    <div class="competence-position-current">' +
            '                        <h3 class="competence-position-heading"> Управление результатом и ответственность </h3>' +
            '                        <p class="competence-position-conformity"> Соответствие <span' +
            '                                class="conformity-bold"> 87% </span></p>' +
            '                        <p class="competence-position-intersection"> Встречается в <span class="conformity-bold"> 2 позициях </span>' +
            '                        </p>' +
            '                        <p class="competence-position-competences"> Индикаторы </p>' +
            '                    </div>' +

            '                    <div class="competence-position-current">' +
            '                        <h3 class="competence-position-heading"> Управление собой </h3>' +
            '                        <p class="competence-position-conformity"> Соответствие <span' +
            '                                class="conformity-bold"> 87% </span></p>' +
            '                        <p class="competence-position-intersection"> Встречается в <span class="conformity-bold"> 2 позициях </span>' +
            '                        </p>' +
            '                        <p class="competence-position-competences"> Индикаторы </p>' +
            '                    </div>' +

            '                    <div class="competence-position-current">' +
            '                        <h3 class="competence-position-heading"> Инновационность и Digital навыки </h3>' +
            '                        <p class="competence-position-conformity"> Соответствие <span' +
            '                                class="conformity-bold"> 87% </span></p>' +
            '                        <p class="competence-position-intersection"> Встречается в <span class="conformity-bold"> 2 позициях </span>' +
            '                        </p>' +
            '                        <p class="competence-position-competences"> Индикаторы </p>' +
            '                    </div>' +
            '                </div>' +
            '            </div>' +
            '        </div>';


        return html;
    }

    this.competencesController = function() {
        var that = this;
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
    }
}