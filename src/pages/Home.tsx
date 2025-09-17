import React, { useState } from "react";
import { Card } from "../components/Card";

const Home: React.FC = () => {
	const [selectedCard, setSelectedCard] = useState<number | null>(null);
	const cardValues = ["0", "1", "2", "3", "5", "8", "13", "20", "40", "100"];

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6 bg-gray-50">
			<h1 className="text-2xl font-bold">Planning Poker</h1>

			{/* Stacked Cards */}
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
							onClick={() =>
								setSelectedCard(selectedCard === index ? null : index)
							}
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
		</div>
	);
};

export default Home;
