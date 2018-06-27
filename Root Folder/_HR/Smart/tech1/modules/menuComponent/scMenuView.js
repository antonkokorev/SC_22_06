function scMenuView() {
    this.menuTemplate = {},
//=====================================================================================================================
        this.menuTemplate.mainMenu =
            `<div ng-class="menu.activeClass('{{mItem.page}}')"  class="sc-menu-li" ng-repeat="mItem in menu.data">
                <a ui-sref="{{mItem.page}}">
                    <h2 class="sc-menu-heading"><span class="sc-menu-heading-number">{{mItem.num}}</span>{{mItem.item}}
                    </h2>
                    <menu-basic     item="mItem" ng-show="'{{mItem.type}}'=='menuBasic'">    </menu-basic>
                    <menu-choice    item="mItem" ng-show="'{{mItem.type}}'=='menuChoice'">   </menu-choice>
                    <menu-position  item="mItem" ng-show="'{{mItem.type}}'=='menuPosition'"> </menu-position>
                    <menu-list      item="mItem" ng-show="'{{mItem.type}}'=='menuList'">     </menu-list>
                </a>
            </div>`,
//=====================================================================================================================
        this.menuTemplate.menuChoice =
            `<div class="sc-menu-details" ng-repeat="item in inItem.child">
                <div class="sc-menu-desc">
                    <h3 class="sc-menu-desc-heading">{{item.name}}</h3>
                    <p class="sc-menu-desc-p">{{item.discr}}</p>
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
                    <p class="sc-menu-desc-p">{{item.discr}}</p>
                </div>
    
                <div ng-click="menu.acFilter(inItem.num)" class="sc-menu-desc ">
                    <h3 class="sc-menu-desc-heading sc-menu-pop-filter">{{inItem.nameFlt}} </h3>
                </div>
                <div ng-show="mItem.showFlt">
                    <div class="sc-menu-desc">
                        <p class="sc-menu-desc-p">{{inItem.discrFlt}}</p>
                    </div>
                    <div class="sc-menu-desc" ng-repeat="item in inItem.childFlt">
                        <h3 class="sc-menu-desc-heading">{{item.name}}</h3>
                        <p class="sc-menu-desc-p">от <input class="sc-menu-filter-input color-red"
                                                            placeholder="1"> до <input
                                class="sc-menu-filter-input color-red turnover-to" placeholder="{{item.placeholder}}"></p>
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
