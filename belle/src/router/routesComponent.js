class RoutesComponent {
  constructor() {

  }
  homeComponent() {
    return import('../views/Home.vue')
  }
  registerComponent() {
    return import('../views/Register.vue')
  }
  indexComponent() {
    return import('../views/Index.vue')
  }
  mainComponent() {
    return import('../views/indexComponent/Main.vue')
  }
  updateComponent() {
    return import('../views/indexComponent/Update.vue')
  }
  bookrackComponent() {
    return import('../views/bookrackComponent/Bookrack.vue')
  }
  circleComponent() {
    return import('../views/circleComponent/Circle.vue')
  }
  mineComponent() {
    return import('../views/mineComponent/Mine.vue')
  }
  particularComponent() {
    return import('../views/Particular.vue')
  }
  grabbleComponent() {
    return import('../views/Grabble.vue')
  }
  readComponent() {
    return import('../views/Read.vue')
  }
  catalogueComponent() {
    return import('../views/Catalogue.vue')
  }
  cartoonComponent() {
    return import('../views/indexComponent/Cartoon.vue')
  }
  comicSearchComponent() {
    return import('../views/ComicSearch.vue')
  }
  comicMinuteComponent() {
    return import('../views/ComicMinute.vue')
  }
  comicCatalogueComponent() {
    return import('../views/ComicCatalogue.vue')
  }
  comicReadComponent() {
    return import('../views/ComicRead.vue')
  }

}
export const routesComponent = new RoutesComponent()
