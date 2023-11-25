import fetch from "../../DBProvider.js";
export default {
    props: ['movieID'],
    methods: {
        getData: async function(ID){
            try {
                this.data = await fetch(`detail/movie/${ID}`)
                this.data = this.data.items[0];
                console.log(this.data);
            } 
            catch(err) {
                console.log(err);
            }
        },
    },
    beforeMount(){
        this.getData(this.movieID);
    },
    template: `
        <div class="d-flex">
            <img :src="data.image"></img>
            <div class="mini-actor-card text-center" style="max-width: 400px;">
                <div class="card-header fs-3"> {{data.title}} </div>
                <div class="fs-5"> {{data.year}} </div>
            </div>
        </div>
    `
}