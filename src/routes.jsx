import {
  HomeIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import TransactionCom from "./pages/dashboard/TransactionCom";
import Transactions from "./pages/dashboard/Components/Transactions";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import Goals from "./pages/dashboard/Components/Goals";
import BudgetsTables from "./pages/dashboard/Components/Budgets/BudgetsTables";
import RapportPage from "./pages/Rapport/RapportPage";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon:<img src="/icons/transactions.svg" className="w-6 h-6" />,
        name: "Transactions",
        path: "/transaction",
        element: <TransactionCom />,
      },
      {
        icon:  <CurrencyDollarIcon {...icon} /> ,
        name: "Budgets",
        path: "/budgets",
        element: <BudgetsTables />,
      },
      {
        icon:<ChartBarIcon {...icon} />,
        name: "Objectifs",
        path: "/goals",
        element: <Goals />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Rapport",
        path: "/Rapport",
        element: <RapportPage />,
        // element: <Notifications />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
