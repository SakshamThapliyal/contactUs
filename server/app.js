import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// create supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// POST endpoint
app.post("/submit", async (req, res) => {

  try {

    const { name, email, mobile, message } = req.body;

    const { data, error } = await supabase
      .from("contact_form")
      .insert([
        { name, email, mobile, message }
      ]);

    if (error) throw error;

    res.send("Form submitted successfully ✅");

  } catch (err) {

    console.error(err);
    res.status(500).send("Error inserting data");

  }

});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
