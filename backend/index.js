import { Long, ObjectId } from 'mongodb'
import cors from 'cors'
import express from 'express'
import { collectionName, connection } from './dbconfig.js'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: true,  // allow requests from this origin
    credentials: true // allow credentials (cookies) to be sent
}));

//api route to add task
app.post("/add-task", verifyToken ,  async (req, resp) => {
    const db = await connection()
    const collection = await db.collection(collectionName)
    const result = await collection.insertOne(req.body)
    if (result) {
        resp.send({
            message: "New Task Added",
            success: true,
            result
        })
    } else {
        resp.send({
            message: "Cannot Add Task",
            success: false,
        })
    }

})

//api route to see task list 

app.get("/tasks", verifyToken, async (req, resp) => {
    const db = await connection()


    const collection = await db.collection(collectionName)
    const result = await collection.find().toArray()
    if (result) {
        resp.send({
            message: "Task-list fetch",
            success: true,
            result
        })
    } else {
        resp.send({
            message: "Cannot fetch Task-list ",
            success: false,
        })
    }

})





//update task route
app.put("/update-task", verifyToken, async (req, resp) => {
    const db = await connection()
    const collection = db.collection(collectionName)

    const { _id, ...fields } = req.body

    const updatedTask = await collection.findOneAndUpdate(
        { _id: new ObjectId(_id) },
        { $set: fields },
        { returnDocument: 'after' } // Returns the document AFTER updates are applied
    )

    if (updatedTask) {
        resp.send({
            message: "Task Data Updated",
            success: true,
            result: updatedTask
        })
    } else {
        resp.send({
            message: "Task Data Cannot be updated",
            success: false,
        })
    }
})

app.get("/tasks/:id", verifyToken, async (req, resp) => {
    const db = await connection()
    const collection = await db.collection(collectionName)
    const id = req.params.id
    const result = await collection.findOne({ _id: new ObjectId(id) })
    if (result) {
        resp.send({
            message: "Task-list fetch",
            success: true,
            result
        })
    } else {
        resp.send({
            message: "Cannot fetch Task-list ",
            success: false,
        })
    }
})


//route to delete tasks

// DELETE route - removes a task by its MongoDB _id
app.delete("/delete-task/:id", verifyToken ,  async (req, resp) => {
    const db = await connection()
    const collection = await db.collection(collectionName)

    // req.params.id comes from the URL (e.g. /delete-task/6ab7e5dca042f1602e946b14)
    // must convert it to Mongo's ObjectId type before querying, since it's stored as ObjectId
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) })

    if (result.deletedCount > 0) {
        resp.send({
            message: "Task Deleted",
            success: true
        })
    } else {
        resp.send({
            message: "Task not found",
            success: false
        })
    }
})

//api route for sign up
app.post("/signup",   async (req, resp) => {
    const userdata = req.body;
    if (userdata.email && userdata.password && userdata.name) {
        const db = await connection()
        const collection = await db.collection('usersdata')
        const result = await collection.insertOne(userdata)
        if (result) {
            jwt.sign(userdata, 'google', { expiresIn: "5d" }, (error, token) => {
                resp.send({
                    success: true,
                    message: "SignUp Done",
                    token
                })

            })
        }
    } else {
        resp.send({
            success: false,
            message: "SignUp not Done",
        })
    }

})

//login api route
app.post("/login",   async (req, resp) => {
    const userdata = req.body;
    if (userdata.email && userdata.password) {
        const db = await connection()
        const collection = await db.collection('usersdata')
        const result = await collection.findOne({ email: userdata.email, password: userdata.password })
        if (result) {
            jwt.sign({ email: result.email, name: result.name }, 'google', { expiresIn: "5d" }, (error, token) => {
                resp.send({
                    success: true,
                    message: "Login Done",
                    token
                })

            })

        } else {
            resp.send({
                success: false,
                message: "User not found",
            })
        }


    } else {
        resp.send({
            success: false,
            message: "Login not Done",
        })
    }

})

//function to verify token on each route
function verifyToken(req, resp, next) {
    // console.log("verifyToken" , req.cookies);
    const token = req.cookies?.token;
    jwt.verify(token, 'google', (error, decoded) => {
        if(error){
            return resp.status(401).json({
                success: false,
                message: "Authentication required",
            })
        }
        next();
        // console.log(decoded);
    })
}

app.get("/auth", verifyToken, (_req, resp) => {
    resp.json({ success: true })
})

//port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



// command to test post req
//curl -i -X delete http://localhost:8000/update/6aba87970d2f7e9911597cbc -H "Content-Type: application/json" -d '{"title":"test task","description":"testing"}'
//curl -i -X post http://localhost:8000/signup -H "Content-Type: application/json" -d '{"email":"hussain@gamil.com","password":"1233"}'