import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {global} from "./config/Limit.js"
import { Connectmongodb } from "./config/Dbconfig.js";
import noticrouter from "./Routes/Notic.js"; 
import cookieParser from "cookie-parser";
import adminrouter from "./Routes/adminid.js";
import students from "./Routes/students.js"
import Princaple from "./Routes/Princaplea.js";
import Achivement from "./Routes/Achivement.js"
import PublicNotic from "./Routes/PublicNotic.js"

dotenv.config();

const app = express();
app.use(global)
app.use(express.json());


// CORS with credentials
const corsOptions = {
    origin: "https://fabulous-malasada-a44aa9.netlify.app/",
    credentials: true,
};
app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());

const port = process.env.PORT || 5000;

// Test Route
app.get("/", (req, res) => {
    res.send("Server is working");
});

// API Routes


app.use("/api/notic", noticrouter);
app.use("/api/user", adminrouter);
app.use("/api/students",students)
app.use("/api/principal", Princaple);
app.use("/api/Achivement", Achivement);
app.use("/api/PublicNotic", PublicNotic);
// Connect to MongoDB and start server
Connectmongodb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to start server due to DB connection because  error:", err);
    });
