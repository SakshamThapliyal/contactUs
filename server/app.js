import express from "express";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection
const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect()
.then(() => console.log("Database connected"))
.catch(err => console.log(err));

// POST endpoint
app.post("/submit", async (req, res) => {

  try {

    const { name, email, mobile, message } = req.body;

    const query = `
      INSERT INTO contact_form (name, email, mobile, message)
      VALUES ($1, $2, $3, $4)
    `;

    await db.query(query, [name, email, mobile, message]);

    res.send("Form submitted successfully ✅");

  } catch (err) {

    console.error(err);
    res.status(500).send("Error inserting data");

  }

});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
