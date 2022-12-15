const http = require("http");
const path = require("path");
const fs = require("fs");
const { sortMessages } = require("./functions");

const dataBase = require("./db.json");
const frontFolder = "../front/dist";

let partedMessages = {
    in: { currentIndex: 0, list: [] },
    out: { currentIndex: 0, list: [] },
    imp: { currentIndex: 0, list: [] },
    trash: { currentIndex: 0, list: [] },
    spam: { currentIndex: 0, list: [] },
    arc: { currentIndex: 0, list: [] },
    draft: { currentIndex: 0, list: [] },
};

let storedMessages = { folder: "", list: [] };

const pageList = ["/in", "/out", "/imp", "/trash", "/spam", "/arc", "/draft", "/letter"];


const setSortedMessages = () => {

    dataBase.forEach(mess => {


        switch (mess.folder) {
            case "Важное":
                partedMessages.imp.list.push(mess);
            case "Отправленные":
                partedMessages.out.list.push(mess);
                break;
            case "Черновики":
                partedMessages.draft.list.push(mess);
                break;
            case "Архив":
                partedMessages.arc.list.push(mess);
                break;
            case "Спам":
                partedMessages.spam.list.push(mess);
                break;
            case "Корзина":
                partedMessages.trash.list.push(mess);
                break;
            default:
                partedMessages.in.list.push(mess);
                break;
        }
    })
}

let isPage;
let isSorted = false;

http.createServer((req, res) => {
    isPage = false;

    if (!isSorted) {
        sortMessages(dataBase);
        setSortedMessages();
        isSorted = true;
    }


    pageList.forEach(url => {
        if (url === req.url) {
            isPage = true;
        }
    })

    if (req.url.indexOf("/getMessages/") >= 0) {
        sendMessages(res, req.url);
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

const sendMessages = (res, path) => {

    path = path.split("/");
    let toSend = [];
    console.log(path);

    if (path[3] === "store") {
        toSend = storedMessages.list;

    } else {
        let fromIndex = 0;

        const messageQuantity = +path[3];

        switch (path[2]) {
            case "in":
                toSend = partedMessages.in;
                break;
            case "out":
                toSend = partedMessages.out;
                break;
            case "imp":
                toSend = partedMessages.imp;
                break;
            case "draft":
                toSend = partedMessages.draft;
                break;
            case "arc":
                toSend = partedMessages.arc;
                break;
            case "spam":
                toSend = partedMessages.spam;
                break;
            case "trash":
                toSend = partedMessages.trash;
                break;
            default:
                break;
        }

        Object.keys(partedMessages).forEach(key => {
            if (partedMessages[key] !== toSend) {
                partedMessages[key].currentIndex = 0;
            }
        });

        fromIndex = toSend.currentIndex;

        if (path[4] !== undefined) {
            storedMessages.list = [];
            fromIndex = 0;
            toSend.currentIndex = 20;
        } else {
            toSend.currentIndex += messageQuantity;
        }

        toSend = toSend.list.slice(fromIndex, fromIndex + messageQuantity);
        storedMessages.list = [...storedMessages.list, ...toSend];
        storedMessages.folder = path[2];
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "Content-type": "application/json" });
    res.write(JSON.stringify(toSend));
    res.end();
}