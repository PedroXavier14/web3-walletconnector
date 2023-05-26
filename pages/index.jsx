import { useEvmNativeBalance } from '@moralisweb3/next';
import { getSession, signOut } from 'next-auth/react';

function HomePage({user}) {
    const { address } = user
    const { data: nativeBalance } = useEvmNativeBalance({ address });
    return (
        <div>
            <div>
                <h4>User session:</h4>
                <pre>{JSON.stringify(user, null, 2)}</pre>
                <button onClick={() => signOut({ redirect: '/signin' })}>Sign out</button>
            </div>
            <div>
                <h3>Wallet: {address}</h3>
                <h3>Native Balance: {nativeBalance?.balance.ether} ETH</h3>
            </div>
        </div>
    );
}

export async function getServerSideProps(context){
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };
    }

    return {
        props: { user: session.user },
    };
}

export default HomePage;