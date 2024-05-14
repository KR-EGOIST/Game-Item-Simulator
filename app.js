import express from 'express';
import dbConnect from './config/dbConnect.js';
import myCharactersRouter from './routes/characters.router.js';
import itemsRouter from './routes/items.router.js';
import errorHandlerMiddleware from './middlewares/error-handler.middleware.js';

const app = express();
const PORT = 3000;

dbConnect();

// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정합니다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Hi!' });
});

// /api 주소로 접근하였을 때, router와 myCharactersRouter로 클라이언트의 요청이 전달됩니다.
app.use('/api', [router, myCharactersRouter, itemsRouter]);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
