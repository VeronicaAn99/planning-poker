import { useState } from "react";
import { AddUser } from "@/components/AddUser";
import { Table } from "@/components/Table";
import { cardValues, randomUserNames } from "@/lib/utils";
import { PaymeSwissCard } from "@/components/PaymeSwissCard";
import { UsersSidebar } from "@/components/UsersSidebar";

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

	return (
		<div className="min-h-screen bg-gray-50">
			{!currentUser ? (
				<div className="flex items-center justify-center min-h-screen">
					<AddUser onAddUser={addUserSimple} currentUser={currentUser?.name} />
				</div>
			) : (
				<div className="flex h-screen">
					<div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
						<h1 className="text-2xl font-bold">Planning Poker</h1>
						<Table users={users} currentUser={currentUser} />

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
