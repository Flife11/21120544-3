export default {
    props: ['image', 'title', 'rated', 'length'],
    template: `
    <div class="card mb-3" style="max-width: 380px;">
        <div class="row g-0">
            <div>
                <img :src="image" class="img-fluid rounded-start" alt="Error">
            </div>
            <div class="card-body" style="height: 180px;">                    
                <div class="card-title fs-3">{{title}}</div>                                           
                <div class="fs-5">
                    IMDB: {{rated}}
                </div> 
                <div class="fs-5">
                    Length: {{length}}
                </div>                               
            </div>
        </div>
    </div>
    `
}