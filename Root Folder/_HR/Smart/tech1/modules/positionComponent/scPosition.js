function dirPosition() {

    (function () {
        console.warn("dirPosition");
        angular.module('scApp.position', [])

            .directive('dirPosition', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {
                        modelPosition: "=",
                        iGrade: "=grade"
                    },
                    bindToController: true,
                    templateUrl: that_.path + "modules/positionComponent/scPositionView.html",
                    controller: positionController,
                    controllerAs: "positionCtrl"
                };
            });

        function positionController($scope, requestService, positionsService,getPosition) {

            if(this.modelPosition)
                this.posModelData = getPosition.positionData;
            else{
                this.posModelData = getPosition.userPositionData;
            }


            console.warn('positionController');
            $scope.likedPositions = [];


            this.liked = {};
            this.countLike = 0;
            this.onlyLiked = "";
            this.likeClick = () => {
                console.log("!");
                this.onlyLiked = (this.onlyLiked == "") ? true : "";

            };

            this.likeCurrentPosition = (e, index, position) => {
                var data= this.posModelData.data;
                (data[index].liked)?delete data[index].liked: data[index].liked=true;
                this.countLike =getPosition.getLiked().length
                /*$scope.likedPositions.push(position);

                console.log($scope.likedPositions);
                (this.liked[position.sJobProfileId]) ? delete this.liked[position.sJobProfileId] : this.liked[position.sJobProfileId] = true;
                this.countLike = Object.keys(this.liked).length;

                $scope.positionData[index].like = ($scope.positionData[index].like) ? false : true;
                positionsService.setPositions($scope.likedPositions);*/
            }

            // Выбор позиций
            /* var choose_position = document.querySelectorAll(".choose-position");
             var chosen_position = document.querySelector(".chosen-positions");
             choose_position.forEach(function (item) {
                 item.addEventListener(eventBr, function () {
                     if (item.classList.contains("disabled")) {
                         return;
                     }

                     var newItem = item.cloneNode(true);

                     // Запрещаем повторный клик
                     item.classList.add("disabled");

                     newItem.firstElementChild.classList.add("color-red");
                     newItem.addEventListener(eventBr, function () {
                         chosen_position.removeChild(newItem);
                         item.classList.remove("disabled");
                     });
                     chosen_position.appendChild(newItem);
                 });
             });*/
        }


    }());
}


