import { checkIfTokenExpired } from '@/Tools/CheckIfTokenExpired'
import { token } from '@/pages/auth/Token'
import UsersInfo from '@/pages/auth/UserInfo'
import { StatisticsCard } from '@/widgets/cards'
import { Typography } from '@material-tailwind/react'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'

const CardsHeader = () => {
const [CardsData , setCardsData] = useState([])
const fetchDataTotaleBudgets = useCallback( async()=>{

checkIfTokenExpired()


try {
  const {data} = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/totale/transaction` , {
    userId : UsersInfo.id
  },{
    headers : {
      Authorization : token
    }
  })
  setCardsData(data)
} catch (error) {
  console.error(error)
}
},[])


useEffect(()=>{
  fetchDataTotaleBudgets()
},[fetchDataTotaleBudgets])




  return CardsData.length > 0 && CardsData.map(({ icon, title, footer, ...rest }) => (
    <StatisticsCard
      key={title}
      {...rest}
      title={title}
      icon={React.createElement(icon, {
        className: "w-6 h-6 text-white",
      })}
      footer={
        <Typography className="font-normal text-blue-gray-600">
          <strong className={footer.color}>{footer.value}</strong>
          &nbsp;{footer.label}
        </Typography>
      }
    />
  ))
}

export default CardsHeader