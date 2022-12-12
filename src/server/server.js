const http = require("http");
const path = require("path");
const fs = require("fs");
const { sortMessages } = require("./functions");



const frontFolder = "../front/dist";
const assetsFolder = "../front/dist/assets";
const dataBase = require("./db.json");
const dataBaseSortedName = "dbs.json";
let dataBaseSorted;

const pageList = ["/in", "/out", "/imp", "/trash", "/spam", "/arc", "/draft", "/letter"];


const setSortedMessages = () => {
    fs.writeFileSync(dataBaseSortedName, JSON.stringify(dataBase), function (error, result) {
        if (error) {
            console.log("error");
        }
    });
    isSorted = true;
}

if (!fs.existsSync(dataBaseSortedName)) {
    sortMessages(dataBase);
    setSortedMessages();
}

let isPage;
let prevIndex = 0;
const messPerRequest = 30;



http.createServer((req, res) => {
    isPage = false;

    pageList.forEach(url => {
        if (url === req.url) {
            isPage = true;
        }
    })

    if (req.url.indexOf("newMessages") >= 0) {
        prevIndex = 0;
    }

    if (req.url.indexOf("/getMessages/") >= 0) {
        sendMessages(res);
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

const sendMessages = (res) => {
    // console.log(prevIndex);
    dataBaseSorted = require(`./${dataBaseSortedName}`);
    // if (prevIndex >= dataBaseSorted.length) {
    //     prevIndex = 0;
    // }
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "Content-type": "application/json" });
    res.write(JSON.stringify(dataBaseSorted.slice(prevIndex, prevIndex + messPerRequest)));
    res.end();
    prevIndex += messPerRequest;
}