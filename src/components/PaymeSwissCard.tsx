type SwissPatternProps = {
	className?: string;
	id?: string;
};

type SwissCardProps = {
	value: string;
	isSelected?: boolean;
	showBack?: boolean;
	onClick: () => void;
	size?: "small" | "default" | "large";
};

export const SwissPattern = ({
	className = "",
	id = "default",
}: SwissPatternProps) => (
	<svg viewBox="0 0 365 314" className={`${className}`} fill="none">
		<defs>
			<linearGradient
				id={`paint0_linear_${id}`}
				x1="109.822"
				y1="283.053"
				x2="364.539"
				y2="0.416707"
				gradientUnits="userSpaceOnUse">
				<stop stopColor="#38C6F4" />
				<stop offset="1" stopColor="#4338CA" />
			</linearGradient>
			<clipPath id={`clip0_${id}`}>
				<rect
					width="364.914"
					height="313.254"
					fill="white"
					transform="translate(0 0.324219)"
				/>
			</clipPath>
		</defs>
		<g clipPath={`url(#clip0_${id})`}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M182.48 156.897H312.96C282.371 209.566 252.433 261.113 222.248 313.041H364.915V0.662646C364.543 0.619751 364.201 0.572303 363.878 0.527552C363.188 0.431769 362.586 0.348337 361.975 0.348337C358.636 0.345695 355.297 0.34243 351.959 0.339166C326.935 0.314697 301.926 0.290243 276.918 0.527942C274.965 0.550393 272.272 2.5934 271.195 4.43436C249.15 42.031 227.244 79.7278 205.347 117.411L201.489 124.051C196.972 131.806 192.48 139.584 187.766 147.748C186.038 150.74 184.28 153.783 182.48 156.897ZM177.104 165.971C178.821 162.981 180.589 159.901 182.435 156.695H182.412H51.6401C82.0945 104.272 112.055 52.7032 142.218 0.797259H0V313.445H6.46343C13.4912 313.445 20.5172 313.43 27.5421 313.415C46.2706 313.375 64.9905 313.335 83.7104 313.58C89.5005 313.647 92.5976 311.851 95.4927 306.822C113.26 275.854 131.223 244.99 149.183 214.13C154.816 204.452 160.448 194.775 166.074 185.095C169.687 178.891 173.267 172.654 177.104 165.971Z"
				fill={`url(#paint0_linear_${id})`}
			/>
		</g>
	</svg>
);

export const PaymeSwissCard = ({
	value,
	isSelected = false,
	showBack = false,
	onClick,
	size = "default",
}: SwissCardProps) => {
	if (showBack) {
		return (
			<div
				className={`  bg-slate-800 relative cursor-pointer transition-all duration-200 hover:shadow-md overflow-hidden ${
					isSelected
						? "border-blue-300 shadow-lg"
						: "border-slate-500 hover:border-slate-400"
				} ${
					size === "small"
						? "h-18 w-12 rounded-sm border-1 p-0.5"
						: "w-20 h-28 rounded-lg border-2 p-1"
				}`}
				onClick={onClick}>
				<div
					className={`w-full h-full  relative bg-slate-800 overflow-hidden ${
						size === "small" ? "rounded-sm" : "rounded-md"
					}`}>
					<div className="absolute inset-0">
						<div className="grid grid-cols-4 gap-0 h-full w-full">
							{Array.from({ length: 24 }).map((_, i) => (
								<SwissPattern
									key={i}
									id={`pattern-${Math.random().toString(36).substr(2, 9)}`}
									className="w-full h-full opacity-70"
								/>
							))}
						</div>
					</div>

					<div className="absolute inset-1 border border-slate-400 rounded opacity-25"></div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`bg-white relative cursor-pointer transition-all duration-200 hover:shadow-md ${
				isSelected
					? "border-blue-300 shadow-lg"
					: "border-gray-300 hover:border-gray-400"
			} ${
				size === "small"
					? "h-18 w-12 rounded-sm border-1 p-0.5"
					: "w-20 h-28 rounded-lg border-2 p-1"
			}`}
			onClick={onClick}>
			<div
				className={`w-full h-full relative flex items-center justify-center ${
					isSelected ? "bg-blue-50" : "bg-gray-100"
				} ${
					size === "small" ? "h-18 w-12 rounded-sm" : "w-20 h-28 rounded-md"
				} `}>
				<div
					className={`absolute  bg-white rounded-full font-semibold ${
						isSelected ? "text-blue-300" : "text-gray-400"
					}
					${
						size === "small"
							? "text-[6px]  px-1 py-0.5 top-[-2px] left-[-2px]"
							: "px-2 py-1 text-xs top-[-4px] left-[-4px]"
					}`}>
					{value}
				</div>
				<div
					className={`text-2xl font-bold  ${
						isSelected ? "text-blue-500" : "text-gray-600"
					} `}>
					{value}
				</div>
				<div
					className={`absolute  bg-white  rounded-full text-xs font-semibold ${
						isSelected ? "text-blue-300 rounded-full" : "text-gray-400"
					} ${
						size === "small"
							? "text-[6px] px-1 py-0.5 bottom-[-2px] right-[-2px]"
							: "text-xs px-2 py-1 bottom-[-4px] right-[-4px]"
					}`}>
					{value}
				</div>
			</div>
		</div>
	);
};
