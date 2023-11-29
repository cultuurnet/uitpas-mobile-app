import { useFamilyComposition } from '../../profile/family/hooks';
import { FamilyUserPoints } from './familyUserPoints/FamilyUserPoints';
import { SingleUserPoints } from './singleUserPoints/SingleUserPoints';

const UserPoints = () => {
  return useFamilyComposition({ FamilyComponent: FamilyUserPoints, SingleComponent: SingleUserPoints });
};

export default UserPoints;
