import AnkrscanProvider from '@ankr.com/ankr.js';

const provider = new AnkrscanProvider('');

export const getNfts = async (address: string) => {
  const { assets } = await provider.getNFTsByOwner({
    walletAddress: address,
    blockchain: 'eth',
  });
  return {
    nfts: assets,
  };
};

export const getTokenHolders = async (contractAddress: string) => {
  const { holders, holdersCount } = await provider.getTokenHolders({
    contractAddress,
    blockchain: 'eth',
  });
  console.log({ holders });
  return {
    holders,
    holdersCount,
  };
};
