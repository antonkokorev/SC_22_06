function classMainBody() {
    //======================================
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
                    param.result = json;
                    if (param.activeController) {
                        param.activeController();
                    }
                    //alert(JSON.stringify(that.services[this.name].result));
                },
                error: function (json) {
                    param.status = true;
                    param.result = json;
                    if (param.activeController) {
                        try {
                            param.activeController();
                        } catch (err) {
                            console.log("Контроллер " + param.callback + " не существует");
                        }

                    }
                    //alert(JSON.stringify(that.services[this.name].result));
                },
            });
        }


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
            "loadInStart": true,
            "callback": "getRecommendatedPosition",
        }
        ,
        "competention": {
            "url": "https://sbt-surp-216.sigma.sbrf.ru:8292/hr/smartcareer/services/data.xsjs?entity=positionCompetention",
            "status": false,
            "params": "&user=102838&position=[30007047,30006541]",
            "loadInStart": false,
            "callback": "getCompetetionInstrument",
        }

    }


    this.globalJSON = {
        "profile": {
            "name": "Козырев Константин Сергеевич",
            "rates": [4.07, 4.07, 4.07, 4.07, 4.07, 3],
            "effectiveness": "B",
            "competence": "C"
        },
        "positions": [
            {
                "position": "Позиция №12453-33",
                "description": "Lorem ipsum",
                "turnover": 5,
                "grade": 12
            },
            {
                "position": "Позиция №12453-34",
                "description": "Lorem ipsum",
                "turnover": 15,
                "grade": 15
            },
            {
                "position": "Позиция №12453-35",
                "description": "Lorem ipsum",
                "turnover": 20,
                "grade": 7
            }
        ],
        "competence": [
            {
                "position": "Позиция №12453-33",
                "conformity": 87,
                "competences": [
                    {
                        "label": "Системное мышление и решение проблем",
                        "conformity": 87,
                        "indicators": [
                            "Детально раскладывает проблему/задачу, устанавливая взаимосвязь с другими задачами. Анализирует до глубины, необходимой для обоснованного принятия решения, учитывает риски.",
                            "Обобщает аргументы и информацию, правильно определяет суть проблемы.",
                            "Избегает основных ловушек мышления. Принимает во внимание разные точки зрения, источники информации. Опирается на анализ объективных данных, а не на знакомые по опыту, привычные подходы.",
                            "Выбирает оптимальное решение рабочей проблемы. Проявляет гибкость, рассматривает альтернативные варианты действий. Информирует руководство о возможных рисках.",
                            "Имеет ясное представление о стратегических целях организации, ориентируется на них в своей работе.",
                        ]
                    },
                    {
                        "label": " Управление результатом и ответственность",
                        "conformity": 77,
                        "indicators": [
                            "Детально раскладывает проблему/задачу, устанавливая взаимосвязь с другими задачами. Анализирует до глубины, необходимой для обоснованного принятия решения, учитывает риски.",
                            "Обобщает аргументы и информацию, правильно определяет суть проблемы.",
                            "Избегает основных ловушек мышления. Принимает во внимание разные точки зрения, источники информации. Опирается на анализ объективных данных, а не на знакомые по опыту, привычные подходы.",
                            "Выбирает оптимальное решение рабочей проблемы. Проявляет гибкость, рассматривает альтернативные варианты действий. Информирует руководство о возможных рисках.",
                            "Имеет ясное представление о стратегических целях организации, ориентируется на них в своей работе.",
                        ]
                    },
                    {
                        "label": "Управление собой ",
                        "conformity": 72,
                        "indicators": [
                            "Детально раскладывает проблему/задачу, устанавливая взаимосвязь с другими задачами. Анализирует до глубины, необходимой для обоснованного принятия решения, учитывает риски.",
                            "Обобщает аргументы и информацию, правильно определяет суть проблемы.",
                            "Избегает основных ловушек мышления. Принимает во внимание разные точки зрения, источники информации. Опирается на анализ объективных данных, а не на знакомые по опыту, привычные подходы.",
                            "Выбирает оптимальное решение рабочей проблемы. Проявляет гибкость, рассматривает альтернативные варианты действий. Информирует руководство о возможных рисках.",
                            "Имеет ясное представление о стратегических целях организации, ориентируется на них в своей работе.",
                        ]
                    },
                    {
                        "label": "  Инновационность и Digital навыки",
                        "conformity": 69,
                        "indicators": [
                            "Детально раскладывает проблему/задачу, устанавливая взаимосвязь с другими задачами. Анализирует до глубины, необходимой для обоснованного принятия решения, учитывает риски.",
                            "Обобщает аргументы и информацию, правильно определяет суть проблемы.",
                            "Избегает основных ловушек мышления. Принимает во внимание разные точки зрения, источники информации. Опирается на анализ объективных данных, а не на знакомые по опыту, привычные подходы.",
                            "Выбирает оптимальное решение рабочей проблемы. Проявляет гибкость, рассматривает альтернативные варианты действий. Информирует руководство о возможных рисках.",
                            "Имеет ясное представление о стратегических целях организации, ориентируется на них в своей работе.",
                        ]
                    }
                ]
            }
        ]
    }


    this.initMainBody = function () {
        /*  */


        var that = this;
        console.warn("initMainBody")
        //this.currentUser=this.globalSettings.Settings.user;

        for (var key in this.services) {
            if (this.services[key].loadInStart) {
                this.ajax(this.services[key]);
            }
        }

        that.reDrawMainBody()
    };

    /*************************************************************************************************************************/

    this.reDrawMainBody = function () {
        this.refresh();

        var globalSettings = this.globalSettings;
        var component = '#' + globalSettings.teg + '_COMPONENT ';

        var html =
            this.headerView() +
            this.menuView() +
            '<main id="id_main" class="sc-main">' +
            '<div class="sc-main-slider">' +
            this.profileView() +
            this.choiceView() +
            this.positionView() +
            this.competencesView() +
            this.goalsView() +
            this.instrumentsView() +
            this.iprView() +
            '</div>' +
            '</main>';


        $(component).append(html);

        $(".sc-menu").addClass("enter-active");
        $(".sc-main").addClass("enter-active");

        this.menuController();
        //this.choiceController();
        //   this.animateChoice();
        //this.positionController();
        //this.competencesController();
    }

}
