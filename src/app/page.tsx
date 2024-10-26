import { Sansita } from "next/font/google";
import LandingImageCarousel from "@/components/Carousel/LandingImageCarousel";
import LandingCTA from "@/components/LandingCTA";
import Container from "@/components/Container";
import Footer from "@/components/Footer/Footer";
const font = Sansita({ weight: "400", subsets: ["latin"] });

const images = [
  {
    id: 1,
    image: "/images/ani.jpg",
    hover: false,
  },
  {
    id: 2,
    image: "/images/bd.png",
    hover: true,
  },
  {
    id: 3,
    image: "/images/prop.jpg",
    hover: false,
  },
];
export default function Home() {
  const FeatureCard = ({ icon, title, description }: any) => (
    <div className="bg-gradient-to-br from-red-200 to-pink-200 bg-opacity-80 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:rotate-1">
      <i className={`${icon} text-3xl  w-12 h-12 text-red-500 mb-4`} />
      <h3 className="text-xl font-semibold mb-2 text-pink-900">{title}</h3>
      <p className="text-pink-700">{description}</p>
    </div>
  );
  return (
    <>
      <div className="my-bg">
        <div className="flex md:flex-col flex-col-reverse pb-12">
          <Container>
            <div
              className={`flex justify-center px-9 text-center md:pt-[150px] pt-[60px] `}
            >
              <div className="px-3">
                <h1
                  className={`md:text-8xl text-3xl my-secondary-text  pb-3 ${font.className}`}
                >
                  {"Let life’s best moments ring loud."}
                </h1>
                <h2 className="my-tertiary-text pt-5 md:text-lg">
                  BlissBells keeps your celebrations close, ensuring no special
                  day is ever forgotten.
                </h2>
              </div>
            </div>
          </Container>
          <div className="pt-[120px]">
            <LandingImageCarousel data={images} />
          </div>
        </div>
      </div>

      {/* features */}
      <Container className="py-16 pt-8 px-4 md:mt-[450px]">
        <h2 className="text-2xl font-semibold text-center py-6 bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent animate-fade-in">
          Why Choose BlissBells?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
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
      <Footer />
    </>
  );
}
