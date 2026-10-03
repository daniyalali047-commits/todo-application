import { useCallback, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../style/addtask.css'
import { authenticatedFetch } from '../utils/api'

export default function UpdateTask() {
    const [taskData, setTaskData] = useState({ title: '', description: '' })
    const [priority, setPriority] = useState('medium')
    const navigate = useNavigate()
    const { id } = useParams()

    const gettask = useCallback(async (taskId) => {
        try {
            let res = await authenticatedFetch('/tasks/' + taskId)
            let data = await res.json()
            if (data.result) {
                setTaskData(data.result)
                if (data.result.priority) {
                    setPriority(data.result.priority)
                }
            }
        } catch (error) {
            console.error('Error fetching task:', error)
        }
    }, [])

    useEffect(() => {
        gettask(id)
    }, [gettask, id])

    const updatetask = async (e) => {
        e.preventDefault() // Prevents page reload on submit
        
        const payload = {
            ...taskData,
            priority
        }

        console.log("Updating task payload:", payload)
        let task  = await authenticatedFetch('/update-task' , {
            method:"PUT",
            body:JSON.stringify(payload),
            headers:{
                'Content-Type':'Application/JSON'
            }
        });
        task =await task.json()

        if(task){
navigate('/')
        }
    }

    return (
        <div className="addtask-wrapper">
            <h1>Update Your Task Now!!</h1>
            <form onSubmit={updatetask}>
                <div className="input-group">
                    <input 
                        value={taskData?.title || ''} 
                        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} 
                        type="text" 
                        name="title" 
                        placeholder=" " 
                        required 
                        maxLength={140} 
                    />
                    <label>Task Title</label>
                </div>

                <div className="input-group">
                    <textarea 
                        value={taskData?.description || ''} 
                        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} 
                        name="description" 
                        placeholder=" " 
                        rows={4} 
                        maxLength={1500}
                    ></textarea>
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

                <button type="submit" className="submit-btn">Update task</button>
            </form>
        </div>
    )
}