import React from "react";
import "./Sidebar.css";

import { BiMessageRoundedDots } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { GrDrag } from "react-icons/gr";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div className="floating-sidebar">
      <h2 className="text-lg font-bold">Nodes</h2>

      <div className="items mt-3">
        <div
          className="dndnode p-2 font-bold rounded-md border-gray flex items-center justify-between my-2"
          onDragStart={(event) => onDragStart(event, "message")}
          draggable
        >
          <div className="flex justify-start items-center">
            <BiMessageRoundedDots className="mr-2" /> Message Node
          </div>
          <GrDrag />
        </div>
        <div
          className="dndnode p-2 font-bold rounded-md border-gray flex items-center my-2 justify-between"
          onDragStart={(event) => onDragStart(event, "delay")}
          draggable
        >
          <div className="flex justify-start items-center">
            <BsClock className="mr-2" /> Delay Node
          </div>
          <GrDrag />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
