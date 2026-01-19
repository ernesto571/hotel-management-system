import { KeyRound, Car, Wifi, ConciergeBell, Utensils, Waves, } from "lucide-react";

function Facility(){

    const facilities = [
        {
            id:1,
            icon: KeyRound,
            name: "Smart Key"
        },
        {
            id:2,
            icon: Car,
            name: "Free Car Parking"
        },
        {
            id:3,
            icon: Wifi,
            name: "Fast Wifi Internet"
        },
        {
            id:4,
            icon: ConciergeBell,
            name: "Room Service"
        },
        {
            id:5,
            icon: Utensils,
            name: "Food & Drink"
        },
        {
            id:6,
            icon: Waves,
            name: "Swimming Pool"
        },
    ]

    return(
        <main className="bg-white">
            <section className='mt-8 relative'>
                <span className="font-extralight">
                    <h3 className="font-serif text-center text-[#76be81] tracking-wide text-base lg:text-[1.2rem]">FACILITIES</h3>
                    <h1  className="font-serif text-center text-gray-900 tracking-wide text-[1.8rem] md:text-[2.1rem] lg:text-[2.3rem] pt-7 font-light">Hotel's Facilities</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 lg:gap-10 w-[95%] lg:w-[85%] mx-auto mt-7 lg:mt-12">
                        {facilities.map((facility) => {
                            const Icon = facility.icon

                            return(
                                <span
                                key={facility.id}
                                className=" bg-[#f2fcf4] flex flex-col items-center justify-center text-center py-10 hover:border hover:border-[#76be81] ease-out duration-200">
                                    <Icon className="text-[#76be81] pb-4" size={60}/>
                                    <p className="font-serif text-[1.2rem] font-extralight text-gray-800 tracking-wide">{facility.name}</p>
                                </span>
                            
                            )
                        
                        })}
                    </div>
                </span>
                
                <div className="right-0 absolute bottom-[-10rem]">
            <img src="/right-shape02.png" alt="" className="object-cover" />
          </div>
            </section>
        </main>
    )

}
export default Facility