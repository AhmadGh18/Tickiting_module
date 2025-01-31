import React from 'react'
import Body from './Components/Body'
import Tickitingform from './Components/Tickitingform'

const page = () => {
  return (
    <div className='h-auto'>
        <Tickitingform></Tickitingform>
    <div className='h-auto'>
      
        <Body/>
    
    </div>
    </div>
  )
}

export default page