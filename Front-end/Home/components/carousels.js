import fetch from "../../DBProvider.js";
export default {
    data(){
        return {
            data: [],
            link: "Movies",
        }
    },
    methods: {
        getData: async function(){
            try {
                this.data = await fetch("get/topboxoffice/?per_page=5&page=1")
                this.data = this.data.items;  
                // console.log(this.data);              
            } 
            catch(err) {
                console.log(err);
            }
        },
        handleCLickPrev: function(){
            var ID = $('.active').attr('id');
            $('.active').removeClass('active');
            var newID = (ID-1+5)%5;
            $(`#${newID}`).addClass('active');
        },
        handleCLickNext: function(){
            var ID = $('.active').attr('id');
            $('.active').removeClass('active');
            var newID = (parseInt(ID)+1)%5;
            // console.log(ID, newID, (ID+1));
            $(`#${newID}`).addClass('active');
        },        
        detail: function(item) {
            this.$emit('detailMovie', item.id);
        }
    },
    beforeMount(){
        this.getData();        
    },
    template:`
    <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
            <div v-for="(d, index) in data">
                <a href="#" v-if="index==0" class="carousel-item active position-relative" :id="index">
                    <img @click="detail(d)" :src="d.image" class=" mx-auto p-2 d-block h-75 d-inline-block w-50 p-2" :alt="d.id">
                    <div class="title position-absolute start-50 translate-middle">{{d.fullTitle}}</div>
                </a>     
                <a href="#" @click="detail(d)" v-if="index!=0" class="carousel-item" :id="index">
                    <img :src="d.image" class="carousel-image mx-auto p-2 d-block h-75 d-inline-block w-50 p-2" :alt="d.id"/>
                    <div class="title position-absolute start-50 translate-middle">{{d.fullTitle}}</div>
                </a>    
            </div>
        </div>
        <button @click="handleCLickPrev" class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button @click="handleCLickNext" class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    `
}