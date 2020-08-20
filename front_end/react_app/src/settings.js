class path {
    constructor(path) {
        this.path = path;
    }

    join(...args) {
        let base_str = this.path;
        for (let subdomain in args) {
            base_str += `/${args[subdomain]}`
        }    
        return base_str;
    }
}

export var BASE_URL = 'http://localhost:8000';
export var PATH = new path(BASE_URL)
export const DetailRegExpSource = /^http:(\/)(\/)localhost:3000(\/)repository(\/)(\w+)(\/)(\w+)(\/)?$/
export const DetailRegExpRepository = /^http:(\/)(\/)localhost:3000(\/)repository(\/)(\w+)(\/)(\w+)(\/)?$/

// BASE_URL/repositories/user/id


export const matchDetailRegExp = (expression,regExpPattern) => {
    if (!regExpPattern.test(expression)) return [null,null];
    expression = expression.split('/')
    let f = [];
    for (let item in expression) {
        if (expression[item] != "") {f.push(expression[item])}
    }
    expression = f;
    return [expression[f.length-1],expression[f.length-2]]
}

export var capitalizeFirst = (word) => 
{
    let CACHE = [];
    for (let letter in word)
    {
        switch(true)
        {
            case (word[letter] === word[0] && letter == 0):
                CACHE.push(word[letter].toUpperCase());
                break;
            default:
                CACHE.push(word[letter]);
        }
    }
    return (CACHE.join(""));
}

export const getFileName=(path)=>{
    let splitted = path.split('/');
    if (splitted.length ===1){splitted=path.split('\\')}
    return splitted[splitted.length-1];
}