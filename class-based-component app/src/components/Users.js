import { Component, useState } from 'react';
import User from './User';

import classes from './Users.module.css';

class Users extends Component{
  constructor() {
    super();
    this.state = {
      showUsers: true,
    }; // State always has object as its data type in class components //state is non negotiatable
  }
  
  toggleUsersHandler (){
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    });
  }
  componentDidUpdate(){
    if(this.props.users.length < 1){
       throw new Error("No users found");
    }
  }

  render (){
    
  const usersList = (
    <ul>
      {this.props.users.map((user) => (
        <User key={user.id} name={user.name} />
      ))}
    </ul>
  );
    return (
     <div className={classes.users}>
      <button onClick={this.toggleUsersHandler.bind(this)}>
        {this.state.showUsers ? 'Hide' : 'Show'} Users
      </button>
      {this.state.showUsers && usersList}
    </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
