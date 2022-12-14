const express = require('express')
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
require("dotenv").config();
//middlewere
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nhz1uxm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const projectCollection = client.db("finalPortfolio").collection("project");
        //get items api
        app.get("/projects", async (req, res) => {
            const query = {};
            const cursor = projectCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
          });

          app.get("/project/:id",async (req,res)=>{
            const id=req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) }

            const project = await projectCollection.findOne(query);
            res.send(project)
          })

    } finally {

    }
}
run().catch(console.dir);
app.get("/", (req, res) => {
    res.send("final portfolio running");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})