"use client";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
import ParallaxText from "./components/ParallexText";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-black flex flex-col px-5 md:flex-row py-16 md:py-32 lg:py-40">
        <div className="w-full flex flex-col items-center mb-10 md:mb-0">
          <div className="md:w-[60%]">
            <h1 className="text-2xl md:text-6xl mb-8 text-white">
              Flax Card helps you to grow your networking faster.
            </h1>
            <Link
              href="/register"
              className="bg-blue flex items-center w-fit text-white hover:opacity-70 rounded-md px-5 py-3 duration-150"
            >
              Try for free{" "}
              <span className="text-xl">
                <RiArrowRightSLine />
              </span>
            </Link>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-wrap gap-5 md:gap-10 md:w-[60%] justify-between">
            <ul className="text-tSecondary space-y-4">
              <li className="text-white pb-2">Platform</li>
              <li>For Companies</li>
              <li>Pricing & Plans</li>
              <li>Contact</li>
            </ul>
            <ul className="text-tSecondary space-y-4">
              <li className="text-white pb-2">Follow us</li>
              <li>
                <Link href="https://www.facebook.com/flaxpage">Facebook</Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/flax.card">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/company/flaxcard">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="https://x.com/flaxcard">Twitter</Link>
              </li>
            </ul>
            <ul className="text-tSecondary space-y-4">
              <li className="text-white pb-2">Legals</li>
              <li>
                <Link href={"/s/terms-services"}>Privacy and Policy</Link>
              </li>
              <li>Terms of Service</li>
              <li>Terms of Use</li>
              <li>Data Protection</li>
            </ul>
          </div>
        </div>
      </footer>

      <div className="flex space-x-3 bg-black text-white py-3">
        {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((item) => (
          <p key={item} className="whitespace-nowrap">
            👋 Say bye to paper cards
          </p>
        ))} */}
        <ParallaxText baseVelocity={2}>👋 Say bye to paper cards</ParallaxText>
      </div>
    </>
  );
};

export default Footer;
