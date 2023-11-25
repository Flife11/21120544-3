import fetch from "../../DBProvider.js";
import searchCard from "./components/searchCard.js";

export default {
    props: ['pattern'],
    data() {
        return {
            movieM: [],
            movieA: [],
            data: {},
        }
    },
    components: {
        searchCard
    },
    // props: ['movieID'],
    methods: {
        getData: async function(pattern, page){
            try {
                var movieA;
                var items = [];
                var movieM = await fetch(`search/movie/${pattern}?per_page=9&page=${page}`)
                var movieA = await fetch(`search/movie/${pattern}?per_page=9&page=1`)
                if (movieM.items.length==0) {                    
                    movieA = await fetch(`search/name/${pattern}?per_page=9&page=${page-movieM.total_page}`)
                    items = [...movieA.items];
                } else items = [...movieM.items];
                var total_page = parseInt(movieM.total_page) + parseInt(movieA.total_page)

                this.data = {
                    "page": page,
                    "per_page": 9,
                    "total_page": total_page,
                    "items": items
                }
                
                // console.log(this.data);
            } 
            catch(err) {
                console.log(err);
            }
        }, 
        handleClick: function(e) {
            $(".active").removeClass("active");
            $(e.target).addClass("active");
            var page = parseInt($(e.target).html());
            // console.log(page);
            this.getData(this.pattern, page);
        },
        handleCLickPrev: function(){
            var curPage = $(".active").html();
            if (curPage!=1) curPage -= 1;
            console.log(curPage);
            this.getData(this.pattern, curPage);

            $(`.active`).removeClass('active');
            $(`.page-link`).get().forEach((element, index) => {
                if (parseInt($(element).html())==curPage) $(element).addClass('active');
            });
        },
        handleCLickNext: function(){
            var curPage = parseInt($(`.active`).html());
            if (curPage!=this.data.total_page) curPage += 1;
            this.getData(this.pattern, curPage);

            $(`.page-link`).removeClass('active');
            $(`.page-link`).get().forEach((element, index) => {
                if (parseInt($(element).html())==curPage) $(element).addClass('active');
            });
        },
        detail: function(ID){
            this.$emit('changeToMovie', ID);
        }
    },
    beforeMount(){
        console.log(this.pattern)
        this.getData(this.pattern, 1);
    },
    template:`
    <div class="d-flex flex-wrap justify-content-between">
        <div v-for="m in data.items">
            <searchCard @click="detail(m.id)" :image="m.image" :title="m.title" :rated="m.ratings.imDb" :length="m.runtimeStr"/>
        </div>
    </div>
    <nav class="d-flex justify-content-center" aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item">
            <a @click="handleCLickPrev" class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
            </li>
            <template v-for="(i, index) in data.total_page">
                <li @click="handleClick" v-if="index==0" class="page-item"><a class="page-link active" href="#">{{index+1}}</a></li>
                <li @click="handleClick" v-else class="page-item"><a class="page-link" href="#">{{index+1}}</a></li>
            </template>
            
            <li class="page-item">
            <a @click="handleCLickNext" class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
            </li>
        </ul>
        </nav>
    `
}