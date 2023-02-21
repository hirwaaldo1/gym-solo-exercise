import React, { useEffect, useState } from "react";
const Question = (props) => {
  const allAnswer = [
    ...props.value.incorrect_answers,
    props.value.correct_answer,
  ];
  const [selected, setSelected] = React.useState(null);

  function styleQuestion() {
    if (props.checkAns) {
      if (selected === props.value.correct_answer) {
        return "bg-green-900  text-white border-none";
      } else {
        return "bg-red-900  text-white border-none opacity-50";
      }
    } else {
      return "bg-violet-200 text-slate-700 border-none";
    }
  }
  return (
    <div className=" border-b py-2">
      <h2
        className="text-xl font-semibold text-slate-700"
        dangerouslySetInnerHTML={{ __html: props.value.question }}
      ></h2>
      <div className="flex gap-2 lg:flex-nowrap flex-wrap my-3">
        {allAnswer.sort().map((value, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                !props.checkAns && setSelected(value);
                props.setAllClientAnswer((prev) => {
                  prev[props.id] = {
                    ...prev[props.id],
                    isCollect:
                      value === props.value.correct_answer ? true : false,
                  };
                  return prev;
                });
              }}
              className={`rounded-xl border-2 py-1 px-5 cursor-pointer ${
                value === selected && styleQuestion()
              }
              ${
                props.checkAns && props.value.correct_answer === value
                  ? "bg-green-900 text-white border-none"
                  : "border-slate-700"
              }
              `}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default function Questions() {
  const [data, setData] = useState([]);
  const [countCorrect, setCountCorrect] = useState(0);
  const [checkAns, setCheckAns] = useState(false);
  const [allClientAnswer, setAllClientAnswer] = useState(data);
  function feactQuestion() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        console.log("data", data);
        setAllClientAnswer(
          data.results.map((obj) => ({ ...obj, isCollect: false }))
        );
      });
  }
  function playAgain() {
    setData([]);
    setCountCorrect(0); // reset count correct
    setCheckAns(false); // reset check answer
    feactQuestion(); // fetch new question
  }
  useEffect(() => {
    feactQuestion();
  }, []);

  return (
    <div className="flex justify-center items-center lg:h-screen relative overflow-x-hidden bg-slate-50">
      <img
        src="/assets/blob 5.png"
        alt="blob 5"
        width={297}
        height={235}
        className="absolute hidden lg:block -right-20 top-0"
      />
      <img
        src="/assets/blob 5 (1).png"
        alt="blob 6"
        width={297}
        height={235}
        className="absolute -left-20 bottom-0 hidden lg:block"
      />
      <div className="w-[70%] flex flex-col gap-3 ">
        {data.map((value, index) => {
          return (
            <Question
              value={value}
              key={index}
              setCountCorrect={setCountCorrect}
              countCorrect={countCorrect}
              checkAns={checkAns}
              id={index}
              allClientAnswer={allClientAnswer}
              setAllClientAnswer={setAllClientAnswer}
            />
          );
        })}
        {checkAns ? (
          <div className="flex gap-4 items-center w-fit m-auto">
            <div className="text-lg">
              You scored{" "}
              {allClientAnswer.filter((value) => value.isCollect).length}/5
              correct answers
            </div>
            <button
              onClick={() => {
                playAgain();
              }}
              className="bg-primary text-white px-8 pt-4 pb-5 text-2xl rounded-2xl mt-4 w-fit m-auto"
            >
              Play again
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setCheckAns(true);
            }}
            className="bg-primary text-xl w-full lg:w-1/5 text-white px-8 pt-4 pb-5 rounded-2xl "
          >
            {data.length === 0 ? "please wait" : "Check answers"}
          </button>
        )}
      </div>
    </div>
  );
}
