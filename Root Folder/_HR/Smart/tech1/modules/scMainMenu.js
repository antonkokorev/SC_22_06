function classMainMenu() {

        //var globalSettings = this.globalSettings;
        //var component = '#' + globalSettings.teg + '_COMPONENT ';
        this.menuView = function() {

        var html = '<aside  id="id_menu" ng-controller="menuController" class="sc-menu">' +
            '    <div class="sc-menu-li active">' +
            '        <h2 class="sc-menu-heading"><span class="sc-menu-heading-number">{{model[0].num}}</span>{{model[0].item}}</h2>' +
            '        <div class="sc-menu-details">' +
            '            <div class="sc-menu-desc">' +
            '                <p class="sc-menu-desc-p">{{model[0].discr}}</p>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +

            '    <div id="id_menu-details" class="sc-menu-li">' +
            '        <h2 class="sc-menu-heading"><span class="sc-menu-heading-number">{{model[1].num}}</span>{{model[1].item}} </h2>' +
            '        <div class="sc-menu-details">' +
            '            <div id="id_choice-by-desire" class="sc-menu-desc choice-by-desire">' +
            '                <h3 class="sc-menu-desc-heading">{{model[1].child[0].name}}</h3>' +
            '                <p class="sc-menu-desc-p">{{model[1].child[0].discr}}</p>' +
            '            </div>' +
            '            <div class="sc-menu-desc choice-by-structure">' +
            '                <h3 class="sc-menu-desc-heading">{{model[1].child[1].name}}</h3>' +
            '                <p class="sc-menu-desc-p">{{model[1].child[1].discr}}</p>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '    <div class="sc-menu-li">' +
            '        <h2 class="sc-menu-heading"><span class="sc-menu-heading-number">{{model[2].num}}</span>{{model[2].item}} </h2>' +
            '        <div class="sc-menu-details">' +
            '            <div class="sc-menu-desc">' +
            '                <p ng-click="showModelPosition()" class="sc-menu-desc-p">{{model[2].child[0].discr}}</p>' +
            '            </div>' +
            '            <div class="sc-menu-desc">' +
            '                <p ng-click="showUserPosition()" class="sc-menu-desc-p">{{model[2].child[1].discr}}</p>' +
            '            </div>' +
            '            <div class="sc-menu-desc">' +
            '                <h3 class="sc-menu-desc-heading sc-menu-pop-filter"> Фильтр </h3>' +
            '            </div>' +

            '            <div class="sc-menu-filter-position">' +
            '                <div class="sc-menu-desc">' +
            '                    <p class="sc-menu-desc-p">Мы не будем показывать вам позиции, не подходящие под диапазон' +
            '                        характеристик</p>' +
            '                </div>' +
            '                <div class="sc-menu-desc">' +
            '                    <h3 class="sc-menu-desc-heading">Оборачиваемость</h3>' +
            '                    <p class="sc-menu-desc-p">от <input class="sc-menu-filter-input color-red turnover-from"' +
            '                                                        placeholder="1"> до <input' +
            '                            class="sc-menu-filter-input color-red turnover-to" placeholder="25"></p>' +
            '                </div>' +
            '                <div class="sc-menu-desc">' +
            '                    <h3 class="sc-menu-desc-heading">Грейд</h3>' +
            '                    <p class="sc-menu-desc-p">от <input class="sc-menu-filter-input color-red grade-from"' +
            '                                                        placeholder="1"> до <input' +
            '                            class="sc-menu-filter-input color-red grade-to" placeholder="25"></p>' +
            '                </div>' +
            '                <div class="sc-menu-desc">' +
            '                    <h3 class="sc-menu-desc-heading color-red"> Отфильтровать </h3>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +

            '    <div class="sc-menu-li">' +
            '        <h2 class="sc-menu-heading"><span class="sc-menu-heading-number">04.</span>Компетенции </h2>' +
            '        <div class="sc-menu-details">' +
            '            <div class="sc-menu-desc">' +
            '                <p class="sc-menu-desc-p">Выберите индикаторы компетенций для развития</p>' +
            '            </div>' +

            '            <div class="sc-menu-desc show-by-position">' +
            '                <h3 class="sc-menu-desc-heading">По позициям</h3>' +
            '                <p class="sc-menu-desc-p">Показываем компетенции по позициям</p>' +
            '            </div>' +
            '            <div class="sc-menu-desc show-by-competences">' +
            '                <h3 class="sc-menu-desc-heading">По пересечениям</h3>' +
            '                <p class="sc-menu-desc-p">Показываем пересекающиеся компетенции</p>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +

            '    <div class="sc-menu-li">' +
            '        <h2 class="sc-menu-heading"><span class="sc-menu-heading-number">05.</span>Цели </h2>' +
            '        <div class="sc-menu-details">' +
            '            <div class="sc-menu-desc">' +
            '                <p class="sc-menu-desc-p">Опишите цели по изучению индикаторов</p>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +

            '    <div class="sc-menu-li">' +
            '        <h2 class="sc-menu-heading"><span class="sc-menu-heading-number">06.</span>Инструменты </h2>' +
            '        <div class="sc-menu-details">' +
            '            <div class="sc-menu-desc">' +
            '                <p class="sc-menu-desc-p">Укажите инструменты, которыми вы будете добиваться целей</p>' +
            '            </div>' +
            '            <div class="sc-menu-desc">' +
            '                <h3 class="sc-menu-desc-heading">Цель 1</h3>' +
            '            </div>' +
            '            <div class="sc-menu-desc">' +
            '                <h3 class="sc-menu-desc-heading">Цель 2</h3>' +
            '            </div>' +
            '            <div class="sc-menu-desc">' +
            '                <h3 class="sc-menu-desc-heading">Цель 3</h3>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +

            '    <div class="sc-menu-li get-apply-button">' +
            '        <h2 class="sc-menu-heading"><span class="sc-menu-heading-number">07.</span>ИПР </h2>' +
            '        <div class="sc-menu-details">' +
            '            <div class="sc-menu-desc">' +
            '                <h3 class="sc-menu-desc-heading">Цель 1</h3>' +
            '            </div>' +
            '            <div class="sc-menu-desc">' +
            '                <h3 class="sc-menu-desc-heading">Цель 2</h3>' +
            '            </div>' +
            '            <div class="sc-menu-desc">' +
            '                <h3 class="sc-menu-desc-heading">Цель 3</h3>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +

            '    <h2 class="sc-menu-apply color-red"> Согласовать с руководителем </h2>' +
            '</aside>';

            return html;
          }

        //$(component).append(html);

        this.menuController = function() {
			var that=this;
      var app = angular.module('mMenu', []);

			app.controller('menuController', ['$scope', function ($scope) {

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
									/*name:"Желания",*/
									discr:"Мы подобрали подходящие для вас должности"
								},
								{
									/*name:"Структура",*/
									discr:"Укажите наиболее интересные вам"
								}
								]
						}]

				}]);
			angular.element(function() {
				angular.bootstrap(document.getElementById("id_menu"), ['mMenu']);
			});



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
    }

}
