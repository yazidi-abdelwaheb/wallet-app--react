
import HomeLayout from ".";
import HomePage from "./home-page";
import SignInPage from "./sign-in";
import SignUpPage from "./sign-up";


const router = [
  {
    path: "/h",
    element : <HomeLayout/>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "sign-in", element: <SignInPage /> },
      { path: "sign-up", element: <SignUpPage /> },
    ],
  },
];

export default router;
