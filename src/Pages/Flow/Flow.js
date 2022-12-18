import React, { useCallback, useRef, useState } from "react";
import "./Flow.css";

// import nodes
import MessageNode from "../../Nodes/MessageNode/MessageNode";
import DelayNode from "../../Nodes/DelayNode/DelayNode";

import {
  addEdge,
  Background,
  ReactFlow,
  ReactFlowProvider,
  updateEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

// init node types
const nodeTypes = {
  message: MessageNode,
  delay: DelayNode,
};

// react flow import

// initialize nodes
const initialNodes = [];

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const edgeUpdateSuccessful = useRef(true);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // initiate drags
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnectStart = (_, { nodeId, handleType }) => {
    console.log("on connect start", { nodeId, handleType });

    if (nodeId === "start") {
      localStorage.clear();
    }
  };

  const onConnectEnd = (event, nodeId) => console.log("connected with", nodeId);

  //   create a function to connect the nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  let id = 0;

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      let getId;
      if (type === "greeting") {
        getId = () => `greeting`;
      } else if (type === "start") {
        getId = () => `start`;
      } else if (type === "catalog") {
        getId = () => `catalog`;
      } else if (type === "packageTracker") {
        getId = () => `package`;
      } else if (type === "contact") {
        getId = () => `contact`;
      } else {
        getId = () => `node_${id++}`;
      }
      const isValidConnection = (connection) => {
        // eslint-disable-next-line no-unused-expressions
        connection.target === getId();
      };

      const deleteNode = (id) => {
        if (type === "packageTracker") {
          setNodes((nds) => nds.filter((n) => n.id !== "package"));
        } else {
          setNodes((nds) => nds.filter((n) => n.id !== `${type}`));
          // console.log(id);
        }
      };

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node`, id: id, deleteNode, isValidConnection },
        deleteNode,
      };

      setNodes((nds) => nds.concat(newNode));
      // console.log(nodes);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reactFlowInstance]
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      edgeUpdateSuccessful.current = true;
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );

  const onEdgeUpdateEnd = useCallback(
    (_, edge) => {
      if (!edgeUpdateSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }

      edgeUpdateSuccessful.current = true;
    },
    [setEdges]
  );

  const edgeOptions = {
    animated: true,
    style: {
      stroke: "#1592E0",
      strokeWidth: 2,
    },
  };

  return (
    <div>
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              // snapToGrid
              onEdgeUpdate={onEdgeUpdate}
              onEdgeUpdateStart={onEdgeUpdateStart}
              onEdgeUpdateEnd={onEdgeUpdateEnd}
              onConnectStart={onConnectStart}
              onConnectEnd={onConnectEnd}
              defaultEdgeOptions={edgeOptions}
              selectNodesOnDrag={false}
              // deleteNode
            >
              <Background></Background>
              {/* <Controls></Controls> */}
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default Flow;
