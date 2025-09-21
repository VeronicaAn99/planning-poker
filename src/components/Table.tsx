import type { User } from "@/pages/Home";
import { PaymeSwissCard } from "@/components/PaymeSwissCard";

type TableProps = {
	users?: User[];
	currentUser?: User;
};

export const Table = ({ users = [], currentUser }: TableProps) => {
	const votedUsers = users.filter((user) => user.hasVoted && user.vote);

	return (
		<div className="relative w-full h-[60%] flex items-center justify-center">
			<div className="w-[40%] h-[44%] bg-blue-100 rounded-lg border-2 border-blue-200 flex items-center justify-center">
				{votedUsers.length > 0 ? (
					<div className="text-center">
						<div className="text-sm text-blue-600 font-medium mb-2">
							{votedUsers.length} voted
						</div>
						<div className="flex flex-wrap gap-1 justify-center">
							{votedUsers.map((user) => (
								<div key={user.id} className="scale-75">
									<PaymeSwissCard
										value="?"
										isSelected={false}
										showBack={true} // Always show pattern back for mystery
										onClick={() => {}}
									/>
								</div>
							))}
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
								user.id === currentUser?.id && user.vote ? (
									<div className="mb-1 mx-auto scale-50">
										<PaymeSwissCard
											value={user.vote}
											isSelected={false}
											showBack={false}
											onClick={() => {}}
										/>
									</div>
								) : (
									<div className="mb-1 mx-auto scale-50">
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
