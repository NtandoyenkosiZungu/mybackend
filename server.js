require("dotenv").config();

const express = require("express");
const cors = require("cors")
const {db, auth} = require("./firebase")


const app = express();
//Middleware 
app.use(cors());
app.use(express.json());



//Test route to add data 
app.get("/add-data", async (req, res) => {
    
    try{
        const useRef = db.collection("users").doc("testUser")
        await useRef.set({
            username: "Ntandoyenkosi",
            email: "ntandoyenkosizungu7@gmail.com",
            createdAt: new Date()
        });

        res.send({message: "User added successfully"})
    } catch(error) {
        res.status(500).send({error: error.message});
    }
    
})

//Test dynamic user addition route 
app.post("/dynamic-user", async (req, res)=> {
    try{

        const {userId, username, email} = req.body;

        if(!username || !email || !userId){
            return res.status(400).send("All fields are required")
        }

        const useRef = db.collection("users").doc(userId);
        await useRef.set(
            {
                username,
                email,
                createdAt: new Date()
            }
        );

        res.status(201).send({message: "user added successfully"})
    }catch (error){
        res.status(500).send({error: error.message});
    }
});


//Test user fetching route
app.get("/fetch-user", async (req, res)=> {  
    try{
        const {userId} = req.body;
        console.log(req.body)
        if(!userId){
            return res.status(400).send("Missing email requirement");
        }

        //console.log(email);
        const useRef = db.collection("users").doc(userId);
        const doc = await useRef.get();

        if(!doc.exists){
            return res.status(404).send({message: "User Not Found"});
        }

        res.status(200).send(doc.data())

    } catch (error){
        res.status(500).send({message: "missing email, failed to fetch user"})
    }
})

//Testing data modification route
app.put("/update", async(req, res) => {
    try{
        const {userId, username, email} = req.body;

        if(!userId || !username || !email){
            return res.status(400).send({message: "all fields are required"});
        }

        const useRef = db.collection("users").doc(userId);
        const doc = await useRef.get();

        if (!doc.exists){
            return res.status(400).send({message: "Document does not exist"})
        }

        await useRef.update({
            username,
            email,
            updatedAt: new Date()
        });

        return res.status(201).send({message: "Document successfully modified"})
    }catch (error){
        res.status(500).send({message: error.message})
    }
})



app.get("/", (req, res) => {
    res.send({message: "It's ALIVE!!!!!!!!!!!!!!"})
});


//Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}`)
})

