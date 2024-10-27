"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { routes } from "./routes";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Login from "../Auth/Login";
import { getAuthCookie } from "@/lib/apiCalls";
import toast from "react-hot-toast";
import ClientOnly from "../ClientOnly";
import { div } from "framer-motion/client";
import LandingCTA from "../LandingCTA";
import Container from "../Container";
import MyLogo from "../MyLogo";

export default function Header() {
  return (
    <Suspense fallback={<div></div>}>
      <HeaderComponent />
    </Suspense>
  );
}

function HeaderComponent() {
  const pathname = usePathname();
  const homePath = pathname == "/";
  const [revealHeader, setRevealHeader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = getAuthCookie();

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;

      if (currentPosition > 100) {
        setRevealHeader(true);
      } else {
        setRevealHeader(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const openModal = () => {
    setIsMenuOpen(false);
    onOpen();
  };

  useEffect(() => {
    const auth = searchParams.get("auth")?.toString();
    if (auth == "true") {
      openModal();
    } else {
      closeModal();
    }
  }, [searchParams]);

  const closeModal = () => {
    router.replace(pathname);
    onClose();
  };

  const logout = () => {
    // document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // setIsMenuOpen(false);
    // toast.success("Logged out successfully");
    router.replace("/profile");
    // router.refresh();
  };
  return (
    <div className={`flex justify-center sticky top-0 z-40`}>
      <div
        className={`${homePath ? "fixed" : "sticky"} ${revealHeader || !homePath ? "w-full bg-white border-b top-0" : "shadow-md w-[calc(100%-16px)] lg:w-[45%] my-bg-secondary m-2 rounded-md"} p-3 z-20 transition-all duration-200`}
      >
        <Container className="flex justify-between md:max-w-6xl">
          {/* start */}
          <MyLogo revealHeader={revealHeader} />
          {/* middle */}
          <div className="hidden md:flex gap-5 items-center">
            {routes.map((item, index) => (
              <Link
                href={item.route}
                key={item.id}
                className={`text-md hover:text-pink-500 hover:scale-125 transition-all duration-400 ${
                  pathname == item.route
                    ? "text-pink-500"
                    : revealHeader
                      ? "text-zinc-900"
                      : "text-zinc-100"
                }`}
              >
                <i className={`fa-solid fa-${item.icon} text-sm`} />
                {"  "}
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            ))}
          </div>
          {/* end */}
          <div className="flex gap-2 items-center md:min-w-[100px] justify-end">
            <ClientOnly>
              {auth ? (
                <Link href={"/profile"}>
                  <Image
                    alt="Profile image"
                    width={1000}
                    height={1000}
                    src={auth.user.dp || "/images/user.png"}
                    className="ml-2 mt-1 w-[25px] aspect-square rounded-full"
                  />
                </Link>
              ) : (
                <LandingCTA className="text-xs hidden md:flex" />
              )}
            </ClientOnly>
            <Button
              startContent={
                <i
                  className={`fa-solid fa-${isMenuOpen ? "close" : "bars"} transition-all duration-300 text-[1.123rem] my-text`}
                ></i>
              }
              className={`bg-inherit md:hidden`}
              isIconOnly={true}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            ></Button>
          </div>
          {/* over */}
        </Container>
      </div>
      <Modal
        size="xl"
        isOpen={isOpen}
        onClose={closeModal}
        className="bg-white min-h-[calc(100dvh-10px)] md:min-h-max"
        placement="top"
        scrollBehavior="inside"
        backdrop="blur"
        isDismissable={false}
        radius="sm"
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <Login closeModal={closeModal} />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
      {/* menu */}
      <section
        className={`md:hidden ${
          isMenuOpen ? "visible" : "invisible"
        } fixed top-[65px] w-[calc(100%-16px)] h-[calc(100%-100px)] bg-white left-0 py-1 m-2 mt-3 z-30 rounded-md`}
      >
        {routes.map((item, index) => (
          <Link
            href={item.route}
            key={item.id}
            className={`text-md hover:text-pink-500 transition-all duration-400 ${
              pathname == item.route ? "text-pink-500" : "text-zinc-800"
            } block p-2 px-4 hover:bg-pink-100`}
          >
            {isMenuOpen ? (
              <>
                <i className={`fa-solid fa-${item.icon} text-sm`} />
                <span className="font-medium text-sm px-3">{item.name}</span>
              </>
            ) : null}
          </Link>
        ))}
        <ClientOnly>
          {!auth ? (
            <div className="p-4">
              <LandingCTA className="p-1 text-sm transition-none  w-full" />
            </div>
          ) : null}
        </ClientOnly>
      </section>
      {/* menu ends */}
    </div>
  );
}
