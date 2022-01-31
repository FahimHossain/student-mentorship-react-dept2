import React from 'react'
import { useState, useEffect, useContext } from 'react'
import MyModal from '../../layouts/modal/MyModal'
import Input from '../../layouts/form/Input'
import Select from '../../layouts/form/Select'
import axios from 'axios'
import { DispatchContext } from '../../../utils/context/MainContext'
import ListAction from '../../../utils/context/actions/ListAction'
import { Form } from 'react-bootstrap'
import moment from 'moment'
import Define from '../../../utils/helpers/Define'

export default function AddTaskModal({ show, setShow }) {

    /**
     * {
"title": "demo",
"description":"demo desc",
"priority":"low",
"assigned_to":9,
"assigned_by":1,
"privacy":"private",
"progress_rate":50,
"deadline":"2021-05-22 23:07:15",
"created_at":"2021-05-22 23:07:15"
}
     */

    const { task_listDispatch } = useContext(DispatchContext);
    const [task, setTask] = useState({
        title: "",
        description: "",
        priority: "",
        assigned_to: 0,
        assigned_by: 0,
        privacy: "",
        progress_rate: 0,
        deadline: "2021-05-22 23:07:15",
    })
    const [faculty_list, setFaculty_list] = useState([
        { id: 1, name: "Sir1" }, { id: 2, name: "Sir2" }
    ])

    const priorityOptions = [{ id: 1, name: "low" }, { id: 2, name: "normal" }, { id: 3, name: "high" }]
    const privacyOptions = [{ id: 1, name: "public" }, { id: 2, name: "private" }]


    const [priority, setPriority] = useState(1)
    const [privacy, setPrivacy] = useState(1)

    const [assigned_to, setassigned_to] = useState(0)
    const [assigned_by, setassigned_by] = useState(0)

    const createTask = async () => {

        if (task.title === "") {
            alert("Enter Ttile")
            return
        }
        if (task.description === "") {
            alert("Enter Descripttion")
            return
        }

        if (task.deadline === "2021-05-22 23:07:15") {
            alert("Set Deadline")
            return
        }




        // console.log(priorityOptions.find(item => {
        //     console.log(item, priority);
        //     return true
        // }))
        // return

        //console.log(priority);

        const data = {
            ...task, assigned_to: parseInt(assigned_to),
            assigned_by: parseInt(assigned_by),
            priority: priorityOptions.find(item => item.id === parseInt(priority))?.name,
            privacy: privacyOptions.find(item => item.id === parseInt(privacy))?.name
        }

        //console.log(data);

        const action = new ListAction(task_listDispatch)
        const result = await action.addData('task/add', data)
        console.log(result)
        setShow(false)


    }

    useEffect(() => {
        const load = async () => {
            const res = await axios.get('faculty/get-all')

            const data = res.data.response//
            setFaculty_list(data)
            setassigned_by(data[0]?.id)
            setassigned_to(data[0]?.id)
        }
        load()


    }, [])


    const onChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    return (
        <>
            <MyModal
                title="Add new task" show={show} setShow={setShow} onSubmit={createTask}
            >

                <Input name="title" type="text" title="Title" value={task.title} onChange={onChange} />
                <Input name="description" type="text" title="Description" value={task.description} onChange={onChange} />


                <Select title="Priority" options={priorityOptions} value={priority} setValue={setPriority} />
                <Select title="Privacy" options={privacyOptions} value={privacy} setValue={setPrivacy} />
                <Select title="Assign to" options={faculty_list} value={assigned_to} setValue={setassigned_to} />
                <Select title="Assigned by" options={faculty_list} value={assigned_by} setValue={setassigned_by} />
                <Input name="progress_rate" type="number" title="Progress" value={task.progress_rate} onChange={onChange} />
                {/* <Input name="deadline" type="date" title="Deadline" value={task.deadline} onChange={onChange}
                    min={moment().format(Define.MYSQL_DATE)}
                /> */}

                <Form.Label>Deadline</Form.Label>
                <input
                    className="form-control"
                    type="date"
                    name="deadline"
                    min={moment(new Date()).format("YYYY-MM-DD")}
                    autoComplete="off"
                    value={task.deadline}
                    onChange={onChange}
                />

            </MyModal>
        </>
    )
}
