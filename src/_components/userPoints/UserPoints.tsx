import React from 'react';

import { useFamily } from '../../profile/family/hooks';
import { FamilyUserPoints } from './familyUserPoints/FamilyUserPoints';
import { SingleUserPoints } from './singleUserPoints/SingleUserPoints';

const UserPoints = () => {
  const { me, familyMembers, inFamily, isLoadingMe, isErrorMe, isLoadingFamilyMembers, isErrorFamilyMembers } = useFamily();

  if (isLoadingMe || isLoadingFamilyMembers || isErrorMe || isErrorFamilyMembers) {
    return null;
  }

  if (!inFamily) {
    return <SingleUserPoints passHolder={me} />;
  }

  return <FamilyUserPoints familyMembers={familyMembers} />;
};

export default UserPoints;