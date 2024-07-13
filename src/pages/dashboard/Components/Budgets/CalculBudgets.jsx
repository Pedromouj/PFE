import { token } from '@/pages/auth/Token';
import UsersInfo from '@/pages/auth/UserInfo';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

const CalculBudgets = () => {
    const  [dateDebut , setDateDebut] = useState()
    const  [dateFin , setDateFin] = useState()
    const [dataTable , setDataTable] = useState([])
    const [selectByType , setSelectByType] = useState("Totale")
    const fetchCalul = async()=>{
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/calcul/budgets` ,{
                userId :UsersInfo.id	, 
                date_debut : dateDebut, 
            date_fin : dateFin
            },{
                headers : {
                    Authorization : token
                }
            })
            setDataTable(data)
        } catch (error) {
            console.error(error)
        }
   };
   const fetchCalulByMonth = useCallback(async()=>{
    try {
        const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/allBudgetByCategory/${UsersInfo.id}` ,{
            headers : {
                Authorization : token
            }
        })
        setDataTable(data)
    } catch (error) {
        console.error(error)
    }
},[]);


const fetchCalulByType = useCallback(async()=>{
    try {
        const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/allBudgetByType/${UsersInfo.id}` ,{
            headers : {
                Authorization : token
            }
        })
        setDataTable(data)
    } catch (error) {
        console.error(error)
    }
},[]);

const ReturnComponent = ()=>{
    if(selectByType === "Totale"){
        return(
            <div className='flex items-center gap-3 justify-center w-full'>
                <div>
                <label htmlFor='calculDebut'>Date debut</label>
                <input type='date' defaultValue={dateDebut} onChange={(e) => setDateDebut(e.target.value)} id='calculDebut' className='w-full border p-1 shadow' />
                </div>
                <div>
                <label htmlFor='calculFin'>Date fin</label>
                <input type='date' id='calculFin' defaultValue={dateFin}  onChange={(e) => setDateFin(e.target.value)} className='w-full border p-1 shadow' />
                </div>
            <button onClick={fetchCalul} className='bg-blue-600 text-white rounded p-1 shadow mt-5'>Calculer le budget total</button>
            </div>
        )
    }else if(selectByType === "totale_type" ){
        return(
            <div className='text-lg font-semibold mb-3 px-2'>
                 Résultat par type :
            </div>
                )
    } else if(selectByType === "totale_Categorie" ){
        return(
            <div className='text-lg font-semibold mb-3 px-2'>
              Résultat par catégories :
            </div>
        )
    }  
};
const fetchDataByType = (value)=>{
    setDataTable([])
  if(value === "totale_Categorie") {
    fetchCalulByMonth()
  }else if(value === "totale_type"){
    fetchCalulByType()
  }
  setSelectByType(value)
}
    return (
    <div className='w-[90%] container flex flex-col gap-2 mx-auto shadow'>
    <div className='w-80 mx-auto flex flex-col'>
    <label htmlFor='Recherche'>Calculer le total :</label>
    <select id='Recherche' className='bg-white p-1 cursor-pointer mb-3 border shadow h-10 w-full ' defaultValue={selectByType} onChange={(e)=> fetchDataByType(e.target.value)} >
        <option value={"Totale"}>Calculer le budget total</option>
        <option value={"totale_type"}>Calculer le Budget par type</option>
        <option value={"totale_Categorie"}>Calculer le par catégorie</option>
    </select>
    </div>
    
    <ReturnComponent/>
        <table className='w-full mx-auto text-sm text-left rtl:text-right text-gray-600 h-44 overflow-auto'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-200 '>
                <th scope='col' className='px-6 py-3 border-r-4 border-white'>
                    {selectByType === "Totale"
                    ?
                    "Date"
                    :
                    "Libelle" 
                    }
                </th>
                <th scope='col' className='px-6 py-3'>Totale budgets</th>
            </thead>
            <tbody>
            {
                dataTable.length > 0 &&
             dataTable.map((item ,index)=>(
                <tr key={index} className='bg-white border-b '>
            
             <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{item.libelle}</td>
             <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{item.totalBudget}</td>
            </tr>
             ))
            }
            </tbody>
        </table>
    </div>
  )
}

export default CalculBudgets