import fetch from "../../DBProvider.js";
import MovieCard from "./components/movieCard.js"
export default {
    data(){
        return {
            data: [],
            director: [],
            writer: [],
            actor: [],
        }
    },
    components: {
        MovieCard
    },
    props: ['movieID'],
    methods: {
        getData: async function(ID){
            try {
                this.data = await fetch(`detail/movie/${ID}`)
                this.data = this.data.items[0];
                this.director = this.data.directorList.map(element => {
                    return element.name
                });
                this.writer = this.data.writerList.map(element => {
                    return element.name
                });
                this.actor = this.data.actorList;            
                // console.log(this.actor);
            } 
            catch(err) {
                console.log(err);
            }
        }
    },
    beforeMount(){
        this.getData(this.movieID);
    },
    template:`
    <MovieCard :director="director" :writer="writer" :data="data"/>
    <h2 class="">CAST</h2>
    <div class="d-flex flex-wrap">
        <div v-for="a in actor" class="d-flex align-items-center mini-actor-wrapper">
            <img :src="a.image" class="img-thumbnail" :alt="a.id">
            <div class="mini-actor-card" style="max-width: 400px;">
                <div class="card-header fs-3"> {{a.name}} </div>
                <div class="fs-5"> {{a.asCharacter}} </div>
            </div>
        </div>
    </div>
    `
}