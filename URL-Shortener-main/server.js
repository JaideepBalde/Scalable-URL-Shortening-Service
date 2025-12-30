require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const express = require("express");
const url_model = require("./models/shorturl.js");
const mongoose = require("mongoose");
const app = express();

// constant
const PORT = 5000;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Successfully Connected to MongoDB !!");
  } catch (error) {
    console.error("Mongo connection failed:", error.message);
    process.exit(1);
  }
};


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Routes
app.get("/", async (req, res) => {
  const urlLists = await url_model.find();
  res.render("index", { shorturls: urlLists });
});

app.post("/shorturls", async (req, res) => {
  const { fullUrl } = req.body;

if (!isValidUrl(fullUrl)) {
  return res.status(400).send("❌ Please enter a valid URLL");
}


  // 2️⃣ Duplicate handling
const existingUrl = await url_model.findOne({ full: fullUrl });
if (existingUrl) {
    return res.redirect("/");
}

await url_model.create({ full: fullUrl });
res.redirect("/");

});

app.get("/:shorturl", async (req, res) => {
  const shorturl = await url_model.findOne({ short: req.params.shorturl });
  if (shorturl == null) return res.sendStatus(404);

 if (shorturl.expiresAt && shorturl.expiresAt < new Date()) {
  return res.sendStatus(410); // Gone
}

shorturl.clicks++;
await shorturl.save();
res.redirect(shorturl.full);

});

app.post("/:id", async (req, res) => {
  const id = req.params.id;
  const deleteAction = await url_model.findOneAndDelete({ _id: id });
  if (deleteAction == null) return res.sendStatus(404);

  res.redirect("/");
});

app.listen(PORT, () => {
  connectMongoDB(MONGO_URI);
  console.log(`Server is running on PORT ${PORT}`);
});
