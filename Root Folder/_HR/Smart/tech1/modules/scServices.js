function Services() {
    angular.module('scApp')
    //====================================================================================================================
    //новые переделанные сервисы
    //====================================================================================================================
    /*******************************************************************************************************************/
    /*customElements отвечает за все элементы которые  не зашиты в angular*/
    /*******************************************************************************************************************/
        .factory("customElements", function ($timeout) {

            function updateSwiper() {
                that_.profile_swiper.update();
            }

            $(window).resize(function () {
                renderTimelineLine([".profile-education", ".profile-results", ".profile-achievements"]);
            });

            function resetSwiper() {
                that_.profile_swiper.update();
                that_.profile_swiper.slideTo(0, 0, false)
            }

            function renderTimelineLine(array_parent,ii) {

                try {
                    for (let i = 0; i < array_parent.length; i++) {
                        // Перерисовка линии таймлайна
                        let parent = array_parent[i];
                        let first_circle = $(parent + " .timeline-circle").first();
                        let last_circle = $(parent + " .timeline-circle").last();
                        let line_y_offset = ($(parent + " .timeline-center").first().height() - first_circle.height()) / 2;
                        let line_x_offset = first_circle.position().left + first_circle.width() / 2;
                        let line_y1 = first_circle.offset().top;
                        let line_y2 = last_circle.offset().top + last_circle.height();
                        let line_height = line_y2 - line_y1;
                        $(parent + " .timeline-line").css({
                            "height": line_height,
                            "top": 0,
                            "left": line_x_offset
                        })
                    }
                    ii=undefined;
                } catch (e) {
                    ii=(!ii)?0:ii;
                    if(ii<10){
                        ii++;
                        console.log(ii);
                        $timeout(renderTimelineLine(array_parent,ii),1000);
                    }

                }
            }

            return {
                "updateSwiper": (time) => {
                    $timeout(updateSwiper, time || 0)
                },
                "resetSwiper": (time) => {
                    $timeout(resetSwiper, time || 0)
                },
                "renderTimelineLine": (array_parent, time) => {
                    $timeout(renderTimelineLine(array_parent), time || 0)
                }
            }
        })
        /*******************************************************************************************************************/
        /*для работы с xsjs
        /*******************************************************************************************************************/
        .factory("dataServises", function ($http, $state, customElements) {
            console.warn("SERVICES");
            this.cachedData = {};
            let that = this;

            function getPostService(url, type, body) {
                return $http({
                    method: type,
                    url: url + that_.user,
                    data: body,
                    headers: {
                        'Authorization': "Basic ZG9tb3poYWtvX212OjEyMzQ1VGdi",
                        'Accept': 'application/json; charset=utf-8',
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(function (response) {
                    return response.data
                }).catch(function (error) {
                    console.error(error);
                });
            }

            function check(name) {
                if ($state.current.name === name) {
                    if (name === "profile"){
                        customElements.renderTimelineLine([".profile-education", ".profile-results", ".profile-achievements"],100)
                    }
                    customElements.updateSwiper(200);
                }
            }


            function getProfile() {
                that.cachedData.profileData = {};
                const url = that_.srvLink + "?entity=empProfileNoCallback&user=";
                getPostService(url, "GET").then((data) => {
                    that.cachedData.profileData = data;
                    check("profile");
                });
            }

           function setProfile(body) {
               getPostService(that_.srvLink+"?user=", "POST", body).then((data) => {
                   getProfile();
               })
           }



            return {
                "data": this.cachedData,
                "getProfile": getProfile,
                "setProfile":setProfile
            }
        })


        /*******************************************************************************************************************/
        /*******************************************************************************************************************/
        /*******************************************************************************************************************/
        /*******************************************************************************************************************/
        /*******************************************************************************************************************/
        /*******************************************************************************************************************/
        /*******************************************************************************************************************/

        //====================================================================================================
        .factory("requestService", function ($http) {
            return function (url) {
                return $http({
                    method: 'GET',
                    url: url + that_.user,
                    headers: {
                        'Authorization': "Basic ZG9tb3poYWtvX212OjEyMzQ1VGdi",
                        'Accept': 'application/json; charset=utf-8',
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(function (response) {
                    return response.data
                }).catch(function (error) {
                    console.log(error);
                });

            };
        })
        .factory("postService", function ($http) {
            return function (url, body) {
                return $http({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Authorization': "Basic ZG9tb3poYWtvX212OjEyMzQ1VGdi",
                        'Accept': 'application/json; charset=utf-8',
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: body
                }).then(function (response) {
                    return response.data
                }).catch(function (error) {
                    console.log(error);
                });
            };
        })
        //====================================================================================================
        .factory("positionSettings", function () {

            this.positionSettings = {
                show: "model",
                conformity: [0, 100],
                grade: {},
                open: [0, 100],
                onlyLiked: false,
                countLiked: 0,
                showMenu: false,
                selectedMenu: 0,
                positionStaticMenu: {}

            };

            this.getShow = function () {
                return this.positionSettings.show
            };
            return this.positionSettings;
        })
        .factory("menuSettings", function () {

            return this.menuSettings = [{
                page: 1,
                selectedVerbs: 0,
                selectedPositions: 0,

            }];


        })

        .service("getDict", function (requestService, $state, updateSwiper, $timeout) {

            this.getSelected = () => {
                try {
                    var pos = [];
                    for (let i = 0; i < this.dictData.dict.aDoTags.length; i++) {
                        if (this.dictData.dict.aDoTags[i].selected) {
                            pos.push(this.dictData.dict.aDoTags[i].iFamilyId)
                        }

                    }
                    var change = true;
                    if (JSON.stringify(pos) === JSON.stringify(this.sData)) {
                        change = false;
                    }
                    this.sData = pos;
                } catch (e) {
                    pos = [];
                    change = false;
                }


                return {
                    selected: this.sData,
                    isChange: change
                };


            };

            this.sData = [];
            this.dictData = {dict: []};
            this.getDictData = () => {
                var url = that_.srvLink + "?entity=dictNoCallback&user=";
                requestService(url).then((data) => {
                    this.dictData.dict = data;
                    if ($state.current.name === "choice")
                        $timeout(updateSwiper, 0);
                });
            }
        })
        //====================================================================================================
        .service("getPosition", function (requestService, $state, updateSwiper, $timeout) {
            this.positionData = {data: []};
            this.userPositionData = {data: []};

            this.getLiked = () => {

                var pos = [];
                for (let i = 0; i < this.positionData.data.length; i++) {
                    if (this.positionData.data[i].liked) {
                        pos.push(this.positionData.data[i].sJobProfileId)
                    }
                }
                for (let i = 0; i < this.userPositionData.data.length; i++) {
                    if (this.userPositionData.data[i].liked) {
                        pos.push(this.userPositionData.data[i].sJobProfileId)
                    }
                }

                return pos;
            };


            this.getUserPositionData = (family) => {
                let url = that_.srvLink + "?entity=positionNoCallback&requestType=list&family=" + JSON.stringify(family) + "&row=1_30&user=";
                requestService(url).then((data) => {
                    this.userPositionData.data = data;
                    if ($state.current.name === "position")
                        $timeout(updateSwiper, 0);
                });
            };

            this.getPositionData = () => {
                let url = that_.srvLink + "?entity=positionNoCallback&requestType=model&family=[]&row=1_30&user=";
                requestService(url).then((data) => {
                    this.positionData.data = data;
                    if ($state.current.name == "position")
                        $timeout(updateSwiper, 0);
                });
            };
        })
        //====================================================================================================
       /* .service("getProfile", function (requestService, postService, $state, updateSwiper, timelineService, $timeout) {
            this.profileData = {user: []};
            console.warn("SERVICES");
            this.getProfileData = () => {
                var url = that_.srvLink + "?entity=empProfileNoCallback&user=";
                requestService(url).then((data) => {
                    this.profileData.user = data;
                    if ($state.current.name === "profile")
                        $timeout(function () {
                            timelineService.renderTimelineLine(".profile-education");
                            timelineService.renderTimelineLine(".profile-results");
                            timelineService.renderTimelineLine(".profile-achievements");
                            updateSwiper()
                        }, 0);
                });
            };

            this.postRequest = (body) => {
                let url = that_.srvLink;
                postService(url, body);
                this.getProfileData()
            }
        })*/




        // http://sbt-oopp-009.sigma.sbrf.ru:8091/hr/smartcareer/services/data.xsjs?entity=jobProfile&user=krylova-yv&jobProfileId=1595747
        .factory("getCustomData", function (requestService) {
            function jobProfile(jId) {
                var url = that_.srvLink + "?entity=jobProfile&jobProfileId=" + jId + "&user=";
                return requestService(url).then((response) => {
                    return response
                })
            }

            return {
                jobProfile: jobProfile,

            }
        })

        /*    .factory("srvGetData", function ($http) {
                var ProfileData=false;


                function prGetProfile(){
                    var url = that_.srvLink + "?entity=empProfileNoCallback&user=";
                    if(ProfileData){
                        return  http(url).then((response)=>{return response})
                    }
                    return  http(url).then((response)=>{return response})

                };
                function prGetDict(){
                    var url = that_.srvLink + "?entity=dictNoCallback&user=";
                    return  http(url).then((response)=>{return response})
                };




                function http(url){
                    return $http({
                        method: 'GET',
                        url: url + that_.user,
                        headers: {
                            'Authorization': "Basic ZG9tb3poYWtvX212OjEyMzQ1VGdi",
                            'Accept': 'application/json; charset=utf-8',
                            'Content-Type': 'application/json; charset=utf-8'
                        }
                    }).then(function (response) {
                        return response.data
                    }).catch(function (error) {
                        console.log(error);
                    });
                }

                return {
                    getProfile:prGetProfile,
                    getDict:prGetDict}
            })*/
        //====================================================================================================
    /*    .service("timelineService", function () {
              this.renderTimelineLine = function (parent) {
                try {
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
                  } catch (e) {
                      console.log(e.message)
                  }
                }
            }
        )*/
        //====================================================================================================
        .service("preloader", function () {
            this.on = function () {
                $("#preId").css({display: "none"})
            };
            this.off = function () {
                $("#preId").css({display: "none"})
            }
        })
        //====================================================================================================
        .factory("updateSwiper", function () {
            return () => {
                that_.profile_swiper.update();
                //that_.profile_swiper.slideTo(0, 0, false)
            }
        })
        //====================================================================================================
        .factory("resetSwiper", function () {
            return () => {

            }
        })


        //====================================================================================================
        .service("positionsService", function () {
            var positions = [];

            this.setPositions = (newPositions) => {
                positions = newPositions;
            };

            this.getLikedPositions = () => {
                return positions;
            }

        })
        //====================================================================================================
        .service("formGoalsService", function () {
            var indicators = [];
            var competences = [];
            this.goalsData = {goals: []};

            this.setIndicators = (newIndicators) => {
                indicators = newIndicators;
            };

            this.getIndicators = () => {
                return indicators;
            };

            this.setCompetences = (newCompetences) => {
                competences = newCompetences;
            };

            this.getCompetences = () => {
                return competences;
            };

            this.getGoals = () => {
                this.goalsData.goals = indicators.concat(competences);
                console.log(this.goalsData.goals);
            }
        })
        //====================================================================================================
        .service("instrumentsService", function ($timeout, requestService, updateSwiper) {
            this.instrumentsData = {instruments: []};
            this.currentGoal = {goal: {}, label: ""};
            this.preloader = {show: false};

            this.getInstrumentsData = (goal) => {
                this.preloader.show = !this.preloader.show;
                var url = that_.srvLink + "?entity=competentionInstrument&competentionId=" + goal.sCompetentionId + "&user=";
                requestService(url).then((data) => {
                    this.instrumentsData.instruments = data;
                    this.preloader.show = !this.preloader.show;
                    $timeout(updateSwiper, 0);
                });
            }

            this.setCurrentGoal = (goal, i) => {
                this.currentGoal.goal = goal;
                this.currentGoal.label = "Цель №" + i;
            }
        })
        //====================================================================================================
        .service("iprService", function ($timeout, requestService, updateSwiper, formGoalsService) {
            this.data = formGoalsService.goalsData;

            this.setInstrument = (goal, item) => {
                console.log(goal);
                console.log(item);
                let indexOfCurrentGoal;

                // Проверка Индикатор или Компетенция
                if (goal.hasOwnProperty("iIndicatorId")) {
                    indexOfCurrentGoal = this.data.goals.map(function (goalItem) {
                        return goalItem.iIndicatorId;
                    }).indexOf(goal.iIndicatorId);
                } else {
                    indexOfCurrentGoal = this.data.goals.map(function (goalItem) {
                        return goalItem.sCompetentionId;
                    }).indexOf(goal.sCompetentionId);
                }

                console.log(this.data);

                // Проверка на наличие инструмента в списке
                const type = item.sType + 's'; // тип инструмента

                if (this.data.goals[indexOfCurrentGoal].hasOwnProperty(type)) {
                    const iIdIndex = this.data.goals[indexOfCurrentGoal][type].map(function (item) {
                        return item.iId;
                    }).indexOf(item.iId);

                    if (iIdIndex < 0) {
                        this.data.goals[indexOfCurrentGoal][type].push(item);
                    } else {
                        console.log("Этот инструмента уже есть в списке");
                    }
                } else {
                    this.data.goals[indexOfCurrentGoal][type] = [];
                    this.data.goals[indexOfCurrentGoal][type].push(item);
                }
            };

            this.getIpr = (goal) => {
                let indexOfCurrentGoal
                if (goal.hasOwnProperty("iIndicatorId")) {
                    indexOfCurrentGoal = this.data.goals.map(function (goalItem) {
                        return goalItem.iIndicatorId;
                    }).indexOf(goal.iIndicatorId);
                } else {
                    indexOfCurrentGoal = this.data.goals.map(function (goalItem) {
                        return goalItem.sCompetentionId;
                    }).indexOf(goal.sCompetentionId);
                }

                return this.data.goals[indexOfCurrentGoal];
            }

        })
}


