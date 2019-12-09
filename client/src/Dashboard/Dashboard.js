import React, { useEffect, useState } from 'react';
import { fetchData, postRequest } from '../api';
import { useCurrentUser } from '../hooks';

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

const Group = ({ group }) => {
  const { name, members } = group;
  console.log({ members });

  return (
    <div>
      <h2>Group name: {name}</h2>
      <h3>Members:</h3>
      {members && members.length > 0 && <GroupMembers members={members} />}
    </div>
  );
};
const Dashboard = () => {
  const [name, setName] = useState('');
  const [groups, setGroups] = useState(undefined);
  const currentUser = useCurrentUser();

  useEffect(() => {
    fetchData(setGroups, GROUPS_ENSPOINT);
  }, []);

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

      {groups && groups.map(group => <Group group={group} key={group._id} />)}
    </div>
  );
};

export default Dashboard;
