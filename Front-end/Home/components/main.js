import Vcarousels from "./carousels.js"
import Vslide from "./slide.js"

export default {
    components: {
        Vcarousels, Vslide
    },
    methods: {
        Movie: function(ID){
            this.$emit('MainComponent', ID);
        }
    },
    template: `
        <Vcarousels @detailMovie="Movie" />
        <Vslide @detailMovie="Movie" title="Most Popular" cl="mostpopular" clItem="popular-slide-item" clIndicator="popular-slide-indicator"/>
        <Vslide @detailMovie="Movie" title="Top Rating" cl="top50" clItem="top50-slide-item" clIndicator="top50-slide-indicator"/>
    `
}