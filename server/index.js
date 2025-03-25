import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// const PORT = 6789;
// const uri = "mongodb+srv://eiveth:esl_learning@mereads.mbjvt.mongodb.net/?retryWrites=true&w=majority&appName=MeReads";
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db = undefined;

app.use(express.json());
app.use('/', express.static('dist'));

function fetchDB() {
    db = client.db("MeReads");
    return db;
}

app.get("/api/articles", async (req, res) => {
    let data = await fetchDB().collection("articles").find().toArray();
    return res.send(data);
})

app.get("/api/articles/latest", async (req, res) => {
    let data = await fetchDB().collection("articles").find().sort({ date: -1 }).limit(5).toArray();
    return res.send(data);
})

app.get("/api/articles/popular", async (req, res) => {
    let data = await fetchDB().collection("articles").find().sort({ likes: -1 }).limit(3).toArray();
    return res.send(data);
})

app.get("/api/articles/find", async (req, res) => {
    const genre = req.query.genre;
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    let query = genre ? { genre } : {};
    try {
        let data = await fetchDB().collection("articles").find(query).sort({ date: -1 }).limit(limit > 0 ? limit : 0).toArray();
        return res.send(data);
    }
    catch (error) {
        console.error("Error fetching articles:", error);
        return res.status(500).send("Internal Server Error");
    }
})

app.get("/api/articles/:slug", async (req, res) => {
    const { slug } = req.params;
    try {
        let data = await fetchDB().collection("articles").findOne({ slug });
        if (data) {
            return res.send(data);
        } else {
            return res.status(404).send("Article not found");
        }
    } catch (error) {
        console.error("Error fetching article:", error);
        return res.status(500).send("Internal Server Error");
    }
});

app.get("/api/articles/:genre", async (req, res) => {
    const { genre } = req.params;
    console.log(genre);
    try {
        let data = await fetchDB().collection("articles").find({ genre: genre }).sort({ date: -1 }).toArray();
        if (data) {
            return res.send(data);
        } else {
            return res.status(404).send({ msg: "Can't find articles" });
        }
    } catch (error) {
        console.error("Error fetching article:", error);
        return res.status(500).send("Internal Server Error");
    }
});

app.post("/api/articles/addLike", async (req, res) => {
    const { articleId, likes } = req.body;
    let addLike = { $set: { likes: likes + 1 } }
    try {
        await fetchDB().collection("articles").updateOne({ _id: new ObjectId(articleId) }, addLike);
        console.log("Like added");
        return res.status(200).send({ msg: "Like added" })
    }
    catch (error) {
        return res.status(403).send({ error: error.message })
    }
})

app.post("/api/articles/addview", async (req, res) => {
    const { slug } = req.body;

    let addViews = { $inc: { views: 1 } }
    try {
        await fetchDB().collection("articles").updateOne({ slug: slug }, addViews);
        console.log("View added");
        return res.status(200).send({ msg: "View added" })
    }
    catch (error) {
        return res.status(403).send({ error: error.message })
    }
})

app.patch("/api/articles/deleteLike", async (req, res) => {
    const { articleId, likes } = req.body;
    console.log(likes);
    let removeLike = { $set: { likes: likes - 1 } }
    try {
        await fetchDB().collection("articles").updateOne({ _id: new ObjectId(articleId) }, removeLike);
        console.log("Like removed");
        return res.status(200).send({ msg: "Like removed" })
    }
    catch (error) {
        return res.status(403).send({ error: error.message })
    }
})

app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: 'dist' });
})

async function connectToDb() {
    try {
        await client.connect()
            .then(app.listen(PORT, () => {
                console.log("Listening on " + PORT)
            }))
    } catch (error) {
        console.error("Error connecting to database", error)
    }
}

connectToDb();