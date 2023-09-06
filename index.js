const express = require ('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port =process.env.port || 5000;

app.get('/', (req, res) => {
    res.send('simple node server is running')
});

app.use(cors());
app.use(express.json());//post req.body

const users =[ 
    {id:1, name: "shakib", email: "shakib@gmail.com"},
    {id:2, name: "shakil", email: "shakil@gmail.com"},
    {id:3, name: "toiob", email: "toiob@gmail.com"}
];

//username: dbUser1
//password: PkkvpkHyMdoBxwwX


const uri = "mongodb+srv://dbUser1:PkkvpkHyMdoBxwwX@cluster0.zcbirfd.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const userCollection =client.db('simpleNode').collection('users');
    // const user = {
    //     name: 'Nahiya Mahi', email:'nahiya@gamil.com'
    // }
    // const result = await userCollection.insertOne(user);
    // console.log(result);

    app.get('/users', async (req, res)=>{
        const cursor = userCollection.find({});
        const users = await cursor.toArray();
        res.send(users);
    })

    app.post('/users', async (req, res) => {
        const user = req.body; 
        const result = await userCollection.insertOne(user);
        console.log(result);
        user._id = result.insertedId;
        res.send(user);
   })


  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);





// app.get('/users', (req, res) =>{
//     console.log(req.query);
//     if(req.query.name){
//         const search = req.query.name;
//         const filtered = users.filter(usr =>usr.name.toLowerCase().indexOf(search))
//         res.send(filtered);
//     }  
//     else{
//         res.send(users);
//     }
    
// })

// app.post('/users',(req, res) => {
//      const user = req.body;
//      user.id = users.length + 1;  
//      users.push(user);
//      console.log(user);
//      res.send(user);
// })

app.listen(port, () => {
    console.log(`simple node server running on port ${port}`)
});