import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  CheckIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { isExpired } from "react-jwt";
import { token } from "@/pages/auth/Token";
import UsersInfo from "@/pages/auth/UserInfo";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [countNotification , setCountNotification] = useState(0)  
  const [notifications , setNotifications] = useState([])
  
  const history = useNavigate()

  const clickToLogOut = ()=>{    
    history("/auth/sign-in")
  }











  



  const fetchCountNotifications = useCallback(async()=>{
   try {
    const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/count/notification/${UsersInfo.id}` , {
      headers : {
        Authorization : token
      }
    })
    setCountNotification(data?.count_notification) ;

   } catch (error) {
    console.error(error)
   }
  },[])
  const fetchAllNotifications = useCallback(async()=>{
    try {
     const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/notification/${UsersInfo.id}` , {
       headers : {
         Authorization : token
       }
     })
     setNotifications(data) ;
 
    } catch (error) {
     console.error(error)
    }
   },[])


   useEffect(()=>{
    fetchAllNotifications()
  },[fetchAllNotifications])


  useEffect(()=>{
    fetchCountNotifications()
  },[fetchCountNotifications])


  const UpdateNotifications = async()=>{
    try {
       await axios.put(`${import.meta.env.VITE_API_BASE_URL}/update/notification` ,{
      userId : UsersInfo.id
     } , 
     {
      headers : {
        Authorization : token
      }
    })

    fetchCountNotifications()
    } catch (error) {
     console.error(error)
    }
   }
  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" />
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <div  className="bg-gray-200 p-1 rounded shadow w-auto ">
            <div
              className="flex text-gray-600   items-center gap-3 px-4 xl:flex normal-case"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              {
                isExpired(token) 
                ?
                <Link to={"/auth/sign-in"}>
                 Sign In
                </Link>
                :
               <div className="flex items-center gap-3">
                 {UsersInfo.username}
                 <ArrowRightOnRectangleIcon onClick={clickToLogOut} className="cursor-pointer w-5  h-5 hover:text-red-500 duration-100 transition-all " />

               </div>
              }
            </div>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </div>
          <Menu>
            <MenuHandler>
              <IconButton className="relative" variant="text" color="blue-gray">
                <BellIcon onClick={UpdateNotifications} className="h-5 w-5 text-blue-gray-500" />
                {countNotification !== 0 && <span className={`absolute bg-red-600 left-3.5 bottom-3 rounded-md p-0.5 ${countNotification > 99 ? "w-fit" : "w-4"} h-4 text-xs flex items-center justify-center text-white `}>{countNotification}</span>}
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
             {
              notifications.map((item)=> (
                <Link className="hover:border-none outline-none" to={"/dashboard/goals"}>
                <MenuItem key={item.id} className="flex items-center gap-3">
                <Avatar
                  src="/icons/achievementBlack.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New notification</strong> voir vos avis 
                  </Typography>
                  <div
                    className="flex items-center gap-1 text-xs "
                  >
                    <CheckCircleIcon className="h-3.5 w-3.5 text-green-800" />objectif atteint ({item.name})
                  </div>
                </div>
              </MenuItem>
                </Link>
              ))
             }
            </MenuList>
          </Menu>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
