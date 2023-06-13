import React, { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Tasks = () => {
    const userId = useGetUserId();

    const [cookies, setCookies] = useCookies(["access_token"]);
    const [tasks, setTasks] = useState({
        task: '',
        completed: '',
        userOwner: userId,
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        const completedValue = value === 'true'; // Wandelt den Wert in einen booleschen Wert um
        setTasks({
          ...tasks,
          [name]: name === 'completed' ? completedValue : value,
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

    const handleDelete = async (event) => {
        
    }

    const markDone = async (event) => {
        
    }



    return( 
        <div className="add-task">
            <div className="task-title">
                <h1>Task hinzufügen</h1>
            </div>
            
            <div className="task-body">
                <div className="task-body-row">
                    <div className="task-body-button-done">
                        <button onClick={markDone}>Erledigt</button>
                    </div>
                    <div className="task-body-content">
                
                    </div>
                    <div className="task-body-button-delete">
                        <button onClick={handleDelete}>Löschen</button>
                    </div>
                </div>
            </div>
            <div className="task-submit">
            <form onSubmit={handleSubmit}>
                <label htmlFor="task">
                    Task
                </label>
                <input type='text' id='task' name='task' value={tasks.task} onChange={handleChange}/>  

                <button onSubmit={handleSubmit}>Hinzufügen</button>
            </form>
            </div>
        </div>
    )
}

export default Tasks