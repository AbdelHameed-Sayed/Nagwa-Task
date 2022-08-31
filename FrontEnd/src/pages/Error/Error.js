import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';

const Error = () => {
  // For routing:
  let navigate = useNavigate();

  return (
    <Fragment>
      {
        // Header:
      }
      <Header />

      {
        // intro:
      }
      <div className="flex flex-col lg:flex-row items-center justify-center mt-32">
        {
          // 404 page not found:
        }
        <h1 className="sm:text-9xl text-7xl w-fit max-w-sm font-extrabold text-pink-600 tracking-widest">
          404
        </h1>

        <span className="bg-orange-500 text-white px-2 text-xs sm:text-sm rounded rotate-12 absolute ">
          Page Not Found
        </span>
      </div>

      {
        // Start test button:
      }
      <Button
        className="startTest-backHomeButton"
        // To go to home page:
        onClick={() => navigate('/')}
      >
        Back to Home
      </Button>
    </Fragment>
  );
};

export default Error;
