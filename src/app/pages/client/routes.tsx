import ClientLayout from ".";
import Four04 from "../shared/404";
import Unauthorized from "../shared/unauthorized";
import CardsLayout from "./card";
import Add from "./card/add";
import List from "./card/list";
import Edit from "./card/list/edit";
import Show from "./card/list/show";
import DashboardPage from "./dashboard";
import Profile from "./profile";

const router = [
  {
    path: "/dashboard",
    element: <ClientLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: "cards",
        element: <CardsLayout />,
        children: [
          { index: true, element: <List /> }, 
          { path: "add", element: <Add /> }, 
          { path: ":id", element: <Show /> },
          { path: ":id/edit", element: <Edit /> },
        ],
      },
      {path : "my-profile" , element : <Profile/>},
      {path : "404" , element : <Four04/>},
      {path : "unauthorized" , element : <Unauthorized/>}
    ],
  },
];

export default router;
