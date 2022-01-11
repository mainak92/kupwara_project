var fs = require('fs');
console.log("Incrementing build number...");
fs.readFile('public/manifest.json',function(err,content){
    if(err) throw err;
    var metadata = JSON.parse(content);
    metadata.build = metadata.build + 1;
    fs.writeFile('public/manifest.json',JSON.stringify(metadata),function(err){
        if(err) throw err;
        console.log("Current build number: " + metadata.build);
    })
});