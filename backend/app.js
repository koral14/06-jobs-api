require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path')

// connectDB
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

// routers
const authRouter = require('./routes/auth');
const recipesRouter = require('./routes/recipes');
const allRecipesRouter = require('./routes/recipesAll');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const { getAllRecipes } = require('./controllers/recipes');

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
)
app.use(express.json());
app.use(helmet());


const corsOptions = {
  origin: 'https://cookyummi.onrender.com', // for deployment
  // origin: 'http://localhost:3000',
  credentials: true, 
};

app.use(cors(corsOptions));


app.use(xss());

app.use(cookieParser());

app.use(express.static('public'))
// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/recipes', authenticateUser, recipesRouter);

// app.get('/api/v1/recipesAll', async (req, res) => {
//   res.send(await getAllRecipes(req, res));
// })
app.use('/api/v1/recipesAll', allRecipesRouter);

// app.get('/', (req, res) => {
//   res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
// });

// solution for solving the issue of with refreshing the page on the /loggedIn route-----------
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..\client\public\index.html', index.html));
})

//--------------------------------------------------------------------------------------------

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();