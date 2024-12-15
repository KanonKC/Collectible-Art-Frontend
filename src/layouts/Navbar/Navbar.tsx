import LoginTwitchButton from "@/components/LoginTwitchButton/LoginTwitchButton";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { useEffect, useMemo } from "react";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import NavbarMenuText from "./NavbarMenuText/NavbarMenuText";
import { DatabaseBackup } from "lucide-react";
import { loadAccount } from "@/stores/slices/accountSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = ({ children }: { children: React.ReactNode }) => {
	const account = useAppSelector((state) => state.account);
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const isLoggedIn = useMemo(
		() => !!(account.username || account.twitchId),
		[account]
	);

	const handleOnClickLogoutButton = () => {
		dispatch({ type: "account/logout" });
		window.location.reload();
	};

	useEffect(() => {
		dispatch(loadAccount());
		dispatch({ type: "account/loadAccountFromLocalStorage" });

		if (
			account.accessToken &&
			(!account.twitchTokenExpiresAt ||
				new Date(account.twitchTokenExpiresAt) < new Date())
		) {
			dispatch({ type: "account/logout" });
		}
	}, [dispatch, account]);

	return (
		<div>
			<div className="top-navbar">
				<div className="top-navbar-content">
					<div className="gap-[px] items-center hidden lg:flex">
						<NavbarMenuText>
                            <a className="text-black" href="https://twitch.tv/kanonkc">TWITCH</a>
                        </NavbarMenuText>
						<NavbarMenuText
							onClick={() => navigate("/tarot-card-collections")}
						>
							TAROT CARD COLLECTIONS
						</NavbarMenuText>
						{/* <NavbarMenuText onClick={() => navigate("/math-game")}>
							MATH GAME
						</NavbarMenuText> */}
						<NavbarMenuText onClick={() => navigate("/leaderboards")}>
							LEADERBOARDS
						</NavbarMenuText>
					</div>
					<div>
						{!isLoggedIn ? (
							<LoginTwitchButton />
						) : (
							<div className="flex items-center gap-2">
								<div
									onClick={() =>
										navigate("/redeem-channel-points")
									}
									className="flex gap-1 hover:text-primary cursor-pointer pr-4"
								>
									<span>
										<DatabaseBackup />
									</span>
									<span>{account.customPoint}</span>
								</div>
								<Avatar>
									{account.imageUrl && (
										<AvatarImage src={account.imageUrl} />
									)}
									{account.username && (
										<AvatarFallback>
											{account.username[0].toUpperCase()}
										</AvatarFallback>
									)}
								</Avatar>
								<div className="pr-2">{account.username}</div>
								<div>
									<Button onClick={handleOnClickLogoutButton}>
										Logout
									</Button>
								</div>
							</div>
						)}
					</div>
				</div>
				<Separator />
			</div>
			<div className="">
				<div className="">
					<div className="content-container">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
