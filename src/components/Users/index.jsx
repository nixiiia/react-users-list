import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchByName } from '../../redux/usersSlice';

import { Skeleton } from './Skeleton';
import { User } from './User';

export const Users = ({ onClickSendInvites }) => {
  const users = useSelector((state) => state.users.users);
  const filteredUsers = useSelector((state) => state.users.filteredUsers);
  const invitedUsers = useSelector((state) => state.users.invitedUsers);
  const { status } = useSelector((state) => state.users);
  const [searchValue, setSearchValue] = React.useState('');

  const dispatch = useDispatch();

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  console.log(users);

  React.useEffect(() => {
    dispatch(searchByName(searchValue));
  }, [searchValue, dispatch]);

  const usersList =
    searchValue === ''
      ? users.map((user) => <User key={user.id} {...user} />)
      : filteredUsers.map((user) => <User key={user.id} {...user} />);

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          value={searchValue}
          onChange={onChangeSearchValue}
          type="text"
          placeholder="Найти пользователя..."
        />
      </div>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
        </div>
      ) : (
        <ul className="users-list">{status === 'loading' ? skeletons : usersList}</ul>
      )}
      {invitedUsers.length > 0 && (
        <button onClick={onClickSendInvites} className="send-invite-btn">
          Отправить приглашение
        </button>
      )}
    </>
  );
};
