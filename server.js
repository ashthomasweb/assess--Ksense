// || Require dependencies 
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
app.use(express.static("public"))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.listen(port, () => console.log(`Server accessible at port ${port}.`))
// || END Listener 