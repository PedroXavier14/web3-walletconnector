import { getSession, signOut } from 'next-auth/react';
// Gets a prop from getServerSideProps
function User({ user }) {
    return (
        <div>
            <h4>User session:</h4>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button onClick={() => signOut({ redirect: '/signin' })}>Sign out</button>
        </div>
    );
}
export async function getServerSideProps(context) {
    const session = await getSession(context);
    
    // Redirect if not authenticated
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
export default User;
