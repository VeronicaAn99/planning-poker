import type { User } from "@/pages/Home";
import { PaymeSwissCard } from "./PaymeSwissCard";

type UsersSidebarProps = {
	users: User[];
	addRandomUser: () => void;
	currentUser: User;
};

// TODO: Add ping users for the ones who are waiting
export const UsersSidebar = ({
	users,
	addRandomUser,
	currentUser,
}: UsersSidebarProps) => {
	return (
		users.length > 0 && (
			<div className="w-80 bg-white border-l border-gray-200 flex flex-col">
				<div className="p-4 border-b border-gray-200">
					<h2 className="text-md font-semibold text-gray-800">
						Players ({users.length})
					</h2>
				</div>

				<div className="flex-1 overflow-y-auto p-4">
					<div className="space-y-3">
						{users.map((user) => (
							<div
								key={user.id}
								className={`p-3 rounded-lg border-2 transition-all duration-200 ${
									user.hasVoted
										? "border-green-300 bg-green-50"
										: "border-yellow-300 bg-yellow-50"
								}`}>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div
											className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${
												user.hasVoted ? "bg-green-500" : "bg-yellow-500"
											}`}>
											{user.name.charAt(0).toUpperCase()}
										</div>
										<div>
											<div className="font-medium text-gray-800">
												{user.name}
											</div>
											<span
												className={`text-xs px-2 py-1 rounded-full font-medium ${
													user.hasVoted
														? "bg-green-200 text-green-800"
														: "bg-yellow-200 text-yellow-800"
												}`}>
												{user.hasVoted ? "Voted" : "Waiting"}
											</span>
										</div>
									</div>
									{
										user.vote &&
											// <div className="scale-50">
											(user.id === currentUser?.id && user.vote ? (
												<PaymeSwissCard
													size="small"
													value={user.vote}
													isSelected={false}
													showBack={false}
													onClick={() => {}}
												/>
											) : (
												<PaymeSwissCard
													value="?"
													size="small"
													isSelected={false}
													showBack={true}
													onClick={() => {}}
												/>
											))
										// </div>
									}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3">
					<div className="flex justify-between items-center text-sm text-gray-600">
						<span>Voted: {users.filter((u) => u.hasVoted).length}</span>
						<span>Waiting: {users.filter((u) => !u.hasVoted).length}</span>
					</div>

					<button
						onClick={addRandomUser}
						className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
						<span className="mr-2">➕</span>
						Add Random User (+1)
					</button>
				</div>
			</div>
		)
	);
};
