/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { useState } from 'react';
import { useTokenHolders } from '../hooks';

const Home: NextPage = () => {
  const [contractAddress, setContractAddress] = useState(
    '0xA808B22ffd2c472aD1278088F16D4010E6a54D5F'
  );
  const { holders } = useTokenHolders(contractAddress);

  return (
    <div className='p-10 flex flex-col items-center'>
      <h1 className='text-3xl font-bold'>ERC20 token holders viewer</h1>
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
          ERC20 token contract address
        </label>
        <input
          id='wallet-address'
          type='text'
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          className='rounded p-2 w-[400px] border'
          placeholder='Enter a wallet address here'
        />
      </div>

      {holders && (
        <table className='mt-8'>
          <thead className='p-4 border rounded'>
            <tr>
              <th>Address</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {holders.map((holder) => {
              return (
                <tr key={holder.holderAddress} className='border'>
                  <td className='p-2'>{holder.holderAddress}</td>
                  <td className='p-2'>{holder.balance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
