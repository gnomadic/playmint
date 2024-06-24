'use client';

import { GlobeAltIcon } from '@heroicons/react/20/solid';
import useDeployment from "@/hooks/useDeployment";
import { executeFlow } from '@/services/viemService';
import { gameAbi, queueSessionAbi, rewardErc20Abi, rockPaperScissorsAbi, useReadGameFactoryGetGames, useReadPvpResultGetLastGame, useReadQueueSessionGetPlayerCount, useReadQueueSessionIsPlayerInQueue, useWatchQueueSessionJoinedQueueEvent, useWatchRockPaperScissorsGameResultEvent, useWriteGame, useWriteGameExecuteFlow, watchRockPaperScissorsGameResultEvent } from '@/generated';
import { Deployment, GameFuncParams } from '@/domain/Domain';
import { useAccount, useEnsName, useWaitForTransactionReceipt } from 'wagmi';
import useThrowBall from '@/mutations/useThrowBall';
import { Abi, Address, decodeEventLog, erc20Abi, erc721Abi, zeroAddress } from 'viem';
import SmallTitle from '@/components/base/SmallTitle';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { config } from '@/domain/WagmiConfig';
import { bigIntReplacer, pretty } from '@/domain/utils';
import paper from '@/images/rockpaperscissors/paper.png';
import rock from '@/images/rockpaperscissors/rock.png';
import scissors from '@/images/rockpaperscissors/scissors.png';
import Image from 'next/image';
// import rock from '@/images/rps-rock.png';



type ResultProps = {
    deploy: Deployment;
    address: Address;
    actionmap: { num: string, value: string, image: any }[];
    selected: number;
}


export default function RPSResult(props: ResultProps) {

    let actionmap = [
        { num: "1", value: 'rock', image: '/images/rockpaperscissors/rock.png' },
        { num: "2", value: 'paper', image: '/images/rockpaperscissors/paper.png' },
        { num: "3", value: 'scissors', image: '/images/rockpaperscissors/scissors.png' },
    ]

    // const { data: games, error: gameError } = useReadGameFactoryGetGames({ address: deploy.gameFactory, args: [0] })
    const { data: queueSize, error: queueError, refetch: refetchQueuePlayers } = useReadQueueSessionGetPlayerCount({ address: props.deploy.queueComponent, args: [props.deploy.rpsGame] });
    const { data: inQueue, error: inQueueError, refetch: refetchInQueue } = useReadQueueSessionIsPlayerInQueue({ address: props.deploy.queueComponent, args: [props.deploy.rpsGame, props.address] });
    // const {data: lastGame, error: lastGameError } = useReadPvpResultGetLastGame({address: deploy.resultComponent, args: [address ? address : zeroAddress, deploy.rpsGame]});
    const { data: lastGame, error: lastGameError, refetch: refetchGetLastGame } = useReadPvpResultGetLastGame({ address: props.deploy.resultComponent, args: [props.deploy.rpsGame, props.address] });


    const { data: hash, error: writeError, writeContract } = useWriteGame();
    const { isLoading, isSuccess, data } = useWaitForTransactionReceipt({ hash })
    const { data: ens, error: ensError } = useEnsName({ address: props.address, chainId: 1 });

    const executeFlowTx = (action: number) => {
        console.log("games and address", props.address)
        if (!props.address) {
            console.log("too soon!");
            return;
        }
        console.log(action);
        const params: GameFuncParams = {
            strings: [],
            uints: [{ name: 'action', value: BigInt(action) }],
            addresses: [{ name: "player", value: props.address! }],
        }

        // const write = await executeFlow(games[0].game, "playRPS", params);
        // console.log("params", params);
        // console.log("watching for component: ", deploy.rpsComponent)
        // console.log("watching for game: ", deploy.rpsGame)
        writeContract({ address: props.deploy.rpsGame, functionName: "executeFlow", args: ["playRPS", params] });


    }

    useEffect(() => {
        if (queueError) {
            toast.error(queueError.message);
        }
        if (writeError) {
            toast.error(writeError.message);
        }
        if (isLoading) {
            toast.info("Transaction is pending");

        }
        if (isSuccess) {
            toast.success("Transaction is successful");
            refetchGetLastGame();
            refetchQueuePlayers();
            refetchInQueue();
        }
        // if (data) {
        //     console.log("data", data.logs);
        //     const MY_ABI: Abi = [...gameAbi, ...rockPaperScissorsAbi, ...rewardErc20Abi, ...queueSessionAbi, ...erc20Abi, ...erc721Abi];

        //     data.logs.map((log: any) => {
        //         try {
        //             const wat = decodeEventLog({ abi: MY_ABI, ...log });
        //             console.log(wat)
        //             if (wat.eventName == "GameResult") {
        //                 console.log("game result", wat)
        //             }
        //         } catch (e) {
        //             console.log("bad abi")
        //         }

        //     });
        // }
    }, [queueError, writeError, isLoading, isSuccess, data]);

    function inQueueView() {
        return (
            <section className=' grid gap-2 md:gap-2 grid-cols-1 md:grid-cols-3 md:px-12'>

                <div className='text-5xl md:text-6xl lg:text-8xl text-center md:col-span-3 '>
                    Waiting...
                </div>

                <div className='block md:hidden -pt-12' />
                <div className='md:block hidden pt-12 col-span-3' />
                <div className='scale-75 md:scale-100'>
                    <Image
                        className='rotate-45 mx-auto'
                        src={actionmap.find((action) => { return action.num === lastGame?.myAction.toString() })!.image}
                        alt={actionmap.find((action) => { return action.num === lastGame?.myAction.toString() })!.value}
                        width={200}
                        height={200} />
                </div>

                <div className='md:block hidden' />

                <div className='text-xl lg:text-4xl text-selected text-center -mt-8 md:mt-0 md:hidden'>
                    {pretty(props.address)}
                </div>
                <div className='-rotate-45 scale-75 md:scale-100 -scale-y-75 md:-scale-y-100 '>
                    <Image
                        className='rotate-180 '
                        src={actionmap.find((action) => { return action.num === lastGame?.opponentAction.toString() })!.image}
                        alt={actionmap.find((action) => { return action.num === lastGame?.myAction.toString() })!.value}
                        width={200}
                        height={200} />
                </div>
                <div className='text-xl lg:text-4xl text-red text-center md:hidden'>
                    Loading...
                </div>


                <div className='text-xl xl:text-4xl text-selected text-center hidden md:block'>
                    {pretty(props.address)}
                </div>
                <div className='md:block hidden' />
                <div className='text-xl xl:text-4xl text-red text-center hidden md:block' >
                    Loading...
                </div>
                <div className='md:block hidden' />
                <div className='md:block hidden' />

            </section>
        )
    }
    function inQueueViewOld() {
        return (
            <section>
                <div className='absolute top-0 left-0 p-5 text-xl text-tavernGreen'>
                    {ens ? ens : pretty(props.address)}
                </div>
                <div className='absolute bottom-0 right-0 p-5 text-xl text-red'>
                    Loading...
                </div>
                <div className='absolute top-[10%] left-[20%] rotate-45'>
                    <Image
                        src={rock}
                        alt="Rock Paper Scissors"
                        width={200}
                        height={200} />
                </div>
                <div className='absolute bottom-[25%] right-[15%] '>
                    <div className='text-xl'>
                        Waiting for Opponent
                    </div>

                </div>
                <div className='absolute text-8xl top-1/2 right-1/2 -mx-12 -my-12'>
                    vs
                </div>
            </section>
        )
    }


    function unplayedView() {
        return (
            <section>
                <div className='text-2xl p-4'>
                    Your next game
                </div>
                <div className=' grid gap-2 md:gap-2 grid-cols-1 md:grid-cols-3 md:px-12'>

                    <div className='text-5xl md:text-6xl lg:text-8xl text-center md:col-span-3 '>
                        Choose
                    </div>

                    <div className='block md:hidden -pt-12' />
                    <div className='md:block hidden pt-12 col-span-3' />
                    <div className='scale-75 md:scale-100'>
                        <Image
                            className='rotate-45 mx-auto'
                            src={props.actionmap[props.selected].image}
                            alt={props.actionmap[props.selected].value}
                            width={200}
                            height={200} />
                    </div>

                    <div className='md:block hidden' />

                    <div className='text-xl lg:text-4xl text-selected text-center -mt-8 md:mt-0 md:hidden'>
                        {pretty(props.address)}
                    </div>
                    {/* <div className='-rotate-45 scale-75 md:scale-100 -scale-y-75 md:-scale-y-100 '>
                <Image
                    className='rotate-180 '
                    src={props.actionmap[1].image}
                    alt={props.actionmap[1].value}
                    width={200}
                    height={200} />
            </div> */}
                    {/* <div className='text-xl lg:text-4xl text-red text-center md:hidden'>
                {pretty(lastGame?.opponent)}
            </div> */}
                    <div className='md:block hidden' />


                    <div className='text-xl xl:text-4xl text-selected text-center hidden md:block'>
                        {pretty(props.address)}
                    </div>
                    <div className='md:block hidden' />
                    {/* <div className='text-xl xl:text-4xl text-red text-center hidden md:block' >
                {pretty(lastGame?.opponent)}
            </div> */}
                    <div className='md:block hidden' />
                    <div className='md:block hidden' />
                </div>
            </section>
        )
    }

    function lastGameView() {
        return (
            <section>
                <div className='text-2xl p-4'>
                    Your last game
                </div>
                <div className=' grid gap-2 md:gap-2 grid-cols-1 md:grid-cols-3 md:px-12'>

                    {/* <div>{JSON.stringify(lastGame, bigIntReplacer)}</div> */}
                    <div className='text-5xl md:text-6xl lg:text-8xl text-center md:col-span-3 '>
                        {(lastGame?.winner == zeroAddress || lastGame?.myAction === lastGame?.opponentAction)  ? "Draw" : lastGame?.winner == props.address ? "Winner" : "Loser"}
                    </div>

                    <div className='block md:hidden -pt-12' />
                    <div className='md:block hidden pt-12 col-span-3' />
                    <div className='scale-75 md:scale-100'>
                        <Image
                            className='rotate-45 mx-auto'
                            src={actionmap.find((action) => { return action.num === lastGame?.myAction.toString() })!.image}
                            alt={actionmap.find((action) => { return action.num === lastGame?.myAction.toString() })!.value}
                            width={200}
                            height={200} />
                    </div>

                    <div className='md:block hidden' />

                    <div className='text-xl lg:text-4xl text-selected text-center -mt-8 md:mt-0 md:hidden'>
                        {pretty(props.address)}
                    </div>
                    <div className='-rotate-45 scale-75 md:scale-100 -scale-y-75 md:-scale-y-100 '>
                        <Image
                            className='rotate-180 '
                            src={actionmap.find((action) => { return action.num === lastGame?.opponentAction.toString() })!.image}
                            alt={actionmap.find((action) => { return action.num === lastGame?.myAction.toString() })!.value}
                            width={200}
                            height={200} />
                    </div>
                    <div className='text-xl lg:text-4xl text-red text-center md:hidden'>
                        {pretty(lastGame?.opponent)}
                    </div>


                    <div className='text-xl xl:text-4xl text-selected text-center hidden md:block'>
                        {pretty(props.address)}
                    </div>
                    <div className='md:block hidden' />
                    <div className='text-xl xl:text-4xl text-red text-center hidden md:block' >
                        {pretty(lastGame?.opponent)}
                    </div>
                    <div className='md:block hidden' />
                    <div className='md:block hidden' />

                </div>
            </section>
        )
    }

    function getView() {
        return inQueue ? inQueueView() : ((props.selected === 0 && lastGame && lastGame.opponent != zeroAddress) ? lastGameView() : unplayedView());


        // return inQueueView();
        // return unplayedView();
    }


    return (
        <section className='relative' >
            {getView()}

            <section>
                {/* <SmallTitle title={inQueue ? "Waiting for player" : Number(queueSize) == 0 ? "Join Queue" : "Play now"} /> */}
                {/* 
                {inQueue ? (
                    <div className='pt-12 text-center'>
                        you can use a second wallet to play against yourself if you want to see the experience!
                    </div>
                ) : Number(queueSize) == 0 ? (
                    <div className='pt-12 text-center'>
                        The queue is empty so after you submit your action you&apos;ll have to wait for a match!
                    </div>
                ) : (
                    <div className='pt-12 text-center'>
                        There is someone in the queue waiting so you will play immediately!
                    </div>
                )} */}


            </section>
            <section className='pt-12 md:pt-24'>
                {/* <div>{JSON.stringify(writeError?.message)}</div> */}
                {/* <SmallTitle title='STATUS' />

                {queueSize !== undefined && inQueue !== undefined ? (


                    <div className='pt-12'>
                        {inQueue ? "you are in the queue!  If you want to play, you can use a second account." : Number(queueSize) == 0 ? "the queue is empty, you'll be the first one in it!" : "There is a player waiting for you!"}
                    </div>
                ) : (
                    <div className='pt-12'>
                        Loading Queue Status
                    </div>
                )} */}

                {/* <div className='pt-12'>
                    There are {queueSize?.toString()} players in the queue.


                </div> */}
                {/* <div className='pt-12'>
                    You are in the queue: {inQueue?.toString()}


                </div> */}
                {(lastGame && lastGame.opponent != zeroAddress) ? (<div className='pt-12'>
                    {/* <SmallTitle title="last game" /> */}
                    {/* <div className="pt-12 text-2xl text-center md:pt-24">
                        Your last game was a
                    </div> */}
                    {/* <div>{JSON.stringify(lastGame, bigIntReplacer)}</div> */}
                    {/* <div className="text-4xl text-center ">
                        {lastGame?.winner == zeroAddress ? "draw" : lastGame?.winner == props.address ? "win" : "loss"}
                    </div> */}

                    {/* <div className="grid gap-8 py-8 pt-12 md:grid-cols-2 md:pt-24">
                        <div className="mx-12">
                            <div className="text-lg border-b-2 border-white ">
                                You played
                            </div>
                            <div>
                                {props.actionmap.find((action) => { return action.num === lastGame?.myAction.toString() })!.value}
                            </div>

                        </div>


                        <div className="mx-12">
                            <div className="text-lg border-b-2 border-white ">
                                your opponent, {pretty(lastGame?.opponent)}, played
                            </div>
                            <div>
                                {props.actionmap.find((action) => { return action.num === lastGame?.opponentAction.toString() })!.value}
                            </div>

                        </div>



                    </div> */}

                </div>) : (<></>)}

                {/* <div className='pt-12'>
                    error : {lastGameError?.message}
                    error2: {JSON.stringify(writeError, null, 2)}
                </div> */}
            </section>

            {/* <section className='pt-12 md:pt-24'>
                <SmallTitle title='details' />
            </section>
            <section id='intro' className='items-center p-12 md:p-18 md:pb-24'>
                <div className='flex'>
                    <div className='justify-right md:w-1/2'></div>
                    <div className='justify-right md:w-1/2 '>
                        <p>
                            This is a multiplayer game of rock-paper-scissors with matchmaking.  
                            This game was deployed using the Tavern game engine without writing any code.
                            <br />
                            <br />
                            First, the game was deployed using the Game Factory.
                            <br />
                            Then, three components were added to the game.
                            <br />
                            Finally, a Flow was created to call functions in order on all the components.
                            <br />
                            <br />
                            The buttons below will execute that created flow, passing in the players address and choice of action.
                            <br />
                            <br />
                            More details about this game can be found in the Games section.
                        </p>
                    </div>

                </div>
            </section> */}

        </section >
    );
}