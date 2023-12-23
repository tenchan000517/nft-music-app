// config.js

import ERC721ABI from './ERC721abi';
// import ERC1155ABI from './ERC1155abi';

const contracts = [
    {
    name: 'PaoGene',
    address: '0xf53A70E7d2D22fF0DBf6E328C4B92F657bB306E8',
    abi: ERC721ABI,
    },

    {
      name: 'MusubiCollection',
      address: '0x83B265B7b89E967318334602be9ea57b1a8d3b47',
      abi: ERC721ABI,
    },
    
    {
      name: 'NecogeneChristmas',
      address: '0x2E0344FBc7be26e1822b1d0585F39e428671fe29',
      abi: ERC721ABI,
    }

    // 他のコントラクトを追加
  ];
  
  export default contracts;
  