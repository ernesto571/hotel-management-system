import { ChevronRightCircle, PhoneCallIcon } from "lucide-react"

function About() {

    return(
        <section >
            <div className="mt-[8rem] w-[95%] md:w-[90%] lg:w-[85%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-11">
                <div className="flex relative">
                    <div className="flex relative ">
                        <img src="/about-1.jpg" alt="" className="rounded-[15px] relative h-[90%] w-[90%] lg:w-[85%] transition-[filter,transform] duration-[400ms,300ms] ease-in-out hover:blur-[3px]" />
                        
                        <img src="/about-02.jpg" alt="" className="absolute bottom-[-3px] right-[0.1rem] lg:right-[-1rem] w-[60%] h-[45%] border-[10px] border-white rounded-lg transition-[filter,transform] duration-[400ms,300ms] ease-in-out hover:blur-[3px]"/>
                    </div>

                    <span className="hidden lg:flex lg:flex-col absolute right-[3rem] top-[6rem] bg-[#262626] w-[35%] h-[43%] justify-center items-center text-center rounded-[10px]">
                        <img src="/award.svg" alt="" className=" w-24 "/>
                        <p className="text-white font-serif text-[1.1rem]">AWARD WINING HOTEL</p>
                    </span>
                </div>

                <div >
                    <h6 className="font-serif  text-[#76be81] tracking-wide font-extralight">ABOUT US</h6>
                    <h1 className="w-[80%] lg:w-full mt-5 font-serif text-gray-900 tracking-wide text-[2.1rem] lg:text-[2.7rem] font-thin">More Than a Hotel – A Tradition of Excellence</h1>

                    <p className=" text-gray-700 font-light tracking-wide leading-loose pt-4 text-[0.9rem]">At our hotel, luxury is more than just a word — it's a tradition. From exquisite design to personalized service, every detail is thoughtfully curated to create unforgettable experiences. Whether you're here for relaxation or celebration, we offer more than a stay — we offer a legacy of comfort, elegance, and world-class hospitality. </p>

                    <div className="grid lg:flex md:flex gap-9 mt-8 lg:mt-3">
                        <span className="flex w-[60%] lg:w-[40%] gap-5 mt-5 items-center">
                            <img src="/icon-1.png" alt="" />
                            <p className="font-serif text-gray-800 text-[1.3rem]">The Greatest Lighting</p>
                        </span>

                        <span className="flex w-[60%] lg:w-[30%] gap-5 mt-5 items-center">
                            <img src="/icon-2.png" alt="" />
                            <p  className="font-serif text-gray-800 text-[1.3rem]">Pick Up & Drop</p>
                        </span>
                    </div>

                    <span className="flex gap-3 mt-8 mb-5">
                        <ChevronRightCircle className="text-white flex fill-[#76be81] "/>
                        <p className="font-serif text-gray-800 text-[1.1rem]">Morning Meals for Everyone </p>
                    </span>

                     <span  className="flex gap-3 mb-6">
                        <ChevronRightCircle className="text-white flex fill-[#76be81] "/>
                        <p className="font-serif text-[#1c1c1c] text-[1.1rem]">The Best Parking Space </p>
                    </span>
                    
                    <span className="grid md:flex lg:flex gap-10 lg:gap-[5rem] mt-6 lg:mt-1">

                        <button className="py-3 w-[50%] md:w-[%] lg:px-12 rounded-[6px] bg-[#76be81] text-white hover:bg-[#1c1c1c] hover:text-white duration-100 ease-in">ABOUT US</button>

                        <span className="flex items-center">
                            <span className="p-4 rounded-full bg-[#1c1c1c]">
                             <PhoneCallIcon color="white"  size={20}  />
                            </span>
                            
                            <div className="pl-3">
                                <p className="pb-1 text-[#1c1c1c] ">Booking Now</p>
                                <p className="text-[#76be81]">080 2741 5876</p>
                            </div>
                        </span>
                    </span>
                    
                </div>
            </div>
        </section>
    )

}

export default About