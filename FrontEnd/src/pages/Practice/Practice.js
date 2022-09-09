import React, { Fragment, useEffect, useState } from 'react';
import Header from './../../components/Header/Header';
import axiosInstance from '../../network/axiosInstance';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Button from '../../components/Button/Button';
import Alert from '../../components/Alert/Alert';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { studentRankHandler } from '../../store/rankSlice';

const Practice = () => {
  // store data from data base in a state:
  const [words, setWords] = useState([]);

  // Question that shown to the student:
  const [question, setQuestion] = useState('');

  // The answers of the student to specific question:
  let [selectedAnswer, setSelectedAnswer] = useState('');

  // All answers of the student to all questions:
  let [allAnswers, setAllAnswers] = useState({});

  // To indicate the answer was correct or no, for alert and styling purposes:
  const [IscorrectAnswers, setIsCorrectAnswers] = useState();

  // To indicate the index of the question:
  let [index, setIndex] = useState(0);

  // To show and hide Alert component on submitting answer:
  const [showAlertModal, setShowAlertModal] = useState();

  // For routing:
  const navigate = useNavigate();

  // For storing student rank into redux:
  const dispatch = useDispatch();

  // let studentAnswers;

  // fetching questions from data base through API:
  useEffect(() => {
    axiosInstance
      .get('/words')
      .then(response => {
        // To store Questions array in a state in the first render:
        setWords(response.data);

        // To show the Q1 in the first render:
        setQuestion(response.data[0]);
      })
      .catch(error => {
        // console.log(error);
      });
  }, []);

  // Check student answer is correct or not:
  useEffect(() => {
    axiosInstance
      .post('/words', {
        studentAnswers: allAnswers,
      })
      .then(response => {
        setIsCorrectAnswers(response.data);
      })
      .catch(error => {
        // console.log(error);
      });
  }, [allAnswers]);

  // To send finalScore to backend and get the student rank only if all questions were answered:
  useEffect(() => {
    Object.keys(allAnswers).length === 10 &&
      axiosInstance
        .post('/rank', {
          // finalScore = (number of correct answers / total number of questions)*100
          finalScore:
            (IscorrectAnswers.filter(answer => answer.isCorrect === true)
              .length /
              words.length) *
            100,
        })
        .then(response => {
          // Store student rank into redux store (state manager):
          dispatch(studentRankHandler(response?.data));

          // To navigate to Rank page after three seconds:
          setTimeout(() => {
            navigate('/rank');
          }, 3000);
        })
        .catch(error => {
          // console.log(error.response.data.message);
        });
  }, [IscorrectAnswers, allAnswers, dispatch, navigate, words.length]);

  // Put choices in array:
  const choices = ['A- adjective', 'B- adverb', 'C- noun', 'D- verb'];

  return (
    <Fragment>
      {
        // Header:
      }
      <Header />
      <div className="grid grid-cols-16">
        {
          // progress bar with a sentence, Questions, and (next and previous) buttons:
        }
        <div className="col-start-1 col-span-full sm:col-end-11">
          {
            // sentence:
          }
          <p className="font-bold mt-16">"Part of Speech" activity:</p>

          {
            // progress bar:
          }
          <ProgressBar
            progress={(Object.keys(allAnswers).length / words.length) * 100}
          />

          {
            // Questions:
          }
          <div className="mt-5 border-2 p-2">
            <p className="text-pink-600 font-medium text-center shadow-inner shadow-gray-500 p-3 mb-7">
              What do you think the type of the following word?
            </p>

            <p className="text-center mx-auto mt-3 mb-5 border-[1px] max-w-[8rem] font-bold text-lg bg-orange-200 rounded-md drop-shadow-sm p-2">
              {question?.word}
            </p>

            {
              // choices:
            }
            <div className="text-center mb-10">
              {choices.map((choice, idx) => (
                <Button
                  key={choice}
                  className={`mx-3 w-fit ${
                    idx === 0
                      ? 'px-1.5'
                      : idx === 1
                      ? 'px-3.5'
                      : idx === 2
                      ? 'px-5'
                      : 'px-6'
                  } py-2 font-medium rounded-md bg-white border-[1px]  m-1 hover:border-gray-500 ${
                    // To give the gray color to only the selected answer:
                    // In case currently answer a question:
                    (selectedAnswer === choice.slice(3) ||
                      // In case already answered a question:
                      choice.slice(3) ===
                        allAnswers[`Q${index + 1}`]?.selectedAnswer) &&
                    'bg-gray-300'
                  } disabled:cursor-not-allowed`}
                  // To disable choosing an answer after submitting the answer if the student get back to the answered question again:
                  disabled={allAnswers[`Q${index + 1}`]}
                  onClick={() => {
                    // To store the student answer in a state:
                    setSelectedAnswer(choice.slice(3));
                  }}
                >
                  {choice}
                </Button>
              ))}
            </div>

            {
              // Submit answer:
            }
            <Button
              className={`submit-tryAgainButton ml-auto disabled:bg-nagwa-green-disabled`}
              // To disable Submit answer button if no choosen answer by the student:
              disabled={!selectedAnswer}
              onClick={() => {
                // To remove selected answer from other questions:
                setSelectedAnswer('');

                // To add student answers into allAnswers state:
                setAllAnswers({
                  ...allAnswers,
                  [`Q${index + 1}`]: {
                    selectedAnswer,
                    id: words[index]?.id,
                  },
                });

                // To move to next question after submitting question's answer:
                index < 9 && setIndex(++index);
                setQuestion(words[index]);

                // To show alert modal after answer's submission:
                setShowAlertModal(!showAlertModal);

                // To hide alert modal after two seconds from submitting an answer:
                setTimeout(() => {
                  setShowAlertModal(false);
                }, 2000);
              }}
            >
              Submit answer
            </Button>
          </div>

          {
            // Next and Previous questions' buttons:
          }
          <div className="flex flex-col sm:flex-row justify-between mt-3">
            {
              // Previous button:
            }
            <Button
              className="nextBackButton px-4 mb-3 sm:mb-0"
              onClick={() => {
                // To go back to previous question:
                index > 0 && setIndex(--index);
                setQuestion(words[index]);
              }}
            >
              &#129190; Previous
            </Button>

            {
              // Next button:
            }
            <Button
              className="nextBackButton px-7"
              onClick={() => {
                // To move forward to next question:
                index < 9 && setIndex(++index);
                setQuestion(words[index]);
              }}
            >
              Next &#129191;
            </Button>
          </div>
        </div>

        {
          // left side Questions' buttons:
        }
        <div className="row-start-2 col-start-1 col-span-full mt-7 sm:row-start-1 sm:col-start-12 text-center sm:mt-36 ">
          {words?.map((word, idx) => (
            <Button
              key={idx}
              onClick={() => {
                // To remove selected answer from all questions if no answer submition and student navigate questions:
                setSelectedAnswer('');

                // To go to the selected question:
                setQuestion(words[idx]);
                setIndex(idx);
              }}
              className={`w-fit ${idx === 9 ? 'py-4 px-3' : 'p-4'} rounded-md ${
                // To give the blue color to the selected not answered question:
                question === word && !allAnswers[`Q${idx + 1}`]
                  ? 'bg-nagwa-blue text-white'
                  : // To give the green color to the selected and correctly answered question:
                  IscorrectAnswers && IscorrectAnswers[idx]?.isCorrect
                  ? 'bg-nagwa-green text-white'
                  : // To give the red color to the selected and wrong answered question:
                  allAnswers[`Q${idx + 1}`] && !IscorrectAnswers[idx]?.isCorrect
                  ? 'bg-pink-600 text-white'
                  : // To give the gray color to the not selected not answered questions:
                    'bg-gray-300 border-[0.25px] hover:border-nagwa-blue '
              } m-1`}
            >
              Q {idx + 1}
            </Button>
          ))}
        </div>
      </div>

      {
        // Alert modal:
      }
      {showAlertModal && (
        <Alert
          correctAnswer={
            IscorrectAnswers[IscorrectAnswers.length - 1]?.isCorrect
          }
        />
      )}
    </Fragment>
  );
};

export default Practice;
