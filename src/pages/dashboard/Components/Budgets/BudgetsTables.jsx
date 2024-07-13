import { checkIfTokenExpired } from '@/Tools/CheckIfTokenExpired';
import { formatDate } from '@/Tools/FormatDate';
import Modal from '@/layouts/Modal';
import { token } from '@/pages/auth/Token';
import UsersInfo from '@/pages/auth/UserInfo';
import { CheckCircleIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import CalculBudgets from './CalculBudgets';

const BudgetsTables = () => {
const [budgets , setBudgets] = useState([]);
const [openEditModal , setOpenEditModal] = useState(false)
const [editedObject , setEditedObject] = useState({})
const [categories , setCategories] = useState([])
const [selectedCategory , setSelectedategory] = useState({selectedCategory : ""})
const [selectedPeriod , setSelectedPeriod] = useState("")
const [openCreateModal , setOpenCreateModal] = useState(false);

const fetchAllBudget = useCallback(async ()=>{
    checkIfTokenExpired()
   try {
    const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/allBudget/${UsersInfo.id}` , {
        headers : {
            Authorization : token
        }
    })

    setBudgets(data)
   } catch (error) {
    
   }
},[])


const fetchAllCategories = useCallback(async()=>{
try {
 
  const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/allCategories/${UsersInfo.id}` , {
        headers : {
            Authorization : token
        }
    }) ;
    setCategories(data)

} catch (error) {
  console.log(error)
}
},[])



useEffect(()=>{
  fetchAllCategories()
},[fetchAllCategories])

useEffect(()=>{
    fetchAllBudget()
},[fetchAllBudget])

const handleShowEdit = (item)=> {
  setOpenEditModal(prev => !prev)
  setEditedObject(item)
  setSelectedategory({selectedCategory : item.cat_id})
  console.log(item)
}




const handleUpdate = async(e)=>{
  e.preventDefault();
  
try {
await axios.put(`${import.meta.env.VITE_API_BASE_URL}/update/budgets` , 
{
  idBudget : editedObject.id ,
  userId  : UsersInfo.id ,
  categoryId  : parseInt(selectedCategory.selectedCategory),
  amount : document.getElementById("grid-montant").value ,
  period : selectedPeriod !== "" ? selectedPeriod :  document.getElementById("grid-period").value ,
  start_date : document.getElementById("grid-start").value ,
  end_date :  document.getElementById("grid-end").value 
}
,{
  headers : {
    Authorization : token
  }
})

toast.success("Budget modifié avec succès");
fetchAllBudget()
setOpenEditModal(false)
} catch (error) {
console.error(error)  
}

}



const handleCreate = async(e)=>{
  e.preventDefault();
  
try {
await axios.post(`${import.meta.env.VITE_API_BASE_URL}/create/budgets` , 
{
  idBudget : editedObject.id ,
  userId  : UsersInfo.id ,
  categoryId  : parseInt(selectedCategory.selectedCategory),
  amount : document.getElementById("grid-montant").value ,
  period : selectedPeriod,
  start_date : document.getElementById("grid-start").value ,
  end_date :  document.getElementById("grid-end").value 
}
,{
  headers : {
    Authorization : token
  }
})

toast.success("Budget modifié avec succès");
fetchAllBudget()
setOpenCreateModal(false)
} catch (error) {
console.error(error)  
}

}

  return (


    <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm w-full">
     <ToastContainer autoClose={1500} />
   

    <CardHeader
      floated={false}
      shadow={false}
      color="transparent"
      className="m-0 flex items-center justify-between p-6"
    >


 
      <div className='w-full container'>
         <div className='flex items-center w-full gap-2 '>
         <button onClick={()=> setOpenCreateModal(prev => !prev)} className='bg-inherit w-8 hover:opacity-75 duration-100 transition-all flex items-center justify-center p-1.5 my-4 border rounded-full shadow-md'>
          <PlusIcon className='w-5 h-5 text-gray-800'  />
         </button>
          <div className='mt-1'>
          Ajouter un nouveau budget
          </div>
         </div>
         <CardHeader variant="gradient" color="gray" className="mb-8 relative right-6  flex justify-start p-6 w-full my-4">
          <Typography variant="h6" color="white">
            Budgets
          </Typography>
        </CardHeader>
   

        <Typography
          variant="small"
          className="flex items-center gap-1 font-normal text-blue-gray-600"
        >
          <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
          <strong>30 done</strong> this month
        </Typography>
      </div>
      {/* <Menu placement="left-start">
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
      </Menu> */}
    </CardHeader>
    
    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            {["Catégorie", "Montant", "Période" , "Date debut" , "Date Fin" , ""].map(
              (el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-6 text-left"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-medium uppercase text-blue-gray-400"
                  >
                    {el}
                  </Typography>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
        {budgets.map(
        ({id , start_date, end_date, name, period, amount , cat_id}, key) => {
            const className = `py-3 px-5 ${
            budgets.length > 0 ? "" : "border-b border-blue-gray-50"
            }`;
            return (
            <tr key={key}>
                <td className={className}>
                <div className="flex items-center gap-4">
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                    >
                    {name}
                    </Typography>
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
                <Typography
                    variant="small"
                    className="text-xs font-medium text-blue-gray-600"
                >
                    {period}
                </Typography>
                </td>
                <td className={className}>
                <Typography
                    variant="small"
                    className="text-xs font-medium text-blue-gray-600"
                >
                    {formatDate(start_date)}
                </Typography>
                </td>
                <td className={className}>
                <Typography
                    variant="small"
                    className="text-xs font-medium text-blue-gray-600"
                >
                    {formatDate(end_date)}
                </Typography>
                </td>
                <td className={className}>
                <PencilSquareIcon onClick={()=> handleShowEdit({id, start_date, end_date, name, period, amount , cat_id})} className='w-4 h-4 text-green-600 cursor-pointer hover:opacity-75 duration-100 transition-opacity' />
                </td>
            </tr>
            );
        }
        )}

        </tbody>
      </table>
    </CardBody>

<CalculBudgets/>


    <Modal isOpen={openEditModal} setIsOpen={setOpenEditModal}>
    <form onSubmit={handleUpdate} className="w-full flex flex-col  max-w-lg mx-auto p-3">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-category-name">
            Categorie 
          </label>
          <select value={selectedCategory.selectedCategory} onChange={e=> setSelectedategory({ selectedCategory : e.target.value})} defaultValue={editedObject.cat_id}  className='appearance-none block w-full bg-gray-200 border border-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id="grid-category-name" required>
          <option value="">sélectionnez votre Category</option>
          {
            categories.map((item) => (
            <option key={item.id} value={item.id} >{item.name}</option>
            ))
          }
          </select>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-montant">
            Montant
          </label>
          <input defaultValue={editedObject.amount} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-montant" type="number" placeholder="300 $" required/>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-period">
          Période
          </label>
          <select onChange={e=> setSelectedPeriod(e.target.value)} defaultValue={editedObject.period} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-period" required>
            <option value="">sélectionnez votre période</option>
            <option value="mensuelle">Mensuelle</option>
            <option value="annuelle">Annuelle</option>
          </select>
        </div>
      </div>
      <div className="flex w-full items-center  gap-2 ">
        <div className="w-full md:w-1/2  mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-start">
          Date de début
          </label>
          <input defaultValue={formatDate(editedObject.start_date)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-start" type="date" />
        </div>
        <div className="w-full md:w-1/2  mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-end">
          Date de Fin
          </label>
          <input defaultValue={formatDate(editedObject.end_date)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-end" type="date" />
        </div>
      
      </div>
      <div className='flex flex-col w-full mt-8 '>
      <button type='submit' className='bg-gray-800 text-white p-1 rounded flex items-center justify-center hover:opacity-70 duration-100 transition-all'>
        Valider 
      </button>
      </div>
    </form>
    </Modal>



<Modal isOpen={openCreateModal} setIsOpen={setOpenCreateModal}>
<form onSubmit={handleCreate} className="w-full flex flex-col  max-w-lg mx-auto p-3">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-category-name">
            Categorie 
          </label>
          <select  onChange={e=> setSelectedategory({selectedCategory : e.target.value})} className='appearance-none block w-full bg-gray-200 border border-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id="grid-category-name" required>
          <option value="" selected disabled>sélectionnez votre Category</option>
          {
            categories.map((item) => (
            <option key={item.id} value={item.id} >{item.name}</option>
            ))
          }
          </select>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-montant">
            Montant
          </label>
          <input  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-montant" type="number" placeholder="300 $" required/>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-period">
          Période
          </label>
          <select onChange={e=> setSelectedPeriod(e.target.value)}  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-period" required>
            <option value="" selected disabled>sélectionnez votre période</option>
            <option value="mensuelle">Mensuelle</option>
            <option value="annuelle">Annuelle</option>
          </select>
        </div>
      </div>
      <div className="flex w-full items-center  gap-2 ">
        <div className="w-full md:w-1/2  mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-start">
          Date de début
          </label>
          <input  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-start" type="date" required/>
        </div>
        <div className="w-full md:w-1/2  mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-end">
          Date de Fin
          </label>
          <input  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-end" type="date" required/>
        </div>
      
      </div>
      <div className='flex flex-col w-full mt-8 '>
      <button type='submit' className='bg-gray-800 text-white p-1 rounded flex items-center justify-center hover:opacity-70 duration-100 transition-all'>
        Valider 
      </button>
      </div>
    </form>
</Modal>
  </Card>
  )
}

export default BudgetsTables