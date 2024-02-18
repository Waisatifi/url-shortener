import express from 'express'
import cors from 'cors'
import fs from 'fs'


const app = express()

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["POST", "GET", "DELETE", "PUT"],
      credentials: true,
    }));


app.use(express.json())
let data = {}


app.get("/", (req,res)=> {
    console.log('workin');
    res.send(data)
})


try {
    // Read data from JSON file if it exists
    data = JSON.parse(fs.readFileSync("./data.json", "utf8"));
    console.log(data);
  } catch (err) {
    console.error('Error reading file:', err);
}



// Create

app.post("/api/createShortUrl",(req,res) =>{
    const {longUrl} = req.body
    console.log(longUrl);

    const generatedTinyUrl = generateTinyUrl()

    const newTinyUrl = `tinyUrl-${generatedTinyUrl}`
    const newData = {
        tinyUrl: newTinyUrl,
        longUrl: longUrl
    }
    // Add the new data to the array
    data[newTinyUrl] = longUrl
    try {
        // Write data to JSON file
        fs.writeFileSync('./data.json', JSON.stringify(data))
        // Respond with updated data
        res.status(201).send(newData)
    } catch (error) {
        console.error('Error writing file', err)
        res.status(500).send('Internal Server Error')
    }
})

// Redirect
app.get('/api/goToLongUrl/:tinyUrl',(req,res) => {
    const decodedTinyUrl = decodeURIComponent(req.params.tinyUrl)
    console.log(decodedTinyUrl);
    if (data[decodedTinyUrl]){
                // Redirect the client to the long URL associated with the tiny URL
        res.redirect(data[decodedTinyUrl])
    } else {
        res.status(404).json({error: 'Tiny URL not found'})
    }
})


const generateTinyUrl = () => {
    const generatedNumber = Math.floor(Math.random()*10000)
    return generatedNumber
}

export { app }