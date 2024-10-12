import { Pacifico } from "next/font/google";
import LandingImageCarousel from "@/components/Carousel/LandingImageCarousel";
import LandingCTA from "@/components/LandingCTA";
const font = Pacifico({ weight: "400", subsets: ["cyrillic"] });

const images = [
  {
    id: 1,
    image: "/images/ani.jpg",
    hover: false,
  },
  {
    id: 2,
    image: "/images/bday.png",
    hover: true,
  },
  {
    id: 3,
    image: "/images/propose.jpg",
    hover: false,
  },
];
export default function Home() {
  return (
    <>
      <div className={`md:h-[100dvh] h-[100dvh] md:flex bg-svg`}>
        <div className="md:w-[45%] w-full md:pl-[100px] md:pt-[170px] md:block flex justify-center items-center h-full p-12">
          <div>
            <h1
              className={`${font.className} text-color font-semibold md:text-5xl md:leading-[1.2em] text-5xl leading-[1.2em]`}
            >
              <span className="ml-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                {"Let life’s best moments ring loud."}
              </span>
            </h1>
            <h2 className="py-8">
              <p className="md:text-xl text-lg mb-8 animate-fade-in-up bg-gradient-to-r from-zinc-950 to-zinc-900 bg-clip-text text-transparent font-semibold">
                BlissBells keeps your celebrations close, ensuring no special
                day is ever forgotten.
              </p>
            </h2>
            <LandingCTA />
          </div>
        </div>
        <div className="w-[55%] overflow-hidden hidden md:block">
          <div className="relative flex items-center justify-center h-full">
            <div className="bg-color rounded-full h-[125vh] w-[80vw] absolute left-[100px] top-[-170px]"></div>
            <div className="flex  items-center pl-11 px-7 gap-1">
              <LandingImageCarousel data={images} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
