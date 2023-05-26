import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";

function SignIn() {
  const { connectAsync } = useConnect({
    connector: new WalletConnectConnector({
      options: { projectId: "xxx", showQrModal: true },
    }),
  });
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { push } = useRouter();

  const handleAuth = async () => {
    try {
      if (isConnected) {
        await disconnectAsync();
      }
  
      const { account, chain } = await connectAsync();
  
      const { message } = await requestChallengeAsync({
        address: account,
        chainId: chain.id,
      });
  
      const signature = await signMessageAsync({ message });
  
      // redirect user after success authentication to '/user' page
      const { url } = await signIn("moralis-auth", {
        message,
        signature,
        redirect: false,
        callbackUrl: "/",
      });
      /**
       * instead of using signIn(..., redirect: "/user")
       * we get the url from callback and push it to the router to avoid page refreshing
       */
      push(url);
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div>
      <h3>Web3 Authentication</h3>
      <button onClick={handleAuth}>Authenticate via WalletConnect</button>
    </div>
  );
}

export default SignIn;