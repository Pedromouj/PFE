import { formatDate } from '@/Tools/FormatDate';
import Modal from '@/layouts/Modal';
import { token } from '@/pages/auth/Token';
import UsersInfo from '@/pages/auth/UserInfo';
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Card, CardBody, CardHeader,  Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Transactions = () => {
const [Transaction , setTransaction] = useState([])
const [openCreateModal ,setOpenCreateModal] = useState(false)
const [openEditModal ,setOpenEditModal] = useState(false)
const [categories , setCategories] = useState([])
const [selectedCategory , setSelectedategory] = useState({selectedCategory : ""})
const [description , setDescription] = useState({description : ""})
const [transactionDate , setTransactionDate] = useState({transactionDate : ""})
const [montant , setMontant] = useState({ montant :  ""})
const [editedObject , setEditedObject] =useState({}) ;
const [query , setQuery] = useState("");
const fetchAllTransactions = useCallback(async()=>{
  try {
    const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/allTransaction/${UsersInfo.id}?q=${query}` , {
      headers : {
        Authorization : token
      }
    })
  
    setTransaction(data);
  } catch (error) {
    console.error(error)
  }
},[query]);

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
  fetchAllTransactions()
},[fetchAllTransactions])


const handleCreate = async(e)=>{
  e.preventDefault();
  try {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/create/transaction` , {
      user_id : UsersInfo.id,
      category_id : selectedCategory.selectedCategory,
      amount : montant.montant,
      transaction_date : transactionDate.transactionDate,
      description : description.description
    },{
      headers : {
        Authorization : token
      }
    })
    toast.success("La transaction a été ajoutée avec succès");
    fetchAllTransactions()
    setOpenCreateModal(false)  

  } catch (error) {
    console.error(error)
    toast.error("Il y a un problème dans la transaction");
  }
}


const handleOpenEdit = (item)=>{
setOpenEditModal(prev=>!prev)
setMontant({montant : item.amount })
setTransactionDate({transactionDate : item.transaction_date })
setDescription({description : item.description })
setSelectedategory({selectedCategory : item.category_id})
setEditedObject(item)
}


const  handleUpdate = async(e)=>{
  e.preventDefault();
  try {
    await axios.put(`${import.meta.env.VITE_API_BASE_URL}/update/transaction` , {
      idCat : editedObject.id ,
      user_id : UsersInfo.id,
      category_id : selectedCategory.selectedCategory,
      amount : montant.montant,
      transaction_date : transactionDate.transactionDate,
      description : description.description
    },{
      headers : {
        Authorization : token
      }
    })
    toast.success("La transaction a été modifié avec succès");
    fetchAllTransactions()
    setOpenEditModal(false)  
  } catch (error) {
    console.error(error)
    toast.error("Il y a un problème dans la transaction");
  }
}



  return (
    <div className='flex flex-col w-full '>
          <div className='flex items-center w-full gap-2 my-4'>
         <button onClick={()=> setOpenCreateModal(prev => !prev)} className='bg-inherit w-8 hover:opacity-75 duration-100 transition-all flex items-center justify-center p-1.5 my-4 border rounded-full shadow-md'>
          <PlusIcon className='w-5 h-5 text-gray-800'  />
         </button>
          <div className='mt-1'>
          Ajouter un nouveau Transaction
          </div>
         </div> 
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Transactions
          </Typography>
        </CardHeader>
        <div className='flex flex-col w-96 px-3 mb-4'>
          <label htmlFor='Recherche'>Recherche :</label>
          <input type='search' onChange={(e)=> setQuery(e.target.value)} id='Recherche' className='bg-white p-1 border border-gray-300 text-sm rounded outline-none  shadow w-full h-8  px-1' placeholder='Recherche par CATÉGORIE,MONTANT...'  />
        </div>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Catégorie", "Montant", "Date de transaction", "description", ""].map(
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
              {Transaction.map(
                ({id,name,category_id ,type,amount,transaction_date,description}, key) => {
                  const className = `py-3 px-5 ${
                    key === Transaction.length - 1
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
                      <td className={className}>
                        <PencilSquareIcon onClick={()=> handleOpenEdit({id,name,category_id,type,amount,transaction_date,description})} className='text-green-600 w-5 h-5 cursor-pointer hover:opacity-60 duration-100 transition-all' />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
   




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
          <input onChange={e=> setMontant({montant : e.target.value})} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-montant" type="number" placeholder="300 $" required/>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-period">
          Date de transaction 
          </label>
          <input onChange={e=> setTransactionDate({transactionDate : e.target.value})} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-montant" type="date"  required/>
        </div>
      </div>
      <div className="flex w-full items-center  gap-2 ">
        <div className="w-full  mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-start">
          Description
          </label>
          <textarea
          onChange={e=>setDescription({description : e.target.value}) }
           className='appearance-none h-32 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
           placeholder='Description de transaction' 
          >
          </textarea>
        </div>

      </div>
      <div className='flex flex-col w-full mt-8 '>
      <button type='submit' className='bg-gray-800 text-white p-1 rounded flex items-center justify-center hover:opacity-70 duration-100 transition-all'>
        Valider 
      </button>
      </div>
 </form>
</Modal>

<Modal isOpen={openEditModal} setIsOpen={setOpenEditModal}>
<form onSubmit={handleUpdate} className="w-full flex flex-col  max-w-lg mx-auto p-3">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-category-name">
            Categorie 
          </label>
          <select  value={selectedCategory.selectedCategory} onChange={e=> setSelectedategory({selectedCategory : e.target.value})} className='appearance-none block w-full bg-gray-200 border border-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id="grid-category-name" required>
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
          <input value={montant.montant} onChange={e=> setMontant({montant : e.target.value})} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-montant" type="number" placeholder="300 $" required/>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-period">
          Date de transaction 
          </label>
          <input value={formatDate(transactionDate.transactionDate)} onChange={e=> setTransactionDate({transactionDate : e.target.value})} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-montant" type="date"  required/>
        </div>
      </div>
      <div className="flex w-full items-center  gap-2 ">
        <div className="w-full  mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-start">
          Description
          </label>
          <textarea
          value={description.description}
          onChange={e=>setDescription({description : e.target.value}) }
           className='appearance-none h-32 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
           placeholder='Description de transaction' 
          >
          </textarea>
        </div>

      </div>
      <div className='flex flex-col w-full mt-8 '>
      <button type='submit' className='bg-gray-800 text-white p-1 rounded flex items-center justify-center hover:opacity-70 duration-100 transition-all'>
        Valider 
      </button>
      </div>
    </form>
</Modal>


    </div>
  )
}

export default Transactions