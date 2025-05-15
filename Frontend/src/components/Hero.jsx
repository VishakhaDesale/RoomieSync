/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { curve } from "../assets";
import Button from "./Button";
import Section from "./Section";
import { BottomLine } from "./design/Hero";

const Hero = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  return (
    <Section
      className="pt-[12rem] h-screen"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="flex px-12 py-5">
        <div className="z-1">
          <img src="h3.png" alt="" />
        </div>

        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem] pt-32">
          <div className="h4 mb-6">
            Discover Seamless Collaboration with&nbsp;RoomieSync&nbsp;— {` `}
            <span className="inline-block relative">
              Your Roommate's Best Companion
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </div>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Simplify shared living with RoomieSync. Manage your household
            expenses, events, and communication effortlessly with our all-in-one
            app designed for roommates.
          </p>
          {!isLoggedIn && (
            <Button href="/api/auth/register" white>
              Let's go..
            </Button>
          )}

        </div>
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;
