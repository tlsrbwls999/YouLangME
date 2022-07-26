import "./App.css";
import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import Login from "./features/auth/login/Login";
// import { useSelector } from "react-redux";
import SignUp from "./features/auth/signup/SignUp";
import ModifyUserInfo from "./features/auth/modify/ModifyUserInfo";
import Main from "./features/main/Main";
import MyPage from "./features/profile/MyPage";
import PrivateRoute from "./common/routes/PrivateRoute";
import PublicRoute from "./common/routes/PublicRoute";
import Social from "./features/auth/social/Social";
// import { useSelector } from "react-redux";

// test용 코드
import Board from "./features/board/Board";
import BoardDetailModal from "./features/board/detail/components/BoardDetailModal";
import BoardMainItem from "./features/main/feed/components/BoardMainItem";
function App() {
  // const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PublicRoute
            restricted
            exact
            path="/"
            component={Login}
          ></PublicRoute>
          <PublicRoute
            restricted
            path="/signup"
            component={SignUp}
          ></PublicRoute>
          <PublicRoute path="/social" component={Social}></PublicRoute>
          <PrivateRoute
            path="/modify"
            component={ModifyUserInfo}
          ></PrivateRoute>
          <PrivateRoute path="/profile/:userId" exact component={MyPage}>
            {/* <PrivateRoute path="activity" component={MyActivity}></PrivateRoute> */}
            {/* <PrivateRoute path="articles" component={MyArticleList}></PrivateRoute> */}
          </PrivateRoute>
          <PrivateRoute exact path="/main" component={Main}></PrivateRoute>

          {/* 화면 보면서 컴포넌트 제작할 때 사용하는 PrivateRoute  */}
          <PrivateRoute exact path="/board" component={Board}></PrivateRoute>
          {/* <PublicRoute 
            exact
            path="/test1"
            component={BoardMainItem}
          ></PublicRoute>
          <PublicRoute
            exact
            path="/test2"
            component={BoardDetailModal}
          ></PublicRoute> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;