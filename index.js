try {
const RPC = require('discord-rpc');
const client = new RPC.Client({
    transport: 'ipc'
});
const dotenv = require("dotenv")

dotenv.config()

var d1 = new Date();
var d = d1.setHours(0,0,0,0); // next midnight

client.on('ready', () => {
    client.request('SET_ACTIVITY', {
        pid: process.pid,
        activity: {
            details: process.env.DETAILS,
            state: process.env.STATE,
            timestamps: {
                start: d
            },
            assets: {
                large_image: process.env.LARGEIMG,
                large_text: process.env.LARGETXT,
                small_image: process.env.SMALLIMG,
                small_text: process.env.SMALLTXT
            },
            buttons: [
                { label: process.env.FIRSTBUTTONTEXT, url: process.env.FIRSTBUTTONURL },
                { label: process.env.SECONDBUTTONTEXT, url: process.env.SECONDBUTTONURL }
            ]
        }
    });
});

console.log("Starting . . . . . . ");

client.login({
    clientId: process.env.ID, //Change to your app ID
    clientSecret: process.env.SECRET //Secret can be found at O2Auth bookmark
})
} catch(error) {
   console.log(error);
}