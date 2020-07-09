import React from 'react';
import { VillageInfo } from '../helpers';
import Resources from './Resources';

interface VillageProps {
  village?: VillageInfo;
}

const Village: React.FC<VillageProps> = ({ village }) => {
  return <>{village ? <Resources resources={village.resourceInfo} /> : null}</>;
};

export default Village;
