import React from 'react';
import UserItem from './UserItem';
import './UsersList.css';


const UsersList = (props) => {
  
  return (
    <div>
      <ul>
        <UserItem />
      </ul>
    </div>
  )
}

export default UsersList
