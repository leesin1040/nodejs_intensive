import express from 'express';
import router from './routes/index.js';
import LogMiddleware from './middlewares/log.middleware.js';
import ErrorHandlerMiddleware from './middlewares/error-handler.middleware.js';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import expressMySQLSession from 'express-mysql-session';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT;

const MySQLStorage = expressMySQLSession(expressSession);
const sessionStore = new MySQLStorage({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  expiration: 1000 * 60 * 60 * 24,
  createDatabaseTable: true,
});

app.use(LogMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);
app.use('/api', router);
app.use(ErrorHandlerMiddleware);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
