"use client"
import { Address } from 'viem';
import Divider from '../Divider';
import { useReadGameFlows, useReadGameGetFlows, useReadGameGetSummary } from '@/generated';
import { useMetadata } from '@/hooks/useMetadata';
import { GameMetadata, GameSummary } from '@/domain/Domain';
import { censor, pretty } from '@/domain/utils';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';
import useDeployment from '@/hooks/useDeployment';
import SmallTitle from '../base/SmallTitle';
import ModuleCard from '../component/ModuleCard';


type StepThreeProps = {
    gameAddress: Address
}

export default function GMSection(props: StepThreeProps) {

    const { data: summary } = useReadGameGetSummary({ address: props.gameAddress });
    const { data: flows } = useReadGameFlows({ address: props.gameAddress, args: ["playRPS", BigInt(0)] });
    const { data } = useMetadata<GameMetadata>(summary?.metadata);
    const { deploy } = useDeployment();


    return (
        <section id='GMSection' className='relative items-center px-6 md:px-24 pt-24 pb-12'>
            <section>
                <SmallTitle title={'GM ONLY'} />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 py-12 md:py-24'>
                    {Array.from({ length: summary?.components.length as number }).map((object, i) => {
                        return (
                            <ModuleCard
                                key={i}
                                index={i}
                                address={summary?.componentSummaries[i].component!}
                                metadata={summary?.componentSummaries[i].metadata!}
                            />
                        );
                    })}
                </div>
            </section>
        </section>

    );
}
