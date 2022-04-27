try {
    const RPC = require('discord-rpc');
    const client = new RPC.Client({
        transport: 'ipc'
    });
    const fs = require('fs');
    let data = JSON.parse(fs.readFileSync(__dirname + "/settings.json"));
    var d = new Date().setHours(0, 0, 0, 0);

    if (data.rp.timestamps.start === "ExactTime") data.rp.timestamps.start = d;
    
    client.on('ready', () => {
        client.request('SET_ACTIVITY', {
            pid: process.pid,
            activity: data.rp
        });
    });

    console.log(data.rp);
    
    client.login({
        clientId: data.appId,
        clientSecret: data.appSecret
    })
    } catch(error) {
       console.log(error);
    }