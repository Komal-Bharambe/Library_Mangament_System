import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GetLoginUserDetails } from '../apicalls/users';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/userSlice';
import { HideLoading, ShowLoading } from '../redux/loaderSlice';

function ProtectedRotes({children}) {

    const navigate = useNavigate();
    // const [user, setuser] = useState(null);
    //by the use of redux
    // now user is access to accross the application

    const { user } = useSelector(state => state.users)
    const dispatch = useDispatch();


    const validateUserToken = async() =>{
        try {
            dispatch(ShowLoading());

            const response = await GetLoginUserDetails()

            dispatch(HideLoading());

            if(response.success){
                // setuser(response.data);
                dispatch(SetUser(response.data));
            }
            else{
                localStorage.removeItem("token")
                navigate("/login")
                message.error(response.message);
            }
        } catch (error) {
            localStorage.removeItem("token")
            navigate("/login");

            dispatch(HideLoading());
            message.error(error.message)
    
        }
    }

    useEffect(() =>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login");
        }
        else{
            validateUserToken();
        }
    },[]);
  return (
    <div>
        {user && 
        // <>
        // <h1>{user.name}</h1>
        // <h1> {user.email}</h1>
        // <h1> {user.role}</h1>
        // <h1>{children}</h1>
        // </>
        (
            <div className='p-1'>
            <div className='header p-2 bg-primary flex justify-between item-center rounded'> 
                <h1 className='text-2xl text-white font-bold cursor-pointer'
                    onClick={() => navigate("/")}
                >BooksLeansHeads</h1>

                <div className='flex items-center gap-1 bg-white p-1 rounded'>
                    <i className="ri-shield-user-line text-black"></i>
                    <span className='text-sm underline text-black' onClick={() => navigate("/profile")}>
                        {user.name.toUpperCase()}
                    </span>
                    <i className="ri-logout-box-r-line text-black ml-2"
                        onClick={() =>{
                            localStorage.removeItem("token");
                            navigate("/login");
                        }}
                    ></i>
                </div>
            </div>

            <div className='content mt-1'>{children}</div>
            </div>
        )
        }  
    </div>
  )
}

export default ProtectedRotes