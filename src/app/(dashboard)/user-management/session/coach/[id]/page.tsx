
import { Suspense } from "react"
import Session from "./session"


function page() {
  return (
    <Suspense fallback={"...loading"} ><Session/></Suspense>
  )
}

export default page