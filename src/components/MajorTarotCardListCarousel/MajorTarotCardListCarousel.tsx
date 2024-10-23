import MajorTarotCardList from "../MajorTarotCardList/MajorTarotCardList"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"

const MajorTarotCardListCarousel = () => {
  return (
    <Carousel>
        <CarouselContent className="xs:d-none xxl:d-block">
            <CarouselItem>
                <MajorTarotCardList startCardNumber={0} endCardNumber={9}/>
            </CarouselItem>
            <CarouselItem>
                <MajorTarotCardList startCardNumber={10} endCardNumber={19}/>
            </CarouselItem>
            <CarouselItem>
                <MajorTarotCardList startCardNumber={20} endCardNumber={21}/>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
    </Carousel>
  )
}

export default MajorTarotCardListCarousel