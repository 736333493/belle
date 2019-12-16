import {
  routesComponent
} from './routesComponent';

export const routes = [{
    path: '/home',
    name: "home",
    component: routesComponent.homeComponent
  },
  {
    path: '/register',
    name: "register",
    component: routesComponent.registerComponent
  },
  {
    path: '/index',
    name: "index",
    component: routesComponent.indexComponent,
    children: [
      // 首页
      {
        path: '/main',
        name: 'main',
        component: routesComponent.mainComponent
      },
      // 更新
      {
        path: '/update',
        name: 'update',
        component: routesComponent.updateComponent
      },
      // 书架
      {
        path: '/bookrack',
        name: 'bookrack',
        component: routesComponent.bookrackComponent
      },
      // 发现
      {
        path: '/circle',
        name: 'circle',
        component: routesComponent.circleComponent
      },
      // 我的
	  {
	    path: '/mine',
	    name: 'mine',
	    component: routesComponent.mineComponent
	  },
    {
      path: '/cartoon',
      name: 'cartoon',
      component: routesComponent.cartoonComponent
    },
    ]
  },
  {
    path: '/particular',
    name: 'particular',
    component: routesComponent.particularComponent
  },
  // 搜索
  {
    path: '/grabble',
    name: 'grabble',
    component: routesComponent.grabbleComponent
  },
  // 阅读
  {
    path: '/read',
    name: 'read',
    component: routesComponent.readComponent
  },
  // 目录
  {
    path: '/catalogue',
    name: 'catalogue',
    component: routesComponent.catalogueComponent
  },
  // 漫画搜索
  {
    path: '/comicSearch',
    name: 'comicSearch',
    component: routesComponent.comicSearchComponent
  },
// 漫画详细
  {
    path: '/comicMinute',
    name: 'comicMinute',
    component: routesComponent.comicMinuteComponent
  },
  // 漫画目录
    {
      path: '/comicCatalogue',
      name: 'comicCatalogue',
      component: routesComponent.comicCatalogueComponent
    },
    // 漫画read
      {
        path: '/comicRead',
        name: 'comicRead',
        component: routesComponent.comicReadComponent
      },
  {
    path: '*',
    redirect: {
      name: 'home'
    }
  }
]
