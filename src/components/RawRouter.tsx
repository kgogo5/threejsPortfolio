import { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import platform from "platform";
import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";

import Container from "./Container";
const Main = lazy(() => import("./main/Main"));
const About = lazy(() => import("./about/About"));
const Login = lazy(() => import("./auth/Login"));
const SignUp = lazy(() => import("./auth/signup/0"));
const Findid = lazy(() => import("./auth/findid/0"));
const Findpassword = lazy(() => import("./auth/findpassword/0"));

const ProgressStyle = styled(CircularProgress)`
  & svg {
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
  }

  & svg circle {
    stroke: #fff;
  }
`;

const _ = () => {
  const platformProp = platform && platform.os && platform.os.family;
  const [isMobile, setIsMobile] = useState<string>("");

  useEffect(() => {
    if (platformProp === "iOS" || platformProp === "Android") {
      setIsMobile("mobile");
    }
  }, [platformProp]);

  return (
    <>
      <Router>
        <Container isMobile={isMobile}>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<ProgressStyle />}>
                  <Main />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<ProgressStyle />}>
                  <About isMobile={isMobile} />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<ProgressStyle />}>
                  <Login isMobile={isMobile} />
                </Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                <Suspense fallback={<ProgressStyle />}>
                  <SignUp isMobile={isMobile} />
                </Suspense>
              }
            />
            <Route
              path="/findid"
              element={
                <Suspense fallback={<ProgressStyle />}>
                  <Findid />
                </Suspense>
              }
            />
            <Route
              path="/findpassword"
              element={
                <Suspense fallback={<ProgressStyle />}>
                  <Findpassword />
                </Suspense>
              }
            />
          </Routes>
        </Container>
      </Router>
    </>
  );
};

export default _;
