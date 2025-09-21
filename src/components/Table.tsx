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
	const [shakingCenterUserId, setShakingCenterUserId] = useState<number | null>(
		null
	);
	const [shakingCircleUserId, setShakingCircleUserId] = useState<number | null>(
		null
	);

	const votedUsers = users.filter((user) => user.hasVoted && user.vote);

	const [showMyCard, setShowMyCard] = useState<boolean>(false);

	const handleCenterCardClick = (user: User) => {
		if (user.id === currentUser?.id) {
			// If it's my card, toggle showing the front
			setShowMyCard(!showMyCard);
		} else {
			// If it's not my card, shake it
			setShakingCenterUserId(user.id);
			setTimeout(() => setShakingCenterUserId(null), 600);
		}
	};

	const handleCircleCardClick = (user: User) => {
		if (user.id === currentUser?.id) {
			// If it's my card, toggle showing the front
			setShowMyCard(!showMyCard);
		} else {
			// If it's not my card, shake it
			setShakingCircleUserId(user.id);
			setTimeout(() => setShakingCircleUserId(null), 600);
		}
	};

	return (
		<div className="relative w-full h-[60%] flex items-center justify-center">
			<div className="w-[40%] h-[44%] bg-blue-100 rounded-lg border-2 border-blue-200 flex items-center justify-center">
				{votedUsers.length > 0 ? (
					<div className="text-center">
						<div className="text-sm text-blue-600 font-medium mb-2">
							{votedUsers.length} voted
						</div>
						<div className="flex flex-wrap gap-1 justify-center">
							{votedUsers.map((user) => {
								const isShaking = shakingCenterUserId === user.id;
								const isCurrentUser = user.id === currentUser?.id;
								const shouldShowFront =
									showAverage || (isCurrentUser && showMyCard);

								return (
									<div
										key={user.id}
										className={`scale-75 ${
											isShaking ? "animate-shake" : ""
										} cursor-pointer`}
										onClick={() => handleCenterCardClick(user)}>
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
					<div className="text-blue-400 text-sm">No votes yet</div>
				)}
			</div>

			{users.map((user, index) => {
				const angle = (index * 360) / users.length;
				const radius = 240;
				const x = Math.cos((angle * Math.PI) / 180) * radius;
				const y = Math.sin((angle * Math.PI) / 180) * radius;
				const isShaking = shakingCircleUserId === user.id;

				return (
					<div
						key={user.id}
						className="absolute transform -translate-x-1/2 -translate-y-1/2"
						style={{
							left: `calc(50% + ${x}px)`,
							top: `calc(50% + ${y}px)`,
						}}>
						<div className="text-center">
							{user.hasVoted ? (
								(user.id === currentUser?.id && user.vote) || showAverage ? (
									<div
										className={`mb-1 mx-auto scale-50 ${
											isShaking ? "animate-shake" : ""
										} cursor-pointer`}
										onClick={() => handleCircleCardClick(user)}>
										<PaymeSwissCard
											value={user.vote!}
											isSelected={false}
											showBack={false}
											onClick={() => {}}
										/>
									</div>
								) : user.id === currentUser?.id ? (
									<div
										className={`mb-1 mx-auto scale-50 cursor-pointer ${
											isShaking ? "animate-shake" : ""
										}`}
										onClick={() => handleCircleCardClick(user)}>
										<PaymeSwissCard
											value={showMyCard ? user.vote! : "?"}
											isSelected={false}
											showBack={!showMyCard}
											onClick={() => {}}
										/>
									</div>
								) : (
									<div
										className={`mb-1 mx-auto scale-50 ${
											isShaking ? "animate-shake" : ""
										} cursor-pointer`}
										onClick={() => handleCircleCardClick(user)}>
										<PaymeSwissCard
											value="?"
											isSelected={false}
											showBack={true}
											onClick={() => {}}
										/>
									</div>
								)
							) : (
								<div className="w-10 h-14 mb-1 mx-auto"></div>
							)}
							<div className="text-xs font-medium text-gray-700">
								{user.name}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
