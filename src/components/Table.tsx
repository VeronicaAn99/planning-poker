import type { User } from "@/pages/Home";

type TableProps = {
	users?: User[];
};

export const Table = ({ users = [] }: TableProps) => {
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
								<div
									key={user.id}
									className="w-8 h-10 bg-blue-500 text-white rounded text-xs flex items-center justify-center font-bold">
									{user.vote}
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
							{user.vote && (
								<div className="w-8 h-10 bg-blue-500 text-white rounded text-xs flex items-center justify-center font-bold mb-1 mx-auto">
									{user.vote}
								</div>
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
