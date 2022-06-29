/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { useNfts } from '../hooks';

const Home: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState(
    '0x0ED6Cec17F860fb54E21D154b49DAEFd9Ca04106'
  );
  const { nfts, loading, error } = useNfts(walletAddress);

  return (
    <div className='p-10 flex flex-col items-center'>
      <h1 className='text-3xl font-bold'>NFT viewer</h1>
      <h3 className='text-zinc-700'>
        Powered by{' '}
        <a
          href='https://www.ankr.com/advanced-api/'
          target='_blank'
          rel='noreferrer'
          className='cursor-pointer underline'
        >
          Ankr Advanced APIs
        </a>
      </h3>

      <div className='flex flex-col mt-4'>
        <label className='text-zinc-700' htmlFor='wallet-address'>
          Wallet address
        </label>
        <input
          id='wallet-address'
          type='text'
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className='rounded p-2 w-[400px] border'
          placeholder='Enter a wallet address here'
        />
      </div>

      {loading && (
        <div className='flex flex-col items-center mt-8'>
          <p className='text-zinc-700'>Loading...</p>
        </div>
      )}

      <div className='grid grid-cols-3 mt-8 gap-4'>
        {nfts.map((nft) => {
          return (
            <div
              key={`${nft.contractAddress}/${nft.tokenId}`}
              className='flex flex-col rounded border p-4'
            >
              <img
                className='w-[200px] rounded shadow'
                src={nft.imageUrl}
                alt={nft.name}
              />
              <span className='font-bold mt-4'>{nft.name}</span>
              <span>{nft.collectionName}</span>
            </div>
          );
        })}

        {error && (
          <div className='flex flex-col items-center mt-8'>
            <p className='text-red-700'>
              Error: {JSON.stringify(error, null, 2)}
            </p>
          </div>
        )}
      </div>

      <footer className='flex flex-col gap-2 mt-16 items-center'>
        <Link href='/token-holders'>
          <a className='text-zinc-700 underline'>
            Go to the ERC20 token holders viewer
          </a>
        </Link>

        <Link href='https://github.com/dhaiwat10/ankrjs-react-quickstart'>
          <a className='text-zinc-700 underline'>Source code</a>
        </Link>
      </footer>
    </div>
  );
};

export default Home;
