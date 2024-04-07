import { ACTION_HELLO, QUERY_ACTION, QUERY_GAME } from "@/domain/Domain";
import { getFrameHtmlResponse, getFrameMessage } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "next/og";


// export async function POST(request: NextRequest) {
//     const body = await request.json();
//     const { isValid, message } = await getFrameMessage(body);
//     if (!isValid || !message) {
//       return new NextResponse('Frame Message is invalid!', { status: 400 });
//     }
    
//     let ethAddress = message.interactor.verified_addresses;
// }




export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
    // const action = request.nextUrl.searchParams.get(QUERY_ACTION);
    // // const game = request.nextUrl.searchParams.get(QUERY_GAME);
    // if (!action) {
    //   return new NextResponse('action or game query params are invalid!', { status: 400 });
    // }

    return new NextResponse(    getFrameHtmlResponse({
      buttons: [
        {
          label: `We love BOAT`,
        },
      ],
      image: 'https://cyan-fiscal-mackerel-412.mypinata.cloud/ipfs/QmbuoqRAJKXrZb2f1yvCxZUmj4YyXqfhC1iTXVpWRPvF1s',
      postUrl: 'http://localhost:3000/game/11155111/0xd362776F706b8E72525e3291e5433A695ECBefA7/frame?action=hi',
    }),);

    // if (action === ACTION_HELLO){
        // return new ImageResponse((
        //     <div style={{
        //       display: 'flex',
        //       flexDirection: 'column',
        //       backgroundColor: 'black',
        //       width: '100%',
        //       height: '100%',
        //       padding: '20px',
        //       justifyContent: 'center'
        //     }}>
        //       <div style={{fontSize: "48px", color: "white", marginBottom: '10px'}}>Mint an NFT and Claim Your Reward</div>
        //       <div style={{fontSize: "24px", color: "white"}}>Click below to check if you&apos;re eligible and then mint and
        //         claim!
        //       </div>
        //     </div>
        //   ), {width: 600, height: 400});
    // }
}


  



