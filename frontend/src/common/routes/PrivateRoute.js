import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../features/auth/authSlice";
import { isLogin } from "../api/isLogin";
export default function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUser());

    return () => {};
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
