import { HolderBalance, Nft } from '@ankr.com/ankr.js/dist/types';
import { useEffect, useState } from 'react';
import { getNfts, getTokenHolders } from './utils';

export const useNfts = (address: string) => {
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNfts = async () => {
      setError(null);
      setLoading(true);
      try {
        const { nfts } = await getNfts(address);
        setNfts(nfts);
      } catch (e) {
        setNfts([]);
        setError(e as Error);
      }
      setLoading(false);
    };
    fetchNfts();
  }, [address]);

  return { nfts, loading, error };
};

export const useTokenHolders = (contractAddress: string) => {
  const [holders, setHolders] = useState<HolderBalance[]>([]);
  const [holdersCount, setHoldersCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchHolders = async () => {
      setLoading(true);
      try {
        const { holders, holdersCount } = await getTokenHolders(
          contractAddress
        );
        setHolders(holders);
        setHoldersCount(holdersCount);
      } catch (e) {
        setError(e as Error);
      }
      setLoading(false);
    };
    fetchHolders();
  }, [contractAddress]);

  return { holders, holdersCount, loading, error };
};
