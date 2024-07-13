import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import UsersInfo from "@/pages/auth/UserInfo";
import { token } from "@/pages/auth/Token";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
 const [reviews , setReviews] = useState(0) ;
const path = useParams()
const fetchAllReviews = useCallback(async()=>{
try {
  
const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/avergeRating/${UsersInfo.id}` , {
  headers : {
    Authorization : token
  }
})

setReviews(data?.moyenne)
} catch (error) {
  console.error(error)
}
} ,[])

useEffect(()=>{
  fetchAllReviews()
},[fetchAllReviews])


  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        {path["*"] !== "Rapport" && <>
        <DashboardNavbar />
        <Configurator />
       
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
          <div className="flex items-center w-full mt-5 mb-1">
        <div className="mr-2">Vos notation :</div>
        {Array.from({ length: reviews }, (_, index) => index).map((item) => (
                            <div>⭐</div>
          ))}
          </div>
        </>}
      
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        {path["*"] !== "Rapport" && <div className="text-blue-gray-600">
          <Footer />
        </div>}
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
