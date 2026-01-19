import { useEffect } from "react";
import { useHotelImageStore } from "../store/HotelImageStore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Theme (){

    const { images, fetchHotelImages } = useHotelImageStore();
    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 3,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3500,
        swipeToSlide: true,
        centerMode: false,
        variableWidth: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };
    
    useEffect(() => {
        fetchHotelImages();
    }, []);


    return(
        <section className="bg-[#f2fcf4] mt-[5rem] ">
            <main className="font-serif font-extralight">
                <p className="text-base lg:text-[1.2rem] text-[#76be81] text-center pb-4 pt-[3rem] tracking-wide">THROUGH OUR LENSES</p>
                <h1 className="text-[2rem] md:text-[2.3rem] lg:text-[2.6rem] text-center font-lighter tracking-wide font-serif" >Sunrise-Stay Hotel</h1>
                <div className="mt-[3rem]">
                    <Slider {...settings}>
                        {images.map((image) => (
                        <div key={image.id} className=" w-[100%]">
                            <img
                            src={image.image_url}
                            className="w-full h-[280px] md:px-3 lg:px-3 px-2 object-cover rounded-[14px] transition-[filter,transform] duration-[400ms,300ms]  ease-in-out hover:blur-[3px]"
                            />
                        </div>
                        ))}
                    </Slider>
                </div>
            </main>
        </section>
    )
}
export default Theme