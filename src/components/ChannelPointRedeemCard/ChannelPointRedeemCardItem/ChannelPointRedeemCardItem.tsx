import { commafy } from "@/utils/commafy";
import { Button } from "../../ui/button";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { redeemChannelPointFromCustomPoint } from "@/service/ChannelPointRedeem.service";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { loadAccount } from "@/stores/slices/accountSlice";

const ChannelPointRedeemCardItem = ({ amount }: { amount: number }) => {
	const [isLoading, setIsLoading] = useState(false);
    const account = useAppSelector(state => state.account)
    const dispatch = useAppDispatch()

    const handleRedeem = async () => {

        if (!account.twitchId) return

        setIsLoading(true)
        await redeemChannelPointFromCustomPoint(account.twitchId, amount)
        dispatch(loadAccount())
        setIsLoading(false)
    }

	return (
		<div className="p-4 flex items-center">
			<div className="mr-8 ml-2">
				<img width={50} src="images/access_token.png" />
			</div>
			<div className="flex justify-between w-full">
				<div className="flex items-center w-[20%] justify-between ">
					<span className="text-3xl font-bold mr-4">
						{commafy(amount)}
					</span>
					<div className="text-lg text-neutral-600">
						Access Tokens
					</div>
				</div>

				<div>
					<Button
                        disabled={isLoading}
                        onClick={handleRedeem}
                    >
						{isLoading ? (
							<div className="flex items-center">
								<span className="pr-2">
									<LoaderCircle className="animate-spin" />
								</span>
								<span>กำลังแลก ...</span>
							</div>
						) : (
							<div>
								<span>แลกคืน {commafy(amount)} แต้ม</span>
							</div>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ChannelPointRedeemCardItem;
