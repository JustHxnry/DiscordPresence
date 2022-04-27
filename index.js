const express = require('express');
const server = express();
const fs = require('fs');
const bodyParser = require('body-parser');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({  extended: false }));
server.set('view engine', 'ejs');
server.set('views', './');

server.get('/', async (req, res) => {

    res.render('index', { data: JSON.parse(fs.readFileSync(__dirname + "/settings.json")) });

});

server.post('/', async (req, res) => {

    let { details, state, timestamp, largeImg, largeTxt, smallImg, smallTxt, button1Label, button1Url, button2Label, button2Url, appId, appSecret } = req.body;

    ndata = {
        details,
        state,
        assets: {
            large_image: largeImg,
            large_text: largeTxt,
            small_image: smallImg,
            small_text: smallTxt
        },
        timestamps: {}
    }

    if (button1Label && button1Url) {

        let temp = ndata.buttons;

        if (!temp) ndata.buttons = [];

        console.log(ndata);
        
        ndata.buttons.push({ label: button1Label, url: button1Url });
    }
    
    if (button2Label && button2Url) {
        
        let temp = ndata.buttons;

        if (!temp) ndata.buttons = [];

        ndata.buttons.push({ label: button2Label, url: button2Url });
    }
    
    if (timestamp === "ExactTime") ndata.timestamps.start = "ExactTime";
    
    if (timestamp) ndata.timestamps.start = timestamp;
    
    data = {
        rp: ndata,
        appId,
        appSecret
    }

    fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(data));

    res.sendStatus(200);

});

server.listen(3000, () => console.log("Set up on localhost:3000"));