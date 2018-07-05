function dirMenu() {

    (function () {
        console.warn("dirMenu");
        angular.module('scApp.menu', [])
        //-------------------------------------------------------------
            .directive('dirMainMenu', ['$location', 'menuDataService', function ($location, menuDataService) {
                return {
                    restrict: 'E',
                    scope: {"page": "="},
                    bindToController: true,
                    templateUrl: that_.path + "modules/menuComponent/scMenuView.html",
                    controller: menuController,
                    controllerAs: "menu"
                };

            }]);
        //-------------------------------------------------------------
        function menuController($scope, $location, menuDataService, $state, positionSettings,  getDict, formGoalsService, instrumentsService, requestService, $timeout, menuSettings ,customElements,dataServises) {

            //ИНТЕРФЕЙСНАЯ ЧАСТЬ
            //============================================
            //атрибуты
            //============================================
            let that = this;
            this.pData = dataServises.data;//getProfile.profileData;
            this.state = $state.current.name;// текущий роутер
            this.data = menuDataService.data;//данные меню
            this.userChoice = getDict;
            this.btnText = menuDataService.choiceData[1];// текст кнопки меню выбора
            this.positionSettings = positionSettings;// данные для передачи в страницу позиции
            this.sliders = menuDataService.sliderOptions;// данные настройки слайдеров
            this.menuSettings = menuSettings;
            this.goalsData = formGoalsService.goalsData; // получаем выбранные цели
            this.getGoalsQuantity = getGoalsQuantity;

            //============================================
            //функции
            //============================================
            this.changePageChoice = changePageChoice;// меняет тексты
            this.acFilter = acFilter; //скрывает/показывает фильтр
            this.activeClass = activeClass;// активный пункт меню
            menuDataService.sliderOptions.openSlider.options.onChange = openSliderOnChange;// изменение слайдера openSlider
            menuDataService.sliderOptions.conformitySlider.options.onChange = conformitySliderOnChange;// изменение слайдера conformitySlider

            this.changeModel = changeModel;//смена позиций модель/пользовательская
            this.range = (n) => {
                return new Array(n)
            };// генерация массива нужной размерности
            this.gradeFltClick = gradeFltClick;//клик по фильтру грейда
            this.switchGoal = switchGoal; // переключаем цель

            this.vacantFltClick = vacantFltClick; // переключаем vacant
            that.vacantBtnText = 'Отобразить только вакантные'

            //***********************************************************************************************************
//_______________________________________
            function gradeFltClick(index, value) {
                let num = that.pData.profileData.iGrade - 2 + index;
                (that.positionSettings.grade[num]) ? delete that.positionSettings.grade[num] : that.positionSettings.grade[num] = true;

                customElements.resetSwiper();
            }

            function vacantFltClick() {
                that.positionSettings.onlyVacant= (!that.positionSettings.onlyVacant);
                that.positionSettings.onlyVacant ? that.vacantBtnText = 'Отобразить вакантные и занятые' : that.vacantBtnText = 'Отобразить только вакантные';
                customElements.resetSwiper();
            }
 //_______________________________________
            function openSliderOnChange(a, b, c) {
                that.positionSettings.open = [b, c];
                customElements.resetSwiper();
            }

//_______________________________________
            function conformitySliderOnChange(a, b, c) {
                that.positionSettings.conformity = [b, c];
                customElements.resetSwiper();
            }

//_______________________________________
            function changePageChoice(item) {
                that.page = (that.page === 1) ? 2 : 1;
                that.btnText = menuDataService.choiceData[that.page];
                menuSettings[0].page = that.page;
            }

//_______________________________________
            function activeClass(page) {
                that.state = $state.current.name;
                let currentRoute = $location.path().substring(1) || 'profile';
                let result = (page === currentRoute);// ? true : false;
                return {
                    "active": result,
                    "disableClick": (that.menuSettings[0].selectedPositions === 0 && ["competences"].indexOf(page) !== -1) || (
                        that.getGoalsQuantity() === 0 && ["goals", "instruments", "ipr"].indexOf(page) !== -1
                    )
                };
            }

            //_______________________________________
            function acFilter(num) {
                num.showFlt = !num.showFlt;
                if (num.showFlt) {
                    $timeout(function () {
                        $scope.$broadcast('rzSliderForceRender');
                    });
                }
            }

//_______________________________________
            function changeModel(item) {
                if (that.userChoice.sData.length !== 0) {
                    that.positionSettings.show = (item) ? "user" : "model";
                    $state.reload();
                }
            }

//_______________________________________
            function switchGoal(goal, index) {
                instrumentsService.getInstrumentsData(goal);
                instrumentsService.setCurrentGoal(goal, index + 1);
            }

//_______________________________________
            function getGoalsQuantity() {
                return that.goalsData.goals.length;
            }
        }

//_______________________________________

        angular.module('scApp.menu')
            .service('menuDataService', function () {
                this.choiceData = ["", "Продолжить", "Вернуться"],
                    this.sliderOptions = {
                        openSlider: {
                            minValue: 0,
                            maxValue: 100,
                            options: {
                                floor: 0,
                                ceil: 100,
                                step: 5,
                                noSwitching: true
                            }
                        },
                        conformitySlider: {
                            minValue: 0,
                            maxValue: 100,
                            options: {
                                floor: 0,
                                ceil: 100,
                                step: 5,
                                noSwitching: true
                            }
                        }
                    },

                    this.data = [{
                        num: "01",
                        item: "Мой профиль",
                        page: "profile",
                        discr: "Это твоя визитка для развития и карьреного продвижения, внеси все самое важное о себе"
                    }, {
                        num: "02",
                        item: "Выбор моей карьерной цели",
                        type: "menuChoice",
                        page: "choice",
                        child: [
                            {
                                name: "Мои предпочтения в работе",
                                discr: "Укажите чем хотите заниматься"
                            },
                            {
                                name: "Профессиональные направления",
                                discr: "Укажите где вы хотите этим заниматься"
                            }
                        ]
                    }, {
                        num: "03",
                        item: "Позиции",
                        page: "position",
                        discr: "Расскажите мне о себе то, чего я не знаю",
                        child: [
                            {
                                discr: "Мы подобрали подходящие для вас должности"
                            },
                            {
                                discr: "Укажите наиболее интересные вам"
                            }
                        ],
                        showFlt: false,
                        nameFlt: "Фильтр",
                        discrFlt: "Мы не будем показывать вам позиции, не подходящие под диапазон характеристик",
                        childFlt: [
                            {
                                name: "Грейд"
                            },
                            {
                                name: "Соответствие",
                                type: "slider",
                                id: "conformitySlider",
                                placeholder: "3"
                            },
                            {
                                name: "Открытость",
                                id: "openSlider",
                                type: "slider",
                                placeholder: "11"
                            }
                        ]
                    }, {
                        num: "04",
                        item: "Компетенции выбранных позиций",
                        page: "competences",
                        discr: "Выберите индикаторы компетенций для развития",
                        child: [
                            {
                                name: "По позициям",
                                discr: "Показываем компетенции по позициям"
                            },
                            {
                                name: "По всем выбранным позициям",
                                discr: "Показываем пересекающиеся компетенции"
                            }
                        ]
                    }, {
                        num: "05",
                        item: "Мои приоритеты в развитии",
                        page: "goals",
                        discr: "Опишите цели по изучению индикаторов"
                    }, {
                        num: "06",
                        item: "Инструменты",
                        page: "instruments",
                        discr: "Укажите инструменты, которыми вы будете добиваться целей",
                        child: [
                            {
                                name: "Цель 1",
                            },
                            {
                                name: "Цель 2",
                            },
                            {
                                name: "Цель 3",
                            }
                        ]
                    }, {
                        num: "07",
                        item: "ИПР",
                        page: "ipr",
                        child: []
                    }
                    ]
            })


    }());
}
