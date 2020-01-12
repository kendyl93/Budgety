const filterElementOut = array => element =>
  array.filter(arrayElement => arrayElement !== element);

const preventDuplicates = array => [...new Set(array)];

const saveGroupOnInvitationAccepted = async (userToUpdate, groupToUpdate) => {
  const { members, invited } = groupToUpdate;
  const { _id: userToUpdateId } = userToUpdate;

  const uniqueUpdatedMembers = preventDuplicates([...members, userToUpdateId]);
  groupToUpdate.members = [...uniqueUpdatedMembers];

  const uniqueUpdatedInvited = preventDuplicates(
    filterElementOut(invited)(userToUpdateId)
  );
  groupToUpdate.invited = [...uniqueUpdatedInvited];

  await groupToUpdate.save();
};

const saveUserOnInvitationAccepted = async (userToUpdate, groupToUpdate) => {
  const { _id: groupToUpdateId } = groupToUpdate;
  const { groupsMember, groupsInvitedTo } = userToUpdate;

  const uniqueUpdatedGroupsMember = preventDuplicates([
    ...groupsMember,
    groupToUpdateId
  ]);
  // eslint-disable-next-line require-atomic-updates
  userToUpdate.groupsMember = [...uniqueUpdatedGroupsMember];

  const uniqueUpdatedGroupsInvitedTo = preventDuplicates(
    filterElementOut(groupsInvitedTo)(groupToUpdateId)
  );
  // eslint-disable-next-line require-atomic-updates
  userToUpdate.groupsInvitedTo = [...uniqueUpdatedGroupsInvitedTo];

  await userToUpdate.save();
};

export const acceptInvitaion = async (userToUpdate, groupToUpdate) => {
  try {
    await Promise.all([
      saveGroupOnInvitationAccepted(userToUpdate, groupToUpdate),
      saveUserOnInvitationAccepted(userToUpdate, groupToUpdate)
    ]);

    return;
  } catch (error) {
    console.error({ error });
  }
};

export const invite = async (userToUpdate, groupToUpdate) => {
  try {
    const { invited = [], _id: groupToUpdateId } = groupToUpdate || {};
    const { groupsInvitedTo } = userToUpdate;

    const uniqueInvited = preventDuplicates([...invited, userToUpdate]);
    groupToUpdate.invited = [...uniqueInvited];
    await groupToUpdate.save();

    const uniqueGroupsInvitedTo = preventDuplicates([
      ...groupsInvitedTo,
      groupToUpdateId
    ]);
    // eslint-disable-next-line require-atomic-updates
    userToUpdate.groupsInvitedTo = [...uniqueGroupsInvitedTo];

    return await userToUpdate.save();
  } catch (error) {
    console.error({ error });
  }
};
