// 데이터베이스에 접속하는 코드
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// console.log(dotenv.config({ path: './.env' }));

dotenv.config({ path: './.env' });

const dbConnect = async () => {
  try {
    // mongoose 모듈에서 connect 함수를 이용해서 데이터베이스에 접속한다.
    // 괄호 안에는 데이터베이스 연결하는 주소가 들어가면 됩니다.
    // procsee.env 라는 부분이 env 파일에 있는 내용을 가져오는 객체입니다.
    const connect = await mongoose.connect(process.env.DB_CONNECT, {
      dbName: 'myCharacters', // myCharacters 데이터베이스명을 사용합니다.
    });
    console.log('MongoDB 연결에 성공하였습니다.');
  } catch (err) {
    console.log(`MongoDB 연결에 실패하였습니다. ${err}`);
  }
};

// 몽구스 커넥션에 이벤트 리스너를 달게 해준다. 에러 발생 시 에러 내용을 기록하고, 연결 종료 시 재연결을 시도한다.
mongoose.connection.on('error', (err) => {
  console.error('MongoDB 연결 에러', err);
});

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  dbConnect(); // 연결 재시도
});

export default dbConnect;
