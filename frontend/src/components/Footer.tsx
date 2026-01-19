import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

function Footer (){

    return(
        <section  className="bg-[#1c1c1c] relative">
            <img src="/footer-img.jpg" alt="" className="min-h-[120vh] md:min-h-[90vh] lg:min-h-[65vh] " />
            <div className=" absolute pt-[4rem] top-0 object-cover">
                {/* input bar */}
                <span className="w-[95%] lg:w-[75%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-auto items-center ">
                    <h1 className="font-serif text-[2.2rem] lg:text-[2.8rem] text-white tracking-wide">Join Our Newsletter</h1>
                    <span className="relative ">
                        <input type="text" placeholder="Enter Your Email"  className="border border-[#3e3e3e] rounded-[4px] bg-inherit py-3  pl-[3rem] pr-[5rem] lg:pr-[8rem]"/>
                        <button className="absolute bg-[#76be81]  right-[6%] md:right-[8%] lg:right-[24%] py-[0.55rem] px-[20px] top-[0.26rem] rounded-[4px] text-white hover:bg-black duration-500 ease-in-out">SUBSCRBE</button>
                    </span>
                </span>

                {/* bottom */}
                <div className="w-[95%] lg:w-[85%] mx-auto border-t border-[#3e3e3e] mt-[3rem]">
                    <div className=" grid grid-cols-2 lg:grid-cols-4 mt-10 gap-6">
                        <span className="text-white col-span-2 md:col-span-1 lg:col-span-1">
                            <h1 className="text-[2rem] font-serif  font-extralight">Sunrise-Stay Hotel</h1>
                            <p className="pt-4 text-sm text-gray-200 font-light leading-relaxed">Providing comfort, luxury, and exceptional experiences—perfect for every traveler seeking a memorable stay.</p>
                            <div className="flex gap-3 mt-4 mb-3">
                                <a href="#">
                                    <Github />
                                </a>
                                <a href="#">
                                    <Linkedin />
                                </a>
                                <a href="#">
                                    <Twitter />
                                </a>
                                <a href="#">
                                    <Facebook />
                                </a>
                            </div>
                        </span>

                        {/* quick links */}
                        <span className="flex flex-col text-white  lg:pl-[3rem] pl-0 tracking-wide">
                            <h1 className="text-[1.5rem]  lg:text-[2rem] font-serif font-extralight pb-1 ">Quick Links</h1>
                            <Link to="/" className="py-2 text-sm hover:text-[#76be81] hover:translate-x-2 ease-in-out duration-300">Home</Link>
                            <Link to="/rooms" className="py-2 text-sm hover:text-[#76be81] hover:translate-x-2 ease-in-out duration-300">Rooms</Link>
                            <Link to="/contact" className="py-2 text-sm hover:text-[#76be81] hover:translate-x-2 ease-in-out duration-300">Contact</Link>
                            <Link to="/sign-in" className="py-2 text-sm hover:text-[#76be81] hover:translate-x-2 ease-in-out duration-300">Sign In</Link>
                        </span>

                        {/* guest service */}
                        <span className=" text-white tracking-wide">
                            <h1 className="text-[1.5rem]  lg:text-[2rem] font-serif font-extralight pb-1 ">Guest Services</h1>
                            <p className="py-2 text-sm">24/7 Front Desk</p>
                            <p className="py-2 text-sm">Parking</p>
                            <p className="py-2 text-sm">Room Service</p>
                            <p className="py-2 text-sm">Free Wi-fi</p>
                        </span>

                        {/* contact */}
                        <span className=" text-white tracking-wide col-span-2 md:col-span-1 lg:col-span-1">
                            <h1 className="text-[1.5rem]  lg:text-[2rem] font-serif font-extralight pb-1 ">Contact Us</h1>
                            <p className="py-2 text-sm leading-relaxed">United States —350 Fifth Avenue, 21st Floor New York, NY 10118 </p>
                            <p className="py-3 text-sm">080 471 5876</p>
                            <p className="py-2 text-sm">Mon-Fri 8:00am - 6:00pm </p>
                        </span>
                    </div>
                </div>
                
            </div>
        </section>
    )
}
export default Footer;