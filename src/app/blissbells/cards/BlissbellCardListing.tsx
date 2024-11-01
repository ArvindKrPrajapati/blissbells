"use client";
import ActionLoader from "@/components/ActionLoader";
import ProcessStepper from "@/components/ProcessStepper";
import { apiPost } from "@/lib/apiCalls";
import { indianNumberFormat } from "@/lib/common";
import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  const [localData, setLocalData] = useState<any>(data);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [numberOfCards, setNumberOfCards] = useState(10);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleUnloackCard = async () => {
    try {
      setActionLoading(true);
      const res = await apiPost(`/user-cards`, {
        cardTemplateId: selectedCard.id,
        amount: selectedCard.amount,
        number_of_cards: numberOfCards,
        status: "ACTIVE",
      });
      setLocalData(
        localData.map((item: any) =>
          item.id === selectedCard.id ? { ...item, status: "ACTIVE" } : item
        )
      );
      onClose();
      toast.success("Card Unlocked Successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="columns-2 md:columns-3 gap-4 p-2">
      {localData.map((card: any) => (
        <div
          className="mb-4 w-full bg-gray-100 rounded-lg overflow-hidden relative animate-[appearance-in_600ms]"
          key={card.id}
        >
          {card.premium && (
            <>
              {card.status ? (
                <div className="absolute font-medium top-2 right-2 bg-green-50 text-green-500 border-1 border-green-500  px-3 py-1 rounded-full text-[0.5rem] z-10 flex items-center justify-center">
                  {card.status}
                </div>
              ) : (
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
            </>
          )}
          {card.template ? (
            <div
              className="w-full h-auto rounded-lg"
              dangerouslySetInnerHTML={{ __html: card.template }}
            />
          ) : (
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
          )}
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
        closeButton={!actionLoading}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Unlock Blissbell Card</ModalHeader>
              <ModalBody>
                {selectedCard && (
                  <div className="block md:grid md:grid-cols-2 md:gap-4 p-3 px-5">
                    {actionLoading ? <ActionLoader /> : null}
                    <div>
                      <h1 className=" text-lg mb-3 -ml-3 font-medium">
                        How to use?
                      </h1>
                      <ProcessStepper data={steps} />
                    </div>
                    {selectedCard.template ? (
                      <div
                        className="w-full h-auto rounded-lg"
                        dangerouslySetInnerHTML={{
                          __html: selectedCard.template,
                        }}
                      />
                    ) : (
                      <Image
                        src={selectedCard.image}
                        alt="Premium Card"
                        width={2000}
                        height={2000}
                        className="w-full h-auto rounded-lg"
                      />
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="flex justify-between items-end">
                <div>
                  <h2 className="text-xs text-gray-500">Amount</h2>
                  <p className="text-green-500">
                    Rs {indianNumberFormat(selectedCard.amount * numberOfCards)}
                  </p>
                </div>
                <Button
                  onPress={handleUnloackCard}
                  size="sm"
                  className="my-btn-bg text-white"
                  radius="sm"
                  startContent={<i className="fa-solid fa-crown" />}
                  isDisabled={actionLoading}
                  isLoading={actionLoading}
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
