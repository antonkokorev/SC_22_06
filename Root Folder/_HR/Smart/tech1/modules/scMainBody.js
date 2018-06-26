function classMainBody() {
    console.warn("initMainBody");
    //========================================
    //подключение модулей
    //======================================
    scMenuView.call(this);
    dirMenu.call(this);

    dirChoice.call(this);
    dirProfile.call(this);


    classHeader.call(this);
    classPosition.call(this);
    classCompetences.call(this);
    classGoals.call(this);
    classInstruments.call(this);
    classIpr.call(this);
    //======================================

    //this.currentUser="Basic Z2VvcmdpZXYtZWk6cXdlcnR5MTIz",
    this.currentUser = "Basic ZG9tb3poYWtvX212OjEyMzQ1VGdi",
        that_ = this;
    that_.user = "Krylova-YV";



    this.initMainBody = function () {

        var path = $("head").find("link").last().attr("href").split("/");
        path[path.length - 1] = "";
        this.path = path.join("/");
        this.refresh();
        var globalSettings = this.globalSettings;
        //============================================================
        //создание html страницы
        //============================================================
        var component = '#' + globalSettings.teg + '_COMPONENT ';
        var html =
            '<div id="sc-app" ng-app="scApp">' +
            '   <main-menu id="id_menu" class="sc-menu"></main-menu>' +
            '   <main id="id_main" class="sc-main enter-active">' +
            '   <div id="swiper-container" class="swiper-auto-container">' +
            '       <div class="swiper-wrapper">' +
            '           <div class="swiper-slide">' +
            '               <div ng-view ></div>' +
            '            </div>' +
            '           </div>' +
            //'       <div class="swiper-scrollbar"></div>' +
            '   </div>' +
            '</main>' +
            '</div>';


        $(component).append(html);

        this.profile_swiper = new Swiper('#swiper-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheel: true,
            freeMode: true
        });

        //============================================================
        //создание основного модуля и роутинга
        //============================================================
        angular.module('scApp', ["ngRoute", "mainMenuModule", "choiceModule", "profileModule"]);
        angular.module('scApp').config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    redirectTo: '/profile'
                })
                .when("/profile", {
                    template: '<profile id="sc-profile" class="profile-slide sc-v-slide"></profile>'
                })
                .when("/choice", {
                    template: "<choice></choice>"
                })
        });

        angular.module('scApp')
            .service("swiperService", function() {
                this.updateSwiper = () => {
                    that_.profile_swiper.update();
                }
            })
            .service("requestService", function($http) {
                this.request = function (url) {
                    var _url = url + that_.user;
                    var _headers = {
                        'Authorization': "Basic ZG9tb3poYWtvX212OjEyMzQ1VGdi",
                        'Accept': 'application/json; charset=utf-8',
                        'Content-Type': 'application/json; charset=utf-8'
                    };

                    var promise = $http({
                        method: 'GET',
                        url: _url,
                        headers: _headers
                    }).then(function (response) {
                        return response.data
                    }).catch(function (error) {
                        console.log(error);
                    });
                    return promise
                };
            })
            .service("timelineService", function() {
                this.renderTimelineLine = function(parent) {

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
                }
            })

        //============================================================
        //регистрация приложения Angular
        //============================================================
        angular.element(function () {
            angular.bootstrap(document.getElementById("sc-app"), ['scApp']);
        });
    }
}
