import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

//スネークケース→キャメルケースに変換

// ヘッダーに関しては無視するオプションを追加
const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: "http://192.168.3.5:3001/api/v1",
  }),
  options
);
//http://54.249.116.120:3001/api/v1
//http://localhost:3001/api/v1
export default client;
