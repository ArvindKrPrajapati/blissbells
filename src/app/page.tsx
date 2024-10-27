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
const howItWorks = [
  {
    id: 1,
    text: "Sign Up",
    subText: "Create your account in seconds and get started",
  },
  {
    id: 2,
    text: "Add Important Dates",
    subText: "Input birthdays, anniversaries, and special occasions",
  },
  {
    id: 3,
    text: "Never Miss a Moment",
    subText: "Receive early and timely reminders and celebrate with loved ones",
  },
];
export default function Home() {
  const FeatureCard = ({ icon, title, description }: any) => (
    <div className="animate-[appearance-in_1s] bg-gradient-to-br from-red-200 to-pink-200 bg-opacity-80 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:rotate-1">
      <i className={`${icon} text-3xl  w-12 h-12 text-red-500 mb-4`} />
      <h3 className="text-xl font-semibold mb-2 text-pink-900">{title}</h3>
      <p className="text-pink-700">{description}</p>
    </div>
  );
  return (
    <>
      <div className="md:block md:absolute z-0 inset-0 my-bg h-[100dvh] hidden" />
      <div className="flex md:block flex-col-reverse pb-12 z-1 relative min-h-screen my-bg-md-white">
        <Container>
          <div
            className={`flex justify-center px-9 text-center md:pt-[150px] pt-[50px]`}
          >
            <div className="px-3">
              <h1
                className={`lg:text-8xl md:text-6xl text-3xl my-secondary-text  pb-2 ${font.className} animate-[appearance-in_600ms]`}
              >
                {"Let life’s best moments ring loud."}
              </h1>
              <h2 className="my-tertiary-text pt-4 md:text-lg animate-[appearance-in_800ms]">
                BlissBells keeps your celebrations close, ensuring no special
                day is ever forgotten.
              </h2>
              <div className="flex justify-center mt-8">
                <LandingCTA className="text-sm md:text-lg" />
              </div>
            </div>
          </div>
        </Container>
        <div className="md:pt-[60px] pt-[110px]">
          <LandingImageCarousel data={images} />
        </div>
      </div>
      {/* features */}
      <Container className="py-16 pt-0 px-4">
        <h2 className="text-2xl font-semibold text-center py-6 my-text">
          Why BlissBells?
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

        {/* How it works section */}
        <div className="md:py-12 py-6 animate-[appearance-in_1s]">
          <h2 className="text-2xl font-semibold text-center py-12 my-text">
            How It Works?
          </h2>
          <div className="flex flex-col-reverse md:flex-row items-center gap-8">
            <div className="flex-1 p-3">
              <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                {howItWorks.map((item) => (
                  <li className="mb-10 ms-6" key={item.id}>
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-pink-600 rounded-full -start-4 text-white">
                      {item.id}
                    </span>
                    <h3 className="text-black font-semibold">{item.text}</h3>
                    <p className="text-sm text-gray-600">{item.subText}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex-1">
              <img
                src="/images/celebration.jpg"
                alt="How BlissBells Works"
                className="rounded-lg shadow-lg shadow-pink-300 w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </Container>
      {/* features end */}
      <Footer />
    </>
  );
}
