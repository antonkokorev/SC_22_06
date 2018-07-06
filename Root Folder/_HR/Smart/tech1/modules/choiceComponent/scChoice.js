function dirChoice() {

    (function () {
        angular.module('scApp.choice', [])
            .directive('dirChoice', function ($location) {
                return {
                    restrict: 'AE',
                    scope: {"page": "="},
                    templateUrl: that_.path + "modules/choiceComponent/scChoiceView.html",
                    controller: choiceController,
                    controllerAs: "choice"
                };
            });

        function choiceController(menuSettings, dataServises) {
            console.warn('choiceController');
            //**********************************************
            let that = this;
            this.data = dataServises.data.dictData;
            for(let i=0;i<this.data.dict.aDo.length;i++){
                this.data.dict.aDo[i].index=i;
            }
            for(let i=0;i<this.data.dict.aDoTags.length;i++){
                this.data.dict.aDoTags[i].index=i;
            }
            this.menuSettings=menuSettings;
            this.chooseADoTags = chooseADoTags;     // выбор глаголов
            this.isVandN = isVandN;
            this.deleteThisItem=deleteThisItem;     //удалить выбор
            this.selectObject=selectObject;         // выбор существительного

            //**********************************************
            function deleteThisItem(index){
              delete this.data.dict.aDo[index].selected;
                that.menuSettings[0].selectedVerbs--;
            }
            function isVandN(obj) {
                return function (structure) {
                    let tags = that.data.dict.aDo;
                    let result = false;
                    let member = structure.sDo;
                    for (let i = 0; i < tags.length; i++) {
                        if (tags[i].sDo == member && tags[i].selected) {
                            result = true;
                            break;
                        }
                    }


                    return result;
                }
            }
            function selectObject(index) {

                if (that.data.dict.aDoTags[index].selected) {
                    delete that.data.dict.aDoTags[index].selected;
                } else {
                    that.data.dict.aDoTags[index].selected = true;
                }
            }

            function chooseADoTags(index) {
                if (that.data.dict.aDo[index].selected) {
                    delete that.data.dict.aDo[index].selected;
                    that.menuSettings[0].selectedVerbs--;
                } else {
                    that.data.dict.aDo[index].selected = true;
                    that.menuSettings[0].selectedVerbs++;
                }
            }
        }
    }());
}


