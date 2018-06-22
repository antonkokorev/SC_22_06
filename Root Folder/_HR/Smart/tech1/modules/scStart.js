function classStart() {
    this.initStart = function () {
        this.reDrawStart();
    }

    this.reDrawStart = function () {
        this.refresh();
        var globalSettings = this.globalSettings;
        var component = '#' + globalSettings.teg + '_COMPONENT ';
        var data_title = [
            "Мой профиль", "Начни свой путь", "Легендарные личности", "ИПР"
        ]
        var html =
            '<div class="across-the-stars-end"></div>' +
            '<div class="across-the-stars">' +
                '<div id="stars"></div>' +
                '<div id="stars2"></div>' +
                '<div id="stars3"></div>' +
                '<div id="title_small" class="box">' +
                '<p class="split">' +
                'Чего ты хочешь? К чему <br> стремишься? В чем твоя цель?<br><br> Ты не один. Позволь  помочь тебе.'
                '</p>'+
            '</div>';

        html += '</div>';
        html += '<div id="title">';
        for (var i = 0; i < data_title.length; i++) {
            html += '<span>' +
                data_title[i] +
                '</span>' +
                '<br>';
        }
        html += '</div>';
        var eventBr = ($.browser.mobile) ? 'touchstart' : 'click';
        $(component).append(html);


        var titles = $("#title span");


        for (var i = 0; i < titles.length; i++) {
            titles[i].sId = i;
            titles[i].addEventListener(eventBr, function () {

                $(".across-the-stars").addClass("han-solo");
                $(".across-the-stars-end").addClass("han-solo");

                function callback() {
                   /* globalSettings.Settings.return = this.sId;
                    globalSettings.that_c.firePropertiesChangedAndEvent(["SettingsTP"], "tech1");*/
					$("#CC_START_control")[0].parentNode.style.display="none";
                }

                setTimeout(callback.bind(this), 750);
                setTimeout(function() {
                    $(".across-the-stars").addClass("hidden");
                    $(".across-the-stars-end").addClass("hidden");
                    $("#title").addClass("hidden");
                }, 3000);
            })
        }


        var text = $(".split");

        var split = new SplitText(text);


        function random(min, max) {
            return (Math.random() * (max - min)) + min;
        }

        $(split.chars).each(function (i) {
            TweenMax.from($(this), 6, {
                opacity: 0,
                x: random(-500, 500),
                y: random(-500, 500),
                z: random(-500, 500),
                scale: .1,
                delay: i * .02,
                yoyo: true,
                repeat: -1,
                repeatDelay: 1000,
            });


        });


    }

}
