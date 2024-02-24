import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './redux/usersSlice';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

function App() {
  const [success, setSuccess] = React.useState(false);

  const dispatch = useDispatch();
  const invitedUsers = useSelector((state) => state.users.invitedUsers);

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const onClickSendInvites = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invitedUsers.length} />
      ) : (
        <Users onClickSendInvites={onClickSendInvites} />
      )}
    </div>
  );
}

export default App;
