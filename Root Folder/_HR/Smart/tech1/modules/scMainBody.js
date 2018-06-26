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
    this.ajax = function (param) {
        /*var that=this;*/
        //чтобы удобнее собирать параметры было
        if (param.params_) {
            param.params = "";
            for (key in param.params_) {
                param.params += "&" + key + "=" + param.params_[key]
            }
        }

        $.ajax
        ({
            type: "GET",
            url: param.url + param.params,
            dataType: 'jsonp',
            name: key,
            async: true,
            jsonpCallback: param.callback,
            //headers:{"Authorization":"Basic ZG9tb3poYWtvX212OjEyMzQ1VGdi"},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Form " + btoa("domozhako_mv:12345Tgb")/*"Basic ZG9tb3poYWtvX212OjEyMzQ1VGdi"*/);
            },
            success: function (json) {
                param.status = true;

                (param.return) ? param[param.return] = json : param.result = json;

                if (param.activeController) {
                    try {
                        console.warn("Контроллер " + param.callback + " пошел работать");
                        param.activeController();
                    } catch (err) {
                        console.error("Контроллер " + param.callback + " не существует");
                    }

                }
            },
            error: function (json) {
                console.error("Ошибка выполнения AJAX " + param.callback);
            },
        });
    },


        this.services = {
            "profile": {
                "url": "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs?entity=empProfile",
                "status": false,
                "params": "&user=102838",

                "loadInStart": true,
                "callback": "getEmpProfile",
                "activeController": that_.profileController
            },

            "dict":
                {
                    "url": "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs?entity=dict",
                    "status": false,
                    "params": "&user=102838",
                    "callback": "getDicts",
                    "loadInStart": true,
                    "activeController": that_.choiceController
                },

            "instrument": {
                "url": "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs?entity=competentionInstrument",
                "status": false,
                "params": "&compitentId=2000001154&user=102838",
                "loadInStart": false,
                "callback": "getCompetetionInstrument"
            },

            "position": {
                "url": "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs?entity=position",
                "status": false,
                "params": "&user=102838&requestType=model&family=[30000047]&row=1_2",
                "params_": {"user": "102838", "requestType": "model", "family": "[30000047]", "row": "1_40"},
                "loadInStart": true,
                "callback": "getRecommendatedPosition",
                "activeController": that_.positionController

            }
            ,
            "competention": {
                "url": "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs?entity=positionCompetentions",
                "status": false,
                "params": "&user=102838&position=[30007047,30006541]",
                "loadInStart": true,
                "callback": "getPositionCompetetions",
                "activeController": that_.competencesController
            }

        };


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
            });



        //============================================================
        //регистрация приложения Angular
        //============================================================
        angular.element(function () {
            angular.bootstrap(document.getElementById("sc-app"), ['scApp']);
        });
    }
}
