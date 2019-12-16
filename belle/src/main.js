import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/font_nsmcklnhwfp/iconfont.css"
import "./assets/download (2)/font_bxkcul4127/iconfont.css"
import "./assets/font_ab8dtuvnk1s/iconfont.css"
import { Button,Field,cellGroup,Row, Col,Divider,Icon,Tabbar, TabbarItem,Search,Swipe, SwipeItem,Grid, GridItem,NavBar,Tab,Tabs,Tag,DropdownMenu, DropdownItem,Image,Collapse, CollapseItem,Pagination,Toast,TreeSelect} from 'vant';

Vue
.use(Button)
.use(Field)
.use(cellGroup)
.use(Row)
.use(Col)
.use(Divider)
.use(Icon)
.use(Tabbar)
.use(TabbarItem)
.use(Search)
.use(Swipe)
.use(SwipeItem)
.use(Grid)
.use(GridItem)
.use(NavBar)
.use(Tab)
.use(Tabs)
.use(Tag)
.use(DropdownMenu)
.use(DropdownItem)
.use(Image)
.use(Collapse)
.use(CollapseItem)
.use(Pagination)
.use(Toast)
.use(TreeSelect)


import 'lib-flexible/flexible'


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
