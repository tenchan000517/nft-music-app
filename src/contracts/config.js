// config.js

import ERC721ABI from './ERC721abi';
import ERC1155ABI from './ERC1155abi';

const contracts = [
    // {
    // name: 'PaoGene',
    // address: '0xf53A70E7d2D22fF0DBf6E328C4B92F657bB306E8',
    // abi: ERC721ABI,
    // },

    {
      name: 'MusubiCollection',
      address: '0x83B265B7b89E967318334602be9ea57b1a8d3b47',
      abi: ERC721ABI,
    },
    
    {
      name: 'NecogeneChristmas',
      address: '0x2E0344FBc7be26e1822b1d0585F39e428671fe29',
      abi: ERC721ABI,
    },

    // {
    //   name: 'NecogeneSterterKIT',
    //   address: '0x80A9B8F00a5a7a06d51Ad3c994C38a584e322b9D',
    //   abi: ERC721ABI,
    // },

    // {
    //   name: 'SIZITEN RAINBOW🌈',
    //   address: '0x28d50b4700e6c2AA79E6CF8c1D0883EF762F9D30',
    //   abi: ERC721ABI,
    // },

    {
      name: 'Honchii Song',
      address: '0x7622CfbE14D28F5D22DD84AFfcb9Fe885f9e88d8',
      abi: ERC721ABI,
    },

    // {
    //   name: 'CNP Jobs',
    //   address: '0xc4FeDaF6f2B6B900f5d5F8b702aa09D9BdBFDC21',
    //   abi: ERC721ABI,
    // },

    // {
    //   name: 'APP-GRG ',
    //   address: '0x24088b2F70B49c28d8C8F606B54121B9Aa283cd4',
    //   abi: ERC721ABI,
    // },

    {
      name: 'IceMaikoMusicCollection',
      address: '0x6Abf8181a6e623a444EA720Cd1782D5b6Fc54E3e',
      abi: ERC1155ABI,
    }

     // 他のコントラクトを追加
  ];
  
  export default contracts;
