import Vnav from "./components/nav.js"
import Vhead from "./components/header.js"
import Search from "../Search/index.js"
import Main from "./components/main.js"

export default {
    data(){
        return {
            curCom: "Main",
            pattern: "",
        }
    },
    components: {
        Vnav, Vhead, Search, Main
    },
    methods: {
        detailMovie: function(ID){
            this.$emit('changeToMovieComponent', ID);
        },
        Search: function(p){
            this.curCom = "Search";
            this.pattern = p;
        }
    },
    template: `
        <div @changeToMovieComponent="detailMovie">        
            <Vhead />
            <Vnav @changeToSearch="Search"/>
            <component :key="pattern" :pattern="pattern" @changeToMovie="detailMovie" @MainComponent="detailMovie" :is="curCom" />
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand">Footer</a>            
                </div>
            </nav>
        </div>
    `
}