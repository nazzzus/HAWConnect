import React from "react";
import { Button, Card, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Done } from "@mui/icons-material";
import { Cancel } from "@mui/icons-material";



const Todo = ({ todo, handleMark, handleDelete, index }) => {
  return (
    <div className="todoBar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid white",
        borderRadius: "5px",
      }}
    >
      
      <button  onClick={() => handleMark(index)} style={{ color: "#50fa7b" }}>
        {todo.isDone ? <Cancel></Cancel> : <Done></Done>}
      </button>

      <div className="todoContent" style={ todo.isDone ? { textDecoration: "line-through", color: "gray", } : {} }>
        {todo.content}
      </div>

      <button
        onClick={() => handleDelete(index)}
        style={{ color: "#ff5555" }}
      >
        <Delete></Delete>
      </button>
    </div>
  );
};

export default Todo;
