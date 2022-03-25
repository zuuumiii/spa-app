import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import CommonLayout from "components/layouts/CommonLayout";
import Home from "components/pages/Home";
import SignUp from "components/pages/SignUp";
import SignIn from "components/pages/SignIn";
import FieldCreate from "components/pages/FieldCreate";

import { getCurrentUser } from "lib/api/auth";
import { User } from "interfaces/index";
import UserEdit from "components/pages/UserEdit";

// グローバルで扱う変数・関数
export const AuthContext = createContext(
  {} as {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  }
);

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);

        console.log(res?.data.data);
      } else {
        console.log("No current user");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  //認証済みユーザーは「/signin」 「/signup」ページに入れない
  // 認証済みだった場合は「/」ページに促す
  const UnPrivate = ({ children }: { children: React.ReactElement }) => {
    if (!isSignedIn) {
      return children;
    } else {
      return <Redirect to="/" />;
    }
  };

  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        return <Redirect to="/signin" />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <Router>
      <AuthContext.Provider
        value={{
          loading,
          setLoading,
          isSignedIn,
          setIsSignedIn,
          currentUser,
          setCurrentUser,
        }}
      >
        <CommonLayout>
          <>
            <UnPrivate>
              <>
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
              </>
            </UnPrivate>
            <Private>
              <>
                <Route exact path="/fieldCreate" component={FieldCreate} />
                <Route exact path="/user" component={UserEdit} />
                <Route exact path="/" component={Home} />
              </>
            </Private>
          </>
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
