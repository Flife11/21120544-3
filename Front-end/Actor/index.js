import ActorCard from "./components/ActorCard.js"
import miniMovieCard from "./components/miniMovieCard.js";
import fetch from "../../DBProvider.js";
export default {
    data() {
        return {
            data: [],
            role: [],
            movies: [],
        }
    },
    props: ['actorID'],
    methods: {
        getData: async function(ID){
            try {
                this.data = await fetch(`detail/name/${ID}`)
                this.data = this.data.items[0]; 
                this.role = this.data.role.split(", ");
                this.movies = this.data.castMovies;  
                console.log(this.movies);                                       
            } 
            catch(err) {
                console.log(err);
            }
        },
        Movie: function(ID){
            this.$emit('changeToMovieComponent', ID);
        }
    },
    beforeMount(){
        this.getData(this.actorID);
    },
    components: {
        ActorCard, miniMovieCard
    },
    template: `
        <ActorCard :data="data" :role="role"/>
        <h2 class="">MOVIES</h2>
        <div class="d-flex flex-wrap">
            <div v-for="a in movies" @click="Movie(a.id)" class="d-flex align-items-center mini-actor-wrapper">
            </div>
        </div>
    `
}