function Services() {
    angular.module('scApp')
    //====================================================================================================================
    //новые переделанные сервисы
    //====================================================================================================================
    /*******************************************************************************************************************/
    /*customElements отвечает за все элементы которые  не зашиты в angular*/
    /*******************************************************************************************************************/
        .factory("customElements", function ($timeout,$state) {

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
                        //$timeout(renderTimelineLine(array_parent,ii),1000);
                    }

                }
            }

            return {
                "updateSwiper": (time) => {
                    let time1=time || 0;
                    $timeout(updateSwiper, time1)
                },
                "resetSwiper": (time) => {
                    let time1=time || 0;
                    $timeout(resetSwiper, time1)
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


            that.instrumentsData = {instruments: []};
            that.currentGoal = {goal: {}, label: ""};
            that.preloader = {show: false};

            that.cachedData.positionData = {data: []};

            that.cachedData.userPositionData = {data: []};


             /*************************************************/
            /*************************************************/

            that.cachedData.dictData = {dict: []};
            that.cachedData.dictData.sData = [];

              /***************************/
             /* FUNCTIONS               */
            /***************************/

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

            function requestService(url){ // вообще есть getPostService, не?
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
            function getSelected(){
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
                    pos = []; /*wtf?*/
                    change = false;
                }
                return {
                    selected: that.cachedData.dictData.sData,
                    isChange: change
                };
            };

            /* choice */
            function getDictData (){
                let url = that_.srvLink + "?entity=dictNoCallback&user=";
                requestService(url).then((data) => {
                    that.cachedData.dictData.dict = data;
                    if ($state.current.name === "choice") {
                        customElements.updateSwiper(200);
                    }
                });
            }
            // }

            function getLiked(){
                let pos = [];
                for (let i = 0; i < that.cachedData.positionData.data.length; i++) {
                    if (that.cachedData.positionData.data[i].liked) {
                        pos.push(that.cachedData.positionData.data[i].sJobProfileId)
                    }
                }
                for (let i = 0; i < that.cachedData.userPositionData.data.length; i++) {
                    if (that.cachedData.userPositionData.data[i].liked) {
                        pos.push(that.cachedData.userPositionData.data[i].sJobProfileId)
                    }
                }
                return pos;
            };

            function getUserPositionData(family){
                let url = that_.srvLink + "?entity=positionNoCallback&requestType=list&family=" + JSON.stringify(family) + "&row=1_30&user=";
                requestService(url).then((data) => {
                    that.cachedData.userPositionData.data = data;
                    if ($state.current.name === "position") {
                        customElements.updateSwiper(200);
                    }
                });
            };

            function getPositionData(){
                let url = that_.srvLink + "?entity=positionNoCallback&requestType=model&family=[]&row=1_30&user=";
                requestService(url).then((data) => {
                    that.cachedData.positionData.data = data;
                    if ($state.current.name === "position") {
                        customElements.updateSwiper(200);
                    }
                });
            };

            function jobProfile(jId) {
                let url = that_.srvLink + "?entity=jobProfile&jobProfileId=" + jId + "&user=";
                return requestService(url).then((response) => {
                    return response
                })
            }
            // function instrumentsService() {

            function getInstrumentsData(goal){
                that.preloader.show = !that.preloader.show;
                let url = that_.srvLink + "?entity=competentionInstrument&competentionId=" + goal.sCompetentionId + "&user=";
                requestService(url).then((data) => {
                    that.instrumentsData.instruments = data;
                    that.preloader.show = !that.preloader.show;
                    customElements.updateSwiper(200);
                });
            }

            function setCurrentGoal(goal, i){
                that.currentGoal.goal = goal;
                that.currentGoal.label = "Цель №" + i;
            }
            // }
            function setInstrument(goal, item, allGoalsData){
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

            function getIpr(goal, allGoalsData){

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
            // function getDict(){
            console.warn("SERVICES222");
            return {
                "data": this.cachedData,
                "getProfile": getProfile,
                "setProfile":setProfile,
                "requestService": requestService,
                "postService": postService,
                "getSelected": getSelected,
                "getDictData": getDictData,
                "getLiked": getLiked,
                "getUserPositionData": getUserPositionData,
                "getPositionData": getPositionData,
                "jobProfile": jobProfile,
                "getInstrumentsData": getInstrumentsData,
                "setCurrentGoal": setCurrentGoal,
                "setInstrument": setInstrument,
                "getIpr": getIpr,
            }
        })





    /*******************************************************************************************************************/
    /*для передачи данных в меню и обратно
    /*******************************************************************************************************************/
.factory("menuSettings", function () {

        return this.menuSettings = [{
            page: 1,
            selectedVerbs: 0,
            selectedPositions: 0,
            offset:999
        }];


    })

    /*******************************************************************************************************************/
    /*******************************************************************************************************************/
    /*******************************************************************************************************************/
    /*******************************************************************************************************************/
    /*******************************************************************************************************************/
    /*******************************************************************************************************************/
    /*******************************************************************************************************************/

        .factory("positionSettings", function () {

            this.positionSettings = {
                show: "model",
                conformity: [0, 100],
                grade: {},
                open: [0, 100],
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


