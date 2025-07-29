import React, { Suspense } from 'react'
import CoachDetails from './CoachDetail'


type Props = {}

function page({}: Props) {
  return (
      <Suspense fallback={<div>Loading ...</div>}>
      <CoachDetails />
    </Suspense>
  )
}

export default page