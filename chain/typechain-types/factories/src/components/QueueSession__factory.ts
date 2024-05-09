/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  QueueSession,
  QueueSessionInterface,
} from "../../../src/components/QueueSession";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "queueSize",
        type: "uint256",
      },
    ],
    name: "JoinedQueue",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "player1",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "player2",
        type: "address",
      },
    ],
    name: "MatchMade",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "abis",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "functions",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IGame",
        name: "game",
        type: "address",
      },
    ],
    name: "getPlayerCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSummary",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "component",
            type: "address",
          },
          {
            internalType: "string[]",
            name: "functions",
            type: "string[]",
          },
          {
            internalType: "string[]",
            name: "abis",
            type: "string[]",
          },
          {
            internalType: "string[]",
            name: "required",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "displayName",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
        ],
        internalType: "struct ComponentSummary",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "game",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "executor",
        type: "address",
      },
      {
        internalType: "address",
        name: "gameAddress",
        type: "address",
      },
    ],
    name: "joinGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "required",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "executor",
        type: "address",
      },
      {
        internalType: "address",
        name: "gameAddress",
        type: "address",
      },
    ],
    name: "setMatchOrWait",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405260405180604001604052806040518060400160405280600c81526020017f706c61796572506172616d73000000000000000000000000000000000000000081525081526020016040518060400160405280600a81526020017f6e657874506c6179657200000000000000000000000000000000000000000000815250815250600090600262000095929190620001ce565b5060405180604001604052806040518060400160405280600881526020017f6a6f696e47616d6500000000000000000000000000000000000000000000000081525081526020016040518060400160405280600e81526020017f7365744d617463684f7257616974000000000000000000000000000000000000815250815250600190600262000127929190620001ce565b5060405180604001604052806040518060400160405280601981526020017f6a6f696e47616d6528616464726573732c61646472657373290000000000000081525081526020016040518060400160405280601f81526020017f7365744d617463684f725761697428616464726573732c6164647265737329008152508152506002906002620001b9929190620001ce565b50348015620001c757600080fd5b506200061c565b8280548282559060005260206000209081019282156200021b579160200282015b828111156200021a57825182908162000209919062000535565b5091602001919060010190620001ef565b5b5090506200022a91906200022e565b5090565b5b8082111562000252576000818162000248919062000256565b506001016200022f565b5090565b508054620002649062000324565b6000825580601f1062000278575062000299565b601f0160209004906000526020600020908101906200029891906200029c565b5b50565b5b80821115620002b75760008160009055506001016200029d565b5090565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200033d57607f821691505b602082108103620003535762000352620002f5565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620003bd7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200037e565b620003c986836200037e565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600062000416620004106200040a84620003e1565b620003eb565b620003e1565b9050919050565b6000819050919050565b6200043283620003f5565b6200044a62000441826200041d565b8484546200038b565b825550505050565b600090565b6200046162000452565b6200046e81848462000427565b505050565b5b8181101562000496576200048a60008262000457565b60018101905062000474565b5050565b601f821115620004e557620004af8162000359565b620004ba846200036e565b81016020851015620004ca578190505b620004e2620004d9856200036e565b83018262000473565b50505b505050565b600082821c905092915050565b60006200050a60001984600802620004ea565b1980831691505092915050565b6000620005258383620004f7565b9150826002028217905092915050565b6200054082620002bb565b67ffffffffffffffff8111156200055c576200055b620002c6565b5b62000568825462000324565b620005758282856200049a565b600060209050601f831160018114620005ad576000841562000598578287015190505b620005a4858262000517565b86555062000614565b601f198416620005bd8662000359565b60005b82811015620005e757848901518255600182019150602085019450602081019050620005c0565b8683101562000607578489015162000603601f891682620004f7565b8355505b6001600288020188555050505b505050505050565b61181f806200062c6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c806346d21dfe1161005b57806346d21dfe1461012757806393dae5eb14610157578063c4d66de814610173578063eac0bd901461018f57610088565b80631b73f8301461008d5780633e4acdcc146100bd5780634051ddac146100d9578063467e4a2f146100f7575b600080fd5b6100a760048036038101906100a29190610f60565b6101bf565b6040516100b4919061101d565b60405180910390f35b6100d760048036038101906100d2919061109d565b61026b565b005b6100e16105ff565b6040516100ee919061129d565b60405180910390f35b610111600480360381019061010c91906112fd565b61090f565b60405161011e9190611339565b60405180910390f35b610141600480360381019061013c9190610f60565b6109fe565b60405161014e919061101d565b60405180910390f35b610171600480360381019061016c919061109d565b610aaa565b005b61018d60048036038101906101889190611354565b610daf565b005b6101a960048036038101906101a49190610f60565b610e2d565b6040516101b6919061101d565b60405180910390f35b600081815481106101cf57600080fd5b9060005260206000200160009150905080546101ea906113b0565b80601f0160208091040260200160405190810160405280929190818152602001828054610216906113b0565b80156102635780601f1061023857610100808354040283529160200191610263565b820191906000526020600020905b81548152906001019060200180831161024657829003601f168201915b505050505081565b600081905060008173ffffffffffffffffffffffffffffffffffffffff1663070c412b6040518163ffffffff1660e01b81526004016102a99061142d565b602060405180830381865afa1580156102c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102ea9190611462565b905060008173ffffffffffffffffffffffffffffffffffffffff1663ce348c6f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610339573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061035d91906114a4565b036103735761036c8484610aaa565b50506105fb565b60008273ffffffffffffffffffffffffffffffffffffffff1663070c412b6040518163ffffffff1660e01b81526004016103ac9061151d565b602060405180830381865afa1580156103c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ed9190611462565b905060008173ffffffffffffffffffffffffffffffffffffffff1663313cf08e876040518263ffffffff1660e01b815260040161042a9190611598565b602060405180830381865afa158015610447573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061046b9190611462565b905060008373ffffffffffffffffffffffffffffffffffffffff166304a936056040518163ffffffff1660e01b81526004016020604051808303816000875af11580156104bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104e09190611462565b90508273ffffffffffffffffffffffffffffffffffffffff16631d4f229b88846040518363ffffffff1660e01b815260040161051d929190611612565b600060405180830381600087803b15801561053757600080fd5b505af115801561054b573d6000803e3d6000fd5b505050508273ffffffffffffffffffffffffffffffffffffffff16631d4f229b88836040518363ffffffff1660e01b815260040161058a92919061169a565b600060405180830381600087803b1580156105a457600080fd5b505af11580156105b8573d6000803e3d6000fd5b505050507fa1ddd412b0fb81f952dd7bfe7de90b060401a58be3c29e323faa99a58e45a3ba82826040516105ed9291906116d6565b60405180910390a150505050505b5050565b610607610ed9565b6040518060c001604052803073ffffffffffffffffffffffffffffffffffffffff1681526020016001805480602002602001604051908101604052809291908181526020016000905b828210156106fc57838290600052602060002001805461066f906113b0565b80601f016020809104026020016040519081016040528092919081815260200182805461069b906113b0565b80156106e85780601f106106bd576101008083540402835291602001916106e8565b820191906000526020600020905b8154815290600101906020018083116106cb57829003601f168201915b505050505081526020019060010190610650565b5050505081526020016002805480602002602001604051908101604052809291908181526020016000905b828210156107d3578382906000526020600020018054610746906113b0565b80601f0160208091040260200160405190810160405280929190818152602001828054610772906113b0565b80156107bf5780601f10610794576101008083540402835291602001916107bf565b820191906000526020600020905b8154815290600101906020018083116107a257829003601f168201915b505050505081526020019060010190610727565b5050505081526020016000805480602002602001604051908101604052809291908181526020016000905b828210156108aa57838290600052602060002001805461081d906113b0565b80601f0160208091040260200160405190810160405280929190818152602001828054610849906113b0565b80156108965780601f1061086b57610100808354040283529160200191610896565b820191906000526020600020905b81548152906001019060200180831161087957829003601f168201915b5050505050815260200190600101906107fe565b5050505081526020016040518060400160405280600d81526020017f51756575652053657373696f6e0000000000000000000000000000000000000081525081526020016040518060600160405280603a81526020016117b0603a9139815250905090565b60008173ffffffffffffffffffffffffffffffffffffffff1663070c412b6040518163ffffffff1660e01b81526004016109489061142d565b602060405180830381865afa158015610965573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109899190611462565b73ffffffffffffffffffffffffffffffffffffffff1663ce348c6f6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156109d3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f791906114a4565b9050919050565b60028181548110610a0e57600080fd5b906000526020600020016000915090508054610a29906113b0565b80601f0160208091040260200160405190810160405280929190818152602001828054610a55906113b0565b8015610aa25780601f10610a7757610100808354040283529160200191610aa2565b820191906000526020600020905b815481529060010190602001808311610a8557829003601f168201915b505050505081565b60008082905060008173ffffffffffffffffffffffffffffffffffffffff1663070c412b6040518163ffffffff1660e01b8152600401610ae99061151d565b602060405180830381865afa158015610b06573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b2a9190611462565b90508073ffffffffffffffffffffffffffffffffffffffff1663313cf08e866040518263ffffffff1660e01b8152600401610b659190611598565b602060405180830381865afa158015610b82573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ba69190611462565b92508173ffffffffffffffffffffffffffffffffffffffff1663070c412b6040518163ffffffff1660e01b8152600401610bdf9061142d565b602060405180830381865afa158015610bfc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c209190611462565b73ffffffffffffffffffffffffffffffffffffffff16638f807f6b846040518263ffffffff1660e01b8152600401610c5891906116ff565b600060405180830381600087803b158015610c7257600080fd5b505af1158015610c86573d6000803e3d6000fd5b505050507f2a0cf68fb8eff8bff9b991c78bb921b9214ce5cc99496b8ac04885ff0e37ae23838373ffffffffffffffffffffffffffffffffffffffff1663070c412b6040518163ffffffff1660e01b8152600401610ce39061142d565b602060405180830381865afa158015610d00573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d249190611462565b73ffffffffffffffffffffffffffffffffffffffff1663ce348c6f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610d6e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d9291906114a4565b604051610da092919061171a565b60405180910390a15050505050565b8073ffffffffffffffffffffffffffffffffffffffff1663a343aec16040518163ffffffff1660e01b8152600401610de69061178f565b6020604051808303816000875af1158015610e05573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e299190611462565b5050565b60018181548110610e3d57600080fd5b906000526020600020016000915090508054610e58906113b0565b80601f0160208091040260200160405190810160405280929190818152602001828054610e84906113b0565b8015610ed15780601f10610ea657610100808354040283529160200191610ed1565b820191906000526020600020905b815481529060010190602001808311610eb457829003601f168201915b505050505081565b6040518060c00160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160608152602001606081526020016060815260200160608152602001606081525090565b600080fd5b6000819050919050565b610f3d81610f2a565b8114610f4857600080fd5b50565b600081359050610f5a81610f34565b92915050565b600060208284031215610f7657610f75610f25565b5b6000610f8484828501610f4b565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610fc7578082015181840152602081019050610fac565b60008484015250505050565b6000601f19601f8301169050919050565b6000610fef82610f8d565b610ff98185610f98565b9350611009818560208601610fa9565b61101281610fd3565b840191505092915050565b600060208201905081810360008301526110378184610fe4565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061106a8261103f565b9050919050565b61107a8161105f565b811461108557600080fd5b50565b60008135905061109781611071565b92915050565b600080604083850312156110b4576110b3610f25565b5b60006110c285828601611088565b92505060206110d385828601611088565b9150509250929050565b6110e68161105f565b82525050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600082825260208201905092915050565b600061113482610f8d565b61113e8185611118565b935061114e818560208601610fa9565b61115781610fd3565b840191505092915050565b600061116e8383611129565b905092915050565b6000602082019050919050565b600061118e826110ec565b61119881856110f7565b9350836020820285016111aa85611108565b8060005b858110156111e657848403895281516111c78582611162565b94506111d283611176565b925060208a019950506001810190506111ae565b50829750879550505050505092915050565b600060c08301600083015161121060008601826110dd565b50602083015184820360208601526112288282611183565b915050604083015184820360408601526112428282611183565b9150506060830151848203606086015261125c8282611183565b915050608083015184820360808601526112768282611129565b91505060a083015184820360a08601526112908282611129565b9150508091505092915050565b600060208201905081810360008301526112b781846111f8565b905092915050565b60006112ca8261105f565b9050919050565b6112da816112bf565b81146112e557600080fd5b50565b6000813590506112f7816112d1565b92915050565b60006020828403121561131357611312610f25565b5b6000611321848285016112e8565b91505092915050565b61133381610f2a565b82525050565b600060208201905061134e600083018461132a565b92915050565b60006020828403121561136a57611369610f25565b5b600061137884828501611088565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806113c857607f821691505b6020821081036113db576113da611381565b5b50919050565b7f6e657874506c6179657200000000000000000000000000000000000000000000600082015250565b6000611417600a83610f98565b9150611422826113e1565b602082019050919050565b600060208201905081810360008301526114468161140a565b9050919050565b60008151905061145c81611071565b92915050565b60006020828403121561147857611477610f25565b5b60006114868482850161144d565b91505092915050565b60008151905061149e81610f34565b92915050565b6000602082840312156114ba576114b9610f25565b5b60006114c88482850161148f565b91505092915050565b7f706c61796572506172616d730000000000000000000000000000000000000000600082015250565b6000611507600c83610f98565b9150611512826114d1565b602082019050919050565b60006020820190508181036000830152611536816114fa565b9050919050565b6115468161105f565b82525050565b7f706c617965720000000000000000000000000000000000000000000000000000600082015250565b6000611582600683610f98565b915061158d8261154c565b602082019050919050565b60006040820190506115ad600083018461153d565b81810360208301526115be81611575565b905092915050565b7f706c617965723100000000000000000000000000000000000000000000000000600082015250565b60006115fc600783610f98565b9150611607826115c6565b602082019050919050565b6000606082019050611627600083018561153d565b8181036020830152611638816115ef565b9050611647604083018461153d565b9392505050565b7f706c617965723200000000000000000000000000000000000000000000000000600082015250565b6000611684600783610f98565b915061168f8261164e565b602082019050919050565b60006060820190506116af600083018561153d565b81810360208301526116c081611677565b90506116cf604083018461153d565b9392505050565b60006040820190506116eb600083018561153d565b6116f8602083018461153d565b9392505050565b6000602082019050611714600083018461153d565b92915050565b600060408201905061172f600083018561153d565b61173c602083018461132a565b9392505050565b7f517565756553657373696f6e456e746974790000000000000000000000000000600082015250565b6000611779601283610f98565b915061178482611743565b602082019050919050565b600060208201905081810360008301526117a88161176c565b905091905056fe416c6c6f7720706c617965727320746f206a6f696e206120717565756520616e64206d617463682077697468206f7468657220706c6179657273a2646970667358221220eb75bb8d569728126b4470a3e67e3fc847376dd3e407de0322df0e30d1917a7c64736f6c63430008180033";

type QueueSessionConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: QueueSessionConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class QueueSession__factory extends ContractFactory {
  constructor(...args: QueueSessionConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      QueueSession & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): QueueSession__factory {
    return super.connect(runner) as QueueSession__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): QueueSessionInterface {
    return new Interface(_abi) as QueueSessionInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): QueueSession {
    return new Contract(address, _abi, runner) as unknown as QueueSession;
  }
}
