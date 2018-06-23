function classMainBody() {
    //========================================
    //подключение модулей
    //======================================
    classHeader.call(this);
    classMainMenu.call(this);
    classProfile.call(this);
    classChoice.call(this);
    classPosition.call(this);
    classCompetences.call(this);
    classGoals.call(this);
    classInstruments.call(this);
    classIpr.call(this);
    //======================================

    //this.currentUser="Basic Z2VvcmdpZXYtZWk6cXdlcnR5MTIz",
    this.currentUser = "Basic ZG9tb3poYWtvX212OjEyMzQ1VGdi",
        that_ = this,


        this.ajax = function (param) {
            /*var that=this;*/
            //чтобы удобнее собирать параметры было
            if(param.params_){
                param.params="";
               for(key in param.params_)
               {
                   param.params+="&"+key+"="+param.params_[key]
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

                    (param.return)?param[param.return]=json: param.result = json;

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
                            console.error("Ошибка выполнения AJAX "+ param.callback);
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
            "params_":{"user":"102838","requestType":"model","family":"[30000047]","row":"1_40"},
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
        /*  */

       var path= $("head").find("link").last().attr("href").split("/");
        path[path.length - 1] = "";
        this.path=path.join("/");

      var that = this;
        console.warn("initMainBody");
        //this.currentUser=this.globalSettings.Settings.user;

        /*    for (var key in this.services) {
              if (this.services[key].loadInStart) {
                  this.ajax(this.services[key]);
              }
          }
  */
        that.reDrawMainBody()
    };

    /*************************************************************************************************************************/
    /*   var html =
           '<div id="sc-app" ng-app="scApp">' +
           this.headerView() +
           '<main-menu id="id_menu" class="sc-menu"></main-menu>'+
           '<div ng-view class="sc-main-slide"></div>'+
              // this.menuView() +
          '   <main id="id_main" class="sc-main">' +
           '   <div class="sc-main-slider">' +
        //     '<p><a href="#/!">Main</a></p>' +
        //    '<a href="#!banana">Banana</a>' +
         //   '<a href="#!tomato">Tomato</a>' +
        //  this.profileView() +
       //   this.choiceView() +
       //   this.positionView() +
        //  this.competencesView() +
        //  this.goalsView() +
       //   this.instrumentsView() +
      //    this.iprView() +
           '   </div>' +
           '   </main>' +
           '</div>';*/
    this.reDrawMainBody = function () {
        this.refresh();

        var globalSettings = this.globalSettings;
        //============================================================
        //создание html страницы
        //============================================================
        var component = '#' + globalSettings.teg + '_COMPONENT ';
        var html =
            '<div id="sc-app" ng-app="scApp">' +
            '<main-menu id="id_menu" class="sc-menu"></main-menu>'+
            '<main id="id_main" class="sc-main enter-active">' +
                '<div ng-view ></div>'+
            '</main>' +
          '</div>';
        $(component).append(html);
        //============================================================
        //создание основного модуля и роутинга
        //============================================================
        this.app = angular.module('scApp', ["ngRoute"]);
        this.app.config(function($routeProvider) {
            $routeProvider
                .when("/", {
                    template : '<profile id="sc-profile" class="profile-slide sc-v-slide"></profile>'
                })
                .when("/banana", {
                    template : "<h1>Banana</h1><p>Bananas contain around 75% water.</p>"
                })
                .when("/tomato", {
                    template : "<h1>Tomato</h1><p>Tomatoes contain around 95% water.</p>"
                });
        });
        //============================================================
        //создание директив
        //============================================================
        this.app.directive('mainMenu', function() {
            return {
                restrict: 'AE',
                scope:{},
                templateUrl: that_.path+"modules/menu.html",
                controller:  that_.menuController,
                controllerAs: "menu"
            };
        });

        this.app.directive('profile', function() {
            return {
                restrict: 'AE',
                scope:{},
                templateUrl: that_.path+"modules/profile.html",//that_.profileView(),
                controller:  that_.profileController,
                controllerAs: "profile"
            };
        });


        this.app.factory('bar', function(a) {
            return a * 2;
        });
        //============================================================
        //регистрация приложения Angular
        //============================================================
        angular.element(function () {
           angular.bootstrap(document.getElementById("sc-app"), ['scApp']);
         });


      /*  $(".sc-menu").addClass("enter-active");
        $(".sc-main").addClass("enter-active");*/


    }

}
