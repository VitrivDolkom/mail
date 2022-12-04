const path = require("path");
const express = require("express");

const app = express();
app.use(express.static(path.join(__dirname, 'front/dist')));

app.get("/", (request, response) => {
    response.sendFile(`${__dirname}/front/dist/index.html`);
});



app.listen(3000, () => {
    console.log("Server listening port 3000");
});



