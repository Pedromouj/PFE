import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import UsersInfo from "@/pages/auth/UserInfo";
import { token } from "@/pages/auth/Token";
import { checkIfTokenExpired } from "@/Tools/CheckIfTokenExpired";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/solid";
import { formatDate } from "@/Tools/FormatDate";
import Modal from "@/layouts/Modal";
import { ToastContainer, toast } from "react-toastify";

const Goals = () => {
const [goalsData , setGoalsData] = useState([])
const [openCreateModal , setOpenCreateModal] = useState(false);
const [openEditModal , setOpenEditModal] = useState(false);
const [idGoal , setIdGoal] = useState(null);
const [titre , setTitre] = useState({ titre : "" });
const [montantCible , setMontantCible] = useState({ montantCible : "" });
const [montantActuel , setMontantActuel] = useState({ montantActuel : "" });
const [dateLimite , setDateLimite] = useState({ dateLimite : "" });
const fetchAllGoals = useCallback( async()=>{
checkIfTokenExpired()
try {
 const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/allGoals/${UsersInfo.id}` ,{
    headers :{
        Authorization : token
    }
 })
setGoalsData(data)
} catch (error) {
    console.error(error)
}
},[])

useEffect(()=>{
    fetchAllGoals()
},[fetchAllGoals]);

const handleCreate = async(e)=>{
    e.preventDefault();
    
    try {    
     await axios.post(`${import.meta.env.VITE_API_BASE_URL}/create/goals`,{
        name :  titre.titre,
        montant_cible : montantCible.montantCible,
        montant_actuel : montantActuel.montantActuel,
        date_limite : dateLimite.dateLimite,
        userId : UsersInfo.id
     },{
        headers : {
            Authorization : token
        }
     })
     toast.success("L'objectif a été ajouté avec succès")
     fetchAllGoals()
     setOpenCreateModal(false)
    } catch (error) {
        console.error(error)
        toast.error("Problem de l'ajout")
    }
}




const handleOpenEdit = (item)=>{
setOpenEditModal(prev=> !prev)
setIdGoal(item.id)
setTitre({titre : item.name })
setMontantCible({montantCible : item.montant_cible })
setMontantActuel({montantActuel : item.montant_actuel })
setDateLimite({ dateLimite: item.date_limite})
}



const handleUpdate =async(e)=>{
    e.preventDefault();
    try {    
     await axios.put(`${import.meta.env.VITE_API_BASE_URL}/update/goals`,{
        userId : UsersInfo.id ,
        name :  titre.titre,
        montant_cible : montantCible.montantCible,
        montant_actuel : montantActuel.montantActuel,
        date_limite : dateLimite.dateLimite,
        idGoal : idGoal
     },{
        headers : {
            Authorization : token
        }
     })
     toast.success("L'objectif a été modifié avec succès")
     fetchAllGoals()
     setOpenEditModal(false)
    } catch (error) {
        console.error(error)
        toast.error("Problem de modification")
    }
}

  return (
    <div className='flex flex-col w-full  mt-10'>
    <ToastContainer autoClose={1500} />
      <Card>
      <div className='flex ml-3 items-center w-full gap-2 my-6'>
         <button onClick={()=> setOpenCreateModal(prev => !prev)} className='bg-inherit w-8 hover:opacity-75 duration-100 transition-all flex items-center justify-center p-1.5 my-4 border rounded-full shadow-md'>
          <PlusIcon className='w-5 h-5 text-gray-800'  />
         </button>
          <div className='mt-1'>
          Ajouter un nouveau Objective
          </div>
         </div> 
        <CardHeader variant="gradient" color="gray" className="mb-8 p-3 flex items-center gap-3">
          <img src="/icons/achievementWhite.svg" className="w-7 h-7 mb-2" />
          <div className="text-lg font-semibold">
          Objectifs
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Titre", "Montant Cible", "montant actuel", "date limite", ""].map((el) => (
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
                ))}
              </tr>
            </thead>
            <tbody>
              {goalsData.map(
                ({id , name, montant_cible, montant_actuel, date_limite }, key) => {
                  const className = `py-3 px-5 ${
                    key === goalsData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        {montant_cible}
                      </td>
                      <td className={className}>
                        {montant_actuel}
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {formatDate(date_limite)}
                        </Typography>
                      </td>
                      <td className={className}>
                        <PencilSquareIcon onClick={()=> handleOpenEdit({id,name,montant_cible,montant_actuel,date_limite})} className="w-5 h-5 text-green-600 cursor-pointer hover:opacity-60 duration-100 transition-all " />
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
        
                <div className="w-full md:w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-montant">
                    Titre
                    </label>
                    <input onChange={e=> setTitre({titre : e.target.value})} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-montant" type="text" placeholder="Atteindre l'indépendance financière" required/>
                </div>
            </div>
            <div className="flex items-center gap-1 mb-6">
        
                <div className="w-full md:w-1/2 px-1">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-montant">
                    Montant cible
                </label>
                <input onChange={e=> setMontantCible({montantCible : e.target.value})} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-montant" type="number" placeholder="1000 $" required/>
                </div>
                <div className="w-full md:w-1/2 px-1">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-period">
                Montant Actuel
                </label>
                <input onChange={e=> setMontantActuel({montantActuel : e.target.value})} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-montant" type="number" placeholder="300 $" required/>
                </div>


            </div>

            <div className="flex w-full items-center  gap-2 ">
                <div className="w-full  mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-start">
                Date limite
                </label>
                <input
                onChange={e=>setDateLimite({dateLimite : e.target.value}) }
                className='appearance-none cursor-pointer block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                type="date"
                />
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
        
                <div className="w-full md:w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-montant">
                    Titre
                    </label>
                    <input value={titre.titre} onChange={e=> setTitre({titre : e.target.value})} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-montant" type="text" placeholder="Atteindre l'indépendance financière" required/>
                </div>
            </div>
            <div className="flex items-center gap-1 mb-6">
        
                <div className="w-full md:w-1/2 px-1">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-montant">
                    Montant cible
                </label>
                <input value={montantCible.montantCible} onChange={e=> setMontantCible({montantCible : e.target.value})} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-montant" type="number" placeholder="1000 $" required/>
                </div>
                <div className="w-full md:w-1/2 px-1">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-period">
                Montant Actuel
                </label>
                <input value={montantActuel.montantActuel} onChange={e=> setMontantActuel({montantActuel : e.target.value})} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-montant" type="number" placeholder="300 $" required/>
                </div>


            </div>

            <div className="flex w-full items-center  gap-2 ">
                <div className="w-full  mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-start">
                Date limite
                </label>
                <input
                value={formatDate(dateLimite.dateLimite)}
                onChange={e=>setDateLimite({dateLimite : e.target.value}) }
                className='appearance-none cursor-pointer block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                type="date"
                />
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

export default Goals