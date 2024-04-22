import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './redux/usersSlice';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

export const App = () => {
  const [success, setSuccess] = React.useState(false);

  const dispatch = useDispatch();
  const invitedUsers = useSelector((state) => state.users.invitedUsers);

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const onClickSendInvites = () => {
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="App">
        <Success count={invitedUsers.length} />
      </div>
    );
  }
  return (
    <div className="App">
      <Users onClickSendInvites={onClickSendInvites} />
    </div>
  );
};
