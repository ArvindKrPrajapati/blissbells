import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link href="/">
            <Image
              width={1000}
              height={1000}
              className="h-[50px] w-[160px]"
              src={"/images/logo.png"}
              alt="Logo"
            />
          </Link>
          <p className="mt-4 md:mb-4">
            Never miss a special moment again. Strengthen your relationships
            with timely reminders.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="hover:text-red-400 transition-colors duration-300"
            >
              <i className="fa fa-solid fa0facebook" />
            </a>
            <a
              href="#"
              className="hover:text-red-400 transition-colors duration-300"
            >
              <i className="fa fa-solid fa0facebook" />
            </a>
            <a
              href="#"
              className="hover:text-red-400 transition-colors duration-300"
            >
              <i className="fa fa-solid fa0facebook" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[
              "Home",
              "Features",
              "How It Works",
              "Testimonials",
              "Privacy Policy",
              "Terms of Service",
            ].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-red-400 transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <i className="fa fa-solid fa0facebook" />

              <a
                href="mailto:info@blissbells.com"
                className="hover:text-red-400 transition-colors duration-300"
              >
                info@blissbells.com
              </a>
            </li>
            {/* <li className="flex items-center">
              <i className="fa fa-solid fa0facebook" />

              <a
                href="tel:+1234567890"
                className="hover:text-red-400 transition-colors duration-300"
              >
                +1 (234) 567-890
              </a>
            </li>
            <li className="flex items-center">
              <i className="fa fa-solid fa0facebook" />

              <span>123 Reminder Lane, Memory City, RC 12345</span>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400">
        <p>&copy; 2024 BlissBells. All rights reserved.</p>
      </div>
    </footer>
  );
}
