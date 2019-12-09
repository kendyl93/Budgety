import React, { useEffect, useState } from 'react';
import { fetchData, postRequest } from '../api';
import { useDatabaseData } from '../hooks';

const GROUPS_ENSPOINT = 'groups';

const create = data => postRequest('groups', data);

const onCreateGroup = async data => {
  try {
    await create(data);
  } catch (error) {
    console.error(error);
  }
};

const GroupMembers = ({ members }) => {
  const membersId = Object.keys(members);
  return (
    <div>
      {membersId.map(memberId => {
        const { id, name } = members[memberId];

        return <div key={Object.keys(id)}>{Object.values(name)}</div>;
      })}
    </div>
  );
};

const Groups = ({ groups, currentUser }) => {
  const userGroupsIds = currentUser.groups_member;
  // const currentUserGroup = userGroups.filter(userGroup =>
  //   groups.map(({ members }) => members.includes(userGroup))
  // );
  return userGroupsIds.map(groupId => (
    <div key={groupId}>
      {/* should be here(on the frontend) as [[group_id]: { ...rest, id } , ...rest] === NEED TO CHANGE IT ON THE BACKEND SIDE*/}
      <h2>Group name: {groups[groupId].name}</h2>
      <h3>Members:</h3>
      {/* {members && members.length > 0 && <GroupMembers members={members} />} */}
    </div>
  ));
};

const Dashboard = ({ allData: { currentUser, groups } }) => {
  const [name, setName] = useState('');

  const setGroupName = () => {
    const {
      target: { value }
    } = event;
    setName(value);
  };

  return (
    <div>
      <h1>Create group</h1>
      <form
        onSubmit={() => {
          currentUser && onCreateGroup({ user: currentUser, name });
        }}
      >
        <input onChange={setGroupName} type="text" />
        <input type="submit" value="Create" />
      </form>
      <h1>Your groups</h1>
      {console.log({ groups })}

      <Groups currentUser={currentUser} groups={groups} />
    </div>
  );
};

export default Dashboard;
