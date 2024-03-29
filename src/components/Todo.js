import { Button, Card, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Done } from "@mui/icons-material";
import { Cancel } from "@mui/icons-material";
import React, { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";




const Todo = ({ todo, handleMark, handleDelete, index }) => {
  const userId = useGetUserId();

    const [cookies, setCookies] = useCookies(["access_token"]);
    const [tasks, setTasks] = useState({
        task: '',
        completed: '',
        userOwner: userId,
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const {     name,   value   } = event.target;
        setTasks({
            ...tasks, [name]:value
        });
    };

    console.log(tasks);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3001/tasks/add',
            {
                ...tasks
            },
            {
                headers: {  authorization: cookies.access_token},
            });
            alert('Task hinzugefügt!');
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

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
