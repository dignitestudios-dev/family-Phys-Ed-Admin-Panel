import React, { Suspense } from 'react'
import Products from './products'

type Props = {}

function page({}: Props) {
  return (
    <Suspense fallback={"...loading"}>
        <Products/>
    </Suspense>
  )
}

export default page