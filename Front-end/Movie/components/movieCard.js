export default {
    props: ['director', 'writer', 'data'],

    template: `
        <div class="card mb-3" style="max-width: 1200px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="data.image" class="img-fluid rounded-start" :alt="data.id">
                </div>
                <div class="col-md-8">
                    <div class="card-body">                    
                        <h2 class="card-title">{{data.fullTitle}}</h2>
                        <div class="d-flex">
                            <div v-for="g in data.genreList" class="genre rounded-pill">{{g.value}}</div>
                        </div>
                        <p class="card-text fs-4">{{data.plot}}</p>     
                        <div class="fs-5">
                            Year: {{data.year}}
                        </div>      
                        <div class="d-flex fs-5 align-items-center">
                            <b>Director: </b>
                            <a v-for="d in director" class="detail-list">{{d}}</a>
                        </div>    
                        <div class="d-flex fs-5 align-items-center">
                            <b>Writers: </b>                            
                            <a v-for="w in writer" class="detail-list">{{w}}</a>
                        </div>     
                    </div>
                </div>
            </div>
        </div>
    `
}