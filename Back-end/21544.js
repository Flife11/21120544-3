const fs = require('fs/promises');
const { type } = require('os');

let options = null;


const getHtmlContent = async(filePath) => {
    let content = await fs.readFile(filePath, { encoding: 'utf-8' });
    let result = '';
    content = content.replace(/<body>([\s\S]*?)<\/body>/g, (match, p1) => {
        result = p1;
        return p1;
    });
    return result;
}

const funcVar = (match, p1) => {
    return options[p1.trim()];
};

const funcIfElse1 = (match, condition, T, F) => {
    // console.log(condition, options[condition.trim()])
    return options[condition.trim()] ? T : F;
};

const funcFor1 = (match, p1, arr='default', render) => {  
    // console.log(match, 3)
    // console.log(render, 3);
    // console.log(p1);
    const keys = []
    render = render.replace(new RegExp(`\{ ${p1.trim()}\.`, 'g'), "{ ");
    render.replace(/21544\{ (.*?) \}/g, (match, key) => keys.push(key));
    console.log(keys);
    console.log(render);
    if (keys[0]===p1) {
        let result = '';        
        console.log(arr, 1, options[arr.trim()]);
        // console.log(options);
        for (let d of options[arr.trim()]) {
            result += render.replace(/21544\{ (.*?) \}/g, d);
        }
        return result
    } else {
        let result = '';
        for (let index in options[arr.trim()]) {
            if (index==0) options.index = true;
            else options.index = false;
            options[arr.trim()][index]['i'] = index;
            for (let key of keys) {
                options[key] = options[arr.trim()][index][key]
                // console.log(options[key], key, item[key])
            }
            // let r = await editContent(render);
            result += render.replace(/21544\{ (.*?) \}/g, funcVar);
            // console.log(r, 3);
            // console.log(r.replace(/21544\{ (.*?) \}/g, funcVar), 4);
        }
        return result
    }

    // console.log(typeof result)
    // return result;
};

const asyncReplace =  async(str, regex, asyncFn) => {
    let promises = [];
    if (str.match(regex)) {
        str.replace(regex, function(match, ...args){
            console.log(args, 1);
            console.log(args.length);
            let promise = asyncFn(match, ...args);
            // console.log(promise, "inasync");
            promises.push(promise);
        });
        // console.log("hello" ,str);
        return Promise.all(promises);
    }
    return Promise.all([str]);
  }

const editContent = async(content) => {
    // console.log(typeof(content), content);
    const regVar = /21544\{ (.*?) \}/g
    const regIfElse1 = /21544\{if (.*?)\}([\s\S]*?)\{else\}([\s\S]*?)\{\/if\}/sg;
    const regFor1 = /21544\{for (.*?) in (.*?)\}([\s\S]*?)\{\/for\}/g
    const regComp = /21544\{\+.*?\}/g
    
    content = content.replace(regFor1, funcFor1);
    // content = await asyncReplace(content, regFor1, funcFor1).then(matches => {
    //     let res = '';
    //     console.log(matches, 4);
    //     for (let match of matches) {
    //         console.log(match, 2);
    //         res += match;
    //     }
    //     content = content.replace(regFor1, res);
    //     // console.log(res);
    //     // console.log(content);
    //     return content;
    // });
    // console.log("end");
    content = content.replace(regIfElse1, funcIfElse1);
    content = content.replace(regVar, funcVar);
    // console.log(typeof(content), content);
    // console.log(typeof(content), content);

    let matches = content.match(regComp);
    // console.log(matches);

    if (matches!=null) {
        for (let match of matches) {
            let partName = match.trim();
            partName = partName.replace("21544{+","");
            partName = partName.replace("}","");      
            // console.log(partName)
            let partContent = await getHtmlContent(__dirname+`/views/${partName}.html`);
            // console.log(partContent);

            partContent = await editContent(partContent);
            content = content.replace(match, partContent);
            // console.log(content);
        }
    }
    return content;
}

const template = async (filePath, opt, callback) => { 
    options = opt;
    // console.log(opt);
    let content = await fs.readFile(filePath, { encoding: 'utf-8' });
    // console.log(content);
    content = await editContent(content);
    return callback(null, content);
}

module.exports = {template}