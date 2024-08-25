
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

import { GetAllUsers } from '../../../apicalls/users';
import { Table, message } from 'antd';
import moment from 'moment';
import Button from '../../../components/Button';
import IssuesBooks from './IssuesBooks';

function Users({role}) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showIssuedBooks, setShowIssuedBooks] = useState(false);
  const [users, setUsers] = React.useState([]);

  const dispatch = useDispatch();
  
  const getUsers = async() =>{
    try {
      dispatch(ShowLoading());
      const response = await GetAllUsers(role);
      dispatch(HideLoading());
      if(response.success){
        setUsers(response.data);
      }
      else{
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
      
    }
  }
  useEffect(() =>{
    getUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Phone",
      dataIndex: "phone"
    },
    {
      title: "Created At",
      dataIndex: "publishedDate",
      render: (createdAt) => moment(createdAt).format("DD-MM-YYYY hh:mm A"),
    },
  
    {
      title: "Actions",
      dataIndex: "action",
      render: (actions, record) =>(
          <div >
              <Button title="Books" varient="outlined"
                onClick={() =>{
                  setSelectedUser(record);
                  setShowIssuedBooks(true);
                }}
              />
          </div>
      )
  }
  ]
  return (
    <div>
      <Table dataSource={users} columns={columns}/>

      {
        showIssuedBooks && (
          <IssuesBooks showIssuedBooks={showIssuedBooks} setShowIssuedBooks={setShowIssuedBooks} selectedUser={selectedUser}/>
        )
      }
    </div>
  )
}

export default Users