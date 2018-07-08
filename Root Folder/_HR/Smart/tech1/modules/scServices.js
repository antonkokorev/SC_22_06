function Services() {
    angular.module('scApp')
    //====================================================================================================================
    //новые переделанные сервисы
    //====================================================================================================================
    /*******************************************************************************************************************/
    /*для передачи данных
    /*******************************************************************************************************************/

        .factory("appSettings", function () {
            this.Settings = {
                positionShowFrom: "model",
                countLikedPosition: 0,
                sizeSwiperStyle: "",//класс для свайпера обработка смещения от меню
                //--------------------
                fltOpenPosition: [0, 100],
                fltConformityPosition: [0, 100],
                fltOnlyVacantPosition: false,
                fltGradePosition: {},
                fltOnlyLikedPosition: false,
                //--------------------
                currentPositionInfo: {},//данные просматриваемой позиции
                selectedMenuInPositionDetail: -1,
                selectedVerbsInChoice: 0,
                competenceHeaderPosName:"",
                competenceHeaderCompName:"",
                competenceCurrentPage:0,
            };

            return this.Settings;

        })

        /*******************************************************************************************************************/
        /*customElements отвечает за все элементы которые  не зашиты в angular
        /*******************************************************************************************************************/
        .factory("customElements", function ($timeout, $state) {
            let result = {
                "updateSwiper": (time) => {
                    let time1 = time || 0;
                    $timeout(updateSwiper, time1)
                },
                "resetSwiper": (time) => {
                    let time1 = time || 0;
                    $timeout(resetSwiper, time1)
                }
            };

            //-------------------------------------------------------------------------------
            function updateSwiper() {
                if ($state.current.name === "profile") {
                    renderTimelineLine([".profile-education", ".profile-results", ".profile-achievements"]);
                }
                that_.profile_swiper.update();
            }

            $(window).resize(function () {
                renderTimelineLine([".profile-education", ".profile-results", ".profile-achievements"]);
            });

            function resetSwiper() {
                updateSwiper();
                that_.profile_swiper.slideTo(0, 0, false)
            }

            function renderTimelineLine(array_parent) {
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
                } catch (e) {
                    console.log("error renderTimelineLine");
                }
            }

            return result;
        })
        /*******************************************************************************************************************/
        /*для работы с xsjs
        /*******************************************************************************************************************/


        .factory("dataServices", function ($http, $state, customElements) {
            console.warn("SERVICES");

            this.cachedData = {"jobProfileData": {},"goalsData" :[]};
            let that = this;
            let result = {
                "data": this.cachedData,
                "getProfile": () => {
                    getHelper("profile")
                },
                "getDictData": () => {
                    getHelper("dict")
                },
                "getPositionData": () => {
                    getHelper("position")
                },
                "getJobProfile": (jId) => {
                    getHelper("jobProfile", "&jobProfileId=" + jId)
                },
                "getPositionCompetentions": (pId) => {
                    getHelper("positionCompetentions", "&position=" + pId);
                },

                "setProfile": setProfile,
                "getLiked": getLikedPosition,


                "requestService": requestService,
                "postService": postService,
                "getSelected": getSelected,
                "getUserPositionData": getUserPositionData,
                "getInstrumentsData": getInstrumentsData,
                "setCurrentGoal": setCurrentGoal,
                "setInstrument": setInstrument,
                "getIpr": getIpr,
            };

            let settingsObject = {
                profile: {
                    link: "?entity=empProfile"
                },
                dict: {
                    link: "?entity=dict"
                },
                position: {
                    link: "?entity=position&requestType=model&family=[]&row=1_30"
                },
                jobProfile: {
                    link: "?entity=jobProfile"
                },
                positionCompetentions: {
                    link: "?entity=positionCompetentions"
                }
            };
            /***************************/

            /* FUNCTIONS
            /***************************/
            function getPostService(url, type, body) {
                return $http({
                    method: type,
                    url: url + "&user=" + that_.user,
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

            //_______________________________________________________________________________

            function check(name) {
                name = (name === "dictData") ? "choice" : name;
                name = (name === "jobProfile") ? "position" : name;

                if ($state.current.name === name) {
                    customElements.updateSwiper(200);
                }
            }

            //_______________________________________________________________________________
            function getHelper(name, urlAdd) {
                urlAdd = urlAdd || "";
                that.cachedData[name + "Data"] = [];
                const url = that_.srvLink + settingsObject[name].link + urlAdd;
                getPostService(url, "GET").then((data) => {
                    that.cachedData[name + "Data"] = data;
                    check(name);
                });
            }

            //_______________________________________________________________________________
            function setProfile(body) {
                getPostService(that_.srvLink + "?user=", "POST", body).then((data) => {
                    result.getProfile();
                })
            }

            //_______________________________________________________________________________
            function getLikedPosition() {
                let pos = [];
                try {
                    for (let i = 0; i < that.cachedData.positionData.length; i++) {
                        if (that.cachedData.positionData[i].liked) {
                            pos.push(that.cachedData.positionData[i].sJobProfileId)
                        }
                    }
                    for (let i = 0; i < that.cachedData.userPositionData.data.length; i++) {
                        if (that.cachedData.userPositionData.data[i].liked) {
                            pos.push(that.cachedData.userPositionData.data[i].sJobProfileId)
                        }
                    }
                } catch (e) {

                }
                return pos;
            }

            //_______________________________________________________________________________

























            function requestService(url) { // вообще есть getPostService, не?
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

            function postService(url, body) { //чет нигде не используется
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
            }


            /* choice */
            function getSelected() {
                let pos = [];
                let change = false;
                try {
                    for (let i = 0; i < that.cachedData.dictData.dict.aDoTags.length; i++) {
                        if (that.cachedData.dictData.dict.aDoTags[i].selected) {
                            pos.push(that.cachedData.dictData.dict.aDoTags[i].iFamilyId)
                        }
                    }
                    if (JSON.stringify(pos) === JSON.stringify(that.cachedData.dictData.sData)) {
                        change = false;
                    }
                    that.cachedData.dictData.sData = pos;
                }
                catch (e) {
                    pos = [];
                    /*wtf?*/
                    change = false;
                }
                return {
                    selected: that.cachedData.dictData.sData,
                    isChange: change
                };
            };

            /* choice */


            // }


            function getUserPositionData(family) {
                let url = that_.srvLink + "?entity=position&requestType=list&family=" + JSON.stringify(family) + "&row=1_30&user=";
                requestService(url).then((data) => {
                    that.cachedData.userPositionData.data = data;
                    if ($state.current.name === "position") {
                        customElements.updateSwiper(200);
                    }
                });
            };


            // function instrumentsService() {

            function getInstrumentsData(goal) {
                that.preloader.show = !that.preloader.show;
                let url = that_.srvLink + "?entity=competentionInstrument&competentionId=" + goal.sCompetentionId + "&user=";
                requestService(url).then((data) => {
                    that.instrumentsData.instruments = data;
                    that.preloader.show = !that.preloader.show;
                    customElements.updateSwiper(200);
                });
            }

            function setCurrentGoal(goal, i) {
                that.currentGoal.goal = goal;
                that.currentGoal.label = "Цель №" + i;
            }

            // }
            function setInstrument(goal, item, allGoalsData) {
                console.log(goal);
                console.log(item);
                let indexOfCurrentGoal;
                // Проверка Индикатор или Компетенция
                if (goal.hasOwnProperty("iIndicatorId")) {
                    indexOfCurrentGoal = allGoalsData.goals.map(function (goalItem) {
                        return goalItem.iIndicatorId;
                    }).indexOf(goal.iIndicatorId);
                } else {
                    indexOfCurrentGoal = allGoalsData.goals.map(function (goalItem) {
                        return goalItem.sCompetentionId;
                    }).indexOf(goal.sCompetentionId);
                }
                console.log(allGoalsData);
                // Проверка на наличие инструмента в списке
                const type = item.sType + 's'; // тип инструмента
                if (allGoalsData.goals[indexOfCurrentGoal].hasOwnProperty(type)) {

                    const iIdIndex = allGoalsData.goals[indexOfCurrentGoal][type].map(function (item) {
                        return item.iId;
                    }).indexOf(item.iId);
                    if (iIdIndex < 0) {

                        allGoalsData.goals[indexOfCurrentGoal][type].push(item);
                    } else {
                        console.log("Этот инструмента уже есть в списке");
                    }
                } else {
                    allGoalsData.goals[indexOfCurrentGoal][type] = [];
                    allGoalsData.goals[indexOfCurrentGoal][type].push(item);
                }
            };

            function getIpr(goal, allGoalsData) {

                let indexOfCurrentGoal;
                if (goal.hasOwnProperty("iIndicatorId")) {
                    indexOfCurrentGoal = allGoalsData.goals.map(function (goalItem) {
                        return goalItem.iIndicatorId;
                    }).indexOf(goal.iIndicatorId);
                } else {
                    indexOfCurrentGoal = allGoalsData.goals.map(function (goalItem) {
                        return goalItem.sCompetentionId;
                    }).indexOf(goal.sCompetentionId);
                }
                return allGoalsData.goals[indexOfCurrentGoal];
            }

            /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


            return result;
        })








        /*******************************************************************************************************************/
        /*******************************************************************************************************************/
        /*******************************************************************************************************************/
        /*******************************************************************************************************************/
        /*******************************************************************************************************************/
        /*******************************************************************************************************************/
        /*******************************************************************************************************************/

        .factory("positionSettings1", function () {

            this.positionSettings = {
                show: "model",
                conformity: [0, 100],
                grade: {},

                onlyLiked: false,
                countLiked: 0,
                onlyVacant: false,
                showMenu: false,
                selectedMenu: 0,
                positionStaticMenu: {}

            };

            this.getShow = function () {
                return this.positionSettings.show
            };
            return this.positionSettings;
        })


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
}


