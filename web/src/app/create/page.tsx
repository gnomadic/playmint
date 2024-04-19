'use client';
import Divider from '@/components/Divider';
import useDeployment from '@/hooks/useDeployment';
import useCreateEntity from '@/mutations/useCreateEntity';
import useCreateGame from '@/mutations/useCreateGame';
import { Address } from 'viem';
import { BaseError, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'



export default function Create() {

  const { deploy } = useDeployment();
  const { address } = useAccount()
  // const { hash, error, isPending, writeToChain: createGame } = useCreateGame({ contractAddress: deploy.gameFactory });
  const { createGameHash, createGameError, createGameisPending, writeCreateGameToChain } = useCreateGame({ contractAddress: deploy.gameFactory });
  const { createEntityHash, createEntityError, createEntityisPending, writeCreateEntityToChain } = useCreateEntity({ contractAddress: deploy.entityFactory });
  // const { registerModule, registerModuleGameError, registerModuleisPending, writeRegisterModule } = useRegisterModule({contractAddress: deploy.});


  async function handleCreateGame(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('submit form');


    const formData = new FormData(e.target as HTMLFormElement)
    const tokenId = formData.get('tokenId') as string
    const displayName = formData.get('displayName') as string

    writeCreateGameToChain(address as Address, displayName);

  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: createGameHash
    });

  return (
    <main className='font-anon flex min-h-screen flex-col items-center justify-between p-24'>
     <section id='hero' className='relative min-h-screen items-center pt-48'>
        <p className=''>Coming in Phase 2</p>
        <p className='pt-8'>Launch your codeless games for your communities</p>
        <p className='pt-8'>
          PLAYMINT provides a set of modules that can be combined and customized to fit your gameplay.
        </p>
        <p className='pt-8'>Permissionless, free, and on-chain.</p>
      </section>
      {/* <section id='connect' className='relative -mt-48 items-center'>

        <br />
        <p>
          
          Our mission is to make communities stronger. Everything we do, we try
          to enable and empower existing communities and their members. We also
          believe in the power of play.
          <br />
          <br />
          PLAYMINT is an on-chain game engine made for existing NFTs and their
          communities. Plug in your favorite NFT and launch your own game for your own community
          today.
        </p>
      </section> */}
      <section>
        <Divider />
      </section>

{/* 
      <section id='hero' className='relative  items-center pt-8'>
        <p className=''>Creating Games will be Phase 2 of this Prototype.</p>
        <p className=''>2.  Choose NFTs.</p>
        <p className=''>3.  Deploy.</p>

        <p className='pt-12'> someday lol.  Today, just enter a name, hit deploy, and find your game in discover to get the prototype running.</p>
        <form onSubmit={handleCreateGame} className='pt-8'>
          <div className='text-3xl py-8'>create a Game</div>
          <p>
            <input name="displayName" placeholder="My New Game" required className='text-slate-900' />
          </p>
          <p>
            <button className="pl-4 border-slate-400 border-[2px] px-24 py-4 mt-4"
              disabled={createGameisPending}
              type="submit">
              {createGameisPending ? 'Confirming...' : `Deploy game on ${deploy.chain}`}
            </button>
          </p>
          {createGameHash && <div>Transaction Hash: {createGameHash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {createGameError && (
            <div>Error: {(createGameError as BaseError).shortMessage || createGameError.message}</div>
          )}

        </form>


      </section> */}
    </main>
  );
}
