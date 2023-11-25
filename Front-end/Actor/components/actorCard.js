export default {
    props: ['data', 'role'],
    
    template: `
        <div class="card mb-3" style="max-width: 1200px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="data.image" class="img-fluid rounded-start" :alt="data.id">
                </div>
                <div class="col-md-8">
                    <div class="card-body">                    
                        <h2 class="card-title">{{data.name}}</h2>
                        <div class="d-flex">
                            <div v-for="g in role" class="genre rounded-pill">{{g}}</div>
                        </div>
                        <p class="card-text fs-4">{{data.summary}}</p>     
                        <div class="fs-5">
                            DOB: {{data.birthDate}}
                        </div>                                   
                    </div>
                </div>
            </div>
        </div>
    `
}