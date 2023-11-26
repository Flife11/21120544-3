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
    return options[condition.trim()] ? T : F;
};

const funcFor1 = async(match, p1, arr, render) => {
    let result = '';  
    render = render.replace(new RegExp(`\{${p1.trim()}\.`, 'g'), "{");
    render = await editContent(render);
    // console.log(render, 1);
    const keys = []
    render.replace(/21544\{(.*?)\}/g, (match, key) => keys.push(key));
    for (let item of options.data) {
        for (let key of keys) {
            options[key] = item[key]
            // console.log(options[key], key, item[key])
        }
        result += render.replace(/21544\{(.*?)\}/g, funcVar);
    }
    // console.log(typeof result)
    return result;
};

const asyncReplace =  async(str, regex, asyncFn) => {
    let promises = [];
    if (str.match(regex)) {
        str.replace(regex, (match, ...args) => {
            // console.log(match, 1);
            let promise = asyncFn(match, ...args);
            promises.push(promise);
        });
        return Promise.all(promises);
    }
    return Promise.all([str]);
  }

const editContent = async(content) => {
    // console.log(typeof(content), content);
    const regVar = /21544\{ (.*?) \}/g
    const regIfElse1 = /21544\{if (.*?) \}([\s\S]*?)\{else\}([\s\S]*?)\{\/if\}/sg;
    const regFor1 = /21544\{for (.*?) in (.*?)\}([\s\S]*?)\{\/for\}/sg
    const regComp = /21544\{\+.*?\}/g
    content = content.replace(regIfElse1, funcIfElse1);
    // content = content.replace(regFor1, funcFor1);
    content = await asyncReplace(content, regFor1, funcFor1).then(matches => {
        let res = '';
        for (let match of matches) {
            res += match;
        }
        return res;
    });
    console.log(typeof(content), content);
    content = content.replace(regVar, funcVar);

    let matches = content.match(regComp);
    console.log(matches);
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
    let content = await fs.readFile(filePath, { encoding: 'utf-8' });
    content = await editContent(content);
    return callback(null, content);
}

module.exports = {template}