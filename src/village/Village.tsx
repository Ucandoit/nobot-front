import React from 'react';
import { CardPool } from '../card';
import { VillageInfo } from '../helpers';
import Buildings from './Buildings';
import Resources from './Resources';

interface VillageProps {
  village?: VillageInfo;
}

const Village: React.FC<VillageProps> = ({ village }) => {
  return (
    <>
      {village ? (
        <>
          <Resources resources={village.resourceInfo} />
          <Buildings areas={village.areas} />
          <CardPool cards={village.deckCards} />
          <CardPool cards={village.reserveCards} />
        </>
      ) : null}
    </>
  );
};

export default Village;
