function classMainBody() {
    console.warn("initMainBody");
    //========================================
    //подключение модулей
    //======================================
    dirMenu.call(this);
    dirChoice.call(this);
    dirSwHeader.call(this);
    dirProfile.call(this);
    dirPosition.call(this);
    dirHeader.call(this);
    dirCompetences.call(this);
    dirGoals.call(this);
    dirInstruments.call(this);
    dirIpr.call(this);
    //======================================

    //this.currentUser="Basic Z2VvcmdpZXYtZWk6cXdlcnR5MTIz",
    this.currentUser = "Basic ZG9tb3poYWtvX212OjEyMzQ1VGdi";
    this.srvLink = "http://sbt-oopp-009.sigma.sbrf.ru:8091/hr/smartcareer/services/data.xsjs";
    that_ = this;
    that_.user = (that_.globalSettings.Settings.user == "UNKNOWN")?"Krylova-YV":that_.globalSettings.Settings.user;


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
            '   <dir-main-menu page="appController.choiceCurentPage" id="id_menu" class="sc-menu"></dir-main-menu>' +
            '   <main id="id_main" class="sc-main enter-active">' +
            '   <dir-sw-header style="background:red;width: 100%;height: 90px;"></dir-sw-header>' +
            '   <div id="swiper-container" class="swiper-auto-container">' +
            '       <div class="swiper-wrapper">' +
            '           <div class="swiper-slide">' +
            '              <ui-view class="main-view"></ui-view>' +
            '            </div>' +
            '           </div>' +
            //'       <div class="swiper-scrollbar"></div>' +
            '   </div>' +
            '</div>' +
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
            "scApp.swHeader",
            "scApp.competences",
            "scApp.goals",
            "scApp.instruments",
            "scApp.ipr"
        ])
            .controller('scAppController', function (getProfile, getPosition, getDict) {
                this.choiceCurentPage = 1;

                getDict.getDictData();
                getProfile.getProfileData();
                getPosition.getPositionData();
            });
        //============================================================
        //роутер
        //============================================================
        angular.module('scApp').config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state({
                name: 'profile',
                url: '/profile',
                template: '<dir-profile id="sc-profile" class="profile-slide sc-v-slide"></dir-profile>',
                controller: allController
            });
            $stateProvider.state({
                name: 'choice',
                url: '/choice',
                template: "<dir-choice page='appController.choiceCurentPage'></dir-choice>",
                controller: allController,
                onExit: function (getDict, getPosition) {
                    var result = getDict.getSelected();
                    if (result.isChange) {
                        getPosition.getUserPositionData(result.selected)
                    }
                }
            });
            $stateProvider.state({
                name: 'position',
                url: '/position',
                template: "<dir-position  modelposition='appController.modelPosition'></dir-position>",
                controller: allController,
                onExit: function (getPosition,positionSettings) {
                    //alert("test")
                    var test = getPosition.getLiked();
                    positionSettings.showMenu=false;

                }
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
        function allController($state, $scope, $timeout, updateSwiper, timelineService, preloader, resetSwiper) {
            preloader.on();
            var state = $state.current.name;

            $scope.$on('$viewContentLoaded', function (event) {
                $timeout(function () {
                    if (state == "profile") {
                        timelineService.renderTimelineLine(".profile-education");
                        timelineService.renderTimelineLine(".profile-results");
                        timelineService.renderTimelineLine(".profile-achievements");
                    }
                    resetSwiper();
                    updateSwiper();
                    preloader.off();
                }, 400);


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
