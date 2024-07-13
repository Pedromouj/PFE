import { chartsConfig } from "@/configs";
import { token } from "@/pages/auth/Token";
import UsersInfo from "@/pages/auth/UserInfo";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";


export const dataCat = ()=>{
const  [categorieChart , setCategorieChart] = useState([])
const  [dataByMonthFrais, setDataByMonthFrais] = useState([])
const  [dataByMonthRevenu, setDataByMonthRevenu] = useState([])

const fetchCategorieChart = useCallback( async()=>{
try {
    const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/category/charts-expense/${UsersInfo.id}` , {
        headers : {
            Authorization : token
        }
    })
    setCategorieChart(data)
} catch (error) {
    console.error(error)
}
},[])



const fetchChartByMonth = useCallback( async()=>{
  try {
    const category = ["frais", "revenu"];
    const dataResponsePromises = category.map(type => 
      axios.put(`${import.meta.env.VITE_API_BASE_URL}/totale/transactionByMonth/`, {
        userId: UsersInfo.id,
        type: type
      }, {
        headers: {
          Authorization: token
        }
      })
    );
    
    Promise.all(dataResponsePromises)
      .then(responses => {
        setDataByMonthFrais(responses[0].data); // Assuming the response data you need is in `data`
        setDataByMonthRevenu(responses[1].data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  } catch (error) {
      console.error(error)
  }
  },[])




useEffect(()=>{
  fetchChartByMonth()
},[fetchChartByMonth])
useEffect(()=>{
    fetchCategorieChart()
},[fetchCategorieChart])



    const websiteViewsChart = {
        type: "bar",
        height: 220,
        series: [
          {
            name: "Prix",
            data: categorieChart.length > 0 ? categorieChart.map((item) => item.total_amount) : [0],
          },
        ],
        options: {
          ...chartsConfig,
          colors: "#388e3c",
          plotOptions: {
            bar: {
              columnWidth: "16%",
              borderRadius: 5,
            },
          },
          xaxis: {
            ...chartsConfig.xaxis,
            categories: categorieChart.length > 0 ?  categorieChart.map((item) => item.name) : [""],
          },
        },
      };
      
      const dailySalesChart = {
        type: "line",
        height: 220,
        series: [
          {
            name: "Frais",
            data: dataByMonthFrais.length > 0 ? dataByMonthFrais.map((item) => item.total) : [0],
          },
        ],
        options: {
          ...chartsConfig,
          colors: ["#0288d1"],
          stroke: {
            lineCap: "round",
          },
          markers: {
            size: 5,
          },
          xaxis: {
            ...chartsConfig.xaxis,
            categories:dataByMonthFrais.length > 0 ? dataByMonthFrais.map((item) => item.month) : [""],
          },
        },
      };
      
      const completedTaskChart = {
        type: "line",
        height: 220,
        series: [
          {
            name: "Revenu",
            data: dataByMonthRevenu.length > 0 ? dataByMonthRevenu.map((item) => item.total) : [0],
          },
        ],
        options: {
          ...chartsConfig,
          colors: ["#388e3c"],
          stroke: {
            lineCap: "round",
          },
          markers: {
            size: 5,
          },
          xaxis: {
            ...chartsConfig.xaxis,
            categories: dataByMonthRevenu.length > 0 ? dataByMonthRevenu.map((item) => item.month) : [""],
          },
        },
      };
      const completedTasksChart = {
        ...completedTaskChart,
        series: [
          {
            name: "Revenu",
            data: dataByMonthRevenu.length > 0 ? dataByMonthRevenu.map((item) => item.total) : [0],
          },
        ],
      };
       
     const statisticsChartsData = [
        {
          color: "white",
          title: "Frais selon catégories",
          description: "La répartition des dépenses entre différentes catégories",
          footer: "campaign sent 2 days ago",
          chart: websiteViewsChart,
        },
        {
          color: "white",
          title: "Frais mensuel",
          description: "15% increase in today sales",
          footer: "updated 4 min ago",
          chart: dailySalesChart,
        },
        {
          color: "white",
          title: "Revenu mensuel",
          description: "Last Campaign Performance",
          footer: "just updated",
          chart: completedTasksChart,
        },
      ];
      



return statisticsChartsData
}