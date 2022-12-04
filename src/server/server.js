const http = require("http");
const path = require("path");
const fs = require("fs")


// TODO CREATE

const frontFolder = "front/dist";
const assetsFolder = "front/dist/assets";

http.createServer((req, res) => {

    if (req.url === "/") {
        // fs.readdir(frontFolder, (error, files) => {
        //     files.forEach(file => {

        //         sendRes(file, error, res);
        //     });
        // })

        sendRes(frontFolder, "index.html", "text/html", res);



    } else {
        sendRes(frontFolder, req.url, getContentType(req.url), res);
    }


}).listen(3000, () => {
    console.log("Server listening port 3000");
});

function getContentType(url) {
    switch (path.extname(url)) {
        case ".css":
            return "text/css";
        case ".html":
            return "text/html";
        case ".js":
            return "text/javascript";
        case ".json":
            return "application/json";
        case ".svg":
            return "image/svg+xml";
        default:
            return "application/octate-stream";
    }

    return;
}


function sendRes(folder, url, contentType, res) {
    let file = path.join(__dirname, "..", folder, url);

    fs.readFile(file, (error, content) => {
        if (error) {
            res.writeHead(404);
            res.write("file not found");
            res.end();
            console.log(`file ${file} does not exist`);
        } else {
            res.writeHead(200, { "Content-type": contentType });
            res.write(content);
            res.end();
            // console.log(`file ${file} OK`);
        }
    })
}
