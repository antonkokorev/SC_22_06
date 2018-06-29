function Services() {
    angular.module('scApp')
    //====================================================================================================
        .factory("requestService", function ($http) {
            return function (url) {
                var _url = url + that_.user;
                var _headers = {
                    'Authorization': "Basic ZG9tb3poYWtvX212OjEyMzQ1VGdi",
                    'Accept': 'application/json; charset=utf-8',
                    'Content-Type': 'application/json; charset=utf-8'
                };

                var promise = $http({
                    method: 'GET',
                    url: _url,
                    headers: _headers
                }).then(function (response) {
                    return response.data
                }).catch(function (error) {
                    console.log(error);
                });
                return promise
            };
        })
        //====================================================================================================
        .service("timelineService", function () {
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
                        console.log("ошибка timelineService")
                    }
                }
            }
        )
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
                that_.profile_swiper.slideTo(0, 0, false)
            }
        })
        //====================================================================================================
        .service("positionsService", function() {
            var positions = [];

            this.setPositions = (newPositions) => {
                positions = newPositions;
            };

            this.getLikedPositions = () => {
                return positions;
            }

        })

}


