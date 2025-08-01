import React, { Suspense } from "react";
import Requests from "./requests";

type Props = {};

function page({}: Props) {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <Requests />
    </Suspense>
  );
}

export default page;
