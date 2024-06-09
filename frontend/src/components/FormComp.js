import React, { useContext } from 'react'
import { Form, Container, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DataContext from '../Context/DataContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons'


const FormComp = () => {

  const navigate = useNavigate();

  const { formValues, setFormValues, HandleInput, storedata, errors, setErrors, createData, HandleInputImage } = useContext(DataContext);

  console.log(formValues)
  
  console.log(errors)


  const handleCancle = () => {
    navigate("/");
    setFormValues({
      fullname: "",
      photo: '',
      designation: "",
      email: "",
      status: ""
  })
    setErrors("")
    console.log(formValues)

  }

  
  // const handleCreateAnother = () => {
  //   setFormValues({
  //     fullname: "",
  //     designation: "",
  //     email: "",
  //     status: ""
  //   })
  //   setErrors({})
  //   navigate('/forms');

  //   console.log(formValues)

  // }

  const handleBack = () => {
    navigate("/");
    setFormValues({
      fullname: "",
      photo: '',
      designation: "",
      email: "",
      status: ""
     })
    setErrors("")
    console.log(formValues)

  }






  return (
    <>
      <Link className='btn btn-dark mt-2 float-start' onClick={handleBack} to='/'>Back</Link>
      <h1 className='mt-5'>Add New Employee</h1>
      
      <Form className='w-100 mb-3 mb-4' method="POST" enctype="multipart/form-data">

        <Container className='w-50 mt-4 h-75'>
          {/* <Form.Group className="mb-4 ml-3 "> */}

          <Form.Group className="mb-4  ">
          <Form.Label className='mt-3 d-flex'>Upload Profile Image</Form.Label>
          <Card style={{ width: '38rem' ,height:'15rem', border:'dashed #999999'}} className='d-flex justify-content-center align-items-center '>
            
            <i><FontAwesomeIcon className='fa-3x mt-4' icon={faDownload}/></i>
            <p className='mt-2'>Drag and Drop Here</p>
            <p >or</p>
            <Form.Control className='ml-3' type="file" style={{ width: '200px'}}
              onChange={HandleInputImage}/>
            <p className='text-danger'>{errors.photo}</p>
            {/* {errors.designation && <span className='sm mt-2 text-danger'>{errors.designation[0]}</span>} */}
            </Card>
            <p>Accepted File Types: .jpg and .png (max-size:2MB) only.</p>
          </Form.Group>

          <Form.Group className="mb-4 d-flex flex-column ">
          <div className='d-flex'>
            <Form.Label >FullName:<span className='text-danger'>*</span></Form.Label>
            <Form.Control type="text" id='fullnameid' className='ml-4'
              name="fullname"
              value={formValues["fullname"]}
              onChange={HandleInput}
              placeholder="Enter Fullname...." /> </div>
              <div><p className='text-danger'>{errors.fullname}</p></div>
            {/* <span className='text-danger'> {errors.error_list.fullname}</span> */}
          </Form.Group>

          

          <Form.Group className="mb-4 d-flex flex-column ">
          <div className='d-flex'>
            <Form.Label >Designation:<span className='text-danger'>*</span></Form.Label>
            <Form.Control className='ml-4' type="text" id='desigId'
              name="designation"
              value={formValues["designation"]}
              onChange={HandleInput}
              placeholder="Enter Designation ...." /></div>
               <div><p className='text-danger'>{errors.designation}</p></div>
            {/* {errors.designation && <span className='sm mt-2 text-danger'>{errors.designation[0]}</span>} */}
          </Form.Group>

          <Form.Group className="mb-4 d-flex flex-column ">
            <div className='d-flex'>
            <Form.Label >Email:<span className='text-danger'>*</span></Form.Label>
            <Form.Control className='ml-4' type="email" id='emailId'
              name="email"
              value={formValues["email"]}
              onChange={HandleInput}
              placeholder="Enter Email...." /></div>
               <div><p className='text-danger'>{errors.email}</p></div>
            {/* {errors.email && <span className='sm text-danger'>{errors.email[0]}</span>} */}

          </Form.Group>

          <Form.Group className="mb-4 d-flex flex-column ">
          <div className='d-flex'>
            <Form.Label >status:<span className='text-danger'>*</span></Form.Label>
            <select onChange={HandleInput} name="status" className='ml-4'>
              <option value="none" selected disabled hidden>Choose Status</option>
              <option value="active">active</option>
              <option value="inactive">inactive</option>

            </select></div>
            <div><p className='text-danger'>{errors.status}</p></div>
            {/* {errors.status && <span className='sm text-danger'>{errors.status[0]}</span>} */}
          </Form.Group>

          <Button variant="primary ml-3 mt-3 mb-3" type="submit" onClick={createData} >
            Create
          </Button>
          <Button variant="success ml-2 mt-3 mb-3" onClick={storedata} type="submit" >
            create & create Another
          </Button>
          <Button variant="dark ml-2 mt-3 mb-3" onClick={handleCancle} type="submit" >
            cancel
          </Button>
          
        

        </Container>
      </Form>
      {/* <Link className='btn btn-success mt-2 ' onClick={() => setFormValues("")} to='/forms'>creaydff</Link> */}
    </>

  )
}

export default FormComp