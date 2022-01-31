
import ProtectedPage from './../../layouts/ProtectedPage';
import Main from './../../layouts/dashborad/Main';
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StateContext, DispatchContext } from '../../../utils/context/MainContext';
import React, { useContext, useEffect, useState } from 'react';
import ListAction from '../../../utils/context/actions/ListAction';
import AddTaskModal from './AddTaskModal';



import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import getPDFobj from './../../../utils/helpers/getPDFobj';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Task() {


  //global state
  const { task_list } = useContext(StateContext);
  const { task_listDispatch } = useContext(DispatchContext);

  const [show, setShow] = useState(false)


  useEffect(() => {

    const listAction = new ListAction(task_listDispatch);
    const token = listAction.getSource()
    try {

      const load = async () => {
        try {

          const res = await listAction.getAll(`task/get-all`)
          console.log("m-list: ", res)

        } catch (e) {
          console.log(e);
        }
      }
      load()
    } catch (e) {
      console.log(e)
    }

    //clean up
    return () => {
      token.cancel()
    }

  }, [task_list.length])

  return (
    <ProtectedPage>
      <Main title="Task Management">
        {/* <h1>coming soon</h1> */}
        <div>
          <AddTaskModal show={show} setShow={setShow} />

          <div id='button'>

            <Button className="button_color" onClick={() => {
              setShow(true)
            }}>Create new task</Button>

          </div>
          <br></br>
          <div className='taskList'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task Title</th>
                  {/* <th>Status</th> */}
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Privacy</th>
                  <th>Assigned by</th>
                  <th>Assigned to</th>
                  <th>Progress</th>
                  <th>Assigned on</th>
                  <th>Deadline</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {
                  task_list?.map(item => {
                    return <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.priority}</td>
                      <td>{item.privacy}</td>
                      <td>{item.assigned_to}</td>
                      <td>{item.assigned_by}</td>
                      <td>{item.progress_rate}</td>
                      <td>{item.created_at?.split("T")[0]}</td>
                      <td>{item.deadline?.split("T")[0]}</td>
                      <td>
                        <button className="btn text-info bg-transparent" onClick={async () => {
                          const listAction = new ListAction(task_listDispatch);
                          const val = await listAction.deleteData(`task/${item.id}`, item, 'id')
                          console.log(val)
                        }}>Delete</button>
                      </td>
                    </tr>
                  })
                }



              </tbody>
            </Table>
          </div>
          <Button className="button_color" onClick={() => {
            const arrray = task_list.map(item => {
              return `Title: ${item.title},   Priority: ${item.priority} Deadline: ${item.deadline?.split("T")[0]}`
            })


            pdfMake.createPdf(getPDFobj("Task Report", arrray)).download();
          }}>Generate report</Button>
        </div>
      </Main>
    </ProtectedPage>
  )
}
