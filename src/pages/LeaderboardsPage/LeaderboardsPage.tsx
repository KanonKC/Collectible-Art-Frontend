import Leaderboards from "@/components/Leaderboards/Leaderboards";
import LoginTwitchButton from "@/components/LoginTwitchButton/LoginTwitchButton";
import { Card } from "@/components/ui/card";
import Navbar from "@/layouts/Navbar/Navbar";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { loadLeaderboards } from "@/stores/slices/leaderboardsSlice";
import { useEffect } from "react";

const LeaderboardsPage = () => {
	const account = useAppSelector((state) => state.account);
	const currentPage = useAppSelector(
		(state) => state.leaderboards.currentPage
	);
	const { isDisplayAllTime, targetMonthIndex, type } = useAppSelector(
		(state) => state.leaderboards
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!account.twitchId) return;
		dispatch(loadLeaderboards(account.twitchId));
	}, [
		dispatch,
		account.twitchId,
		currentPage,
		account.isLoggedIn,
		isDisplayAllTime,
		targetMonthIndex,
		type,
	]);

	return (
		<Navbar>
			<div className="flex justify-center mt-0 sm:mt-10">
				<div className="w-full md:w-[95%] xl:w-[60%]">
					{account.isLoggedIn ? (
						<Leaderboards />
					) : (
						<Card className="px-24 py-8 flex justify-center">
							<div>
								<LoginTwitchButton />
							</div>
						</Card>
					)}
				</div>
			</div>
		</Navbar>
	);
};

export default LeaderboardsPage;
