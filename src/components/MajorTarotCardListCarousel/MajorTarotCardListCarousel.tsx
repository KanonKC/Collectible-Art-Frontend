import MajorTarotCardList from "../MajorTarotCardList/MajorTarotCardList"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"

const MajorTarotCardListCarousel = () => {
  return (
    <div>
        <div className="block md:hidden">
            <MajorTarotCardList startCardNumber={0} endCardNumber={21}/>
        </div>
        <div className="hidden md:block lg:hidden">
            <Carousel>
                <CarouselContent>
                    <CarouselItem>
                        <MajorTarotCardList startCardNumber={0} endCardNumber={5}/>
                    </CarouselItem>
                    <CarouselItem>
                        <MajorTarotCardList startCardNumber={6} endCardNumber={11}/>
                    </CarouselItem>
                    <CarouselItem>
                        <MajorTarotCardList startCardNumber={12} endCardNumber={17}/>
                    </CarouselItem>
                    <CarouselItem>
                        <MajorTarotCardList startCardNumber={18} endCardNumber={21}/>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
        <div className="hidden lg:block xl:hidden">
            <Carousel>
                <CarouselContent>
                    <CarouselItem>
                        <MajorTarotCardList startCardNumber={0} endCardNumber={7}/>
                    </CarouselItem>
                    <CarouselItem>
                        <MajorTarotCardList startCardNumber={8} endCardNumber={15}/>
                    </CarouselItem>
                    <CarouselItem>
                        <MajorTarotCardList startCardNumber={16} endCardNumber={21}/>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
        <div className="hidden xl:block">
            <Carousel>
                <CarouselContent>
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
        </div>
    </div>
  )
}

export default MajorTarotCardListCarousel