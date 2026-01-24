import { useParams } from "react-router-dom";
import { useRoomTypeStore } from "../store/RoomTypeStore";
import { CheckCircle2 } from "lucide-react";
import Loading from "../components/Loading";
import { useEffect } from "react";

function RoomDetails () {
  const { RoomName } = useParams();
  const { roomTypes, loading , fetchRoomTypes} = useRoomTypeStore();

  
  const decodedName = decodeURIComponent(RoomName || "");

  // Fetch if store is empty (page reload case)
  useEffect(() => {
    if (roomTypes.length === 0) {
      fetchRoomTypes();
    }
  }, [roomTypes.length, fetchRoomTypes]);

  if (loading || roomTypes.length === 0) {
    return <Loading />;
  }

  const room = roomTypes.find(r => r.name === decodedName);

  if (!room) {
    return (
      <div className="min-h-screen grid place-items-center">
        Room not found
      </div>
    );
  }


  return (
    <section className="min-h-screen">
      {/* Image wrapper */}
      <div className="relative w-full h-[320px] md:h-[350px] lg:h-[400px] overflow-hidden">
        <img
          src="/room-details-img.jpg"
          alt={room.name}
          className="w-full h-full object-cover"
        />
        <p className="absolute inset-0 flex items-center justify-center font-serif text-[2.2rem] lg:text-[3rem] tracking-wider text-white">{room.name}</p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-3 w-[80%] mx-auto gap-[3rem] mt-[8rem]">
        {/* left section */}
        <section className="col-span-2">
            <div className="w-full h-[320px] lg:h-[380px]">
              <img src={room.image}  className="w-full h-full object-cover rounded-t-[8px]" />                      
            </div>

            <div className="mt-4 font-serif font-extralight">
                <p className="text-[#76be81] text-[1.2rem]">{room.name}</p>
                <h1 className="text-[1.8rem] py-2 text-[#1c1c1c]">{room.tagline}</h1>
                <p className="text-gray-800 font-sans leading-relaxed">{room.description}</p>
            </div>

            <div className="mt-7 grid grid-cols-2 font-thin text-gray-800 gap-5">
                <span className="flex flex-col gap-5">
                    <div className="flex gap-2">
                        <CheckCircle2 color="white" className="fill-[#76be81]"/>
                        <p> Check-In:</p>
                    </div>

                    <div className="flex gap-2">
                        <CheckCircle2 color="white" className="fill-[#76be81]"/>
                        <p>Check-in from {room.check_in_time} - anytime </p>
                    </div>

                    
                    <div className="flex gap-2 ">
                        <CheckCircle2 color="white" className="fill-[#76be81]"/>
                        <p>Early Arrival is Contingent Upon Availability. </p>
                    </div>
                </span>

                <span className="flex flex-col gap-5">
                    <div className="flex gap-2">
                        <CheckCircle2 color="white" className="fill-[#76be81]"/>
                        <p> Check Out</p>
                    </div>

                    <div className="flex gap-2">
                        <CheckCircle2 color="white" className="fill-[#76be81]"/>
                        <p>Leave by Midday</p>
                    </div>

                    
                    <div className="flex gap-2">
                        <CheckCircle2 color="white" className="fill-[#76be81]"/>
                        <p> Check - Out is At Any Time Starting {room.check_out_time}.  </p>
                    </div>
                </span>

            </div>

            {/* room features */}
            <div className="mt-5">
              <h1 className="text-[1.6rem] font-thin py-2 font-serif text-[#1c1c1c] tracking-wide">What We Offer:</h1>
              {room.features.map((feature) => (
                <span className="flex pt-2 gap-2 tracking-wide">
                  <CheckCircle2 color="white" className="fill-[#76be81]"/>
                  <p>{feature}</p>
                </span>
              ))}
            </div>
           
            {/* house rules */}
            <div className="mt-5">
              <h1 className="text-[1.6rem] font-thin py-1 font-serif text-[#1c1c1c] tracking-wide">House Rules</h1>
              <p className="text-gray-800">{room.house_rules}</p>
            </div>

            {/* booking info */}
            <div className="mt-5">
              <h1 className="text-[1.6rem] font-thin py-1 font-serif text-[#1c1c1c] tracking-wide">Booking Information:</h1>
              {/* occupancy */}
              <span>
                <div className="flex pt-2 gap-2 tracking-wide font-semibold">
                  <CheckCircle2 color="white" className="fill-[#76be81]"/>
                  <p>Occupancy:</p>
                </div>
                <div className="text-gray-800 py-2">
                {room.max_children == 0 ? (
                  <p>Up to {room.max_adults} adults</p>
                ) : (
                  <p>Up to {room.max_adults} adults + {room.max_children} children</p>
                )}
                </div>
                
              </span>
              {/* inclusion */}
              <span>
                <div className="flex pt-2 gap-2 tracking-wide font-semibold">
                  <CheckCircle2 color="white" className="fill-[#76be81]"/>
                  <p >Inclusions:</p>
                </div>
                <p className="text-gray-800 py-2">
                  {room.inclusions.join(",  ")}
                </p>
              </span>
            </div>
        </section>
      </div>
    </section>
  );
}

export default RoomDetails;
