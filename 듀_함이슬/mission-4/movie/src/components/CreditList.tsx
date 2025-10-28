import type { credits } from "../types/movie"

type CreditListProps = {
    credits: credits;
};

export const CreditList = ({ credits }: CreditListProps) => {
    return (
        <div className="p-8">

            <h1 className="text-3xl font-extrabold text-white mb-12">감독/출연</h1>

            <div className="flex flex-wrap gap-10 justify-center">
                {credits?.cast
                    .map((member, index) => (
                        <div key={`cast-${member.id}-${index}`} className="flex flex-col items-center w-30">
                            {/* 출연진 프로필 */}
                            {member.profile_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                                    alt={member.name}
                                    className="w-20 h-20 object-cover rounded-full 
                                    mb-2 mx-auto border-2 border-white" />
                            ) : (
                                <div className="w-20 h-20 bg-black rounded-full mb-2 
                                mx-auto border-2 border-white" />
                            )}
                            {/* 출연진 이름, 역할 */}
                            <p className="text-sm text-white text-center">{member.name}</p>
                            <p className="text-sm text-white text-center">({member.known_for_department})</p>
                        </div>
                    ))}

                {credits?.crew
                    .map((member, index) => (
                        <div key={`crew-${member.id}-${index}`} className="flex flex-col items-center w-30">
                            {member.profile_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                                    alt={member.name}
                                    className="w-20 h-20 object-cover rounded-full 
                                    mb-2 mx-auto border-2 border-white" />
                            ) : (
                                <div className="w-20 h-20 bg-black rounded-full 
                                mb-2 mx-auto border-2 border-white" />
                            )}
                            <p className="text-sm text-white text-center">{member.name}</p>
                            <p className="text-sm text-white text-center">({member.known_for_department})</p>
                        </div>
                    ))}
            </div>

        </div>
    );

};

export default CreditList;