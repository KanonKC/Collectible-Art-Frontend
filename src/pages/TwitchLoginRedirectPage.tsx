import { createOrUpdateAccount } from '@/service/Account.service';
import { getUserLoginAccessToken } from '@/service/Twitch.service';
import { useEffect } from 'react';

const TwitchLoginRedirectPage = () => {

    const twitchAuthorize = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code')

        if (code) {
            const authResponse = await getUserLoginAccessToken(code)
            const userResponse = await createOrUpdateAccount(authResponse.data)

            const user = userResponse.data

            if (!user.twitchAccessToken || !user.twitchRefreshToken || !user.twitchTokenExpiresAt) {
                return;
            }

            localStorage.setItem('accountId', user.id)
            localStorage.setItem('username', user.username)
            localStorage.setItem('twitchId', user.twitchId)
            localStorage.setItem('twitchAccessToken', user.twitchAccessToken)
            localStorage.setItem('twitchRefreshToken', user.twitchRefreshToken)
            localStorage.setItem('twitchTokenExpiresAt', new Date(user.twitchTokenExpiresAt).getTime().toString())

            window.location.href = '/'

        }
    }

    useEffect(() => {
        twitchAuthorize()
    }, [])

    return (
        <div>TwitchLoginRedirectPage</div>
    )
}

export default TwitchLoginRedirectPage