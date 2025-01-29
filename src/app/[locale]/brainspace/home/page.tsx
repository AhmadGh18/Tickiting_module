"use client";
import React from 'react'
import Quotes from '../components/Quotes'
import Modules from '../components/Modules'
import withAuth from '../auth-provider/withAuth'

const home = () => {
  return (
    <div className='overflow-hidden'>
      <Quotes />
      <Modules />
    </div>
  )
}

export default withAuth(home)
