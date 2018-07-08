function dirCompetences() {
    (function () {
        console.warn("dirCompetences");
        angular.module('scApp.competences', [])
            .directive('dirCompetences', function () {
                return {
                    scope: {},
                    templateUrl: that_.path + "modules/competencesComponent/scCompetrncesView.html",
                    controller: competencesController,
                    controllerAs: "competences"
                };
            });

        function competencesController(localStorCompetences, customElements,dataServices, appSettings) {

            //ИНТЕРФЕЙСНАЯ ЧАСТЬ
            //============================================
            //атрибуты
            //============================================
            let that = this;
            appSettings.sizeSwiperStyle = "";// класс меню хедера
            appSettings.competenceCurrentPage = 0;//номер активного экрана
            let ls=localStorCompetences;//для того чтобы если переходить на другой пункт меню не сбрасовались
            this.currentIndex = null;//индекс выбранной позиции на 1 экране
            this.appSettings = appSettings;
            this.data = dataServices.data;//positionCompetentionsData
            let competences_h_slider = document.querySelector(".competences-by-position");
            this.competenceCurrent = null;//выбранная компетенция на 2 экране
            //============================================
            //функции
            //============================================
            this.getColor = getColor;//цвет для индикаторов на 3 странице
            this.getPositionCompetences = getPositionCompetences;//выбор позиций на 1 экране
            this.getCompetencesIndicators = getCompetencesIndicators;//переход на 3 страницу
            this.getChosenIndicators = getChosenIndicators;//Установить класс для уже добавленных индикаторов
            this.getChosenCompetences = getChosenCompetences;//Установить класс для уже добавленных компетенций
            this.chooseIndicator = chooseIndicator;//выбор на 3 странице
            //***********************************************************************************************************
//_______________________________________
            function getColor(i) {
                if (i > 3) {
                    return "color-green";
                } else if (i < 3) {
                    return "color-red";
                } else {
                    return "color-yellow";
                }
            }

//_______________________________________
            function getPositionCompetences(index, position) {
                that.currentIndex = index;
                that.currentPositionCompetences = that.data.positionCompetentionsData.aPositions[index].aCompetentions;
                appSettings.competenceCurrentPage = 1;
                appSettings.competenceHeaderPosName = position.sJobProfileName;
                appSettings.sizeSwiperStyle = "smallMenu";
                customElements.resetSwiper(200);
            }

//_______________________________________

            function getChosenIndicators(indicator) {
                let index = ls.chosenIndicators.map(function (item) {
                    return item.iIndicatorId;
                }).indexOf(indicator.iIndicatorId);

                if (index >= 0) {
                    return "chosen";
                }
            }

//_______________________________________
            function getChosenCompetences(competence) {
                let index = ls.chosenCompetences.map(function (item) {
                    return item.sCompetentionId;
                }).indexOf(competence.sCompetentionId);

                if (index >= 0) {
                    return "chosen";
                }
            }

//_______________________________________
            function getCompetencesIndicators(event, index, competence) {
                if (competence.sCompetentionType !== 'Corp') {
                    if (event.currentTarget.classList.contains("chosen")) {
                        event.currentTarget.classList.remove("chosen");
                        let index = ls.chosenCompetences.map(function (item) {
                            return item.sCompetentionId;
                        }).indexOf(competence.sCompetentionId);
                        ls.chosenCompetences.splice(index, 1);
                    } else {
                        event.currentTarget.classList.add("chosen");
                        ls.chosenCompetences.push(competence);
                    }
                    dataServices.data.goalsData=ls.chosenCompetences.concat(ls.chosenIndicators)
                } else {
                    that.competenceCurrent = competence;
                    appSettings.competenceHeaderCompName = competence.sCompetentionName;
                    that.currentCompetencesIndicators = that.data.positionCompetentionsData.aPositions[that.currentIndex].aCompetentions[index].aIndicators;
                    appSettings.competenceCurrentPage = 2;
                    customElements.resetSwiper(200);
                }

            }

//_______________________________________

            function chooseIndicator(event, indicator, competence) {
                if (event.currentTarget.classList.contains("chosen")) {
                    event.currentTarget.classList.remove("chosen");
                    let index = ls.chosenIndicators.map(function (item) {
                        return item.iIndicatorId;
                    }).indexOf(indicator.iIndicatorId);
                    ls.chosenIndicators.splice(index, 1);
                } else {
                    event.currentTarget.classList.add("chosen");
                    indicator.sCompetentionName = competence.sCompetentionName;
                    indicator.sCompetentionId = competence.sCompetentionId;
                    ls.chosenIndicators.push(indicator);
                }
                dataServices.data.goalsData=ls.chosenCompetences.concat(ls.chosenIndicators)
            }
        }


        angular.module('scApp.competences')
            .service('localStorCompetences', function () {
                this.chosenCompetences = [];//массив выбранных компетенций
                this.chosenIndicators = [];//массив выбранных индикаторов
            })
    }());
}

