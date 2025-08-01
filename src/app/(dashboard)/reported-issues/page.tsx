import React, { Suspense } from "react";
import ReportedIssues from "./reports";

type Props = {};

function page({}: Props) {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <ReportedIssues />
    </Suspense>
  );
}

export default page;
