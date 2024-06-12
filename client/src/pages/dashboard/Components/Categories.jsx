import { checkIfTokenExpired } from '@/Tools/CheckIfTokenExpired'
import Modal from '@/layouts/Modal'
import { token } from '@/pages/auth/Token'
import UsersInfo from '@/pages/auth/UserInfo'
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'


const Categories = () => {
const [data , setData] = useState([]);
const [openCreate , setOpenCreate] = useState(false);
const [name , setName] = useState("") ;
const [type , setType] = useState("");
const [openEdit , setOpenEdit] = useState(false) ;
const [editedObject , setEditedObject] = useState({})

const fetchAllCategories =  useCallback(async()=>{
    checkIfTokenExpired()
    const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/allCategories/${UsersInfo.id}` , {
        headers : {
            Authorization : token
        }
    }) ;
    setData(data)
},[])


useEffect(()=>{
  fetchAllCategories()
},[fetchAllCategories])



const createCategory = async(e)=>{
    e.preventDefault();    
   try {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/create/category` ,{
        userId : UsersInfo.id,
        libelle : name, 
        type : type 
    } , {
        headers : {
            Authorization : token
        }
    });
    fetchAllCategories()
    setOpenCreate(false)
    toast.success("Catégorie ajoutée avec succès")
   } catch (error) {
    console.error(error);
    toast.error("problème de l'ajout ou vérifiez si vous vous êtes authentifié")
   }
}


const  hanldeOpenEdit = (item)=>{
  setOpenEdit(prev => !prev) ;
  setEditedObject(item)
} 



const handleEditCategory = async(e)=>{
e.preventDefault();    
try {
    await axios.put(`${import.meta.env.VITE_API_BASE_URL}/update/category` ,{
        userId : UsersInfo.id,
        libelle : document.getElementById("cat_name").value, 
        type :  document.getElementById("cat_type").value ,
        idCategory : editedObject.id
    }, {
        headers : {
            Authorization : token
        }
    });
    toast.success("Catégorie modifiée avec succès")
    setOpenEdit(false)
    fetchAllCategories()
} catch (error) {
    console.error(error);
    toast.error("problème de modification ou vérifiez si vous vous êtes authentifié")
}
}



return (
    <div className='w-full '>
      <ToastContainer autoClose={1500} />
      <div className='flex items-center w-96 gap-2'>
      <button onClick={()=> setOpenCreate(prev=>!prev)} className='rounded-full w-10 hover:opacity-80 duration-100 transition-all flex items-center justify-center p-2 shadow  border'>
       <PlusIcon className='w-5 h-5 '/>
      </button> 
      <div className='-mb-1 font-semibold'>
       Ajouter une nouvelle catégorie
      </div>
      </div>

      <ul class={`max-w-full shadow  p-2  ${data.length > 2 && "h-[7rem] overflow-auto"} border divide-y divide-gray-200 dark:divide-gray-700 mt-5 `}>
       { 
        data.map((item)=> (
        <li key={item.id} class="">
            <div class="flex items-center text-sm font-semibold space-x-4 rtl:space-x-reverse">
                <div class="flex-1 min-w-0 ">
                {item.name}
                </div>
             <div className='flex items-center gap-3'>
               <div class={`capitalize ${item.type === "revenu" ? "bg-green-600 animate-pulse" : "bg-blue-600"} p-1 rounded text-white w-24 flex items-center justify-center  my-1 text-base font-semibold dark:text-white`}>
                    {item.type}
                </div>
               <button onClick={()=> hanldeOpenEdit(item)} className='bg-inherit hover:opacity-80 duration-100 transition-all'>
                <PencilSquareIcon className='w-5 h-5 text-green-600 ' />
               </button> 
             </div>
            </div>
        </li>

        ))
        
       }

   </ul>



<Modal isOpen={openCreate} setIsOpen={setOpenCreate}>
  <form onSubmit={createCategory} className='flex flex-col w-full p-3 gap-5'>
    <div className='flex flex-col w-full gap-2' >
        <div>
            <label htmlFor="cat_name">Nom de catégorie</label>
        </div>
        <div>
            <input type="text" id='cat_name' onChange={e => setName(e.target.value)} placeholder='Rent , Mortgage , Rent or Mortgage ...'  className='bg-white px-2 w-full h-10 rounded-md border p-1 shadow outline-none' required/>
        </div>
    </div>

    <div className='flex flex-col w-full  gap-2' >
            <div>
                <label htmlFor="cat_type">Type</label>
            </div>
            <div>
                <select id="cat_type" onChange={e=> setType(e.target.value)} className='bg-white cursor-pointer px-2 w-full h-10 rounded-md border p-1 shadow outline-none' required>
                    <option value="" disabled selected>Sélectionnez votre type</option>
                    <option value="revenu">Revenu</option>
                    <option value="frais">Frais</option>
                </select>
            </div> 
    </div>
    <div className='flex flex-col w-full  mt-3' >
        <button type='submit' className='bg-gray-800 text-white hover:opacity-75 duration-100 transition-all p-2 rounded w-52'>
        Valider
        </button>
    </div>
  </form>
</Modal>



<Modal isOpen={openEdit} setIsOpen={setOpenEdit}>
  <form onSubmit={handleEditCategory} className='flex flex-col w-full p-3 gap-5'>
    <div className='flex flex-col w-full gap-2' >
        <div>
            <label htmlFor="cat_name">Nom de catégorie</label>
        </div>
        <div>
            <input type="text" id='cat_name' defaultValue={editedObject?.name}  placeholder='Rent , Mortgage , Rent or Mortgage ...'  className='bg-white px-2 w-full h-10 rounded-md border p-1 shadow outline-none' required/>
        </div>
    </div>

    <div className='flex flex-col w-full  gap-2' >
            <div>
                <label htmlFor="cat_type">Type</label>
            </div>
            <div>
                <select id="cat_type" defaultValue={editedObject.type}  className='bg-white cursor-pointer px-2 w-full h-10 rounded-md border p-1 shadow outline-none' required>
                    <option value="" disabled>Sélectionnez votre type</option>
                    <option value="revenu">Revenu</option>
                    <option value="frais">Frais</option>
                </select>
            </div> 
    </div>
    <div className='flex flex-col w-full  mt-3' >
        <button type='submit' className='bg-gray-800 text-white hover:opacity-75 duration-100 transition-all p-2 rounded w-52'>
        Valider
        </button>
    </div>
  </form>
</Modal>
    </div>
  )
}

export default Categories