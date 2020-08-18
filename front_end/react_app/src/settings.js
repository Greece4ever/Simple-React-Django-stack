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


