export const state = () => ({
    listOfFav: []
})
  
export const mutations = {
      add(state, astre) {
        state.listOfFav.push(astre);
      },
      remove(state, astre) {
        state.listOfFav.splice(state.listOfFav.indexOf(astre), 1)
      }
}

export const getters = {
    getFavourites (state) {
        return state.listOfFav;
    }
    
}