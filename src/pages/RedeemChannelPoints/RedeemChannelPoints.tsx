import ChannelPointRedeemCard from "@/components/ChannelPointRedeemCard/ChannelPointRedeemCard";
import { Card } from "@/components/ui/card";
import Navbar from "@/layouts/Navbar/Navbar";
import { getRedeemableChannelPointAmount } from "@/service/ChannelPointRedeem.service";
import { useAppSelector } from "@/stores/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const RedeemChannelPoints = () => {
	const account = useAppSelector((state) => state.account);
	const [redeemablePointAmount, setRedeemablePointAmount] =
		useState<number>(0);
	const possibleRedeemablePointAmount = useMemo(
		() =>
			redeemablePointAmount > account.customPoint
				? account.customPoint
				: redeemablePointAmount,
		[account.customPoint, redeemablePointAmount]
	);

	const [springs, api] = useSpring(() => ({
		from: {
			possibleRedeemablePointAmount: 0,
			customPoint: 0,
		},
		config: {
			mass: 1,
			tension: 20,
			friction: 10,
		},
	}));

	const load = useCallback(async () => {
		if (!account.twitchId) return;
		const { data: redeemable } = await getRedeemableChannelPointAmount(
			account.twitchId
		);
		setRedeemablePointAmount(redeemable.amount);
	}, [account.twitchId]);

	useEffect(() => {
		load();
	}, [load]);

	useEffect(() => {
		api.start({
			to: {
				possibleRedeemablePointAmount: possibleRedeemablePointAmount,
			},
		});
	}, [possibleRedeemablePointAmount, api]);

	useEffect(() => {
		api.start({
			to: {
				customPoint: account.customPoint,
			},
		});
	}, [api, account.customPoint]);

	return (
		<Navbar>
			<div className="flex h-[80vh] justify-center items-center">
				<div className="w-[80%]">
					<Card>
						<div className="p-16">
							<div className="text-center">
								<div className="text-4xl font-bold">
									แต้ม Refresh Token ที่มี{" "}
									<animated.span className="text-primary">
										{springs.customPoint.to((n) =>
											n.toFixed(0)
										)}
									</animated.span>
								</div>
								<div className="mt-1">
									แต้มที่สามารถแลกกลับไปเป็นแต้มช่องได้{" "}
									<animated.span className="text-primary">
										{springs.possibleRedeemablePointAmount.to(
											(n) => n.toFixed(0)
										)}
									</animated.span>
								</div>
							</div>
							<div className="mt-16 ">
								<ChannelPointRedeemCard
									redeemablePointAmount={
										possibleRedeemablePointAmount
									}
								/>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</Navbar>
	);
};

export default RedeemChannelPoints;
