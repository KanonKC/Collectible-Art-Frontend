import Navbar from "@/layouts/Navbar/Navbar"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/stores/hooks"

const LandingPage = () => {
    
    const count = useAppSelector(state => state.counter.value)
    const dispatch = useAppDispatch()

    const handleOnClickIncrement = () => {
        dispatch({type: 'counter/incrementByAmount', payload: 3})
    }

    return (
        <div>
            <Navbar>
                {count}
                <Button onClick={handleOnClickIncrement}>Increase</Button>
                LandingPage
            </Navbar>
        </div>
    )
}

export default LandingPage