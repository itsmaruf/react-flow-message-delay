import React, { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import { AiOutlineMore, AiOutlineClose } from "react-icons/ai";
import { BsClock } from "react-icons/bs";

import "../Nodes.css";
import Textarea from "../../Components/Textarea/Textarea";
const DelayNode = ({ data }) => {
  const [btnVisibility, setBtnVisibility] = useState(false);

  const leftTop = {
    top: 40,
  };

  const visibilityHandler = () => {
    setBtnVisibility(!btnVisibility);
    // console.log(btnVisibility);
  };

  const deleteNode = (id) => {
    data.deleteNode(id);
  };

  const onChange = useCallback((evt) => {
    const value = evt.target.value;
    localStorage.setItem(evt.target.name, JSON.stringify(value));
    console.log(evt.target.value);
  }, []);

  return (
    <div className="greeting-node relative shadow">
      <div>
        <Handle type="target" position={Position.Left} style={leftTop}></Handle>

        <div className="node-header flex justify-between items-center">
          <div className="flex justify-start items-center">
            <div className="text-primary border rounded p-1 mr-4 h-auto">
              <BsClock />
            </div>
            <p className="text-lg font-bold">Delay Amount</p>
          </div>
          <button
            onClick={visibilityHandler}
            className="btn bg-transparent border-0 text-black text-lg p-0 hover:bg-transparent"
          >
            {!btnVisibility ? <AiOutlineMore /> : <AiOutlineClose />}
          </button>
        </div>
        <div className="node-body">
          <div className="node-module">
            <Textarea
              onChange={onChange}
              rows={3}
              name="delay"
              placeHolder={"write something"}
              value={
                "Please enter the amount of the delay ( in seconds, please! )"
              }
            ></Textarea>
          </div>
          <div className="text-right pb-5">
            <button className="btn btn-primary btn-sm">Save</button>
          </div>
        </div>
      </div>

      {btnVisibility && (
        <div className="node-menu absolute top-14 right-5">
          <button
            onClick={() => {
              deleteNode(data.id);
            }}
            className="btn btn-sm text-black hover:text-white text-xsm bg-white inline-block w-auto"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DelayNode;
