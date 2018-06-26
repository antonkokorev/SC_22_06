function classInstruments() {

    this.instrumentsView = function () {

        var html = "";

        html +=
            '        <div class="sc-main-slide">' +
            '            <div class="swiper-container swiper-tools-container">' +
            '                <div class="swiper-wrapper">' +
            '                    <div class="swiper-slide">' +
            '                    <div class="tools-slide sc-v-slide">' +
            '                        <h2 class="sc-slide-heading"> Цель №1 </h2>' +

            '                        <p class="tools-text">' +
            '                            Детально раскладывает проблему/задачу, устанавливая взаимосвязь с другими задачами.' +
            '                            Анализирует до глубины, необходимой для обоснованного принятия решения, учитывает риски.' +
            '                        </p>' +
            '                        <p class="tools-progress"> Прогресс <span class="progress-bold"> 87% </span></p>' +

            '                        <div class="tools-section">' +
            '                            <h3 class="sc-slide-middle-heading"> Практические советы </h3>' +
            '                            <div class="slide-row">' +
            '                                <div class="tools-col">' +
            '                                    <h4 class="tools-small-heading"> Самоосознанность </h4>' +
            '                                    <p class="tools-text"> Заведите журнал своих эмоций. </p>' +
            '                                    <p class="tools-text"> Не оценивайте свои чувства как хорошие/плохие. </p>' +
            '                                    <p class="tools-text"> Наблюдайте за собой в состоянии стресса. </p>' +
            '                                    <p class="tools-more"> Подробнее </p>' +
            '                                </div>' +
            '                                <div class="tools-col">' +
            '                                    <h4 class="tools-small-heading"> Самоосознанность </h4>' +
            '                                    <p class="tools-text"> Заведите журнал своих эмоций. </p>' +
            '                                    <p class="tools-text"> Не оценивайте свои чувства как хорошие/плохие. </p>' +
            '                                    <p class="tools-text"> Наблюдайте за собой в состоянии стресса. </p>' +
            '                                    <p class="tools-more"> Подробнее </p>' +
            '                                </div>' +
            '                            </div>' +
            '                            <div class="slide-row">' +
            '                                <div class="tools-col">' +
            '                                    <h4 class="tools-small-heading"> Самоосознанность </h4>' +
            '                                    <p class="tools-text"> Заведите журнал своих эмоций. </p>' +
            '                                    <p class="tools-text"> Не оценивайте свои чувства как хорошие/плохие. </p>' +
            '                                    <p class="tools-text"> Наблюдайте за собой в состоянии стресса. </p>' +
            '                                    <p class="tools-more"> Подробнее </p>' +
            '                                </div>' +
            '                                <div class="tools-col">' +
            '                                    <h4 class="tools-small-heading"> Самоосознанность </h4>' +
            '                                    <p class="tools-text"> Заведите журнал своих эмоций. </p>' +
            '                                    <p class="tools-text"> Не оценивайте свои чувства как хорошие/плохие. </p>' +
            '                                    <p class="tools-text"> Наблюдайте за собой в состоянии стресса. </p>' +
            '                                    <p class="tools-more"> Подробнее </p>' +
            '                                </div>' +
            '                            </div>' +
            '                        </div>' +

            '                        <div class="tools-section">' +
            '                            <h3 class="sc-slide-middle-heading"> Книги </h3>' +

            '                            <div class="book">' +
            '                                <h4 class="tools-heading"> Азбука системного мышления </h4>' +
            '                                <div class="slide-row book-info">' +
            '                                    <div class="book-img"></div>' +
            '                                    <div class="book-description">' +
            '                                        <h4 class="tools-small-heading"> Донелла Медоуз </h4>' +
            '                                        <p class="tools-text"> Классическая книга о системах, к которым относятся и' +
            '                                            футбольная команда, и экономическая система, и система пищеварения, и' +
            '                                            система отопления, и другие. О том, как воздействовать на такие системы и' +
            '                                            как они функционируют. </p>' +
            '                                        <p class="add-tool add-book"> В список для чтения </p>' +
            '                                    </div>' +
            '                                </div>' +
            '                            </div>' +
            '                        </div>' +

            '                        <div class="tools-section">' +
            '                            <h3 class="sc-slide-middle-heading"> Обучающие видео </h3>' +

            '                            <div class="video">' +
            '                                <h4 class="tools-heading"> Видео №1 </h4>' +
            '                                <p class="tools-text"> Классическая книга о системах, к которым относятся и футбольная' +
            '                                    команда, и экономическая система, и система пищеварения, и система отопления, и' +
            '                                    другие. О том, как воздействовать на такие системы и как они функционируют. </p>' +
            '                                <p class="add-tool add-book"> В список для просмотра </p>' +
            '                            </div>' +
            '                        </div>' +

            '                        <div class="tools-section">' +
            '                            <h3 class="sc-slide-middle-heading"> Очные курсы </h3>' +

            '                            <div class="planned-courses">' +
            '                                <h4 class="tools-heading"> Запланированные (LMS) </h4>' +
            '                                <div class="slide-row">' +
            '                                    <div class="tools-col">' +
            '                                        <h4 class="tools-small-heading"> Решение проблем и критическое мышление </h4>' +
            '                                        <div class="slide-row">' +
            '                                            <div class="tools-col"> Статус</div>' +
            '                                            <div class="tools-col"> Обучение назначено</div>' +
            '                                        </div>' +
            '                                        <div class="slide-row">' +
            '                                            <div class="tools-col"> Дата</div>' +
            '                                            <div class="tools-col"> 12.06.2018</div>' +
            '                                        </div>' +
            '                                    </div>' +
            '                                    <div class="tools-col">' +
            '                                        <h4 class="tools-small-heading"> Решение проблем и критическое мышление </h4>' +
            '                                        <div class="slide-row">' +
            '                                            <div class="tools-col"> Статус</div>' +
            '                                            <div class="tools-col"> Обучение назначено</div>' +
            '                                        </div>' +
            '                                        <div class="slide-row">' +
            '                                            <div class="tools-col courses-date"> Дата</div>' +
            '                                            <div class="tools-col"> 12.06.2018</div>' +
            '                                        </div>' +
            '                                    </div>' +
            '                                </div>' +
            '                            </div>' +
            '                            <div class="recommended-courses">' +
            '                                <h4 class="tools-heading"> Рекомендованные</h4>' +
            '                                <div class="slide-row">' +
            '                                    <div class="tools-col">' +
            '                                        <h4 class="tools-small-heading"> Решение проблем и критическое мышление </h4>' +
            '                                        <div class="slide-row">' +
            '                                            <div class="tools-col"> Трудоемкость</div>' +
            '                                            <div class="tools-col"> 120 ч.</div>' +
            '                                        </div>' +
            '                                        <div class="slide-row">' +
            '                                            <div class="tools-col"> Форма</div>' +
            '                                            <div class="tools-col"> Очная</div>' +
            '                                        </div>' +
            '                                        <div class="recommended-course-status"> На согласование</div>' +
            '                                    </div>' +
            '                                    <div class="tools-col">' +
            '                                        <h4 class="tools-small-heading"> Решение проблем и критическое мышление </h4>' +
            '                                        <div class="slide-row">' +
            '                                            <div class="tools-col"> Статус</div>' +
            '                                            <div class="tools-col"> Обучение назначено</div>' +
            '                                        </div>' +
            '                                        <div class="slide-row">' +
            '                                            <div class="tools-col courses-date"> Дата</div>' +
            '                                            <div class="tools-col"> 12.06.2018</div>' +
            '                                        </div>' +
            '                                        <div class="recommended-course-status"> На согласование</div>' +
            '                                    </div>' +
            '                                </div>' +
            '                            </div>' +
            '                        </div>' +
            '                    </div>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '    </div>';

        return html;
    }

    this.instrumentsController = function () {
// Свайпер
        window.tools_swiper = new Swiper('.swiper-tools-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheel: true,
            freeMode: true
        });

        $(window).resize(function () {
            window.tools_swiper.update();
        })
    }
}