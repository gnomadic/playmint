"use client"

import { useMetadata } from '@/hooks/useMetadata';
import { censor, pretty } from '../../domain/utils';
import { Address, createPublicClient, createWalletClient, http, parseAbi } from 'viem';
import { ComponentMetadata, ComponentMetadataFunction } from '@/domain/Domain';
import { createConfig, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { readContract } from 'viem/actions';
import { config } from '@/domain/WagmiConfig';
import { GameABI } from '@/domain/abi/GameABI';
import { baseSepolia, localhost } from 'viem/chains';
import useDeployment from '@/hooks/useDeployment';


type ModuleCardProps = {
  address: Address;
  metadata: string;
  index: number;
  gameAddress: Address;
}


export default function ModuleFunctionCard(props: ModuleCardProps) {
  const { data } = useMetadata<ComponentMetadata>(props.metadata);

  return (
    <div className='border-2 border-gray-500'>
      <div className='border-b-2 border-white text-2xl pl-4 py-2'>
        {props.index + 1}{"/"}{data ? censor(data.name) : "loading"}
      </div>
      <div className='grid grid-cols-1  gap-8 py-12 md:py-24'>

        {Array.from({ length: data?.configFunctions.length as number }).map((object, i) => {
          return (
            <ConfigFunctionCard
              key={i}
              index={i}
              funct={data?.configFunctions[i]!}
              address={props.address}
              gameAddress={props.gameAddress}
            />
          );
        })}
        {Array.from({ length: data?.readFunctions.length as number }).map((object, i) => {
          return (
            <ConfigViewCard
              key={i}
              index={i}
              funct={data?.readFunctions[i]!}
              address={props.address}
              gameAddress={props.gameAddress}
            />
          );
        })}

      </div>
    </div>
  );
}



type ConfigFunctionCardProps = {
  // displayName: string;
  index: number;
  funct: ComponentMetadataFunction
  address: Address;
  gameAddress: Address;

}

function ConfigFunctionCard(props: ConfigFunctionCardProps) {

  // const [args, setArgs] = useState<any[]>([props.gameAddress])
  const { data: hash, error: err, isPending: pending, writeContract } = useWriteContract()
  const { isLoading, isSuccess, data } = useWaitForTransactionReceipt({ hash })


  async function executeFunction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();


    let args = [];

    for (let i = 0; i < props.funct.requires.length; i++) {
      args.push((e.currentTarget.elements.namedItem(i.toString()) as HTMLInputElement).value)
    }
    let functionName = props.funct.abi.split("(")[0];

    console.log("Executing function");

    writeContract({
      abi: parseAbi(["function " + props.funct.abi]),
      address: props.address,
      functionName: functionName,
      args: args,
    })



  }

  useEffect(() => {
    if (err) {
      toast.error(err.message)
    }
    if (isLoading) {
      toast.info("Transaction is pending");

    }
    if (isSuccess) {
      toast.success("Transaction is successful");
    }
  }
    , [err, isLoading, isSuccess])




  return (
    <div className='border-2 border-gray-500 mx-12'>
      {/* <div className='border-b-2 border-white text-2xl pl-4 py-2'> */}
      <div className='pt-5 pl-5 text-lg border-b-2 border-white '>

        {props.index + 1}{"/"}{props.funct.name}
      </div>
      <div className='pt-5 pb-2 pl-2 text-sm'>
        {censor(props.funct.description)}
      </div>
      <form onSubmit={executeFunction} className='pt-8 px-4 '>
        {Array.from({ length: props.funct.requires.length as number }).map((object, i) => {
          return <div key={i} className=''>
            <label htmlFor="gameName" className="block mb-2 text-sm text-white text-start">
              {props.funct.requires[i]}
            </label>
            <input type="text"
              id={i.toString()}
              className="w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
              placeholder={props.funct.requires[i]}
              defaultValue={props.funct.requires[i] === "gameAddress" ? props.gameAddress : ""} />
          </div>
        })}
        <div className='pt-4'>
          <button className="px-12 border-slate-400 border-[2px] py-4 mt-4 mb-12"
            // disabled={createGameisPending}
            type="submit">
            Execute
            {/* {createGameisPending ? 'Confirming...' : `Deploy game on ${deploy.chain}`} */}
          </button>
        </div>
      </form>
    </div>
  );
}

function ConfigViewCard(props: ConfigFunctionCardProps) {

  // const [args, setArgs] = useState<any[]>([props.gameAddress])
  const { data: hash, error: err, isPending: pending, writeContract } = useWriteContract()
  const { isLoading, isSuccess, data } = useWaitForTransactionReceipt({ hash })

  const {deploy} = useDeployment();

  // const [abi, setABI] = useState<string>("")
  // const [address, setAddress] = useState<Address>("0x0");
  // const [functionName, setFunctionName] = useState<string>("")
  // const [args, setArgs] = useState<any[]>([])

  // const {data: read} = useReadContract({  
  //   abi,
  //   address: address,
  //   functionName: functionName,
  //   args: args,
  // });


  // const {data: read} = useReadContract()

  async function executeFunction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();


    let args = [];

    for (let i = 0; i < props.funct.requires.length; i++) {
      args.push((e.currentTarget.elements.namedItem(i.toString()) as HTMLInputElement).value)
    }
    let functionName = props.funct.abi.split("(")[0];

    console.log("Executing function");

    // writeContract({
    //   abi: parseAbi(["function " + props.funct.abi]),
    //   address: props.address,
    //   functionName: functionName,
    //   args: args,
    // })
    // const client = createPublicClient(config);

    // const wconf = createWalletClient({transport: config.transports, });


    const readConfig = createConfig({
      chains: config.chains,
      transports: config.transports,
    })

    const publicClient = createPublicClient({
      chain: deploy.viemChain,
      transport: deploy.viemTransport
    })


    // const data = await client.readContract({
    //   address: props.address,
    //   abi: parseAbi(["function " + props.funct.abi]),
    //   functionName: functionName,
    //   args: args,
    // })

    console.log("args are " + args)
    console.log("function name is " + functionName)
    console.log("address is " + props.address)
    console.log("abi is " + "function " +  props.funct.abi)
    

    const data = await readContract(publicClient, {
      address: props.address,
      abi: parseAbi(["function " + props.funct.abi + " view returns (uint256)"]),
      functionName: functionName,
      args: args
    })

    console.log("resonse is " + data)
    // const result = await readContract(config, {
    //   abi: parseAbi(["function " + props.funct.abi]),
    //   address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    //   functionName: 'totalSupply',
    // })



  }

  useEffect(() => {
    if (err) {
      toast.error(err.message)
    }
    if (isLoading) {
      toast.info("Transaction is pending");

    }
    if (isSuccess) {
      toast.success("Transaction is successful");
    }
  }
    , [err, isLoading, isSuccess])




  return (
    <div className='border-2 border-gray-500 mx-12'>
      {/* <div className='border-b-2 border-white text-2xl pl-4 py-2'> */}
      <div className='pt-5 pl-5 text-lg border-b-2 border-white '>

        {props.index + 1}{"/"}{props.funct.name}
      </div>
      <div className='pt-5 pb-2 pl-2 text-sm'>
        {censor(props.funct.description)}
      </div>
      <form onSubmit={executeFunction} className='pt-8 px-4 '>
        {Array.from({ length: props.funct.requires.length as number }).map((object, i) => {
          return <div key={i} className=''>
            <label htmlFor="gameName" className="block mb-2 text-sm text-white text-start">
              {props.funct.requires[i]}
            </label>
            <input type="text"
              id={i.toString()}
              className="w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
              placeholder={props.funct.requires[i]}
              defaultValue={props.funct.requires[i] === "gameAddress" ? props.gameAddress : ""}
            />
          </div>
        })}
        <div className='pt-4'>
          <button className="px-12 border-slate-400 border-[2px] py-4 mt-4 mb-12"
            // disabled={createGameisPending}
            type="submit">
            Execute
            {/* {createGameisPending ? 'Confirming...' : `Deploy game on ${deploy.chain}`} */}
          </button>
        </div>
      </form>
    </div>
  );
}
