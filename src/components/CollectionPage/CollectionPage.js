// CollectionPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import config from '../../config';

const CollectionPage = () => {
  const { contractAddress } = useParams();
  const collection = config.collections.find(c => c.contractAddress === contractAddress);

  return (
    <div>
      <h2>{collection.collectionName}</h2>
      {/* その他のコレクション情報の表示 */}
    </div>
  );
};

export default CollectionPage;
