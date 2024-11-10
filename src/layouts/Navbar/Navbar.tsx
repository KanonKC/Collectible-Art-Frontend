import LoginTwitchButton from "@/components/LoginTwitchButton/LoginTwitchButton";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { useEffect, useMemo } from "react";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

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
					<div className="flex gap-[px] items-center">
						<div className="font-bold cursor-pointer px-[16px] py-[4px] border-r-2">
							COLLECTIBLE ART
						</div>
						<div
							onClick={() => navigate("/tarot-card-collections")}
							className="font-bold cursor-pointer px-[16px] py-[4px] border-r-2 hover:text-primary"
						>
							TAROT CARD COLLECTIONS
						</div>
						<div
							onClick={() => navigate("/math-game")}
							className="font-bold cursor-pointer px-[16px] py-[4px] border-r-2 hover:text-primary"
						>
							MATH GAME
						</div>
					</div>
					<div>
						{!isLoggedIn ? (
							<LoginTwitchButton />
						) : (
							<div>
								<span className="pr-2">{account.username}</span>
								<Button onClick={handleOnClickLogoutButton}>
									Logout
								</Button>
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
