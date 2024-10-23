import Navbar from "@/layouts/Navbar/Navbar"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
    
    const nagivate = useNavigate()

    useEffect(() => {
        nagivate('/tarot-card-collections')
    }, [nagivate])

    return (
        <div>
            <Navbar>
                <div></div>
                {/* {count}
                <Button onClick={handleOnClickIncrement}>Increase</Button>
                LandingPage */}
            </Navbar>
        </div>
    )
}

export default LandingPage