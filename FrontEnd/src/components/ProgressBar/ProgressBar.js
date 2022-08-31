import React, { Fragment } from 'react';

const ProgressBar = ({ progress = 0 }) => {
  return (
    <Fragment>
      <p className="text-sm font-medium text-blue-700 mb-1 text-end">
        {progress}%
      </p>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </Fragment>
  );
};

export default ProgressBar;
