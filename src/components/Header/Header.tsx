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

export default function Header() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    <div
      className={`flex font-sans justify-between items-center p-3 transition-all duration-75 ${
        homePath ? "fixed bg-transparent" : "border-b bg-white sticky"
      } px-3 md:px-[90px] w-full top-0 h-[70px] ${
        revealHeader ? "bg-white border-b h-[65px]" : ""
      } z-20`}
    >
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
      </div>

      <div className="flex items-center gap-5">
        {revealHeader ? (
          <div className="hidden md:flex gap-5">
            {routes.map((item, index) => (
              <Link
                href={item.route}
                key={item.id}
                className={`text-md hover:text-pink-500 ${
                  pathname == item.route ? "text-pink-500" : "text-zinc-800"
                }`}
              >
                <p className="font-medium text-sm">{item.name}</p>
              </Link>
            ))}
          </div>
        ) : null}

        {/* menu */}
        <section
          className={`md:hidden ${
            isMenuOpen ? "visible" : "invisible"
          } fixed top-[65px] w-full h-[calc(100%-65px)] bg-white left-0 py-1`}
        >
          {routes.map((item, index) => (
            <Link
              href={item.route}
              key={item.id}
              className={`hover:text-gray-500 ${
                pathname == item.route ? "text-gray-500" : ""
              }`}
            >
              <div className="p-2 px-4">
                <p className="font-medium text-md">{item.name}</p>
              </div>
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
        {revealHeader ? (
          <ClientOnly>
            {!auth ? (
              <>
                <LandingCTA className="p-1 text-sm hidden md:flex" />
              </>
            ) : (
              <div onClick={logout} className="cursor-pointer">
                <Image
                  alt="Profile image"
                  width={1000}
                  height={1000}
                  src={auth.user.dp || "/images/user.png"}
                  className="ml-2 mt-1 w-[30px] aspect-square rounded-full"
                />
              </div>
            )}
          </ClientOnly>
        ) : null}
        <Button
          startContent={<i className="fa-solid fa-bars"></i>}
          className={`bg-inherit md:hidden`}
          isIconOnly={true}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        ></Button>
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
    </div>
  );
}
