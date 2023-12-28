import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

function AddStudents() {
    let navigate = useNavigate();

    const url = "https://62736209a6522e24ac46aea5.mockapi.io/stud/";

    let handleSubmit = async (values) => {
        try{
            let response = await axios.post(url, values);
            console.log(response);
            if(response.status === 201) navigate("/all-students");
            else alert("Internal server error!");
        } catch(error){
            console.log(error);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            mobile: "",
            batch: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Required"),
            email: yup.string().required("Invalid Email").required("Required"),
            password: yup
            .string()
            .required("No Password Provided")
            .min(8, "Password id too short")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
            ),
            mobile: yup
            .string()
            .matches(/^\d{10}$/, "Mobile number not valid")
            .required("Required"),
            batch: yup.string(),
        }),
        onSubmit: (values) => {
            console.log(values);
            handleSubmit(values);
        },
    });

    return(
        <div>
            <h1 className="mt-5">Add Student</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input 
                     id="name"
                     name="name"
                     type="text"
                     className="form-control"
                     placeholder="Enter Name" 
                     onBlur={formik.handleBlur}
                     onChange={formik.handleChange}
                     value={formik.values.name}
                     />
                     {formik.touched.name && formik.errors.name ? (
                        <div style={{ color: "red"}}>{formik.errors.name}</div>
                     ): null}
                </div>

                <div className="form-group">
                    <label for="email">Email</label>
                    <input 
                     id="email"
                     name="email"
                     type="email"
                     className="form-control"
                     placeholder="Enter email" 
                     onBlur={formik.handleBlur}
                     onChange={formik.handleChange}
                     value={formik.values.email}
                     />
                     {formik.touched.email && formik.errors.email ? (
                        <div style={{ color: "red"}}>{formik.errors.email}</div>
                     ): null}
                </div>

                <div className="form-group">
                    <label for="password">Password</label>
                    <input 
                     id="password"
                     name="password"
                     type="text"
                     className="form-control"
                     placeholder="Enter Password" 
                     onBlur={formik.handleBlur}
                     onChange={formik.handleChange}
                     value={formik.values.password}
                     />
                     {formik.touched.password && formik.errors.password ? (
                        <div style={{ color: "red"}}>{formik.errors.password}</div>
                     ): null}
                </div>

                <div className="form-group">
                    <label for="mobile">Mobile</label>
                    <input 
                     id="mobile"
                     name="mobile"
                     type="text"
                     className="form-control"
                     placeholder="Enter Mobile" 
                     onBlur={formik.handleBlur}
                     onChange={formik.handleChange}
                     value={formik.values.mobile}
                     />
                     {formik.touched.mobile && formik.errors.mobile ? (
                        <div style={{ color: "red"}}>{formik.errors.mobile}</div>
                     ): null}
                </div>

                <div className="form-group">
                    <label for="batch">Batch</label>
                    <input 
                     id="batch"
                     name="batch"
                     type="text"
                     className="form-control"
                     placeholder="Enter Batch" 
                     onBlur={formik.handleBlur}
                     onChange={formik.handleChange}
                     value={formik.values.batch}
                     />
                     {formik.touched.batch && formik.errors.batch ? (
                        <div style={{ color: "red"}}>{formik.errors.batch}</div>
                     ): null}
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}


export default AddStudents;