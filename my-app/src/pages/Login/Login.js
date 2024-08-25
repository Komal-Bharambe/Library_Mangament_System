import React, { useEffect } from 'react'
import { Form, message } from 'antd'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async(values) =>{
        // console.log("Success:", values);
        try{
            dispatch(ShowLoading());
            const response = await LoginUser(values);
            dispatch(HideLoading());

            if(response.success){
                message.success(response.message);
                localStorage.setItem("token", response.data);
                window.location.href = "/";
                // navigate("/");
            }
            else{
                message.error(response.message);
            }
        }catch(error){
            dispatch(HideLoading());
            message.error(error.message)
        }
    }
    useEffect(() =>{
        
    })
  return (
    <div className='h-screen bg-primary flex items-center justify-center'>
        <div className='authentication-form bg-white p-3 rounded'>
            <h1 className='text-secondary text-2xl font-bold mb-1'>
                BOOKSLEANSHEADS-LOGIN
            </h1>   
            <hr/>
            <Form layout="vertical" onFinish={onFinish} className='mt-1'>
               
                <Form.Item label="Email" name="email"
                // rules for require 
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!"
                        }
                    ]}
                
                >
                    <input type='email' placeholder='Email'/>
                </Form.Item>
                <Form.Item label="Password" name="password"
                     rules={[
                        {
                            required: true,
                            message: "Please input your password!"
                        }
                    ]}
                
                >

                    <input type='password' placeholder='Password'/>
                </Form.Item>

                <div className='text-center mt-2 flex flex-col gap-1'>
                <Button title="Login" type='submit'></Button>
                    <Link to="/register" className='text-primary text-sm underline' >Dont have an account? Click Here To Register</Link>
                </div>
            </Form>
        </div>
    </div>
  )
}

export default Login