import HomeLayout from ".";
import HomePage from "./home-page";
import SignInPage from "./sign-in";
import OtpPageSignIn from "./sign-in/opt";
import SignUpPage from "./sign-up";
import OtpPageSignUp from "./sign-up/opt";

const router = [
  {
    path: "/h",
    element: <HomeLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "sign-in", element: <SignInPage /> },
      { path: "sign-in/:id", element: <OtpPageSignIn /> },
      { path: "sign-up", element: <SignUpPage /> },
      { path: "sign-up/:id", element: <OtpPageSignUp /> },
    ],
  },
];

export default router;
