import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import toast, { Toaster } from "react-hot-toast";
import convertToBase64 from "../helper/conver";
import useFetch from "../hooks/fetch.hook";
import {useAuthStore} from "../store/store";
import {updateUser} from "../helper/helper";

const Profile = () => {

    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [{ isLoading, apiData, serverError }] = useFetch();

    const formik = useFormik({
        initialValues: {
            firstName: apiData?.firstName || '',
            lastName: apiData?.lastName || '',
            email: apiData?.email || '',
            mobile: apiData?.mobile || '',
            address: apiData?.address || ''
        },
        enableReinitialize: true,
        validate: profileValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = await Object.assign(values, { profile: apiData?.profile || file || ''});
            let updatePromise = updateUser(values);

            toast.promise(updatePromise, {
                loading: 'Updating...',
                success: <b> Update Successfully...! </b>,
                error: <b> Could not Update! </b>
            })
            console.log(values);
        }
    });

    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }

    // logout handler function
    function userLogout() {
        localStorage.removeItem('token');
        navigate('/')
    }

    if (isLoading) return <h1 className="text-2xl font-bold">isLoading...</h1>;
    if(serverError) return <h1 className="text-xl text-red-500">{serverError.message}</h1>


    return (
        <div className="container mx-auto">

            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className="flex justify-center items-center h-screen">
                <div className={`${styles.glass} ${extend.glass}`} style={{width: "45%"}} >

                    <div className="title flex flex-col items-center">
                        <h4 className="text-5xl font-bold"> Profile </h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            You can update the details.
                        </span>
                    </div>

                    <form className="py-1" onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <label htmlFor="profile">
                                <img src={apiData?.profile || file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="profile-photo"/>
                            </label>

                            <input onChange={onUpload} type="file" id="profile" name="profile"/>
                        </div>

                        <div className="textbox flex flex-col items-center gap-6">
                            <div className="name flex w-3/4 gap-10">
                                <input {...formik.getFieldProps('firstName')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder="FirstName"/>
                                <input {...formik.getFieldProps('lastName')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder="LastName"/>
                            </div>

                            <div className="name flex w-3/4 gap-10">
                                <input {...formik.getFieldProps('mobile')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder="Mobile No."/>
                                <input {...formik.getFieldProps('email')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder="Email"/>
                            </div>

                            <input {...formik.getFieldProps('address')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder="Address"/>
                            <button className={styles.btn} type="submit"> Update </button>

                        </div>

                        <div className="text-center py-4">
                            <span className="text-gray-500">
                                come back later ?&nbsp;
                                <button onClick={userLogout} className="text-red-500"> Logout </button>
                            </span>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Profile;