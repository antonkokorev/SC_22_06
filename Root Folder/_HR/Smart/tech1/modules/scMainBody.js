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
    dirHeader.call(this);
    dirCompetences.call(this);
    dirGoals.call(this);
    dirInstruments.call(this);
    dirIpr.call(this);
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
            '<div id="sc-app" ng-controller="scAppController as appController">' +
            '   <dir-header class="sc-header"></dir-header>' +
            '   <dir-main-menu id="id_menu" class="sc-menu"></dir-main-menu>' +
            '   <main id="id_main" class="sc-main enter-active">' +
            '   <div id="swiper-container" class="swiper-auto-container">' +
            '       <div class="swiper-wrapper">' +
            '           <div class="swiper-slide">' +
            '              <ui-view class="main-view"></ui-view>' +
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
        angular.module('scApp', [
            "ngAnimate",
            "rzModule",
            "ui.router",
            "scApp.header",
            "scApp.menu",
            "scApp.choice",
            "scApp.profile",
            "scApp.position",
            "scApp.competences",
            "scApp.goals",
            "scApp.instruments",
            "scApp.ipr"
         ])
            .controller('scAppController', function (requestService, $timeout, updateSwiper, timelineService, preloader, updateSwiper, $state, $timeout) {
                var url = that_.srvLink + "?entity=positionNoCallback&requestType=model&family=[]&row=1_30&user=";

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
                        },0);

                });
                //*************************************************************
            });
        //============================================================
        //роутер
        //============================================================
        angular.module('scApp').config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state({
                name: 'profile',
                url: '/profile',
                template: '<dir-profile profilemodeldata="appController.profileModelData" id="sc-profile" class="profile-slide sc-v-slide"></dir-profile>',
                controller: allController
            });
            $stateProvider.state({
                name: 'choice',
                url: '/choice',
                template: "<dir-choice></dir-choice>",
                controller: allController
            });
            $stateProvider.state({
                name: 'position',
                url: '/position',
                template: "<dir-position grade='appController.profileModelData.iGrade' positionmodeldata='appController.positionModelData'></dir-position>",
                controller: allController
            });
            $stateProvider.state({
                name: 'competences',
                url: '/competences',
                template: "<dir-competences></dir-competences>",
                controller: allController
            });
            $stateProvider.state({
                name: 'goals',
                url: '/goals',
                template: "<dir-goals></dir-goals>",
                controller: allController
            });
            $stateProvider.state({
                name: 'instruments',
                url: '/instruments',
                template: "<dir-instruments></dir-instruments>",
                controller: allController
            });
            $stateProvider.state({
                name: 'ipr',
                url: '/ipr',
                template: "<dir-ipr></dir-ipr>",
                controller: allController
            });
            $urlRouterProvider.when('/', 'profile');
        })

            .run(['$state', function ($state) {
           $state.transitionTo('profile');
         }]);

        //общий контроллер для состояний с обновлением основного свайпера
        function allController($state, $scope, $timeout, updateSwiper, timelineService, preloader,resetSwiper) {
            preloader.on();
            var state = $state.current.name;

            $scope.$on('$viewContentLoaded', function (event) {
                $timeout(function () {
                    if (state == "profile") {
                        timelineService.renderTimelineLine(".profile-education");
                        timelineService.renderTimelineLine(".profile-results");
                    }
                    resetSwiper();
                    updateSwiper();
                    preloader.off();
                },400);


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
