export default {
    methods: {
        handleClick: function(){
            var value = $('input').val();
            this.$emit('changeToSearch', value);
        }
    },
    template: `
    <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand">Navbar</a>
            <div class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button @click="handleClick" class="btn btn-outline-success" type="submit">Search</button>
            </div>
        </div>
    </nav>
    `
}