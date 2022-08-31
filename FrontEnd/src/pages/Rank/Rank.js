import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';

const Rank = () => {
  // Read student rank from redux state store:
  const studentRank = useSelector(state => state.studentRank);

  // For routing:
  const navigate = useNavigate();
  return (
    <div>
      {
        // Header:
      }
      <Header />

      <div className="grid grid-cols-16">
        <div className=" col-start-1 col-span-full">
          {
            // sentence 1:
          }
          <p className="paragraph shadow shadow-nagwa-green-hover">
            Activity completed🥳
          </p>

          {
            // sentence 2:
          }
          <p className="paragraph shadow-inner shadow-orange-500">
            Your rank across your peers is:{' '}
            <span className="text-orange-400">{studentRank.rank}%</span>
          </p>

          {
            // Try again button:
          }
          <Button
            className=" mt-5 submit-tryAgainButton mx-auto ${
            !selectedAnswer"
            onClick={() => navigate('/practice')}
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Rank;
