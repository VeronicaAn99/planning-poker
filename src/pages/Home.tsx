import { useState } from "react";
import { AddUser } from "@/components/AddUser";
import { Table } from "@/components/Table";
import { cardValues, randomUserNames } from "@/lib/utils";
import { PaymeSwissCard } from "@/components/PaymeSwissCard";
import { UsersSidebar } from "@/components/UsersSidebar";
import { Button } from "@/components/ui/button";

export type User = {
	id: number;
	name: string;
	hasVoted: boolean;
	vote: string | null;
};

const Home = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
	const [selectedCard, setSelectedCard] = useState<number | null>(null);
	const [showAverage, setShowAverage] = useState<boolean>(false);

	const addCurrentUser = (name: string): void => {
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
		const randomName =
			randomUserNames[Math.floor(Math.random() * randomUserNames.length)];
		const hasVoted = Math.random() > 0.4;
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

	const calculateAverage = (): number | null => {
		const votedUsers = users.filter((user) => user.hasVoted && user.vote);
		if (votedUsers.length === 0) return null;

		const numericVotes = votedUsers
			.map((user) => {
				const vote = user.vote;
				// Handle special cards
				if (vote === "☕") return null;
				const num = parseFloat(vote || "0");
				return isNaN(num) ? null : num;
			})
			.filter((vote): vote is number => vote !== null);

		if (numericVotes.length === 0) return null;

		return (
			numericVotes.reduce((sum, vote) => sum + vote, 0) / numericVotes.length
		);
	};

	const votedUsersCount = users.filter(
		(user) => user.hasVoted && user.vote
	).length;
	const totalUsersCount = users.length;
	const average = calculateAverage();
	const canShowAverage = votedUsersCount > 0;

	const handleReset = () => {
		setSelectedCard(null);
		setShowAverage(false);
		if (currentUser) {
			const resetCurrentUser = {
				...currentUser,
				hasVoted: false,
				vote: null,
			};
			setUsers([resetCurrentUser]);
			setCurrentUser(resetCurrentUser);
		} else {
			setUsers([]);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{!currentUser ? (
				<div className="flex items-center justify-center min-h-screen">
					<AddUser onAddUser={addCurrentUser} />
				</div>
			) : (
				<div className="flex h-screen">
					<div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
						<h1 className="text-2xl font-bold">Planning Poker</h1>
						<Table
							users={users}
							currentUser={currentUser}
							showAverage={showAverage}
						/>

						<div className="flex flex-col items-center gap-3">
							{canShowAverage && (
								<div
									className={`text-center bg-white rounded-lg transition-all duration-300 ease-in-out overflow-hidden ${
										showAverage
											? "p-4 shadow-md border max-h-96 opacity-100"
											: "max-h-0 opacity-0 p-0"
									}`}>
									<div className="text-sm text-gray-600 mb-1">
										{votedUsersCount} of {totalUsersCount} voted
									</div>
									{average !== null ? (
										<div className="text-2xl font-bold text-blue-600">
											Average: {average.toFixed(1)}
										</div>
									) : (
										<div className="text-lg text-gray-500">
											No numeric votes to calculate average
										</div>
									)}
								</div>
							)}
							<div className="flex gap-2">
								<Button
									onClick={() => setShowAverage(!showAverage)}
									disabled={!canShowAverage}
									variant="outline"
									size="lg"
									className="transition-all duration-200 cursor-pointer">
									{showAverage ? "Hide Results" : "See Average"}
								</Button>

								<Button
									disabled={!canShowAverage}
									onClick={handleReset}
									className="cursor-pointer"
									variant="ghost"
									size="lg">
									Reset
								</Button>
							</div>
						</div>

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
									<PaymeSwissCard
										value={value}
										isSelected={selectedCard === index}
										showBack={false}
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
					</div>

					<UsersSidebar
						currentUser={currentUser}
						users={users}
						addRandomUser={addRandomUser}
					/>
				</div>
			)}
		</div>
	);
};

export default Home;
