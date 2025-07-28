import React, { Suspense } from "react";

import Details from "./AllDetails";

const page = () => {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <Details />
    </Suspense>
  );
};

export default page;
