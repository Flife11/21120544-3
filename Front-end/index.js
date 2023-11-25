import { createApp } from 'vue'
import Home from './Home/index.js'
import Movie from './Movie/index.js'
import Actor from './Actor/index.js'


const app = createApp({
    data(){
        return {
            curComponent: Home,
            movieID: 0,
            actorID: 0,
        }
    },
    components: {
        Home
    },
    methods: {
        MovieComponent: function(ID){
            this.curComponent = Movie;
            this.movieID = ID;
        }
    },
    template: `
        <component 
        :movieID="movieID" @changeToMovieComponent="MovieComponent" 
        :is="curComponent" />
    `
}).mount('#app')

