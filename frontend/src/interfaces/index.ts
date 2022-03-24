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

export interface FieldCreateParams {
  fieldName: string;
  product: string;
  area: number | null;
  startDate: Date | null;
  info: string;
  correct: number;
}
