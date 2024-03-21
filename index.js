const Express = require("express")
const os = require("os")
const fs = require("fs")

const App = Express()

const location = os.homedir()+"/ANIMAGINE/gradio/"

App.get("/tmp/gradio/:dirid/:img", async (req, res) => {
    const { dirid , img } = req.params
    try{
        file = fs.readFileSync(location+dirid+"/"+img)

        if(img.endsWith("png")){
            res.setHeader("Content-Type", "image/png")
        }
        else if(img.endsWith("jpg") || img.endsWith("jpeg")){
            res.setHeader("Content-Type", "image/jpeg")
        }

        res.send(file)
    }
    catch{
        res.statusCode = 500
        res.send(JSON.stringify({
            status: "Internal Server Error"
        }))
    }
})

App.listen(4000)