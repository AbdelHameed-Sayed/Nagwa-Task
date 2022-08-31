import React, { Fragment } from 'react';
import intro from './../../assets/intro-illustration.svg';
import './../Tooltip.module.css';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';

const Home = () => {
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
      <div className="flex flex-col lg:flex-row items-center justify-center my-5">
        <img
          src={intro}
          alt="intro illustration"
          className="h-fit w-fit mr-5"
        />
        <p className="text-lg break-words text-center mt-3 lg:mt-14 lg:ml-2">
          Test your
          <a
            href="https://en.wikipedia.org/wiki/Part_of_speech"
            target="_blank"
            rel="noreferrer"
            className="mx-1 font-bold text-[#ffc340] border-0 hover:border-b-2 hover:mt-0.5"
          >
            "Part of Speech"
          </a>
          knowledge
        </p>
      </div>

      {
        // Start test button:
      }
      <Button
        className="startTest-backHomeButton"
        onClick={() => navigate('practice')}
      >
        Start your test
      </Button>
    </Fragment>
  );
};

export default Home;
