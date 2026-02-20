/**
 *  Remote File Getter:
 * +-------------------+
 * Q. Can someone now remotely read my file?
 * => Yes!, Someone from browser can read my file.
 * */ 

const express = require('express');
const app = express();

const fs = require('fs');
// const path = require('path');

app.get("files/:filename", function(req, res) {
    const name = req.params.filename;
    console.log(name);
    fs.readFile(name, "utf-8", function(err, data) {
        res.json({
            data
        })
    })
})

app.listen(3000);

/**
 * Now I can go in my and read these files. Similar to this concept, we can
 * create our own google drive and I can read the files as long as my
 * laptop and phone are connected on the same network.
*/