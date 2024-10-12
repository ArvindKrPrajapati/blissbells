import { Pacifico } from "next/font/google";
import LandingImageCarousel from "@/components/Carousel/LandingImageCarousel";
import LandingCTA from "@/components/LandingCTA";
import Container from "@/components/Container";
import Footer from "@/components/Footer/Footer";
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
  const FeatureCard = ({ icon, title, description }: any) => (
    <div className="bg-gray-100 bg-opacity-80 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:rotate-1">
      <i className={`${icon} text-3xl  w-12 h-12 text-red-500 mb-4`} />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
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

      {/* features */}
      <Container className="md:py-16 pt-8 px-4">
        <h2 className="text-3xl font-semibold text-center mb-4 bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent animate-fade-in">
          Why Choose BlissBells?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={"fa-solid fa-calendar"}
            title="Never Forget"
            description="Set reminders for birthdays, anniversaries, and all special occasions."
          />
          <FeatureCard
            icon={"fa-solid fa-bell"}
            title="Timely Alerts"
            description="Receive notifications well in advance to plan the perfect surprise."
          />
          <FeatureCard
            icon={"fa-solid fa-heart"}
            title="Show You Care"
            description="Strengthen relationships by always remembering important dates."
          />
        </div>
      </Container>
      {/* features end */}
      {/* Footer */}
      <Footer />
      {/* Footer ends */}
    </>
  );
}
