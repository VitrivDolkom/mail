const http = require("http");
const path = require("path");
const fs = require("fs");
const { sortMessages } = require("./functions");



// TODO CREATE

const frontFolder = "../front/dist";
const assetsFolder = "../front/dist/assets";
const dataBase = "db.json";
const dataBaseSorted = "dbs.json";
const myDataBase = "mydb.json";

const pageList = ["/in", "/out", "/imp", "/trash", "/spam", "/arc", "/draft", "/letter"];


const setSortedMessages = () => {
    let dataBasePath = path.join(__dirname, "/", dataBase);
    let listMessages = [];
    fs.readFile(dataBasePath, 'utf-8', function (error, content) {
        if (error) {
            return console.log("error");
        }
        listMessages = JSON.parse(content);
        console.log(listMessages[0].author);
        sortMessages(listMessages);
        listMessages = JSON.stringify(listMessages);
        fs.writeFile(dataBaseSorted, listMessages, function (error, result) {
            if (error) {
                console.log("error");
            }
        });
    });
}

http.createServer((req, res) => {
    let isPage = false;

    pageList.forEach(url => {
        if (url === req.url) {
            isPage = true;
        }
    })


    if (req.url === "/getMessages") {
        // setSortedMessages();
        sendRes("/", dataBase, "application/json", res);
    } else if (req.url === "/" || isPage) {
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
    let file = path.join(__dirname, folder, url);

    fs.readFile(file, (error, content) => {
        if (error) {
            res.writeHead(404);
            res.write("file not found");
            res.end();
            console.log(`file ${file} does not exist`);
        } else {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.writeHead(200, { "Content-type": contentType });
            res.write(content);
            res.end();
        }
    })
}
