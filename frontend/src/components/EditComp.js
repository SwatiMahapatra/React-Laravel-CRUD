import React,{useContext,useEffect} from 'react';
import DataContext from '../Context/DataContext';
import { useParams } from 'react-router-dom';
import {Form, Button, Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EditComp = () => {

  const {formdata,formValues,setFormValues, HandleInput, errors, singledata, fetchSingleData, updateData, HandleEditImage, setErrors} = useContext(DataContext);
  let {id} = useParams();
  console.log(id)
  console.log(singledata)
  console.log(errors)
  console.log(formValues)
  const navigate= useNavigate();

  useEffect(() => {

    fetchSingleData(id);
  }, [])
  
  const handleCancle=()=>{
    setFormValues({
      fullname: "",
      photo: '',
      designation: "",
      email: "",
      status: ""
  })
    setErrors('')
    console.log(formValues)
    navigate("/");
  }
  const removeHandle=(e)=>{
    setFormValues({...formValues,
      photo:e.target.files=""
      
 })
  }


  return (
    <>

       <h1 className='mt-5'>Update Employee Data</h1>

      <Form className='w-100 mt-5 mb-4'  method="POST" enctype="multipart/form-data">
      
        <Container className='w-50'>
          

          <Form.Group className="mb-4 d-flex flex-column ">
          <div className='d-flex'>
            <Form.Label>FullName:<span className='text-danger'>*</span></Form.Label>
            <Form.Control type="text" id='fullnameid' className='ml-4 mt-3'  
            name="fullname"
            value={formValues["fullname"]}
            onChange={HandleInput}
            placeholder="Enter Fullname...."   /></div>
            <div><p className='text-danger'>{errors.fullname}</p></div>
          </Form.Group>

          <Form.Group className="mb-4 d-flex flex-column ">
          <div className='d-flex'>
            <Form.Label >Designation:<span className='text-danger'>*</span></Form.Label>
            <Form.Control className='ml-4' type="text" id='desigId'
            name="designation"
            value={formValues["designation"]}
            onChange={HandleInput}
            placeholder="Enter Designation ...." /></div>
            <div><p className='text-danger' >{errors.designation}</p></div>
          </Form.Group>

          <Form.Group className="mb-4 d-flex flex-column ">
          <div className='d-flex'>
            <Form.Label >Email:<span className='text-danger'>*</span></Form.Label>
            <Form.Control className='ml-4' type="text" id='emailId'
              name="email"
              value={formValues["email"]}
              onChange={HandleInput}
             placeholder="Enter Email...." /></div>
            <div><p className='text-danger' >{errors.email}</p></div>
          </Form.Group>

         
          <Form.Group className="mb-4 d-flex flex-column ">
          <div className='d-flex'>
            <Form.Label >status:<span className='text-danger'>*</span></Form.Label>
            <select onChange={HandleInput} name="status" className='ml-4'>
              
              <option selected>{formValues.status}</option>
              {formValues.status=="active"? <option value="inactive">inactive</option>:<option value="active">active</option>}
              
              

            </select></div>
            <div><p className='text-danger'>{errors.status}</p></div>
           
          </Form.Group>

          <Form.Group className="mb-4 d-flex flex-column ">
          <div className='d-flex'>
            <Form.Label >Photo:</Form.Label>
             <img width='50px' className='ml-3' src={`http://localhost:8000/storage/${formValues.photo}`}/> 
            <Form.Control className='ml-4' type="file" id='photoId'
              onChange={HandleEditImage}/>
              <Button type="button" className='ml-2 btn-success' onClick={removeHandle}>Remove File</Button></div>
            <div><p className='text-danger'>{errors.photo}</p></div>
            
           
          </Form.Group>

          <Button variant="primary" type="submit" onClick={updateData} >
            Save
          </Button>
          <Button variant="danger ml-2" onClick={handleCancle} type="submit" >
            cancel
          </Button>
          

        </Container>

      </Form>

    </>
   
  )
}

export default EditComp