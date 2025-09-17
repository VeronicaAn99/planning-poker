export const Card = ({
	value,
	isSelected,
	onClick,
}: {
	value: string;
	isSelected: boolean;
	onClick: () => void;
}) => {
	return (
		<div
			className={`w-20 h-28 rounded-lg border-2 bg-white p-1 relative cursor-pointer transition-all duration-200 hover:shadow-md ${
				isSelected
					? "border-blue-300 shadow-lg"
					: "border-gray-300 hover:border-gray-400"
			}`}
			onClick={onClick}>
			<div
				className={`w-full h-full rounded-md relative flex items-center justify-center ${
					isSelected ? "bg-blue-50" : "bg-gray-100"
				}`}>
				<div
					className={`absolute top-[-4px] left-[-4px] bg-white px-2 py-1 text-xs rounded-full font-semibold ${
						isSelected ? "text-blue-300" : "text-gray-600"
					}`}>
					{value}
				</div>
				<div
					className={`text-2xl font-bold  ${
						isSelected ? "text-blue-500" : "text-gray-800"
					}`}>
					{value}
				</div>
				<div
					className={`absolute bottom-[-4px] right-[-4px] bg-white px-2 py-1 rounded-full text-xs font-semibold ${
						isSelected ? "text-blue-300 rounded-full" : "text-gray-600"
					}`}>
					{value}
				</div>
			</div>
		</div>
	);
};
