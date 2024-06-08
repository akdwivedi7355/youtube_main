import React from 'react'
import { Helmet } from 'react-helmet-async'

const HelmetConsumer = ({pageTitle}) => {
  return (
    <>
    <Helmet>
        <title>{pageTitle}</title>
    </Helmet>
    </>
  )
}

export default HelmetConsumer