const express = require("express");
const app = express();
const port = 3000;

const { lookup } = require("ip-location-api")

// homepage
app.get("/", async (req, res) => {
    const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.headers['x-real-ip'] ||
    req.socket.remoteAddress ||
    req.ip;

    const location = await lookup(ip)
    console.log(location.country)
    res.send(ip);
});

// test route
app.get("/test", (req, res) => {
    res.json({
        status: "success",
        message: "API test works!"
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});