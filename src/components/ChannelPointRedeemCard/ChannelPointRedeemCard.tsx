import { getRedeemableChannelPointAmountList } from "@/service/ChannelPointRedeem.service";
import { Card } from "../ui/card";
import ChannelPointRedeemCardItem from "./ChannelPointRedeemCardItem/ChannelPointRedeemCardItem";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/stores/hooks";

const ChannelPointRedeemCard = ({
	redeemablePointAmount,
}: {
	redeemablePointAmount: number;
}) => {
	const account = useAppSelector((state) => state.account);
	const redeemFactorList = useMemo(() => [0.1, 0.25, 0.5, 1.0], []);
	const redeemFactoredValueList = useMemo(
		() => redeemFactorList.map((factor) => factor * redeemablePointAmount),
		[redeemablePointAmount, redeemFactorList]
	);

	const [redeemableFixedList, setRedeemableFixedList] = useState<number[]>(
		[]
	);

	useEffect(() => {
		if (!account.twitchId) return;

		getRedeemableChannelPointAmountList(
			account.twitchId,
			redeemFactoredValueList
		).then((response) => {
			const { data } = response;
			setRedeemableFixedList(
				data.amountList
					.filter(
						(amount,index,array) =>
							amount.possibleAmount <= account.customPoint &&
							amount.possibleAmount > 0 &&
                            array.indexOf(amount) === index
					)
					.map((amount) => amount.possibleAmount)
			);
		});
	}, [account, redeemFactoredValueList]);

	return redeemableFixedList.length > 0 ? (
		<Card className="px-4">
			{redeemableFixedList.map((amount, index) => (
				<>
					{index > 0 && <div className="border-t-[2px]"></div>}
					<ChannelPointRedeemCardItem amount={amount} />
				</>
			))}
		</Card>
	) : (
		<div className="text-center italic text-neutral-600">
			จำนวนแต้มที่มี ณ ตอนนี้ยังไม่สามารถแลกเป็นแต้มช่องคืนได้
			ลองสะสมเพิ่มให้มากกว่านี้ แล้วลองใหม่ในครั้งหน้านะ
		</div>
	);
};

export default ChannelPointRedeemCard;
