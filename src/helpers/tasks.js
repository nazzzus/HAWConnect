import React, { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const tasks = () => {
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

    return( 
        <div className="add-task">
            <h1>Task hinzufügen</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="task">
                    Task
                </label>
                <input type='text' id='task' name='task' value={tasks.task} onChange={handleChange}/>  
            </form>
        </div>
    )
}