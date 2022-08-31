import React, { Fragment } from 'react';
import correct from './../../assets/correct.svg';
import wrong from './../../assets/wrong.svg';

const Alert = ({ correctAnswer }) => {
  return (
    <Fragment>
      <div className="relative top-[-30%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 w-1/2 overflow-y-hidden shadow-lg bg-white rounded-lg">
        {
          // Wrong or correct answer SVG:
        }
        <img
          src={correctAnswer ? correct : wrong}
          alt={`${correctAnswer ? 'Correct' : 'Wrong'} answer`}
          className="pt-7 mx-auto"
        />

        {
          // Wrong or correct answer sentence:
        }
        <p
          className={`p-4 text-center text-2xl mb-3 ${
            correctAnswer ? 'text-nagwa-green' : 'text-rose-700'
          }`}
        >
          {correctAnswer ? 'Correct' : 'Wrong'} answer
        </p>

        {
          // Bottom colored line:
        }
        <div
          className={`w-full h-3 rounded-b ${
            correctAnswer ? 'bg-nagwa-green' : 'bg-rose-700'
          }`}
        ></div>
      </div>

      {
        // Backdrop:
      }
      <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
    </Fragment>
  );
};

export default Alert;
