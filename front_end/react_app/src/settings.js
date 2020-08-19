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
const DetailRegExp = /^http:(\/)(\/)localhost:3000(\/)repository(\/)(\w+)(\/)(\w+)(\/)?$/


export const matchDetailRegExp = (expression) => {
    if (!DetailRegExp.test(expression)) return [null,null];
    expression = expression.split('/')
    let f = [];
    for (let item in expression) {
        if (expression[item] != "") {f.push(expression[item])}
    }
    expression = f;
    return [expression[f.length-1],expression[f.length-2]]
}

