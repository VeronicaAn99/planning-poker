import React from "react";
import { Card } from "../components/Card";

const Home: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6">
			<h1 className="text-2xl font-bold">Planning Poker</h1>

			{Array.from({ length: 10 }).map((_, index) => (
				<Card key={index} />
			))}
		</div>
	);
};

export default Home;
