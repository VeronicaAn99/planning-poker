import { useState } from "react";
import type { User } from "@/pages/Home";
import { PaymeSwissCard } from "./PaymeSwissCard";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Users } from "lucide-react";

type UsersSidebarProps = {
	users: User[];
	addRandomUser: () => void;
	currentUser: User;
};

export const UsersSidebar = ({
	users,
	addRandomUser,
	currentUser,
}: UsersSidebarProps) => {
	const [isOpen, setIsOpen] = useState(false);

	if (users.length === 0) return null;

	return (
		<>
			<div className="hidden lg:flex w-80 bg-card border-l border-border flex-col">
				<div className="p-4 border-b border-border">
					<h2 className="text-lg font-semibold text-foreground">
						Players ({users.length})
					</h2>
				</div>
				<div className="flex-1 overflow-y-auto p-4">
					<div className="space-y-3">
						{users.map((user) => (
							<UserCard key={user.id} user={user} currentUser={currentUser} />
						))}
					</div>
				</div>
				<div className="p-4 border-t border-border bg-muted space-y-3">
					<div className="flex justify-between items-center text-sm text-muted-foreground">
						<span>Voted: {users.filter((u) => u.hasVoted).length}</span>
						<span>Waiting: {users.filter((u) => !u.hasVoted).length}</span>
					</div>
					<Button onClick={addRandomUser} className="w-full">
						<span className="mr-2">➕</span>
						Add Random User
					</Button>
				</div>
			</div>

			{/* Mobile Sheet */}
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button
						variant="outline"
						size="sm"
						className="lg:hidden fixed top-4 right-4 z-50">
						<Users className="h-4 w-4 mr-2" />
						Players ({users.length})
					</Button>
				</SheetTrigger>
				<SheetContent side="right" className="w-full sm:max-w-md p-0">
					<div className="p-4 border-b border-border">
						<SheetHeader className="text-left space-y-0">
							<SheetTitle className="text-lg font-semibold text-foreground">
								Players ({users.length})
							</SheetTitle>
							<SheetDescription className="text-sm text-muted-foreground">
								{users.filter((u) => u.hasVoted).length} voted,{" "}
								{users.filter((u) => !u.hasVoted).length} waiting
							</SheetDescription>
						</SheetHeader>
					</div>

					<div className="flex flex-col h-full">
						<div className="flex-1 overflow-y-auto p-4">
							<div className="space-y-3">
								{users.map((user) => (
									<UserCard
										key={user.id}
										user={user}
										currentUser={currentUser}
									/>
								))}
							</div>
						</div>

						<div className="p-4 border-t border-border bg-muted space-y-3">
							<div className="flex justify-between items-center text-sm text-muted-foreground">
								<span>Voted: {users.filter((u) => u.hasVoted).length}</span>
								<span>Waiting: {users.filter((u) => !u.hasVoted).length}</span>
							</div>
							<Button onClick={addRandomUser} className="w-full">
								<span className="mr-2">➕</span>
								Add Random User
							</Button>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
};

const UserCard = ({ user, currentUser }: { user: User; currentUser: User }) => {
	return (
		<div
			className={`p-3 rounded-lg border-2 transition-all duration-200 ${
				user.hasVoted
					? "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950"
					: "border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-950"
			}`}>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3 min-w-0 flex-1">
					<div
						className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${
							user.hasVoted ? "bg-green-500" : "bg-yellow-500"
						}`}>
						{user.name.charAt(0).toUpperCase()}
					</div>
					<div className="min-w-0 flex-1">
						<div className="font-medium text-foreground text-base truncate">
							{user.name}
							{user.id === currentUser.id && (
								<span className="ml-2 text-xs text-primary font-normal">
									(You)
								</span>
							)}
						</div>
						<span
							className={`text-xs px-2 py-1 rounded-full font-medium inline-block mt-1 ${
								user.hasVoted
									? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
									: "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200"
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
	);
};
