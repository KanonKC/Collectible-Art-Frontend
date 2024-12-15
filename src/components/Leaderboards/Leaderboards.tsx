import { MonthList } from "@/constants/Date";
import { LeaderboardsTypeList } from "@/constants/Leaderboards";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
	setCurrentPage,
	setIsDisplayAllTime,
	setToNextMonth,
	setToPreviousMonth,
	setType,
} from "@/stores/slices/leaderboardsSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import LeaderboardsTableRow from "./LeaderboardsTableRow/LeaderboardsTableRow";

const Leaderboards = () => {
	const dispatch = useAppDispatch();
	const {
		leaderboards,
		targetMonthIndex,
		targetYear,
		currentPage,
		isLoading,
		isDisplayAllTime,
		type,
        isFirstPage,
        isLastPage,
	} = useAppSelector((state) => state.leaderboards);

	const displayLeaderboards = useMemo(() => {
		return leaderboards;
		// if (!targetPlayer) return leaderboards;
		// if (leaderboards.length === 0) return [targetPlayer];

		// const idList = leaderboards.map((user) => user.twitchUserId);
		// if (idList.includes(targetPlayer.twitchUserId)) return leaderboards;

		// if (
		// 	targetPlayer.ranking > 0 &&
		// 	leaderboards[0].ranking > targetPlayer.ranking
		// ) {
		// 	return [targetPlayer, ...leaderboards];
		// } else {
		// 	return [...leaderboards, targetPlayer];
		// }
	}, [leaderboards]);

	const tabValue = useMemo(
		() => (isDisplayAllTime ? "all-time" : "monthly"),
		[isDisplayAllTime]
	);

	return (
		<Card className="px-0 md:px-24 py-8">
			<div className="flex flex-col gap-4">
				<div className="flex justify-center">
					<Tabs value={tabValue}>
						<TabsList>
							<TabsTrigger
								onClick={() =>
									dispatch(setIsDisplayAllTime(true))
								}
								value="all-time"
							>
								All Time
							</TabsTrigger>
							<TabsTrigger
								onClick={() =>
									dispatch(setIsDisplayAllTime(false))
								}
								value="monthly"
							>
								Monthly
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				<div className="text-4xl font-bold text-center">
					{isDisplayAllTime ? (
						<div className="text-3xl text-neutral-500">
							All-time
						</div>
					) : (
						<div>
							<div className="flex justify-center items-center text-3xl gap-6">
								<Button
									variant="ghost"
									onClick={() =>
										dispatch(setToPreviousMonth())
									}
								>
									<ChevronLeft />
								</Button>
								<div>
									<span className="text-primary">
										{MonthList[targetMonthIndex]}
									</span>{" "}
									{targetYear}
								</div>
								<Button
									variant="ghost"
									onClick={() => dispatch(setToNextMonth())}
								>
									<ChevronRight />
								</Button>
							</div>
							<div className="flex justify-center items-center text-sm text-neutral-500 font-semibold">
								<div>
									15 {MonthList[targetMonthIndex]} - 14{" "}
									{MonthList[(targetMonthIndex + 1) % 12]}
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="flex justify-center items-center gap-2 font-bold text-sm">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="outline">
								{
									LeaderboardsTypeList.find(
										(lType) => lType.value === type
									)?.label
								}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{LeaderboardsTypeList.map((type) => (
								<DropdownMenuItem
									key={type.value}
									onClick={() =>
										dispatch(setType(type.value))
									}
								>
									{type.label}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className="">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px] text-end">
									Ranking
								</TableHead>
								<TableHead>Name</TableHead>
								<TableHead className="text-right pr-8">
									Scores
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className="">
							{displayLeaderboards.map((user) => (
								<LeaderboardsTableRow
									key={user.twitchUserId}
									user={user}
								/>
							))}
						</TableBody>
					</Table>

					{/* {targetPlayer && (
						<Table>
							<TableHeader className="">
								<TableRow>
									<TableHead className="h-[1px] w-[100px] text-end"></TableHead>
									<TableHead className="h-[1px] "></TableHead>
									<TableHead className="h-[1px] text-right pr-8"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody className="">
								<LeaderboardsTableRow
									key={targetPlayer.twitchUserId}
									user={targetPlayer}
								/>
							</TableBody>
						</Table>
					)} */}

					{/* {true && (
						<div className="absolute top-1/2 left-1/2">
							<LoaderCircle
								className="animate-spin text-primary"
								size={64}
							/>
							<div>Loading ...</div>
						</div>
					)} */}
				</div>

				<div className="flex justify-center">
					<div className="flex items-center gap-2">
						<Button
							disabled={isLoading || isFirstPage}
							variant="ghost"
							onClick={() =>
								dispatch(setCurrentPage(currentPage - 1))
							}
						>
							<ChevronLeft size={16} />
						</Button>
						<div>{currentPage}</div>
						<Button
							disabled={isLoading || isLastPage}
							variant="ghost"
							onClick={() =>
								dispatch(setCurrentPage(currentPage + 1))
							}
						>
							<ChevronRight size={16} />
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default Leaderboards;
