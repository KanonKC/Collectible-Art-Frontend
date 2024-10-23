import Navbar from "@/layouts/Navbar/Navbar"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/stores/hooks"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const LandingPage = () => {
    
    const count = useAppSelector(state => state.counter.value)
    const dispatch = useAppDispatch()

    const handleOnClickIncrement = () => {
        dispatch({type: 'counter/incrementByAmount', payload: 3})
    }

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