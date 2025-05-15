import { useEffect, useState } from "react";
import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";

const Benefits = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in based on localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  return (
    <Section id="services">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Stay Organized and Connected with RoomieSync"
          text="RoomieSync makes living with roommates easier by helping you manage shared expenses, plan events, and communicate effortlessly—all in one place."
        />

        <div className="flex flex-wrap gap-10 justify-center mb-10">
          {benefits.map((item) => {
            // If logged in, wrap the card content in an <a> tag
            const cardContent = (
              <div
                className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] card "
                style={{
                  backgroundImage: `url(${item.backgroundUrl})`,
                }}
                key={item.id}
              >
                <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                  <h5 className="h5 mb-5">{item.title}</h5>
                  <p className="body-2 mb-6 text-n-3">{item.text}</p>
                  <div className="flex items-center mt-auto">
                    <img
                      src={item.iconUrl}
                      width={48}
                      height={48}
                      alt={item.title}
                    />
                  </div>
                </div>

                {item.light && <GradientLight />}

                <div
                  className="absolute inset-0.5 bg-n-8"
                  style={{ clipPath: "url(#benefits)" }}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        width={380}
                        height={362}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                <ClipPath />
              </div>
            );

            return isLoggedIn ? (
              <a href={item.url} key={item.id} className="no-underline">
                {cardContent}
              </a>
            ) : (
              <div key={item.id}><a href="/api/auth/register">{cardContent}</a></div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
