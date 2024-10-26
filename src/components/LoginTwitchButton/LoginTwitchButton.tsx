import { createTwitchOAuthUrl } from "@/utils/createTwitchOAuthUrl";
import { Button } from "../ui/button";
import { Twitch } from "lucide-react";

const LoginTwitchButton = () => {
	
    const handleOnClickLoginButton = () => {
        const url = createTwitchOAuthUrl()
        window.location.href = url
    }

	return (
		<Button onClick={handleOnClickLoginButton}>
            <div className="flex items-center gap-[4px]">
            <Twitch size={18}/>
			Login using Twitch account
            </div>
		</Button>
	);
};

export default LoginTwitchButton;
