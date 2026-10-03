import { Link } from 'react-router-dom'
import { useCallback, useEffect, useState } from "react"
import '../style/list.css'
import { authenticatedFetch } from '../utils/api'

export default function List() {
    const [taskData, setTaskData] = useState()

    const getListData = useCallback(async () => {
        let datalist = await authenticatedFetch('/tasks')
        datalist = await datalist.json()

        if (datalist.success) {
            setTaskData(datalist.result)
        }
        console.log(datalist);
    }, [])

    useEffect(() => {
        getListData()
    }, [getListData])

    // sends a DELETE request for the given task id, then refreshes the list
    const handleDelete = async (id) => {
        let result = await authenticatedFetch(`/delete-task/${id}`, {
            method: "DELETE"
        })
        result = await result.json()

        if (result.success) {
            console.log("Task deleted")
            getListData() // re-fetch the list so the deleted task disappears from the UI
        }
    }

    return (
        // page-transition plays the fade-in animation whenever this page opens
        <div className="page-transition">
            <h1 className="task-list">CURRENT TASKS</h1>
            <table className="tasktable">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th> Delete/Update </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        taskData && taskData.map((item, index) => {
                            return (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.priority}</td>
                                    <td>
                                        {/* calls handleDelete with this task's unique _id */}
                                        <button className="delete-item" onClick={() => handleDelete(item._id)}>
                                            Delete
                                        </button>

                                        {/* fixed: template literal (backticks + ${}) so the real id is inserted,
                                            leading "/" makes it an absolute path, and added the missing space before className */}
                                        <Link to={`/update/${item._id}`} className="update-link">
                                            Update
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}