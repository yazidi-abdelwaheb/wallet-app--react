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
import History from "./transaction/history";
import TransactionLayout from "./transaction";
import Transaction from "./transaction/add";
import Receive from "./transaction/receive";
import SettingLayout from "./setting";
import AccountSetting from "./setting/account";
import CardSetting from "./setting/card";

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
      {
        path: "transactions",
        element: <TransactionLayout />,
        children: [
          { index: true, element: <Transaction /> },
          { path: "send", element: <Transaction /> },
          { path: "history", element: <History /> },
          { path: "receive", element: <Receive /> },
        ],
      },
      {
        path: "settings",
        element: <SettingLayout />,
        children: [
          { index: true, element: <AccountSetting /> },
          { path: "account", element: <AccountSetting /> },
          { path: "card", element: <CardSetting /> },
        ],
      },

      { path: "my-profile", element: <Profile /> },
      { path: "404", element: <Four04 /> },
      { path: "unauthorized", element: <Unauthorized /> },
    ],
  },
];

export default router;
