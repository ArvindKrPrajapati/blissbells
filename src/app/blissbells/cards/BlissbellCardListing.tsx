"use client";
import ProcessStepper from "@/components/ProcessStepper";
import { indianNumberFormat } from "@/lib/common";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
type Props = {
  data: any[];
};

const steps = [
  {
    id: 1,
    text: "Step 1",
    subText: "Unlock High quality Blissbell Card",
  },
  {
    id: 2,
    text: "Step 2",
    subText: "Select a Blissbell and click on Send Card button",
  },
  {
    id: 3,
    text: "Step 3",
    subText: "Download in HD and share",
  },
];
export default function BlissbellCardListing({ data }: Props) {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const handleUnloackCard = async () => {};

  return (
    <div className="columns-2 md:columns-3 gap-4 p-2">
      {data.map((card) => (
        <div
          className="mb-4 w-full bg-gray-100 rounded-lg overflow-hidden relative animate-[appearance-in_600ms]"
          key={card.id}
        >
          {card.premium && (
            <div
              onClick={() => {
                setSelectedCard(card);
                onOpen();
              }}
              className="absolute top-2 right-2 my-btn-bg text-white px-2 py-1 rounded-full text-[0.7rem] z-10 flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300"
            >
              <div>
                <i className="fa-solid fa-crown" /> unlock
              </div>
            </div>
          )}
          <Image
            src={card.image}
            alt="Card"
            width={1000}
            height={1000}
            className="w-full h-auto rounded-lg animate-pulse"
            loading="lazy"
            onLoad={(e) => e.currentTarget.classList.remove("animate-pulse")}
            onError={(e) => e.currentTarget.classList.remove("animate-pulse")}
          />
        </div>
      ))}
      <Modal
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
        className="bg-white min-h-[calc(100%-10px)] md:min-h-max"
        placement="top"
        scrollBehavior="inside"
        backdrop="blur"
        isDismissable={false}
        radius="sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Unlock Blissbell Card</ModalHeader>
              <ModalBody>
                {selectedCard && (
                  <div className="block md:grid md:grid-cols-2 md:gap-4 p-3 px-5">
                    <div>
                      <h1 className=" text-lg mb-3 -ml-3 font-medium">
                        How to use?
                      </h1>
                      <ProcessStepper data={steps} />
                    </div>
                    <Image
                      src={selectedCard.image}
                      alt="Premium Card"
                      width={2000}
                      height={2000}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="flex justify-between items-end">
                <div>
                  <h2 className="text-xs text-gray-500">Amount</h2>
                  <p className="text-green-500">
                    Rs {indianNumberFormat(selectedCard.amount)}
                  </p>
                </div>
                <Button
                  onPress={handleUnloackCard}
                  size="sm"
                  className="my-btn-bg text-white"
                  radius="sm"
                  startContent={<i className="fa-solid fa-crown" />}
                >
                  Unlock
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
