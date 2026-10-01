import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // added: this was missing, causing "useNavigate is not defined"
import '../style/addtask.css'

export default function Addtask() {
    const [taskData, setTaskData] = useState()
    const navigate = useNavigate() // now properly imported and usable

    const handleaddtask = async (event) => {
        event.preventDefault()
        console.log(taskData, priority);

        let result = await fetch('/add-task', {
            method: "POST",
            body: JSON.stringify({ ...taskData, priority }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json()
        if (result) {
            navigate("/") // redirects to the list page after task is added
            console.log("New task added");
        }
    }

    const [priority, setPriority] = useState('medium')

    return (
        <div className="addtask-wrapper">
            <h1>Add Your Task Now!!</h1>
            <form>
                <div className="input-group">
                    <input onChange={(event) => setTaskData({ ...taskData, title: event.target.value })} type="text" name="title" placeholder=" " required maxLength={40} />
                    <label>Task Title</label>
                </div>

                <div className="input-group">
                    <textarea onChange={(event) => setTaskData({ ...taskData, description: event.target.value })} name="description" placeholder=" " rows={4} maxLength={150}></textarea>
                    <label>Description</label>
                </div>

                <div className="priority-group">
                    <label className="priority-label">Priority of the task</label>
                    <div className="priority-options">
                        <button
                            type="button"
                            className={`priority-btn low ${priority === 'low' ? 'active' : ''}`}
                            onClick={() => setPriority('low')}
                        >
                            Low
                        </button>
                        <button
                            type="button"
                            className={`priority-btn medium ${priority === 'medium' ? 'active' : ''}`}
                            onClick={() => setPriority('medium')}
                        >
                            Medium
                        </button>
                        <button
                            type="button"
                            className={`priority-btn high ${priority === 'high' ? 'active' : ''}`}
                            onClick={() => setPriority('high')}
                        >
                            High
                        </button>
                    </div>
                </div>

                <button onClick={handleaddtask} type="submit" className="submit-btn">Add Task</button>
            </form>
        </div>
    )
}