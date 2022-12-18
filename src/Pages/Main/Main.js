import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Flow from "../Flow/Flow";
import { TiFlowChildren } from "react-icons/ti";

const Main = () => {
  const [flowVisibility, setFlowVisibility] = useState(false);

  const start = () => {
    setFlowVisibility(true);
  };
  return (
    <div>
      {flowVisibility ? (
        <>
          <Sidebar></Sidebar>
          <Flow></Flow>
        </>
      ) : (
        <>
          <div className="start min-h-screen w-full flex justify-center items-center">
            <button className="btn btn-primary" onClick={start}>
              Start Making Flow <TiFlowChildren className="ml-2 text-xl" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
