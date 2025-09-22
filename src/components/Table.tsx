import { useState } from "react";
import type { User } from "@/pages/Home";
import { PaymeSwissCard } from "@/components/PaymeSwissCard";

type TableProps = {
	users?: User[];
	currentUser?: User;
	showAverage?: boolean;
};

export const Table = ({
	users = [],
	currentUser,
	showAverage = false,
}: TableProps) => {
	const [shakingUserId, setShakingUserId] = useState<number | null>(null);
	const [showMyCard, setShowMyCard] = useState<boolean>(false);

	const votedUsers = users.filter((user) => user.hasVoted && user.vote);

	const handleCardClick = (user: User) => {
		if (user.id === currentUser?.id) {
			setShowMyCard(!showMyCard);
		} else {
			setShakingUserId(user.id);
			setTimeout(() => setShakingUserId(null), 600);
		}
	};

	return (
		<div className="w-full max-w-4xl mx-auto">
			<div className="bg-blue-100 rounded-xl border-2 border-blue-200 p-6 min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]">
				{votedUsers.length > 0 ? (
					<div className="h-full flex flex-col items-center justify-center">
						<div className="text-sm sm:text-base text-blue-600 font-medium mb-4">
							{votedUsers.length} {votedUsers.length === 1 ? "vote" : "votes"}{" "}
							cast
						</div>
						<div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center max-w-full">
							{votedUsers.map((user) => {
								const isShaking = shakingUserId === user.id;
								const isCurrentUser = user.id === currentUser?.id;
								const shouldShowFront =
									showAverage || (isCurrentUser && showMyCard);

								return (
									<div
										key={user.id}
										className={`transform transition-all duration-200 hover:scale-105 ${
											isShaking ? "animate-shake" : ""
										} cursor-pointer scale-75 sm:scale-90 lg:scale-100`}
										onClick={() => handleCardClick(user)}
										title={`${user.name}'s vote`}>
										<PaymeSwissCard
											value={shouldShowFront ? user.vote! : "?"}
											isSelected={false}
											showBack={!shouldShowFront}
											onClick={() => {}}
										/>
									</div>
								);
							})}
						</div>
					</div>
				) : (
					<div className="h-full flex items-center justify-center">
						<div className="text-blue-400 text-sm sm:text-base">
							Waiting for votes...
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
