import React from 'react';

function BranchHeader({ branchName }) {
  return (
    <h1 className="text-3xl font-bold text-left mb-8 px-4">
      {branchName}
    </h1>
  );
}

export default BranchHeader;