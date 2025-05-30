import Image from "next/image";
import hospitalImage from "@public/images/korle-bu.png";
import partnerImage from "@public/images/trusted.png";
import heroImage from "@public/images/hero-section-mobile.png";

const Hero = () => {
  const trustedPartners = [
    {
      title: "Korle Bu Teaching Hospital",
      image: hospitalImage,
    },
    {
      title: "Korle Bu Teaching Hospital",
      image: hospitalImage,
    },
    {
      title: "Korle Bu Teaching Hospital",
      image: hospitalImage,
    },
    {
      title: "Korle Bu Teaching Hospital",
      image: hospitalImage,
    },
    {
      title: "Korle Bu Teaching Hospital",
      image: hospitalImage,
    },
  ];
  return (
    <section className="flex w-full flex-col gap-2 px-6 py-16 max-md:px-0 md:px-8 lg:py-48">
      <div className="container grid grid-cols-1 gap-10 py-16 md:grid-cols-2">
        <div className="w-full">
          <div className="mb-6 flex w-full items-center space-x-2 rounded-lg bg-[#FDF8E5] px-4 py-[10px] text-[#6A5E34] md:w-fit">
            <span className="text-sm">⭐</span>
            <p className="text-sm">
              Access our premier inventory for pharmacies and hospitals
            </p>
          </div>
          <h1 className="mb-11 text-4xl font-bold max-md:px-5 max-md:text-[44px] lg:text-6xl">
            Streamline Your <br /> Pharmaceutical <br /> Inventory
          </h1>
          <p className="mb-11 max-w-[28rem] text-gray-500 max-md:px-5">
            Efficient drug management for hospitals, clinics, and pharmacies.
            Ensure accuracy, prevent stockouts, and optimize your supply chain.
          </p>
          <div className="flex space-x-4 max-md:px-5">
            <button className="cursor-pointer rounded-lg bg-[#415BE6] px-6 py-3 text-lg text-white hover:bg-blue-700">
              Contact us
            </button>
            <button className="cursor-pointer rounded-lg bg-[#E2E8F0] px-6 py-3 text-lg text-[#111111] hover:bg-gray-300">
              Book a demo
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <Image src={heroImage} alt="Hero Image" className="w-full" />
      </div>

      <div className="-mt-16 flex flex-col items-center space-y-6 md:mt-40">
        <div className="mb-6">
          <Image
            src={partnerImage}
            alt="Trusted partner"
            className="mx-auto"
            width={80}
            height={80}
          />
        </div>
        <h3 className="mb-6 text-center text-lg text-[#111111]">
          Trusted by top Hospitals, Clinics and Pharmacies
        </h3>
        <div className="flex flex-wrap justify-center space-x-4">
          {trustedPartners.map(({ title, image }, index) => (
            <Image
              key={`${title}-${index}`}
              src={image}
              alt={title}
              className="h-auto w-20"
              width={80}
              height={80}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
