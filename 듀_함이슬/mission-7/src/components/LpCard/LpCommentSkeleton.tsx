const LpCommentSkeleton = () => {
    return (
        <div className="flex items-start gap-3 p-4 pt-5 animate-pulse">
            <div className="w-10 h-10 bg-gray-500 rounded-full flex-shrink-0"></div>
            <div className="flex-grow">
                <div className="h-4 bg-gray-400 rounded-lg w-1/4"></div>
                <div className="h-4 bg-gray-400 rounded-lg w-3/4 mt-1"></div>
            </div>
        </div>
    )
}

export default LpCommentSkeleton
