import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

//スネークケース→キャメルケースに変換

// ヘッダーに関しては無視するオプションを追加
const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.REACT_APP_CLIENT,
  }),
  options
);
export default client;
