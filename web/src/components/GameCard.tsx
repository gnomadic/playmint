import { Deployment, GameMetadata, GameSummary } from '@/domain/Domain';
import { GlobeAltIcon } from '@heroicons/react/20/solid';
import { censor, pretty } from '../domain/utils';
import Link from 'next/link';
import { Address } from 'viem';
import { useReadGameMetadata } from '@/generated';
import { useMetadata } from '@/hooks/useMetadata';



type GameCardProps = {
  deployment: Deployment;
  metadata: string;
  gm: Address;
  address: Address;
}


export default function GameCard(props: GameCardProps) {
  const { data } = useMetadata<GameMetadata>(props.metadata);

  return (
    <Link href={`/game/${props.deployment.chainId}/${props.address}`}>
      <div className='justify-center border-2 border-gray-300 rounded-md bg-slate-800'>
        <div className='justify-center bg-slate-800'>
          <div className='pt-5 pl-8 text-3xl'>
            { data ? censor(data.name) : "loading" }
            
          </div>
          <div className='pt-6 pb-2 pl-4'>
            created by: {pretty(props.gm)}
          </div>
          <div className='pt-5 pb-2 pl-4 text-lg'>
            {data && data.description.length > 0 ? censor(data?.description) : "No description available"}
          </div>
        </div>
      </div>
    </Link>
  );
}
