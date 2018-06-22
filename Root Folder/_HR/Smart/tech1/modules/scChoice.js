function classChoice() {
    var eventBr = ($.browser.mobile) ? 'touchstart' : 'click';
    /*-------------------------------------------------------------------------------------------------------------------*/
    /*-------------------------------------------------------------------------------------------------------------------*/
    this.choiceView = function () {

        var choiceHtml =
            '<div class="sc-main-slide">' +
            '   <div id="sc-choice" class="sc-choice" ng-controller="choiceController">' +
            '       <div class="sc-choice-v-slide">' +
            '           <div class="choice-tools">' +
            '                <p id="idSort" class="sort-choice"> Сортировка </p>' +
            '                <p id="idRnd" class="get-lucky-choice"> Мне повезет </p>' +
            '                <p class="filter-choice">' +
            '                <input id="idflt" class="filter-input"> <span class="filter-placeholder">Фильтр</span>' +
            '               </p>' +
            '           </div>' +
            '           <div class="sc-choice-row">' +
            '              <div   class="negative-container">' +
            '                    <div class="swiper-container swiper-negative-container">' +
            '                       <div class="swiper-wrapper">' +
            '                           <div id="id_negative" class="swiper-slide negative-slide"></div>' +
            '                       </div>' +
            '                   </div>' +
            '                <div class="negative-container-inner">' +
            '                    <p class="choice-container-placeholder"> Не хочу</p>' +

            '                </div>' +
            '              </div>' +
            '              <div class="labels-container">' +
            '                   <div class="swiper-container swiper-labels-container">' +
            '                      <div class="swiper-wrapper">' +
            '                          <div id="id_labels-slide" class="swiper-slide labels-slide"></div>' +
            '                      </div>' +
            '                   </div>' +
            '              </div>' +
            '              <div class="positive-container">' +
            '                    <div class="swiper-container swiper-positive-container">' +
            '                       <div class="swiper-wrapper">' +
            '                           <div id="id_positive" class="swiper-slide positive-slide"></div>' +
            '                       </div>' +
            '                   </div>' +
            '                <div class="positive-container-inner">' +
            '                    <p class="choice-container-placeholder"> Хочу </p>' +

            '                </div>' +
            '              </div>' +
            '           </div>' +
            '           <div class="bunch-of-words">' +
            '              <div class="split_p" id="decoys"></div> ' +
            '           </div>' +
            '       </div>' +
            '       <div class="sc-choice-v-slide">' +

            '           <div class="sc-choice-structures">' +
            '             <div class="sc-choice-structure-col">' +
            '               <div class="swiper-container swiper-structure-container">' +
            '                   <div class="swiper-wrapper">' +
            '                       <div class="swiper-slide clearfix">' +
            '                           <div class="sc-choice-structure" ng-repeat="structure in family">' +
            '                               <h3 class="sc-structure-heading" ng-click="chooseStructure($event)">{{structure.sName}}</h3>' +
            '                           </div>' +
            '                       </div>' +
            '                   </div>' +
            '               </div>' +
            '             </div>' +
            '           </div>' +

            '       </div>' +
            '   </div>' +
            '</div>';


        return choiceHtml;
    }
    /*-------------------------------------------------------------------------------------------------------------------*/
    /*-------------------------------------------------------------------------------------------------------------------*/
    this.choiceController = function () {
        var that = this;


        angular.module('scApp').controller('choiceController', ['$scope', function ($scope) {
            $scope.tags = that.result.aTags;
            $scope.family = that.result.aFamily;

            $scope.chooseStructure = function (e) {

                if (e.target.classList.contains("yes") === false && e.target.classList.contains("no") === false) {
                    e.target.classList.add("yes");
                } else if (e.target.classList.contains("yes")) {
                    e.target.classList.remove("yes");
                    e.target.classList.add("no");
                } else if (e.target.classList.contains("no")) {
                    e.target.classList.remove("no");
                }

                window.structure_swiper.update();
            }
        }]);


        var filter = document.querySelector(".filter-input");
        var filter_wrapper = document.querySelector(".filter-choice");
        var filter_placeholder = document.querySelector(".filter-placeholder");

        filter.addEventListener("input", function () {
            if (filter.value !== "") {
                filter.classList.add("dirty");
            } else {
                filter.classList.remove("dirty");
            }
        });

        filter.addEventListener("focus", function () {
            filter_wrapper.classList.add("expand");
        });

        filter.addEventListener("blur", function () {
            filter_wrapper.classList.remove("expand");
        });



        var animateChoice = function () {
            console.warn("animateChoice");
            //var that = this;

            // случайное целое число
            function randomInteger(min, max) {
                return Math.floor(Math.random() * (1 + max - min) + min);
            }

            //события
            var eventBr = ($.browser.mobile) ? 'touchstart' : 'click';
            // убираем выделение
            $(".sc-choice")
                .attr('unselectable', 'on')
                .css('user-select', 'none')
                .on('selectstart', false);

            // разбиваем текст в тегах
            var currentState = "mix";


            /*var decoy = document.getElementById("decoys");
              var decoySplit = new SplitText(decoy, {type: "words", wordDelimiter: "*"});
              var allWords = decoySplit.words;
              // стили на куски текста
              TweenLite.set([decoy], {visibility: "visible"});
              TweenLite.set(allWords, {boxShadow: "(0px 0px 6px rgba(0, 0, 0, 0.8)"});*/
            var decoy;
            var decoySplit;
            var allWords;

            var makeTags = function () {
                decoy = document.getElementById("decoys");

                var tags = that.result.aTags;
                var text = "";


                for (var i = 0; i < tags.length; i++) {
                    text += tags[i].sName + "*";
                }


                decoy.textContent = text.slice(0, -1);


                decoySplit = new SplitText(decoy, {type: "words", wordDelimiter: "*"});
                allWords = decoySplit.words;
                for (var i = 0; i < tags.length; i++) {
                    allWords[i].number = i;
                }


                // стили на куски текста
                TweenLite.set([decoy], {visibility: "visible"});
                TweenLite.set(allWords, {boxShadow: "(0px 0px 6px rgba(0, 0, 0, 0.8)"});
                makeTags = true;
            }


            //var tl = new TimelineMax({delay: 1, repeat: 0, repeatDelay: 0});

//*********************************************************************************************************
            var makeSort = function () {
                if (makeTags !== true) {
                    makeTags()
                    drag();
                }
                //кнопка сортировки
                TweenLite.set($(".negative-container"), {width: "35%"});
                TweenLite.set($(".labels-container"), {width: "300px"});
                TweenLite.set($(".positive-container"), {width: "35%"});
                TweenLite.set($(".bunch-of-words"), {height: "0%"});
                TweenLite.set($(".sc-choice-row"), {height: "90%"});
                TweenLite.set($(".split_p div"), {position: "relative", transform: "none", "margin-bottom": "30px"});
                sort();

            }

            var makeMix = function () {

                TweenLite.set($(".negative-container"), {width: "40%"});
                TweenLite.set($(".labels-container"), {width: "10%"});
                TweenLite.set($(".positive-container"), {width: "40%"});
                TweenLite.set($(".bunch-of-words"), {height: "60%"});
                TweenLite.set($(".sc-choice-row"), {height: "30%"});
                TweenLite.set($(".bunch-of-words"), {height: "60%"});
                mix();
                TweenLite.set($(".split_p div"), {position: "absolute"});

            }
//*********************************************************************************************************
            //кнопка случайно
            document.getElementById("idRnd").addEventListener(eventBr, makeMix);
//*********************************************************************************************************
            document.getElementById("idSort").addEventListener(eventBr, makeSort);
            document.getElementById("id_choice-by-desire").addEventListener(eventBr, makeSort);
            document.getElementById("id_menu-details").addEventListener(eventBr, makeSort);


//*********************************************************************************************************
            //кнопка фильтра
            var delay = (function () {
                var timer = 0;
                return function (callback, ms) {
                    clearTimeout(timer);
                    timer = setTimeout(callback, ms);
                };
            })();

            $('#idflt')[0].oninput = function () {
                var val = this.value;
                delay(function () {
                    ($(".split_p div").length == 0) ? sort(val, 0, 0) : mix(val);

                }, 500);
            };

//*********************************************************************************************************

            function filter(world, allWords_i) {
                //скрываем все что не подошло
                /*allWords_i.css("position","relative");
                allWords_i.css("transform","none");
                allWords_i.css("margin-bottom","30px");*/

                /*  if(currentState!="mix")
                  {
                      allWords_i.style.position="relative";
                      allWords_i.style.transform="none";
                      allWords_i.style["margin-bottom"]="30px";
                  }
      */

                if (!world || allWords_i.textContent.toUpperCase().indexOf(world.toUpperCase()) != -1) {
                    allWords_i.style.display = "inline-block"
                } else {
                    allWords_i.style.display = "none"
                }
            }


            function sort(world, xn, yn) {
                currentState = "sort"
                var offset = 0;
                tl = new TimelineMax({delay: 0, repeat: 0, repeatDelay: 0});
                var rx = (xn === undefined) ? randomInteger(-500, 500) : xn;
                var ry = (yn === undefined) ? randomInteger(-500, 500) : yn;
                //сортировка
                allWords = allWords.sort(function (a, b) {
                    if (a.textContent > b.textContent) return 1;
                    if (a.textContent < b.textContent) return -1;
                    return 0
                });

                for (var i = 0; i < allWords.length; i++) {
                    //скрываем все что не подошло
                    filter(world, allWords[i])
                    // если не в конейнере сортировки - переместить туда
                    if (!allWords[i].classList[0] /*&& allWords[i].parentNode.id!='id_labels-slide'*/)
                        $("#id_labels-slide").append(allWords[i]);

                    /*  if (!allWords[i].classList[0]&&allWords[i].style.display!="none") {

                          allWords[i].offset=offset;
                          offset += 50;

                      }*/
                }

                window.labels_swiper.update()
            }


            function mix(world) {
                currentState = "mix"
                //  размер конейнера для меток
                var gw = 0.75 * parseInt($(".split_p").css("width").slice(0, -2));
                var gh = 0.65 * parseInt($(".split_p").css("height").slice(0, -2));

                tl = new TimelineMax({delay: 0, repeat: 0, repeatDelay: 0});

                for (var i = 0; i < allWords.length; i++) {
                    filter(world, allWords[i])

                    if (!allWords[i].classList[0] && allWords[i].style.display != "none") {
                        // если не в конейнере рандома - переместить туда
                        if (allWords[i].parentNode.id == 'id_labels-slide')
                            $(".split_p").append(allWords[i])

                        tl.fromTo(allWords[i], 0.4 + Math.random() * 1,
                            {
                                x: randomInteger(-500, 500),
                                y: randomInteger(-500, 500),
                                autoAlpha: 0
                            },
                            {
                                force3D: true,
                                rotation: randomInteger(-60, 60),
                                y: randomInteger(50, gh),
                                x: randomInteger(50, gw),
                                autoAlpha: 1,
                                ease: Power2.easeOut
                            },
                            Math.random() * 0.8);
                    }
                }
            }


//*********************************************************************************************************

            var overlapThreshold = "5%";

            function drag() {
                Draggable.create($(".split_p div"), {
                    bounds: window,
                    edgeResistance: 0.65,
                    type: "x,y",
                    throwProps: true,

                    onDrag: function (e) {
                        if (this.hitTest($(".negative-container"), overlapThreshold)) {
                            $(this.target).addClass("highlight_red");
                            $(this.target).addClass("highlight");
                        } else if (this.hitTest($(".positive-container"), overlapThreshold)) {
                            $(this.target).addClass("highlight_green");
                            $(this.target).addClass("highlight");
                        } else {
                            $(this.target).removeClass("highlight_red");
                            $(this.target).removeClass("highlight_green");
                            $(this.target).removeClass("highlight");
                        }
                    },
                    onDragStart: function (e) {
                        // console.log("");
                        // TweenLite.set($(this.target), {"z-index": 555});
                    },
                    onDragEnd: function (e) {

                        var target = ($(this.target).hasClass("highlight_red")) ? "#id_negative" :
                            ($(this.target).hasClass("highlight_green")) ? "#id_positive" :
                                (currentState != "mix") ? "#id_labels-slide" : ".split_p";
                        var rX = (target == ".split_p") ? randomInteger(60, 200) : 0;
                        var rY = (target == ".split_p") ? randomInteger(60, 200) : 0;


                        TweenLite.to(this.target, 0.2, {
                            rotation: 0,
                            x: rX,
                            y: rY,
                        });
                        var curentParent = $(this.target)[0].parentNode.id;

                        if (curentParent != target.slice(1))
                            $(target).prepend(this.target);
                        window.negative_swiper.update();
                        window.labels_swiper.update();
                        window.positive_swiper.update();
                    }
                })

            }

            // this.makeSort();

        };

        animateChoice();

        window.negative_swiper = new Swiper('.swiper-negative-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheel: true,
            freeMode: true
        });

        window.labels_swiper = new Swiper('.swiper-labels-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheel: true,
            freeMode: true
        });

        window.positive_swiper = new Swiper('.swiper-positive-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheel: true,
            freeMode: true
        });

        window.structure_swiper = new Swiper('.swiper-structure-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheel: true,
            freeMode: true
        });

        $(window).resize(function () {
            window.negative_swiper.update();
            window.labels_swiper.update();
            window.positive_swiper.update();
            window.structure_swiper.update();
        });
    }

}
