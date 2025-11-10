import React from 'react'
import { LoadingSpinner } from './LoadingSpinner';

interface LoadingErrorProps {
    isPending: boolean;
    isError: boolean;
    isFetching?: boolean;
    refetch?: () => void;
    skeleton: React.ReactNode;
    children: React.ReactNode;
}

export default function LoadingError({
    isPending,
    isError,
    isFetching,
    refetch,
    skeleton,
    children,

}: LoadingErrorProps) {

    if (isPending) {
        return <>{skeleton}</>;
    }

    if (isError) {
        return (
            <div className="mt-20 flex flex-col items-center justify-center h-64 gap-4">
                {isFetching ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <span>Error</span>
                        {refetch && (
                            <button
                                onClick={() => refetch()}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                재시도
                            </button>
                        )}
                    </>
                )}
            </div>
        );
    }
    return <>{children}</>;
}
