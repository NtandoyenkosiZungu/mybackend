require("dotenv").config();

const express = require("express");
const cors = require("cors");
const {db, auth} = require("./firebase.js");
const {generatePDF, generateHTMLContentTwo, generateHTMLContentOne} = require("./template-functions/functions.js");

const app = express();


//Defining Middleware
app.use(express.json());
app.use(cors());



app.get("/", (req, res)=> {
    res.send({message: 'Server is active'})
})


//Defining the signup route
app.post("/signup", async (req, res)=> {
    
    try{
        //Right here the code extract the following data from the request body, using array destructuring
        const {email, password, username} = req.body;

        //Checking if all the data is available/present
        if(!email || !password || !username){
            return res.status(400).send({message: "All fields are required"});
        }

        //This creates a record of the user's authentification details
        const userRecord = await auth.createUser({
            email,
            password,
            displayName: username,
        });

        //Save User Data in firestore (firabase database)
        const useRef = db.collection("users").doc(userRecord.uid);
        useRef.set({
            email: userRecord.email,
            username: userRecord.displayName,
            userId: userRecord.uid,
            createdAt: new Date()
        });

        //Sends a response to the client that the user has successfuly registered
        res.status(200).send({
            message: "Successfully registered user",
            userId: userRecord.uid,
            email: userRecord.email
        })

    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

//LogIn route
app.post("/login", async (req, res)=> {
   try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).send({message: "All fields are required"});
        }

        const userRecord = await auth.getUserByEmail(email);

        const firebaseToken = await auth.createCustomToken(userRecord.uid);

        res.status(200).send({
            message: "Login Successful",
            token: firebaseToken,
            username: userRecord.displayName,
        })
   } catch(error) {
        res.status(500).send({message: error.message});
   }

})



app.post('/download-resume', async (req, res)=> {
    try{
        const {template, userDetails} = req.body
        console.log(template, userDetails)

        if (!template || !userDetails){
            return res.status(400).send("Template/ Data is missing")
        }
        if (template === "template-one"){
            var htmlContent = generateHTMLContentOne(userDetails);
        } else if (template === "template-two"){
            var htmlContent = generateHTMLContentTwo(userDetails);
        }

        const pdfBuffer = await generatePDF(htmlContent)

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="resume.pdf"',
            'Content-Length': pdfBuffer.length,
        });
        
        res.write(pdfBuffer);
        res.end();

    }   catch(error){
        console.error("Error generating PDF:", error);
        res.status(500).send({message: "Something went wrong"});
    }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`server is active on port ${PORT}`)
})