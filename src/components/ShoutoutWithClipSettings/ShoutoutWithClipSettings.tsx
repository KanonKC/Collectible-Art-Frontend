import { deliverShoutoutWithClip } from "@/service/ShoutoutWithClip.service";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { loadShoutoutWithClip, updateShoutoutWithClip } from "@/stores/slices/shoutoutWithClipSlice";
import { Dot, RotateCw, TriangleAlert } from "lucide-react";
import { useEffect, useMemo } from "react";
import LoginTwitchButton from "../LoginTwitchButton/LoginTwitchButton";
import ReadOnlyInput from "../ReadOnlyInput/ReadOnlyInput";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import VerticalMultiStepSection from "../VerticalMultiStepSection/VerticalMultiStepSection";
import VerticalMultiStepSectionItem from "../VerticalMultiStepSectionItem/VerticalMultiStepSectionItem";

const ShotoutsWithClipSettings = () => {
	const dispatch = useAppDispatch();

	const frontendUrl = import.meta.env.VITE_FRONTEND_URL as string;

	const account = useAppSelector((state) => state.account);
	const shoutoutWithClip = useAppSelector((state) => state.shoutoutWithClip);

	const accountId = useAppSelector((state) => state.account.accountId);

	// const isEnabled = true; // useAppSelector((state) => state.shoutoutWithClip.isEnabled);
	const featuredClipPriority = useAppSelector(
		(state) => state.shoutoutWithClip.featuredClipPriority
	);
	const isLoading = useAppSelector(
		(state) => state.shoutoutWithClip.isLoading
	);

	const isLoggedIn = useMemo(
		() => !!(account.username || account.twitchId),
		[account]
	);

	// const onClickEnable = () => {
	// 	if (!accountId) return;

	// 	createShoutoutWithClipSettings(accountId).then((response) => {
	// 		dispatch({
	// 			type: "shoutoutWithClip/setShoutoutWithClip",
	// 			payload: response.data,
	// 		});
	// 	});
	// };

	const onClickFeaturedClipPrioritySwitch = () => {
		dispatch({
			type: "shoutoutWithClip/setFeaturedClipPriority",
			payload: !shoutoutWithClip.featuredClipPriority,
		});
	};

    const onClickSaveButton = () => {
        updateShoutoutWithClip(dispatch, shoutoutWithClip);
    }

    const onClickTestShoutout = () => {
        dispatch({ type: "shoutoutWithClip/setIsLoading", payload: true });
        
        if (!accountId) {
            dispatch({ type: "shoutoutWithClip/setIsLoading", payload: false });
            return;
        };

        deliverShoutoutWithClip(accountId).then(() => {
            dispatch({ type: "shoutoutWithClip/setIsLoading", payload: false });
        });
    }

	useEffect(() => {
		if (!accountId) return;
		loadShoutoutWithClip(dispatch, accountId);
	}, [accountId, dispatch]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Shoutout with Clip</CardTitle>
			</CardHeader>
			<CardContent>
				<p>
					This feature allows you to shoutout a user with a clip from
					their channel.
				</p>

				<Separator className="my-4" />

				<div>
					<VerticalMultiStepSection>
						<VerticalMultiStepSectionItem
							nodeLabel="1"
							title="เชื่อมต่อกับบัญชีของ Twitch คุณ"
							description="ยืนยันตัวตนผ่าน Twitch OAuth"
						>
							{!isLoggedIn ? (
								<LoginTwitchButton />
							) : (
								<div className="flex">
									<Card className="p-2">
										<p>Username: {account.username}</p>
									</Card>
								</div>
							)}
						</VerticalMultiStepSectionItem>
						<VerticalMultiStepSectionItem
							nodeLabel="2"
							title="ตั้งค่าการใช้งานสำหรับ Shoutout with Clip"
							description="ตั้งค่าการแสดงผลต่างๆ สำหรับ Clip
								ที่จะถูกนำมาแสดงเมื่อมีคน Raid เข้ามา"
						>
							<Accordion type="single" collapsible>
								<AccordionItem value="item-1">
									<AccordionTrigger>
										<div className="font-medium text-base">
											<p>ตั้งค่าสำหรับคลิป</p>
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<Card>
											<div className="p-4 flex flex-col gap-4">
												<div className="flex justify-between">
													<div>
														<div className="font-medium">
															เลือกแสดง Clip
															ที่ถูก Featured
															มาก่อน
														</div>
														<div>
															หากมีการ Raid เข้ามา
															และมี Clip ที่ถูก
															Featured อยู่
															โปรแกรมจะนำ Clip
															นั้นมาแสดงก่อน
															หากเจ้าของช่องนั้นไม่มี
															Clip ที่อยู่ในรายการ
															Featured เลย
															จะทำการสุ่ม Clip
															จากรายการทั้งหมดของเขาแทน
														</div>
													</div>
													<Switch
														checked={
															featuredClipPriority
														}
														onClick={
															onClickFeaturedClipPrioritySwitch
														}
													/>
												</div>
											</div>
										</Card>
									</AccordionContent>
								</AccordionItem>
							</Accordion>

							<Accordion type="single" collapsible>
								<AccordionItem value="item-1">
									<AccordionTrigger>
										<div className="font-medium text-base mt-4">
											<p>ตั้งค่าสำหรับข้อความในแชท</p>
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<Card>
											<div className="p-4">
												<div className="flex flex-col gap-4">
													<div className="flex justify-between">
														<div>
															<div className="font-medium">
																Shoutout
																ให้แก้สตรีมเมอร์ที่
																Raid เข้ามา
															</div>
															<div>
																ทำให้คุณแชร์ช่องของสตรีมเมอร์ที่
																Raid
																เข้ามาให้คุณ
																โดยการแสดงปุ่มติดตามไว้ในแชท{" "}
																<a href="https://help.twitch.tv/s/article/shoutouts?language=th">
																	ดูเพิ่มเติม
																</a>
															</div>
														</div>
														<Switch
															checked={
																featuredClipPriority
															}
															onClick={
																onClickFeaturedClipPrioritySwitch
															}
														/>
													</div>
													<Separator />
													<div className="flex justify-between">
														<div>
															<div className="font-medium">
																แสดงข้อความแบบกำหนดเองในแชท
															</div>
															<div>
																ทำให้คุณสามารถกำหนดข้อความที่จะแสดงในแชทเมื่อมีการ
																Raid เข้ามา
															</div>
														</div>
														<Switch
															checked={
																featuredClipPriority
															}
															onClick={
																onClickFeaturedClipPrioritySwitch
															}
														/>
													</div>
												</div>
											</div>
										</Card>
									</AccordionContent>
								</AccordionItem>
							</Accordion>

							<div className="mt-4 flex justify-end">
								<Button disabled={isLoading} onClick={onClickSaveButton}>บันทึก</Button>
							</div>

						</VerticalMultiStepSectionItem>
						<VerticalMultiStepSectionItem
							nodeLabel="3"
							title="นำลิงก์สำหรับการแสดง Clip ไปติดตั้งใน OBS"
							description="นำลิงก์ด้านล่างไปใส่ไว้ในโปรแกรม OBS หรือโปรแกรมสำหรับการถ่ายทอดสดของคุณ โดยลิงก์นี้จะใช้เพื่อแสดง Clip เมื่อมีการ Raid เกิดขึ้น"
						>
							<ReadOnlyInput
								value={`${frontendUrl}/shoutout-with-clip/${shoutoutWithClip.key}`}
							/>

							<p className="my-4">
								หากใช้ในโปรแกรม OBS
								สามารถทำได้เหมือนกับการนำลิงก์ Alert ไปใส่ได้เลย
							</p>

							<div className="text-destructive">
								<p className="flex items-center gap-2">
									<TriangleAlert size={14} /> ข้อควรระวัง:
								</p>

								<ul>
									<div className="flex items-center gap-2">
										<Dot />
										อย่าส่งลิงก์นี้ให้ใครเป็นอันขาด
										(ใครก็ตามที่ได้ลิงก์นี้ไป
										สามารถที่จะแสดง Clip เมื่อมีการ Shoutout
										เกิดขึ้นเหมือนกับตัวคุณ)
									</div>
									<div className="flex items-center gap-2">
										<Dot />
										หากเผลอทำลิงก์นี้หลุดออกไปแล้ว
										ให้คุณกดที่รูป <RotateCw
											size={14}
										/>{" "}
										เพื่อสร้างลิงก์อันใหม่
										จากนั้นให้คุณคัดลอกลิงก์แล้วนำไปใส่ไว้ในโปรแกรม
										OBS ใหม่อีกครั้ง
									</div>
								</ul>
							</div>

						</VerticalMultiStepSectionItem>
						<VerticalMultiStepSectionItem
							nodeLabel="4"
							title="ทดสอบการทำงาน"
							description="ลองกดปุ่มทดสอบด้านล่างดู จะต้องมี Clip แสดงขึ้นมาบนหน้าจอ OBS ของคุณ"
							lastNode
                            hideSeparator
						>
							<Button disabled={isLoading} onClick={onClickTestShoutout}>ทดสอบการทำงาน</Button>
						</VerticalMultiStepSectionItem>
					</VerticalMultiStepSection>

					{/* {!isEnabled ? (
						<div>
							<Button onClick={onClickEnable}>เปิดใช้งาน</Button>
						</div>
					) : (
						<div>
							<div className="flex items-center space-x-2">
								<Label>
									เลือกแสดง Clip ที่ได้ Featured มาก่อน
									(ติดดาว)
								</Label>
								<Switch
									checked={featuredClipPriority}
									onClick={onClickFeaturedClipPrioritySwitch}
								/>
							</div>

							<div className="flex gap-4">
								<Button variant="destructive">ปิดใช้งาน</Button>
								<Button>บันทึก</Button>
							</div>
						</div>
					)} */}
				</div>
			</CardContent>
		</Card>
	);
};

export default ShotoutsWithClipSettings;
