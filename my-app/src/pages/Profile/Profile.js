import React from 'react'
import {Tabs} from 'antd'
import Books from './Books/Books'
import Users from './Users/Users'
import Reports from './Reports/Reports'
import { useSelector } from 'react-redux'
import BasicDetails from './BasicDetails.js/BasicDetails'
import BorrowedBooks from './BorrowedBooks/BorrowedBooks'

const TabPane = Tabs.TabPane

function Profile() {

  const {user} = useSelector((state) => state.users);
  const role = user.role;

  return (
    <div>
      <Tabs defaultActiveKey='1'>

      <TabPane tab= "General" key="1">
          <BasicDetails/>
        </TabPane>

        {
          role === "user" && (
            <TabPane tab= "Books Borrowed" key="2">
          <BorrowedBooks/>
        </TabPane>
          )
        }
       {
        role !== "user" && (
          <TabPane tab= "Books" key="3">
          <Books/>
        </TabPane>
        )
       }

       {
        role !== "user" && (
          <TabPane tab= "Users" key="4">
          <Users role="user"/>
           </TabPane>
        )
       }
       {
        role === "admin" && (
          <TabPane tab= "Employees" key="5">
          <Users role="employee"/>
          </TabPane>
        )
       }
        {
          role === "admin" && (
            <TabPane tab= "Admins" key="6">
            <Users role="admin"/>
            </TabPane>
          )
        }
        
        {
          role === "admin" && (
            <TabPane tab="Reports" key="7">
            <Reports/>
            </TabPane>
        
          )
        }
      </Tabs>
    </div>
  )
}

export default Profile