import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { swal } from 'sweetalert2'




axios.defaults.baseURL = "http://localhost:8000/api/";

const DataContext = createContext();

export const DataProvider = ({ children }) => {



    const [formValues, setFormValues] = useState({
        fullname: "",
        photo:'',
        designation: "",
        email: "",
        status: ""
    })

    const [fulldata, setFulldata] = useState([]);
    const [singledata, setSingleData] = useState([]);
    const [loadingdata, setLoadingData] = useState(false);
    const [errors, setErrors] = useState({})
    const [updateEmpStatus, setUpdateEmpStatus] = useState([]);
    const [isSubmit, setisSubmit] = useState(false);
    const [errorList, setError] = useState([]);


    const navigate = useNavigate();

    const HandleInput = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
            // photo:image.name
        });

    }


    const HandleInputImage = (e) => {

        setFormValues({
            ...formValues,

            photo: e.target.files[0]

        })
    }

    const HandleEditImage = (e) => {

        setFormValues({
            ...formValues,
            photo: e.target.files[0]

        })
    }


    console.log("------", formValues)

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/employees');
            setFulldata(res.data)
            setLoadingData(true)
        }
        catch (err) {
            alert(err.message);
        }
    }

    const fetchSingleData = async (id) => {
        const response = await axios.get('http://localhost:8000/api/employees/' + id);
        const res = response.data
        setSingleData(res);
        setLoadingData(true);
        setFormValues({
            fullname: res.fullname,
            photo: res.photo,
            designation: res.designation,
            email: res.email,
            status: res.status
        })

    };
    console.log(singledata)

    const storedata = async (e) => {
        e.preventDefault();
        console.log(formValues);
        let formdata = new FormData();
        formdata.append("fullname", formValues.fullname);
        if(formValues.photo!==''){
            formdata.append("photo", formValues.photo);
        }
        formdata.append("designation", formValues.designation);
        formdata.append("email", formValues.email);
        formdata.append("status", formValues.status);


        const res = await axios.post("http://localhost:8000/api/add", formdata);
        fetchData();
        console.log("--------", res)


        if (res.data.success === false) {

            setErrors(res.data.validate_errors);

        }
        else {
            navigate("/forms");
            setFormValues({
                fullname: "",
                photo: '',
                designation: "",
                email: "",
                status: ""
            })
            setErrors("")
        }
    }

    const createData = async (e) => {
        e.preventDefault();
        console.log(formValues)
        let formdata = new FormData();
        formdata.append("fullname", formValues.fullname);
        if(formValues.photo!==''){
            formdata.append("photo", formValues.photo);
        }
        
        formdata.append("designation", formValues.designation);
        formdata.append("email", formValues.email);
        formdata.append("status", formValues.status);
        

        const res = await axios.post("http://localhost:8000/api/add", formdata);
        fetchData();
        if (res.data.success === false) {

            setErrors(res.data.validate_errors);
         }
        else {
            navigate("/");
            setFormValues({
                fullname: "",
                photo: '',
                designation: "",
                email: "",
                status: ""
            })
            setErrors("")
        }
        

    }

    // useEffect(() => {
    //     console.log(errors);
    //     if (Object.keys(errors.length === 0 && isSubmit)) {
    //         console.log(formValues);
    //     }
    // }, [errors])

    let formdata = new FormData();

    const updateData = async (e) => {
        console.log("full data*******************************",formValues.photo.name)
        e.preventDefault();
        console.log(formValues);
        formdata.append("fullname", formValues.fullname);
        // formdata.append("photo", formValues.photo);
        if(formValues.photo && formValues.photo.name){
            console.log("formdata.photo-----",formValues.photo);
             formdata.append("photo", formValues.photo);
        }
        else{
            console.log("formdat.photo--else-----",formValues.photo);
            formdata.append("photo", '');
        }
        formdata.append("designation", formValues.designation);
        formdata.append("email", formValues.email);
        formdata.append("status", formValues.status);
        console.log(formdata)


        const res = await axios.post("http://localhost:8000/api/update/" + singledata.id, formdata);
        fetchData();
        if (res.data.success === false) {

            setErrors(res.data.validate_errors);

        }

        else {
            navigate("/");
            setFormValues({
                fullname: "",
                photo: '',
                designation: "",
                email: "",
                status: ""
            })
            setErrors("")
        }








    }


    const deleteData = async (id) => {
        await axios.delete("http://localhost:8000/api/delete/" + id);
        fetchData();
    }

    const updateStatus = async (id) => {
        const response = await axios.put("http://localhost:8000/api/statusupdate/" + id);
        const res = response.data;
        setUpdateEmpStatus(res);
        setLoadingData(true);
        setFormValues({
            status: res.status
        })
        fetchData();
        navigate("/");
    }
    console.log(updateEmpStatus);

    // const validate = (values) =>{
    //     const formerrors = {};
    //     if(!values.fullname){
    //         formerrors.fullname = "full name is required"
    //     }
    //     if(!values.designation){
    //         formerrors.designation = "designation is required"
    //     }
    //     if(!values.email){
    //         formerrors.email = "email is required"
    //     }
    //     if(!values.status){
    //         formerrors.status= "status is required"
    //     }

    //     return formerrors;
    // };


    return <DataContext.Provider value={{ formdata, fulldata, singledata, loadingdata, formValues, errors, updateEmpStatus, fetchData, fetchSingleData, HandleInput, storedata, updateData, deleteData, setFormValues, updateStatus, setErrors, createData, HandleInputImage, HandleEditImage }}>{children}</DataContext.Provider>
}


export default DataContext;