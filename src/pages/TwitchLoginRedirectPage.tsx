import { getTwitchUserByAccessToken, getUserLoginAccessToken } from '@/service/Twitch.service';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TwitchLoginRedirectPage = () => {

    const navigate = useNavigate()

    const twitchAuthorize = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code')

        if (code) {
            const authResponse = await getUserLoginAccessToken(code)
            const userResponse = await getTwitchUserByAccessToken(authResponse.data.access_token)

            const user = userResponse.data.data[0];
            const tokenExpiresAt = new Date(new Date().getTime() + authResponse.data.expires_in * 1000)

            localStorage.setItem('username', user.display_name)
            localStorage.setItem('twitchId', user.id)
            localStorage.setItem('twitchImageUrl', user.profile_image_url)
            localStorage.setItem('twitchAccessToken', authResponse.data.access_token)
            localStorage.setItem('twitchRefreshToken', authResponse.data.refresh_token)
            localStorage.setItem('twitchTokenExpiresAt', tokenExpiresAt.getTime().toString())

            // window.location.href = '/'
            navigate(-1)

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