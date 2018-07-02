function dirMenu() {

    (function () {
        console.warn("dirMenu")
        angular.module('scApp.menu', ["ngRoute"])
         /*   .controller('menuController', function (menuDataService) {
            this.data=menuDataService.data;
        })*/
            //-------------------------------------------------------------
            .directive('dirMainMenu', ['$location','menuDataService', function ($location,menuDataService) {
                return {
                    restrict: 'E',
                    scope: {"page":"="},
                    bindToController: true,
                    templateUrl: that_.path + "modules/menuComponent/scMenuView.html",
                    controller: menuController,
                    controllerAs: "menu"
                };
            }])
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
        function menuController($scope, $location,menuDataService,$state,positionSettings) {

            //============================================
            //атрибуты
            //============================================
            this.data = menuDataService.data;












            this.state=$state.current.name;
            var that=this;
            this.btnText="Продолжить";
            this.positionSettings=positionSettings;

            this.data = menuDataService.data;
            this.changeModel=(item)=>{
                if( this.positionSettings.show=="model"){
                    this.positionSettings.show="user"
                }else{
                    this.positionSettings.show="model"
                }


            };


            this.changePage=(item)=>{
                var k=item;
                console.error("test")
              if(this.page == 1){
                  this.page=2;
                  this.btnText="Вернуться";
              }else{
                  this.page=1;
                  this.btnText="Продолжить";
              }
            };

            //============================================
            //функции
            //============================================





            this.activeClass = activeClass;
            this.acFilter = (num) => {

              console.log(1);
                this.data[2].showFlt=!this.data[2].showFlt;
                /*    var n = parseInt(num) - 1;
                  $scope.showFlt = !$scope.showFlt;*/
            };


            $scope.gradeSlider = {
                minValue: 10,
                maxValue: 12,
                options: {
                    floor: 1,
                    ceil: 20,
                    step: 1,
                    noSwitching: true
                }
            };

            $scope.conformitySlider = {
                minValue: 0,
                maxValue: 100,
                options: {
                    floor: 0,
                    ceil: 100,
                    step: 1,
                    noSwitching: true
                }
            };

            //==================================================================================

            //function acFilter

            function activeClass(page) {
                that.state=$state.current.name;
                var currentRoute = $location.path().substring(1) || 'profile';
                return page === currentRoute ? 'active' : '';
            };

            /*function data() {
                return
            }*/

        }


        angular.module('scApp.menu')
            .service('menuDataService', function () {
                this.data = [{
                    num: "01",
                    item: "Профиль",
                    type: "menuBasic",
                    page: "profile",
                    discr: "Расскажите мне о себе то, чего я не знаю"
                }, {
                    num: "02",
                    item: "Выбор",
                    type: "menuChoice",
                    page: "choice",
                    child: [
                        {
                            name: "Желания",
                            discr: "Укажите чем хотите заниматься"
                        },
                        {
                            name: "Структура",
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
                            placeholder: "3"
                        },
                        {
                            name: "Открытость",
                            type: "slider",
                            placeholder: "11"
                        }
                    ]
                }, {
                    num: "04",
                    item: "Компетенции",
                    type: "menuChoice",
                    page: "competences",
                    discr: "Выберите индикаторы компетенций для развития",
                    child: [
                        {
                            name: "По позициям",
                            discr: "Показываем компетенции по позициям"
                        },
                        {
                            name: "По пересечениям",
                            discr: "Показываем пересекающиеся компетенции"
                        }
                    ]
                }, {
                    num: "05",
                    item: "Цели",
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
                }
                ]})


    }());


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
