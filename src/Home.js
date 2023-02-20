import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <img
        src="/assets/blob 5.png"
        alt="blob 5"
        width={297}
        height={235}
        className="absolute right-0 top-0"
      />
      <img
        src="/assets/blob 5 (1).png"
        alt="blob 6"
        width={297}
        height={235}
        className="absolute left-0 bottom-0"
      />
      <div className="w-1/2 md:w-5/12 text-center">
        <h1 className="text-4xl font-semibold text-slate-700 mb-3">
          Quizzical
        </h1>
        <p className="text-xl text-slate-700">Some description if needed</p>
        <Link to={"/questions"}>
          <button className="bg-primary text-xl w-2/5 text-white px-8 pt-4 pb-5 rounded-2xl mt-4">
            Start quiz
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
