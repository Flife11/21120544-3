export default {
    methods: {
        handleDarkmode: function(){
            var theme = $('html').attr('data-bs-theme');            
            if (theme=="dark") {
                $(".fa-toggle-off").addClass('d-none');
                $(".fa-toggle-on").removeClass('d-none');
                $('html').attr('data-bs-theme', '');
            } else {
                $(".fa-toggle-on").addClass('d-none');
                $(".fa-toggle-off").removeClass('d-none');
                $('html').attr('data-bs-theme', 'dark');
            } 
        }
    },
    template: `
    <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand">21120544</a>
            <h1>MOVIES INFO</h1>
            <div class="d-flex flex-column align-items-end">
                <div>21544</div>
                <div class="d-flex">
                    <i @click="handleDarkmode" class="d-none fa-solid fa-toggle-on"></i>
                    <i @click="handleDarkmode" class="fa-solid fa-toggle-off"></i>
                    <div>Dark mode</div>
                </div>
            </div>
        </div>
    </nav>

    `
}