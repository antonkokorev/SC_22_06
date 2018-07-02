function scMenuView() {
    this.menuTemplate = {},
//=====================================================================================================================
        this.menuTemplate.mainMenu =
            `<div ng-class="menu.activeClass('{{mItem.page}}')"  class="sc-menu-li" ng-repeat="mItem in menu.data">
                <a ui-sref="{{mItem.page}}">
                    <h2 class="sc-menu-heading"><span class="sc-menu-heading-number">{{mItem.num}}</span>{{mItem.item}}
                    </h2>
                    <dir-menu-basic     item="mItem" ng-show="'{{mItem.type}}'=='menuBasic'">    </dir-menu-basic>
                    <dir-menu-choice    item="mItem" page="menu.page" change-page="menu.changePage()" ng-show="'{{mItem.type}}'=='menuChoice'">   </dir-menu-choice>
                    <dir-menu-position  item="mItem" change-model="menu.changeModel(item)" position-settings="menu.positionSettings" ac-filter="menu.acFilter(num)" ng-show="'{{mItem.type}}'=='menuPosition'"> </dir-menu-position>
                    <dir-menu-list      item="mItem" ng-show="'{{mItem.type}}'=='menuList'">     </dir-menu-list>
                </a>
               
            </div>
             <div class="button_next" ng-click="menu.changePage()" ng-show="menu.state=='choice'">{{menu.btnText}}</div>
`,
//=====================================================================================================================
        this.menuTemplate.menuChoice =
            `<div class="sc-menu-details" ng-repeat="item in inItem.child">
                <div class="sc-menu-desc" ">

                    <h3  ng-click="changePage()"  ng-class="{colorBlue:page==( $index+1) }" class="sc-menu-desc-heading"> {{item.name}}</h3>
                     <p  class="sc-menu-desc-p">{{item.discr}}</p>
       
                </div>
             </div>`,
//=====================================================================================================================
        this.menuTemplate.menuBasic =
            `<div class="sc-menu-details">
                <div class="sc-menu-desc">
                     <p class="sc-menu-desc-p">{{inItem.discr}}</p>
                </div>
             </div>`,
//=====================================================================================================================
        this.menuTemplate.menuPosition =
            `<div class="sc-menu-details">
                <div class="sc-menu-desc" ng-repeat=" item in inItem.child">
                    <p class="sc-menu-desc-p" ng-click="changeModel(item)" ng-class="{colorBlue:positionSettings.show=='model'&& $index==0}">{{item.discr}}</p>
                </div>

                <div ng-click="acFilter()" class="sc-menu-desc ">
                    <h3 class="sc-menu-desc-heading sc-menu-pop-filter">{{inItem.nameFlt}} </h3>
                </div>

                <div ng-show="inItem.showFlt">
                    <div class="sc-menu-desc">
                        <p class="sc-menu-desc-p">{{inItem.discrFlt}}</p>
                    </div>
                    
                    <div class="sc-menu-desc" ng-repeat="item in inItem.childFlt" ng-if="item.type !== 'slider'">
                        <h3 class="sc-menu-desc-heading">{{item.name}}</h3>
                        <div class="sc-grade-filter">
                            <div class="sc-grade">11</div>
                            <div class="sc-grade">12</div>
                            <div class="sc-grade">13</div>
                        </div>
                    </div>

                    <div class="sc-menu-desc" ng-repeat="item in inItem.childFlt" ng-if="item.type === 'slider'">
                        <h3 class="sc-menu-desc-heading">{{item.name}}</h3>
                        <div class="filter-range range-slider-grade">
                            <rzslider rz-slider-model="conformitySlider.minValue" rz-slider-high="conformitySlider.maxValue" rz-slider-options="conformitySlider.options"></rzslider>
                        </div>
                    </div>

                    <div class="sc-menu-desc">
                        <h3 class="sc-menu-desc-heading color-red"> Отфильтровать </h3>
                    </div>
                </div>
            </div>`,
//=====================================================================================================================
        this.menuTemplate.menuList =
            `<div class="sc-menu-details">
                <div class="sc-menu-desc">
                    <p class="sc-menu-desc-p">{{inItem.discr}}</p>
                </div>
                <div class="sc-menu-desc" ng-repeat="item in inItem.child">
                    <h3 class="sc-menu-desc-heading">{{item.name}}</h3>
                </div>
              </div>`
//=====================================================================================================================
}
