import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/stores/hooks";
import { LeaderboardsUserData } from "@/types/Leaderboards.type";

const LeaderboardsTableRow = ({
    user
}: {
    user: LeaderboardsUserData;
}) => {

    const account = useAppSelector((state) => state.account);

	return (
		<TableRow
			key={user.twitchUserId}
			className={cn("sa", {
				"bg-primary": user.twitchUserId === account.twitchId,
				"text-white": user.twitchUserId === account.twitchId,
				"hover:bg-primary": user.twitchUserId === account.twitchId,
			})}
		>
			<TableCell className="text-4xl font-bold text-end">
				<div
					className={cn({
						invisible: user.ranking === 0,
					})}
				>
					{user.ranking}
				</div>
			</TableCell>
			<TableCell className="text-xl flex items-center gap-2">
				<Avatar>
					<AvatarImage
						src={user.imageUrl}
						alt={user.twitchUsername}
					/>
					<AvatarFallback>
						{user.twitchUsername[0].toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<a
					className={cn({
						"text-white": user.twitchUserId === account.twitchId,
					})}
					href={`https://twitch.tv/${user.twitchUsername.toLowerCase()}`}
				>
					{user.twitchUsername}
				</a>
			</TableCell>
			<TableCell className="text-right text-xl pr-8">
				{user.score}
			</TableCell>
		</TableRow>
	);
};

export default LeaderboardsTableRow;
