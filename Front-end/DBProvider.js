import data from "./db/data.js";
// console.log(data);
const search_data = {
    "movie": data.Movies,
    "name": data.Movies,
    "top50": [...data.Movies.sort((a, b) => {
        var rate_a = a.awards.slice(17).split(" ")[0];
        var rate_b = b.awards.slice(17).split(" ")[0];
        //console.log(rate_a, rate_b)
        if (parseInt(rate_a)<parseInt(rate_b)) return -1;
        else return 1;
    })],
    "mostpopular": data.Movies,
    "topboxoffice": [...data.Movies.sort((a, b) => {
        if (a.releaseDate>b.releaseDate) return -1;
        else return 1;
    })],
}

// console.log(search_data["top50"]);

export default function fetch(url) {
    return new Promise((resolve, reject) => {
        if (url.split('/').length<3) return reject("Invalid request");
        var [type, cl, params=""] = url.split('/');
        var [pattern="", p="per_page=1&page=1"] = params.split('?');
        var [Strper_page, Strpage] = p.split('&');
        var per_page = parseInt(Strper_page.split('=')[1]);
        var page = parseInt(Strpage.split('=')[1]);
        var items = [];
        if (type=="search") {
            var attribute;
            if (cl=="movie") attribute = "title";
            // if (cl=="name") attribute = "name";
            // if (cl=="top50") attribute = "fullTitle";
            // if (cl=="mostpopular") attribute = "title";

            if (cl=="name") {                
                search_data[cl].forEach(item => {   
                    let flag = false;
                    item.actorList.forEach(actor => {
                        if (actor.name.includes(pattern)) flag = true;
                    });
                    if (flag==true) {
                        items.push(item);
                    }
                });
            } else {
                search_data[cl].forEach(item => {   
                    if (item[attribute].includes(pattern)) items.push(item);
                });                
            }
        }
    
        if (type=="detail") {
            search_data[cl].forEach(item => {
                if (item.id==pattern) items.push(item)
            });
        }
    
        if (type=="get") {
            items = [...search_data[cl]];
        }
        
        var total_page = parseInt(items.length / per_page) + (items.length % per_page==0 ? 0 : 1);
        var result = {
            "page": page,
            "per_page": per_page,
            "total_page": total_page,
            "total": items.length,
            "items": items.slice((page-1)*per_page, page*per_page),
        }
        result[type] = pattern;
        //if (type=="detail") console.log(result);
        resolve(result);
    })
}