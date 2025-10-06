import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

// --- YAHAN BADLAV KIYA GAYA HAI ---
// CORS ko configure kiya gaya hai taki sirf aapka frontend hi ise access kar sake
const corsOptions = {
  origin: 'https://imagify-frontend-u4kr.vercel.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// --- BADLAV KHATAM ---


app.use(express.json())
// await connectDB() ko routes se pehle call karna aachi practice hai
await connectDB()

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);
app.get('/', (req, res) => res.send("API Working Successfully"))

app.listen(PORT, () => console.log('Server running on port ' + PORT));