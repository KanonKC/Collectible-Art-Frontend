import { createTwitchOAuthUrl } from "@/utils/createTwitchOAuthUrl";
import { Button } from "../ui/button";

const LoginTwitchButton = () => {
	
    const handleOnClickLoginButton = () => {
        const url = createTwitchOAuthUrl()
        window.location.href = url
    }

	return (
		<Button onClick={handleOnClickLoginButton}>
			Login using Twitch account
		</Button>
	);
};

export default LoginTwitchButton;
