import React, { useCallback, useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsChart } from "@/widgets/charts";

import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import CardsHeader from "./Components/Cards/CardsHeader";
import { dataCat } from "@/data/Chart-category-data";
import axios from "axios";
import UsersInfo from "../auth/UserInfo";
import { token } from "../auth/Token";
import { formatDate } from "@/Tools/FormatDate";
import { checkIfTokenExpired } from "@/Tools/CheckIfTokenExpired";

export function Home() {
const [objectifs , setObjectifs] = useState([])
const [transactions , setTransactions] = useState([])
const fetchLatestObjectives = useCallback(async()=>{
  checkIfTokenExpired()
try {
  const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/latestGoals/${UsersInfo.id}`,{
    headers : {
      Authorization : token
    }
  });
  setObjectifs(data);
} catch (error) {
  console.error(error)
}
},[]);


const fetchLatestTransactions= useCallback(async()=>{
try {
  checkIfTokenExpired()
 
  const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/latestTransaction/${UsersInfo.id}`,{
    headers : {
      Authorization : token
    }
  });
  setTransactions(data);
} catch (error) {
  console.error(error)
}
},[]);

useEffect(()=>{
  fetchLatestTransactions()
},[fetchLatestTransactions])

useEffect(()=>{
  fetchLatestObjectives()
},[fetchLatestObjectives])

const datas = dataCat();
useEffect(()=>{
  checkIfTokenExpired()
},[])
  return (
    <div className="mt-5">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <CardsHeader/>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {datas.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
              Dernières transactions
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                <strong>4 done</strong> this month
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Catégorie", "Montant", "Date de transaction", "description"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {transactions.map(
                ({id,name,type,amount,transaction_date,description}, key) => {
                  const className = `py-3 px-5 ${
                    key === transactions.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                          <div className={`${type === "revenu" ? "bg-green-600 animate-pulse" : "bg-blue-600"} capitalize shadow-sm w-fit text-sm  h-5 flex justify-center items-center text-white p-1.5 rounded-full`}>
                           {type}
                        </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {amount}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="w-10/12">
                          <Typography
                            variant="small"
                            className="mb-1 block text-xs font-medium text-blue-gray-600"
                          >
                            {formatDate(transaction_date)}
                          </Typography>
                        
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                         {description}
                        </Typography>
                      </td>
                  
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          </CardBody>
        </Card>
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
            Derniers objectifs
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0 text-sm">
            {objectifs.map(
              ({ id,  name, date_limite }, key) => (
                <div key={id} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === objectifs.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {name}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      <div className="flex items-center gap-3 mt-2">
                       <b>Date limite : </b>
                       <div>
                        {formatDate(date_limite)}
                       </div>  
                      </div>
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
