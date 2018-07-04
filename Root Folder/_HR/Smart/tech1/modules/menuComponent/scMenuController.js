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

        function menuController($scope, $location, menuDataService, updateSwiper, resetSwiper, $state, positionSettings, getProfile,getDict, formGoalsService, instrumentsService, requestService, $timeout,menuSettings) {

            //ИНТЕРФЕЙСНАЯ ЧАСТЬ
            //============================================
            //атрибуты
            //============================================
            let that = this;
            this.profileData = getProfile.profileData;
            this.state = $state.current.name;// текущий роутер
            this.data = menuDataService.data;//данные меню
            this.userChoice=getDict;
            this.btnText = menuDataService.choiceData[1];// текст кнопки меню выбора
            this.positionSettings = positionSettings;// данные для передачи в страницу позиции
            this.sliders = menuDataService.sliderOptions;// данные настройки слайдеров
            this.menuSettings=menuSettings;
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
            this.range = (n) => {return new Array(n)};// генерация массива нужной размерности
            this.gradeFltClick = gradeFltClick;//клик по фильтру грейда
            this.switchGoal = switchGoal; // переключаем цель
            this.sw = () =>{$timeout(()=>{updateSwiper(); resetSwiper()},0)};//update swiper

            //***********************************************************************************************************
            function gradeFltClick(index, value) {
                let num = that.profileData.user.iGrade - 2 + index;
                (that.positionSettings.grade[num]) ? delete that.positionSettings.grade[num] : that.positionSettings.grade[num] = true;
                that.sw();
            }

            function openSliderOnChange(a, b, c) {
                that.positionSettings.open = [b, c];
                that.sw();
            }

            function conformitySliderOnChange(a, b, c) {
                that.positionSettings.conformity = [b, c];
                that.sw();
            }

            function changePageChoice(item) {
                that.page = (that.page == 1) ? 2 : 1;
                that.btnText = menuDataService.choiceData[that.page];
                menuSettings[0].page=that.page;
            }

            function activeClass(page) {
                that.state = $state.current.name;
                let currentRoute = $location.path().substring(1) || 'profile';
                let result =(page === currentRoute) ? true : false;

                return {"active":result,"disableClick":(that.menuSettings[0].selectedPositions==0 &&  ["competences"].indexOf(page)!=-1)||(
                        that.getGoalsQuantity()==0&&["targets","instruments","ipr"].indexOf(page)!=-1
                    ) };


               // {"text-box-icon": true, 'used': $scope.entry_map[entry.guid] > 0}
            }

            function acFilter(num) {
                num.showFlt = !num.showFlt;
                if (num.showFlt) {
                    $timeout(function () {
                        $scope.$broadcast('rzSliderForceRender');
                    });
                }
            }


            function changeModel(item) {
                if(that.userChoice.sData.length!=0){
                    that.positionSettings.show = (item) ? "user" : "model";
                    $state.reload();
                }
           }


            function switchGoal(goal, index) {
                var i = index+ 1;
                instrumentsService.getInstrumentsData(goal);
                instrumentsService.setCurrentGoal(goal, i);
            };


            function getGoalsQuantity() {
                var q = that.goalsData.goals.length;
               /* if (q > 0) {*/
                    return   q ;
               /* }*/
            }

        }


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
                                step: 1,
                                noSwitching: true
                            }
                        },
                        conformitySlider: {
                            minValue: 0,
                            maxValue: 100,
                            options: {
                                floor: 0,
                                ceil: 100,
                                step: 1,
                                noSwitching: true
                            }
                        }
                    },

                    this.data = [{
                        num: "01",
                        item: "Мой профиль",
                        type: "menuBasic",
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
                        type: "menuPosition",
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
                        type: "menuChoice",
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
                        type: "menuBasic",
                        page: "goals",
                        discr: "Опишите цели по изучению индикаторов"
                    }, {
                        num: "06",
                        item: "Инструменты",
                        page: "instruments",
                        type: "menuList",
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
                        type: "menuList",
                        child: []
                    }
                    ]
            })


    }());
    /*   //-------------------------------------------------------------
              .directive('dirMenuBasic', function () {
                  return {
                      restrict: 'E',
                      scope: {
                          "inItem":'=item'
                      },
                      template: that_.menuTemplate.menuBasic,

                  };
              })
              //-------------------------------------------------------------
              .directive('dirMenuChoice', function () {
                  return {
                      restrict: 'E',
                      require:"dirMainMenu",
                      scope: {
                          "inItem":'=item',
                          "page":'=',
                          "changePage":"&"
                      },
                      template: that_.menuTemplate.menuChoice

                  };

              })
              //-------------------------------------------------------------
              .directive('dirMenuPosition', function () {
                  return {
                      restrict: 'E',
                      scope: {
                          "inItem":'=item',
                          "positionSettings":"=",
                          "changeModel":"&",
                          "acFilter":"&"
                      },
                      controller: menuController,
                      template: that_.menuTemplate.menuPosition
                  };
              })
              //-------------------------------------------------------------
              .directive('dirMenuList', function () {
                  return {
                      restrict: 'E',
                      scope: {
                          "inItem":'=item'
                      },
                      template: that_.menuTemplate.menuList
                  };
              })

  */

    /*    this.menuController = function() {
			var that=this;

			angular.module("scApp").controller('menuController', ['$scope', function ($scope) {

				$scope.showModelPosition=function(){
					//alert("showModelPosition")
                   //  that_.services.position.result=that_.services.position.model_list;
				};
                $scope.showUserPosition=function(){
                    alert("showUserPosition");
                    //that_.services.position.result=that_.services.position.user_list;
                    that_.positionController()
                };



				$scope.model = [{
							num:"01",
							item:"Профиль",
							discr:"Расскажите мне о себе то, чего я не знаю"
						},{
							num:"02",
							item:"Выбор",
							child:[
								{
									name:"Желания",
									discr:"Укажите чем хотите заниматься"
								},
								{
									name:"Структура",
									discr:"Укажите где вы хотите этим заниматься"
								}
								]
						},{
							num:"03",
							item:"Позиции",
							discr:"Расскажите мне о себе то, чего я не знаю",
							child:[
								{

									discr:"Мы подобрали подходящие для вас должности"
								},
								{

									discr:"Укажите наиболее интересные вам"
								}
								]
						}]

				}]);



        var eventBr = ($.browser.mobile) ? 'touchstart' : 'click';
        var active_li = document.querySelector(".sc-menu-li.active");
        var menu_elements = document.querySelectorAll(".sc-menu-li");


        for (var i = 0; i < menu_elements.length; i++) {
            menu_elements[i].sId = i;
            menu_elements[i].addEventListener(eventBr, function () {
				
				var negative=$(".highlight_red");
				var pozitive=$(".highlight_green");
				var neg_arr=[];
				var poz_arr=[];
				var d=that.services.dict.result.aTags;
				for(var ii=0;ii<negative.length;ii++){
					neg_arr.push('-'+d[negative[ii].number].iFamilyId)
				}
				for(var ii=0;ii<pozitive.length;ii++){
					poz_arr.push(d[pozitive[ii].number].iFamilyId)
				}
				if(poz_arr.length>0||neg_arr.length>0)
				{
                    console.log(poz_arr.concat(neg_arr).join(","));
                    var fam="["+poz_arr.concat(neg_arr).join(",")+"]";
                    if(that_.services.position.params_.family!=fam)
					{
                        that_.services.position.activeController=undefined;
                        that_.services.position.return="user_list";
                        that_.services.position.model_list= that_.services.position.result;
                        that_.services.position.params_.family=fam;
                        that_.services.position.params_.requestType="list";
                        that_.ajax(that_.services.position);
                    }
                }

                var main_slider = document.querySelector(".sc-main-slider");
                if (active_li) {
                    active_li.classList.remove("active");
                }

                active_li = this;
                active_li.classList.add("active");

                // Прокрутка слайдера
                main_slider.style.transform = "translateY(-" + 100 / 7 * this.sId + "%)";

                // Если ИПР, то достаем снизу кнопку
                var apply_button = document.querySelector(".sc-menu-apply");

                if (active_li.classList.contains("get-apply-button")) {
                    apply_button.classList.add("show");
                } else {
                    apply_button.classList.remove("show");
                }
            })
        }

        // Прокрутка Выбора из левого меню
        var choice_by_desire = document.querySelector(".choice-by-desire");
        var choice_by_structure = document.querySelector(".choice-by-structure");

        choice_by_desire.addEventListener(eventBr, function () {
            var sc_choice = document.querySelector(".sc-choice");
            sc_choice.style.transform = "translateY(0%)";
        });

        choice_by_structure.addEventListener(eventBr, function () {
            var sc_choice = document.querySelector(".sc-choice");
            sc_choice.style.transform = "translateY(-50%)";
        })

        // Попап фильтра в разделе Позиции
        var filter_button = document.querySelector(".sc-menu-pop-filter");
        var filter_position = document.querySelector(".sc-menu-filter-position");

        filter_button.addEventListener(eventBr, function () {
            this.classList.toggle("color-red");
            filter_position.classList.toggle("active");
        });

        // Прокрутка Компетенций из левого меню
        var show_by_position = document.querySelector(".show-by-position");
        var show_by_competence = document.querySelector(".show-by-competences");


        show_by_position.addEventListener(eventBr, function () {
            var competences_slide = document.querySelector(".competences-slide");
            competences_slide.style.transform = "translateY(0%)";
        });

        show_by_competence.addEventListener(eventBr, function () {
            var competences_slide = document.querySelector(".competences-slide");
            competences_slide.style.transform = "translateY(-50%)";
        })
    }*/

}
