import { useState } from "react";
import { Card } from "../components/Card";
import { AddUser } from "@/components/AddUser";

type User = {
	id: number;
	name: string;
	hasVoted: boolean;
	vote: string | null;
};

const Home = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
	const [selectedCard, setSelectedCard] = useState<number | null>(null);
	const cardValues = ["0", "1", "2", "3", "5", "8", "13", "20", "40", "100"];

	const addUserSimple = (name: string): void => {
		const newUser: User = {
			id: Date.now(),
			name: name,
			hasVoted: false,
			vote: null,
		};
		setUsers((prev) => [...prev, newUser]);
		setCurrentUser(newUser);
	};

	const addRandomUser = (): void => {
		const randomNames = [
			"Alice",
			"Bob",
			"Charlie",
			"Diana",
			"Eve",
			"Frank",
			"Grace",
			"Henry",
			"Ivy",
			"Jack",
			"Kate",
			"Liam",
			"Maya",
			"Noah",
			"Olivia",
			"Paul",
			"Quinn",
			"Ruby",
			"Sam",
			"Tina",
			"Uma",
			"Victor",
			"Wendy",
			"Xavier",
			"Yara",
			"Zoe",
		];

		const cardValues = ["0", "1", "2", "3", "5", "8", "13", "20", "40", "100"];

		// Generate just 1 random user
		const randomName =
			randomNames[Math.floor(Math.random() * randomNames.length)];
		const hasVoted = Math.random() > 0.4; // 60% chance of having voted
		const vote = hasVoted
			? cardValues[Math.floor(Math.random() * cardValues.length)]
			: null;

		const newUser: User = {
			id: Date.now(),
			name: randomName,
			hasVoted,
			vote,
		};

		setUsers((prev) => [...prev, newUser]);
	};

	const handleVote = (cardValue: string | null): void => {
		if (currentUser) {
			const hasVoted = cardValue !== null;
			setUsers((prev) =>
				prev.map((user) =>
					user.id === currentUser.id
						? { ...user, hasVoted, vote: cardValue }
						: user
				)
			);
			setCurrentUser((prev) =>
				prev ? { ...prev, hasVoted, vote: cardValue } : undefined
			);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{!currentUser ? (
				<div className="flex items-center justify-center min-h-screen">
					<AddUser onAddUser={addUserSimple} currentUser={currentUser?.name} />
				</div>
			) : (
				<div className="flex h-screen">
					{/* Main Content */}
					<div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
						<h1 className="text-2xl font-bold">Planning Poker</h1>

						<div className="flex items-center">
							{cardValues.map((value, index) => (
								<div
									key={index}
									className={`relative transition-all duration-200 hover:scale-110 ${
										selectedCard === index ? "scale-110" : ""
									}`}
									style={{
										marginLeft: index === 0 ? "0" : "-14px",
										zIndex: selectedCard === index ? 20 : 10 - index,
									}}>
									<Card
										value={value}
										isSelected={selectedCard === index}
										onClick={() => {
											const newSelectedCard =
												selectedCard === index ? null : index;
											setSelectedCard(newSelectedCard);
											handleVote(newSelectedCard !== null ? value : null);
										}}
									/>
								</div>
							))}
						</div>

						{selectedCard !== null && (
							<div className="text-center">
								<p className="text-lg text-gray-700">
									Selected:{" "}
									<span className="font-bold text-blue-600">
										{cardValues[selectedCard]}
									</span>{" "}
									story points
								</p>
							</div>
						)}

						{/* Add Random User Button */}
						<button
							onClick={addRandomUser}
							className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
							<span className="mr-2">➕</span>
							Add Random User (+1)
						</button>
					</div>

					{/* Sidebar */}
					{users.length > 0 && (
						<div className="w-80 bg-white border-l border-gray-200 flex flex-col">
							{/* Sidebar Header */}
							<div className="p-4 border-b border-gray-200">
								<h2 className="text-lg font-semibold text-gray-800">
									Players ({users.length})
								</h2>
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
												{user.vote && (
													<div className="w-10 h-14 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-md">
														{user.vote}
													</div>
												)}
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Sidebar Footer */}
							<div className="p-4 border-t border-gray-200 bg-gray-50">
								<div className="flex justify-between items-center text-sm text-gray-600">
									<span>Voted: {users.filter((u) => u.hasVoted).length}</span>
									<span>
										Waiting: {users.filter((u) => !u.hasVoted).length}
									</span>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Home;
