import React, { useEffect, useState } from "react";
const Question = (props) => {
  const allAnswer = [
    ...props.value.incorrect_answers,
    props.value.correct_answer,
  ];
  const [selected, setSelected] = React.useState(null);
  let styleQue = props.checkAns
    ? selected === props.value.correct_answer
      ? "bg-green-900  text-white border-none"
      : "bg-red-900  text-white border-none"
    : "bg-[#D6DBF5] text-[#293264] border-none";
  return (
    <div className=" border-b py-2">
      <h2
        className="text-xl font-semibold text-[#293264]"
        dangerouslySetInnerHTML={{ __html: props.value.question }}
      ></h2>
      <div className="flex gap-2 my-3">
        {allAnswer.sort().map((v, k) => {
          return (
            <div
              key={k}
              onClick={() => {
                !props.checkAns && setSelected(v);
                props.setAllClientAnswer((prev) => {
                  prev[props.id] = {
                    ...prev[props.id],
                    isCollect: v === props.value.correct_answer ? true : false,
                  };
                  return prev;
                });
              }}
              className={`rounded-xl border-2 py-1 px-5 cursor-pointer ${
                v === selected && styleQue
              }
              ${
                props.checkAns && props.value.correct_answer === v
                  ? "bg-green-900 text-white border-none"
                  : "border-[#293264]"
              }
              `}
            >
              {v}
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
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        console.log(data.results);
        setAllClientAnswer(
          data.results.map((obj) => ({ ...obj, isCollect: false }))
        );
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen relative overflow-x-hidden bg-[#F5F7FB]">
      <img
        src="/assets/blob 5.png"
        alt=""
        width={297}
        height={235}
        className="absolute -right-20 top-0"
      />
      <img
        src="/assets/blob 5 (1).png"
        alt=""
        width={297}
        height={235}
        className="absolute -left-20 bottom-0"
      />
      <div className="w-[70%] flex flex-col gap-3 ">
        {data.length === 0 && <p className="text-center text-xl">Wait...</p>}
        {data.map((v, k) => {
          return (
            <Question
              value={v}
              key={k}
              setCountCorrect={setCountCorrect}
              countCorrect={countCorrect}
              checkAns={checkAns}
              id={k}
              allClientAnswer={allClientAnswer}
              setAllClientAnswer={setAllClientAnswer}
            />
          );
        })}
        {checkAns ? (
          <div className="flex gap-4 items-center w-fit m-auto">
            <div className="text-lg">
              You scored {allClientAnswer.filter((v) => v.isCollect).length}/5
              correct answers
            </div>
            <button
              onClick={() => {
                window.location.reload();
              }}
              className="bg-blue-500 text-white px-8 pt-4 pb-5 text-2xl rounded-2xl mt-4 w-fit m-auto"
            >
              Play again
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setCheckAns(true);
            }}
            className="bg-blue-500 text-white px-8 pt-4 pb-5 text-2xl rounded-2xl mt-4 w-fit m-auto"
          >
            {data.length === 0 ? "please wait" : "Check answers"}
          </button>
        )}
      </div>
    </div>
  );
}
