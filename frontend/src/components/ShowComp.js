import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Form, Table, Row, Container, Button } from 'react-bootstrap';
import DataContext from '../Context/DataContext';
import { Link } from 'react-router-dom';

const ShowComp = () => {

  const [q, setQ] = useState("");
  let count = 0;
  const { fulldata, fetchData, loadingdata, deleteData, updateStatus, updateEmpStatus,formValues } = useContext(DataContext);


  useEffect(() => {
    fetchData()
    
  }, [])

  localStorage.setItem("dataArr", JSON.stringify(fulldata));
  var dataArr = JSON.parse(localStorage.getItem("dataArr"))


  return (
    <>



      <center><Form>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2 mt-3 w-50 "
          aria-label="Search"
          onChange={(e) => setQ(e.target.value)}
        />
      </Form></center>
      <Row>
        <Container className='w-100 mt-5'>
          <center><Table className="table w-75 h-100 justify-content-center ">

            <thead className="thead-dark">
              <tr>
                <th scope='col'>#</th>
                <th scope="col">S.No</th>
                <th scope="col">FullName</th>
                <th scope="col">Photo</th>
                <th scope="col">Designation</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>

              </tr>
            </thead>
            <tbody>
              {loadingdata &&
                fulldata.filter((item) => item.fullname.toLowerCase().includes(q)).map((item) => (
                  <tr key={item.id}>
                    <td><input type='checkbox'
                      onClick={() => updateStatus(item.id)}
                      checked={item.status === "active" ? true : false}></input></td>


                    <td>{count = count + 1}</td>
                    <td>{item.fullname}</td>
                    {/* <td>{item.photo}</td> */}
                    <td><img width='50px' src={`http://localhost:8000/storage/${item.photo}`}/></td>
                    <td>{item.designation}</td>
                    <td>{item.email}</td>
                    <td>{item.status}</td>
                    <td className='ml-2'>

                      <span><Link to={`/update/${item.id}`} className="btn btn-primary">Edit</Link></span>
                      <span><Button onClick={() => deleteData(item.id)} className='btn-danger ml-3'>Delete</Button></span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table></center>
        </Container>

      </Row>
    </>
  )
}


export default ShowComp