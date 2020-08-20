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


// BAD CODE DO NOT WRITE CODE LIKE THIS \\


const colors = ["bg-danger","bg-warning","bg-info","bg-success"]

export const getMaxOccurances = (list) => {
    let FILE_FORMATS = [];
    for (let item in list) {
      let push_item = list[item].split('.')[1]
      FILE_FORMATS.push(push_item)
    }
    let counts = {};
    FILE_FORMATS.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
    return counts
}

function sum(args)
{
  let total = 0;
  for (let item in args)
  {
    total += args[item];
  }
  return total;
}

export const extractMaxOccurances = (obj) => {
  let CACHE = [];
  for (let occurance in obj)
  {
    let obj_to_push = Number(obj[occurance]);
    CACHE.push(obj_to_push)
  }
  const TOTAL = sum(CACHE); //Total number of occurances
  let tmpArray = [];
  let percentage;
  let i = 0;
  for (let item in obj)
  {
    if(i==3) {
        let sam = sum(tmpArray.map(obj => obj.precentage))
        const res = 100 -sam
        tmpArray.push({'file' : 'Other',"precentage" : res,color : colors[i]});console.log(tmpArray);return tmpArray;
    
    }
    percentage = Math.ceil((obj[item]/TOTAL) * 100)
    tmpArray.push({"file" : item,"precentage" : percentage,color : colors[i]})
    i +=1
  }
  return tmpArray;
}


export const getMaxPercentage = (extractedOccurances) => {
    let VALUES = [];
    let item_to_push;
    for (let occurance in extractedOccurances)
    {
      if (extractedOccurances[occurance]['file']== 'Other') {continue}
      item_to_push = extractedOccurances[occurance];
      VALUES.push(extractedOccurances[occurance]['precentage'])
    }
    const HIGHEST_NUM = Math.max(...VALUES);
    let value_to_check;
    for (let occurance in extractedOccurances)
    {
      value_to_check = extractedOccurances[occurance]['precentage'];
      console.log(value_to_check)
      if(value_to_check == HIGHEST_NUM)
      {
        return extractedOccurances[occurance]['file'];
      }
    }
  
  }
  
export const randomColor = () => {
    let r1 = Math.ceil(Math.random() * 255);
    let r2 = Math.ceil(Math.random() * 255);
    let r3 = Math.ceil(Math.random() * 255);
}
