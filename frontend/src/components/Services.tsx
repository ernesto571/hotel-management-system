import { ChevronRightCircle } from "lucide-react";
import { useEffect, useState } from "react";

function Services() {
  const services = [
    {
      id: 1,
      type: "Leisure",
      title: "Family Fun Package",
      img: "/services/family.jpg",
      description: "A perfect getaway designed for families to relax, bond, and enjoy premium hospitality together.",
      includes: [
        "Complimentary theme park tickets",
        "Free meals for kids under 12",
        "Spacious family room",
        "Late checkout option"
      ],
      price: 180,
      oldPrice: 240
    },
    {
      id: 2,
      type: "Relaxation",
      title: "Spa & Beauty Retreat",
      img: "/services/spa.jpg",
      description: "Rejuvenate your body and mind with luxury spa treatments in a calm and serene environment.",
      includes: [
        "Full body massage",
        "Facial and skincare session",
        "Access to sauna and steam room",
        "Complimentary herbal drinks"
      ],
      price: 150,
      oldPrice: 210
    },
    {
      id: 3,
      type: "Couples",
      title: "Romantic Getaway",
      img: "/services/romantic.jpg",
      description: "An intimate escape curated for couples seeking privacy, comfort, and unforgettable moments.",
      includes: [
        "Candlelight dinner for two",
        "Decorated luxury suite",
        "Complimentary wine",
        "Late checkout"
      ],
      price: 220,
      oldPrice: 300
    },
    {
      id: 4,
      type: "Executive",
      title: "Business & Executive Package",
      img: "/services/business.avif",
      description: "Designed for professionals who value efficiency, comfort, and seamless business services.",
      includes: [
        "High-speed internet access",
        "Complimentary breakfast",
        "Meeting room access",
        "Airport pickup and drop-off"
      ],
      price: 200,
      oldPrice: 260
    },
    {
      id: 5,
      type: "Fitness",
      title: "Wellness & Fitness Stay",
      img: "/services/gym.webp",
      description: "Maintain a healthy routine while enjoying a peaceful stay with premium wellness facilities.",
      includes: [
        "Daily gym access",
        "Yoga or fitness session",
        "Healthy meal plan",
        "Swimming pool access"
      ],
      price: 170,
      oldPrice: 230
    }
  ];

  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CENTER_INDEX = Math.floor(visibleCount / 2);

  const visibleServices = Array.from({ length: visibleCount }, (_, i) => {
    const serviceIndex = (index - CENTER_INDEX + i + services.length) % services.length;
    return services[serviceIndex];
  });

  const nextService = () => {
    setIndex(prev => (prev + 1) % services.length);
  };

  useEffect(() => {
    const interval = setInterval(nextService, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <main className="w-[95%] mx-auto">
        <div className="flex relative">
          <span className="mt-[6rem] absolute w-full flex flex-col items-center text-center justify-center tracking-wide font-extralight font-serif">
            <h5 className="lg:text-[1.2rem] text-[#76be81]">EXCLUSIVE DEALS</h5>
            <h1 className="text-[1.8rem] md:text-[2.3rem] lg:text-[2.5rem] py-5">Our Limited-Time Offers</h1>
          </span>
          <div className="w-[100%] flex justify-end">
            <img src="/services/right-shape.png" alt="" className="object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleServices.map((service, i) => {
            const isActive = i === CENTER_INDEX;
            return (
              <div key={service.id} className={`border-[23px] rounded-lg transition-all ease-in ${isActive ? "border-[#76be81] bg-[#76be81] text-white" : "border-[#f8f8f8] text-[#1a4042] bg-[#f8f8f8]"}`}>
                <div className="font-serif">
                  <img src={service.img} alt="" className="h-[250px] md:h-[320px] lg:h-[350px] mb-5 rounded-[10px] w-full object-cover transition-[filter,transform] duration-[400ms,300ms] ease-in-out hover:blur-[3px]" />
                  <span className="font-extralight">
                    <p className={`tracking-wide pb-2 text-[1.1rem] ${isActive ? "text-white" : "text-[#76be81]"}`}>{service.type}</p>
                    <h2 className="text-[1.8rem] tracking-wide pb-2">{service.title}</h2>
                    <p className="font-sans pb-3 leading-relaxed">{service.description}</p>
                    {service.includes.map((include, idx) => (
                      <span key={idx} className="flex gap-2 items-center py-2">
                        <ChevronRightCircle className={`${isActive ? "text-[#76be81] fill-[#f8f8f8]" : "text-[#f8f8f8] fill-[#76be81]"}`} />
                        <p>{include}</p>
                      </span>
                    ))}
                    <span className="flex gap-8 font-sans text-center mt-2">
                      <p className="line-through text-[1.2rem] pt-1">$ {service.oldPrice}</p>
                      <p className="text-[1.5rem]">$ {service.price}</p>
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 my-6 justify-center">
          {services.map((_, i) => (
            <span key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === index ? "bg-[#76be81]" : "bg-[#d9d9d9]"}`} />
          ))}
        </div>
      </main>
    </section>
  );
}

export default Services;