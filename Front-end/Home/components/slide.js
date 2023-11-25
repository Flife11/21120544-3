import fetch from "../../DBProvider.js";

export default {
    props: ['cl', 'clItem', 'clIndicator', 'title'],
    data(){
        return {
            data: [],
        }
    },
    methods: {
        getData: async function(page){
            try {
                this.data = await fetch(`get/${this.cl}/?per_page=3&page=${page}`)
                this.data = this.data;
                // console.log(this.data);              
            } 
            catch(err) {
                console.log(err);
            }
        },
        handleCLick: function(e){
            $(`.${this.clIndicator}`).removeClass('active');
            $(e.target).addClass("active");
            var slide = $(e.target).attr('data-bs-slide-to');
            // console.log(slide);
            this.getData(slide);
        },
        handleCLickPrev: function(){
            var curPage = $(`.${this.clItem}`).attr('id');
            var prevPage = (curPage-2+5)%5 + 1;
            this.getData(prevPage);

            $(`.${this.clIndicator}`).removeClass('active');
            $(`.${this.clIndicator}`).get().forEach((element, index) => {
                if (index+1==prevPage) $(element).addClass('active');
            });
        },
        handleCLickNext: function(){
            var curPage = $(`.${this.clItem}`).attr('id');
            var nextPage = (parseInt(curPage)+5)%5 + 1;
            this.getData(nextPage);

            $(`.${this.clIndicator}`).removeClass('active');
            $(`.${this.clIndicator}`).get().forEach((element, index) => {
                if (index+1==nextPage) $(element).addClass('active');
            });
        },        
        detail: function(item) {
            this.$emit('detailMovie', item.id);
        }
    },
    beforeMount(){
        this.getData(1);
        $('.parent-image-slide').hover((e)=>{
            $(e.target).css('scale', '1.5');
            $(e.target).next().css({'display': 'block', 'width': '100%'});
        })
    },
    template:`
    <div id="carouselExampleIndicators" class="carousel slide">
        <div class="d-flex justify-content-between">
            <div class="slide-title" >{{title}}</div>
            <div class="carousel-indicators">
                <div v-for="i in 5">
                    <button @click="handleCLick" v-if="i==1" type="button" data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="i" class="active" :class="clIndicator" ></button>
                    <button @click="handleCLick" v-if="i!=1" type="button" data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="i" :class="clIndicator" ></button>    
                </div>                
            </div>
        </div>

        <div class="carousel-inner d-flex justify-content-between">
            <button @click="handleCLickPrev" class="carousel-control-prev slide-button" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <div class="slide-item d-flex mx-auto d-block" :class="clItem" :id="data.page">
                <a href="#" v-for="d in data.items" class="position-relative parent-image-slide">
                    <img @click="detail(d)" :src="d.image" class="slide-image" :alt="d.id">
                    <div class="movie-title position-absolute translate-middle">{{d.fullTitle}}</div>
                </a>                
            </div>  
            <button @click="handleCLickNext" class="carousel-control-next slide-button" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>                   
        </div>
    </div>
    `
}