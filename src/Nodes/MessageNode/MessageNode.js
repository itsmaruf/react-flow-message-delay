import React, { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import { AiFillMessage, AiOutlineMore, AiOutlineClose } from "react-icons/ai";

import "../Nodes.css";
import TextArea from "../../Components/Textarea/Textarea";

const MessageNode = ({ data }) => {
  const [btnVisibility, setBtnVisibility] = useState(false);

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
        <div className="node-header flex justify-between items-center">
          <div className="flex justify-start items-center">
            <div className="text-primary border rounded p-1 mr-4 h-auto">
              <AiFillMessage />
            </div>
            <p className="text-lg font-bold">Send Message</p>
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
            <TextArea
              onChange={onChange}
              rows={3}
              name="message"
              placeHolder={"write something"}
              value={
                "Hey there! You want to say something? feel free to write here..."
              }
            ></TextArea>
          </div>

          <div className="text-right pb-5">
            <button className="btn btn-primary btn-sm">Send</button>
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
      <Handle
        type="source"
        position={Position.Right}
        style={{ top: 100 }}
      ></Handle>
      <Handle
        type="target"
        position={Position.Left}
        style={{ top: 100 }}
      ></Handle>
    </div>
  );
};

export default MessageNode;
