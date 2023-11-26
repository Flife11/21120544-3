const fs = require('fs/promises');

let options = null;


const getHtmlContent = async(filePath) => {
    let content = await fs.readFile(filePath, { encoding: 'utf-8' });
    content = content.replace(/<body>([\s\S]*?)<\/body>/g, (match, p1) => {
        return p1;
    });
    return content
}

const funcVar = (match, p1) => {
    return options[p1.trim()];
};

const funcIfElse1 = (match, condition, T, F) => {
    return options[condition.trim()] ? T : F;
};

const funcFor1 = (match, p1, arr, render) => {
    let result = '';
    for (let item of options[arr.trim()]) {
        result += render.replace(new RegExp(`\\{${p1.trim()}\.\\}`, 'g'), "");
    }
    return result;
};

const template = async (filePath, opt, callback) => { 
    options = opt;
    let content = await fs.readFile(filePath, { encoding: 'utf-8' });
    const regVar = /21544\{ (.*?) \}/g
    const regIfElse1 = /21544\{if (.*?) \}([\s\S]*?)\{else\}([\s\S]*?)\{\/if\}/g;
    const regFor1 = /21544\{for (.*?) in (.*?) \}([\s\S]*?)\{\/for\}/g
    const regComp = /21544\{.*?\}/g
    content = content.replace(regIfElse1, funcIfElse1);
    content = content.replace(regFor1, funcFor1);
    content = content.replace(regVar, funcVar);

    let matches = content.match(regComp);
    for (let match of matches) {
        let partName = match.trim();
        partName = partName.replace("21544{","");
        partName = partName.replace("}","");      
        let partContent = await getHtmlContent(__dirname+`/views/${partName}.html`);
        content = content.replace(match, partContent);
    }
    return callback(null, content);
}

module.exports = {template}