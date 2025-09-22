import { Plus, User } from "lucide-react";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type AddUserProps = {
	onAddUser: (name: string) => void;
};

export const AddUser = ({ onAddUser }: AddUserProps) => {
	const [userName, setUserName] = useState<string>("");

	const handleSubmit = (e?: React.MouseEvent | React.KeyboardEvent) => {
		if (e) e.preventDefault();
		if (userName.trim()) {
			onAddUser(userName.trim());
			setUserName("");
		}
	};

	return (
		<div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-6">
			<div className="mb-6">
				<h2 className="text-lg font-semibold flex items-center gap-2">
					<User className="h-5 w-5" />
					Hi, Join Planning Poker! 👋
				</h2>
				<p className="text-sm text-muted-foreground mt-1">
					Enter your name to join the planning session
				</p>
			</div>
			<div>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="username">Your name</Label>
						<Input
							id="username"
							placeholder="e.g., John Doe"
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
							maxLength={30}
						/>
					</div>
					<Button onClick={handleSubmit} className="w-full">
						<Plus className="w-4 h-4 mr-2" />
						Join Session
					</Button>
				</div>
			</div>
		</div>
	);
};
