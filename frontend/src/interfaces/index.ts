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
  //email: string;
}

// ユーザー認証
export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname?: string;
  image?: string;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
}
