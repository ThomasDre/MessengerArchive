(function() {
	"use strict";
	
	const express = require("express");
    const app = express();
	
	const fs = require("fs");
	const bodyParser = require("body-parser");
    const cors = require("cors");


    // hardcoded --> parsing will be outsourced to server eventually, then this increasement of the data limit can be removed
    app.use(bodyParser.text({limit: '50mb'}));
    app.use(cors());

    // REST INTERFACES
    app.route('/saveChat').post((req, res) => saveChat(req, res));
	

	function saveChat(req, res) {
        let filename;
        do {
            filename = createFileName();
        } while (fs.existsSync("../client/src/assets/data/chats/" + filename));

        fs.writeFileSync("../client/src/assets/data/chats/" + filename, req.body);
        updateConfiqFile(filename,req.query.group,req.query.name,req.query.members);
        res.status(200).send();
    }

    function updateConfiqFile(fileName,isGroup, groupName, groupMembers) {
        // TODO make decision of whether to use real or debug file automatic
        let data = JSON.parse(fs.readFileSync("../client/src/assets/data/contacts.json"));
        let newContact;
        // TODO id is currently only dummy
        let id = 0;
        let picture;

        if (isGroup == "true") {
            picture = "default/group.svg"
        } else {
            picture = "default/avatar.svg";
        }

        newContact = {"name": groupName, "id": 0, "file": fileName, "pic": picture, "members": groupMembers};
        console.log("Saved new contact: " + JSON.stringify(newContact));

        data.contacts.push(newContact);
        fs.writeFileSync("../client/src/assets/data/contacts.json", JSON.stringify(data));
    }

    function createFileName()  {
        let asciiStart = 97;
        let filename = "";

        for (let i = 0; i < 5; i++) {
            let random = parseInt(Math.random() * 25) + asciiStart;
            filename = filename + String.fromCharCode(random);
        }

        filename = filename + ".html";

        return filename;
    }
	
	const server = app.listen(8081, function() {
        const host = server.address().address;
        const port = server.address().port;
        console.log("Server listening at http://%s:%s", host, port);
    });
}	
)();