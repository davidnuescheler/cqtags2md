const request = require('request');

function processTags(tags, level) {
    const padding="  ".repeat(level);
    for(a in tags) {
        var e=tags[a];
        if(e["jcr:primaryType"]=="cq:Tag") {
            console.log(padding+"- "+e["jcr:title"]);
            processTags(e, level+1);
        }
    };
}

const tagsUrl=process.argv[2];
if (tagsUrl) {
    request(tagsUrl, function (error, response, body) {
      if (response.statusCode == "200") {
        const tags=JSON.parse(body);
        var md=processTags(tags, 0);
      } else {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      }
    });
} else {
    console.log (`Usage: node app.js "http://admin:admin@localhost:4502/content/cq:tags.10.json"`)
}