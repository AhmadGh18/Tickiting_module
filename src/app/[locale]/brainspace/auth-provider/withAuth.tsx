import React, { useEffect } from 'react';
import { useAuth } from './useAuth';
import { useRouter } from 'next/navigation';
import BeatLoader from 'react-spinners/BeatLoader';
import Loader from '@/common/loader/loader';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const ComponentWithAuth: React.FC<P> = (props) => {
        const { accessToken, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !accessToken) {
                router.push('/en');
            }
        }, [accessToken, router, loading]);

        // Show a loading spinner while checking the authentication state
        if (loading) {
            return (
                <Loader />
                // <div className="flex flex-col justify-center items-center h-screen w-full">
                // <p>Loading...</p>
                //<BeatLoader color="black" size={20} /> 
                //</div>
            );
        }

        // If no access token is found, the user is redirected to login
        if (!accessToken) {
            return <Loader />;
        }

        // Otherwise, return the protected component
        return <WrappedComponent {...props} />;
    };

    ComponentWithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;
    return ComponentWithAuth;
};

// Updated getDisplayName function to accept the same generic type `P`
function getDisplayName<P>(WrappedComponent: React.ComponentType<P>): string {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;
