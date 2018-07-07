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

        function choiceController( appSettings,dataServises) {
            console.warn('choiceController');
            //**********************************************
            let that = this;
            appSettings.sizeSwiperStyle="";
            this.data = dataServises.data.dictData;

           for(let i=0;i<this.data.aDo.length;i++){
                this.data.aDo[i].index=i;
            }
            for(let i=0;i<this.data.aDoTags.length;i++){
                this.data.aDoTags[i].index=i;
            }
            this.appSettings=appSettings;
            this.chooseADoTags = chooseADoTags;     // выбор глаголов
            this.isVandN = isVandN;
            this.deleteThisItem=deleteThisItem;     //удалить выбор
            this.selectObject=selectObject;         // выбор существительного

            //**********************************************
            function deleteThisItem(index){
              delete this.data.aDo[index].selected;
                appSettings.selectedVerbsInChoice--;
            }
            function isVandN(obj) {
                return function (structure) {
                    let tags = that.data.aDo;
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

                if (that.data.aDoTags[index].selected) {
                    delete that.data.aDoTags[index].selected;
                } else {
                    that.data.aDoTags[index].selected = true;
                }
            }

            function chooseADoTags(index) {
                if (that.data.aDo[index].selected) {
                    delete that.data.aDo[index].selected;
                    appSettings.selectedVerbsInChoice--;
                } else {
                    that.data.aDo[index].selected = true;
                    appSettings.selectedVerbsInChoice++;
                }
            }
        }
    }());
}


