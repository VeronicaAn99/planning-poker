import { useState } from "react";
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
	const [isExpanded, setIsExpanded] = useState(false);

	if (users.length === 0) return null;

	return (
		<>
			{/* Mobile Toggle Button */}
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className="lg:hidden fixed top-4 right-4 z-50 bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
				<div className="flex items-center gap-2">
					<span className="text-sm font-medium">Players ({users.length})</span>
					<span
						className={`transform transition-transform ${
							isExpanded ? "rotate-180" : ""
						}`}>
						▼
					</span>
				</div>
			</button>

			{isExpanded && (
				<div
					className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
					onClick={() => setIsExpanded(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={`
				fixed lg:relative inset-y-0 right-0 z-40
				w-80 sm:w-96 lg:w-80
				bg-white border-l border-gray-200 
				flex flex-col
				transform transition-transform duration-300 ease-in-out
				${isExpanded ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
			`}>
				{/* Header */}
				<div className="p-4 border-b border-gray-200 flex items-center justify-between">
					<h2 className="text-md font-semibold text-gray-800">
						Players ({users.length})
					</h2>
					<button
						onClick={() => setIsExpanded(false)}
						className="lg:hidden text-gray-500 hover:text-gray-700 p-1">
						✕
					</button>
				</div>

				{/* Users List */}
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
									<div className="flex items-center gap-3 min-w-0 flex-1">
										<div
											className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0 ${
												user.hasVoted ? "bg-green-500" : "bg-yellow-500"
											}`}>
											{user.name.charAt(0).toUpperCase()}
										</div>
										<div className="min-w-0 flex-1">
											<div className="font-medium text-gray-800 text-sm sm:text-base truncate">
												{user.name}
											</div>
											<span
												className={`text-xs px-2 py-1 rounded-full font-medium inline-block ${
													user.hasVoted
														? "bg-green-200 text-green-800"
														: "bg-yellow-200 text-yellow-800"
												}`}>
												{user.hasVoted ? "Voted" : "Waiting"}
											</span>
										</div>
									</div>
									{user.vote && (
										<div className="flex-shrink-0 ml-2">
											{user.id === currentUser?.id && user.vote ? (
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
											)}
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Footer */}
				<div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3">
					<div className="flex justify-between items-center text-sm text-gray-600">
						<span>Voted: {users.filter((u) => u.hasVoted).length}</span>
						<span>Waiting: {users.filter((u) => !u.hasVoted).length}</span>
					</div>
					<button
						onClick={addRandomUser}
						className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
						<span className="mr-2">➕</span>
						<span className="hidden sm:inline">Add Random User (+1)</span>
						<span className="sm:hidden">Add User</span>
					</button>
				</div>
			</div>
		</>
	);
};
