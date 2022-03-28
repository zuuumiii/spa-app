// サインアップ
export interface SignUpParams {
  name: string;
  email: string;
  precNo: number;
  blockNo: number;
  password: string;
  passwordConfirmation: string;
}

// サインイン
export interface SignInParams {
  email: string;
  password: string;
}

// ユーザー更新
export interface UserEditParams {
  name: string;
  email: string;
  precNo: number;
  blockNo: number;
}

// ユーザー認証
export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  precNo: number;
  blockNo: number;
  nickname?: string;
  image?: string;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
}

//圃場編集
export interface FieldCreateParams {
  fieldName: string;
  product: string;
  area: number | null;
  startDate: number | null;
  info: string;
  correct: number;
}

//圃場取得
export interface FieldParams {
  id: number;
  fieldName: string;
  product: string;
  area: number | null;
  startDate: number | null;
  info: string;
  correct: number;
  accumTemp: number;
  userID: number;
}
