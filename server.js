import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

// --- YAHAN BADLAV KIYA GAYA HAI ---
// CORS ko aur behtar tarike se configure kiya gaya hai
const corsOptions = {
  origin: "https://imagify-frontend-u4kr.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Zaroori hai kuch browser policies ke liye
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, token" // 'token' header ko allow kiya gaya hai
};

// Yeh line har OPTIONS request ko handle karegi
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
// --- BADLAV KHATAM ---


app.use(express.json());
await connectDB();

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);
app.get('/', (req, res) => res.send("API Working Successfully"));

app.listen(PORT, () => console.log('Server running on port ' + PORT));

