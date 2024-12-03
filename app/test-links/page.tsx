"use client";

import { useState } from "react";
import Spinner from "../components/Spinner";

const TestLinkPage = () => {
  const [data, setData] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://flaxx-card.vercel.app/api/metaData?url=${input}`
    ).then((response) => response);

    const jData = await response.json();
    setData(JSON.stringify(jData));
    setIsLoading(false);
  };

  return (
    <div className="w-full h-screen overflow-y-scroll flex justify-center items-center">
      {/* <LinkWidget
        widgetStyle="Pill"
        url="https://www.youtube.com/results?search_query=how+to+connect+mysql+database+in+python"
      /> */}
      <form
        className="space-y-10 w-[50%]"
        onSubmit={(event) => {
          event.preventDefault();
          fetchData();
        }}
      >
        <div className="form-control w-full">
          <label className="label-text p-1">Enter url here</label>
          <input
            className="input input-bordered w-full"
            onChange={(event) => setInput(event.currentTarget.value)}
          />
        </div>
        <button className="btn btn-primary">
          {isLoading ? <Spinner /> : "Get Data"}
        </button>
        <p className="text-lg">{data}</p>
      </form>
    </div>
  );
};

export default TestLinkPage;
