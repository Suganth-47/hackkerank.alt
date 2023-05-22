const express = require('express')
const app = express()
const port = 3001

//py  shell
let {PythonShell} = require('python-shell')

//cors
const cors = require('cors');
app.use(cors());

//post
app.use(express.json());

//mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://harshan:2qWouluUfy0AU0sX@cluster0.c1rpxhj.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


//temp function to check connection with db
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to db");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

//run().catch(console.dir);

app.get("/register",async(req,res)=>{
    console.log("register");
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    const myDB = client.db("cred");
    const Col = myDB.collection("cred");
    const doc = { name: req.query.name, password: req.query.password };
    const result = await Col.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`,);
    await client.close();
    res.send({msg:"Successfully inserted",register:true});
})

app.get("/login",async(req,res)=>{
    console.log("login");
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    const myDB = client.db("cred");
    const Col = myDB.collection("cred");
    username  = req.query.name;
    password = req.query.password;
//    console.log(username);
    const cursor =  Col.find({"name": username});
//    const cursor = Col.find();
    const doc = await cursor.toArray();
    if(doc[0]["password"]===password){
        res.send({msg:"Successfully logged in",login:true});
    }
    else{
        res.send({msg:"Login failed",login:false});
    }
    await client.close();

    
})

app.get("/getcontests",async(req,res)=>{
    console.log("getcontest");
        await client.connect();
    await client.db("admin").command({ ping: 1 });
    const myDB = client.db("cred");
    const Col = myDB.collection("contests");
//    console.log(username);
    const cursor =  Col.find();
//    const cursor = Col.find();
    const doc = await cursor.toArray();
    res.send({output:doc});
    await client.close();

})

app.get("/addcontest",async(req,res)=>{
        await client.connect();
    await client.db("admin").command({ ping: 1 });
    const myDB = client.db("cred");
    const Col = myDB.collection("contests");
    c_name  = req.query.name;
    c_desc = req.query.c_desc;
    owner = req.query.owner;
//    console.log(username);
    const cursor =  Col.insertOne({"ContestName": c_name,"ContestDesc":c_desc,"ContestOwner":owner});
//    const cursor = Col.find();
    const doc = await cursor.toArray();
    res.send(doc);
    await client.close();

})



app.get("/getqs",async(req,res)=>{
    console.log("get qs");
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    const myDB = client.db("cred");
    const Col = myDB.collection("contest");
    contest_name = req.query.ContestName;

//    console.log(username);
    const cursor =  Col.find({"ContestName":contest_name});
//    const cursor = Col.find();
    const doc = await cursor.toArray();
    res.send({"qs":doc[0]});
    await client.close();

})

//temp to check module
app.get("/pytest",(req,res)=>{
    var str=`
if(5>3):
    print('hello')
else:
    print('hello2')        
    `
    PythonShell.runString(str, null).then(messages=>{
        res.send({"output":messages});
    });
})

//compile the code
app.post('/compile', function (req, res) {  
    console.log("compiling");
    var str = req.body.code;
    console.log(str);
    PythonShell.runString(str, null).then(messages=>{
       res.send({"output":messages,"run":true});
    });
    //res.send({"output":"","run":false});
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

