const fs = require('fs');

let PodCasts = JSON.parse(fs.readFileSync("/home/lion/Desktop/kosyWork/Web/podcasts/src/casts.json").toString()).results;

const print = console.log.bind(console);


function convert(str="") {
    let s = str.replace(/\:/g,'').replace(/\s/g,'-').toLowerCase()

    return "images/"+s
}


PodCasts = PodCasts.map((value)=> {
    let v = convert(value["title_original"]);
    let ext= value["image"].slice(-4)
    
    return {
        ...value,
        image: v + ext
    }
})

fs.writeFileSync("/home/lion/Desktop/kosyWork/Web/podcasts/src/casts2.json",JSON.stringify(PodCasts));