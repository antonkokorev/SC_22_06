function classMainBody() {
    console.warn("initMainBody");
    //========================================
    //подключение модулей
    //======================================
    scMenuView.call(this);
    dirMenu.call(this);
    dirChoice.call(this);
    dirProfile.call(this);
    dirPosition.call(this);


    classHeader.call(this);
    classCompetences.call(this);
    classGoals.call(this);
    classInstruments.call(this);
    classIpr.call(this);
    //======================================

    //this.currentUser="Basic Z2VvcmdpZXYtZWk6cXdlcnR5MTIz",
    this.currentUser = "Basic ZG9tb3poYWtvX212OjEyMzQ1VGdi",
        this.srvLink = "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs",
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
            '<div id="sc-app" ng-app="scApp" ng-controller="scAppController as appController">' +
            // '<header class="sc-header"></header>'+
            '   <main-menu id="id_menu" class="sc-menu"></main-menu>' +
            '   <main id="id_main" class="sc-main enter-active">' +
            '   <div id="swiper-container" class="swiper-auto-container">' +
            '       <div class="swiper-wrapper">' +
            '           <div class="swiper-slide">' +
            '              <ui-view></ui-view>' +
            '            </div>' +
            '           </div>' +
            //'       <div class="swiper-scrollbar"></div>' +
            '   </div>' +
            '</main>' +
            '</div>';


        //============================================================
        //создание прелоадера
        //============================================================
        $(component).append(`
            <div id="preId" class="preClass"'>
                <div class='cssload-loader'>
                    <div class='cssload-inner cssload-one'></div>
                    <div class='cssload-inner cssload-two'></div>
                    <div class='cssload-inner cssload-three'></div>
                </div>
            </div>`);
        $(component).append(html);
        //============================================================
        //основной свайпер
        //============================================================
        this.profile_swiper = new Swiper('#swiper-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheel: true,
            freeMode: true
        });
        //============================================================
        //создание основного модуля
        //============================================================
        angular.module('scApp', ["ngAnimate","ui.router", "mainMenuModule", "choiceModule", "profileModule", "positionModule"])
            .controller('scAppController', function (requestService, $timeout, updateSwiper, timelineService, preloader, updateSwiper, $state, $timeout) {
                var url = that_.srvLink + "?entity=positionNoCallback&requestType=model&family=[]&row=1_10&user=";

                //*************************************************************
                requestService(url).then((data) => {
                    this.positionModelData = data;
                    if ($state.current.name == "position")
                        $timeout(function () {
                            updateSwiper()
                        }, 0);
                });
                //*************************************************************
                var url = that_.srvLink + "?entity=empProfileNoCallback&user=";
                requestService(url).then((data) => {
                    this.profileModelData = data;
                    if ($state.current.name == "profile")
                        $timeout(function () {
                            timelineService.renderTimelineLine(".profile-education");
                            timelineService.renderTimelineLine(".profile-results");
                            updateSwiper()
                        }, 0);

                });
                //*************************************************************
            });
        //============================================================
        //роутер
        //============================================================
        angular.module('scApp').config(function ($stateProvider) {
            $stateProvider.state({
                name: 'profile',
                url: '/profile',
                template: '<profile profilemodeldata="appController.profileModelData" id="sc-profile" class="profile-slide sc-v-slide"></profile>',
                controller: allController
            });

            $stateProvider.state({
                name: 'choice',
                url: '/choice',
                template: "<choice></choice>",
                controller: allController
            });

            $stateProvider.state({
                name: 'position',
                url: '/position',
                template: "<position positionmodeldata='appController.positionModelData'></position>",
                controller: allController
            });
        }).run(['$state', function ($state) {
            $state.transitionTo('profile');
        }]);

        //общий контроллер для состояний с обновлением основного свайпера
        function allController($state, $scope, $timeout, updateSwiper, timelineService, preloader) {
            preloader.on();
            var state = $state.current.name;
            $scope.$on('$viewContentLoaded', function (event) {
                $timeout(function () {
                    if (state == "profile") {
                        timelineService.renderTimelineLine(".profile-education");
                        timelineService.renderTimelineLine(".profile-results");
                    }
                    updateSwiper();
                    preloader.off();
                }, 0);
            });
        }

        //============================================================
        //загрузка сервисов
        //============================================================
        Services.call(this);
        //============================================================
        //регистрация приложения Angular
        //============================================================
        angular.element(function () {
            angular.bootstrap(document.getElementById("sc-app"), ['scApp']);
        });
    }
}
