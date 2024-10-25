"use client";
import { apiDelete } from "@/lib/apiCalls";
import { indianDate } from "@/lib/common";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import BlissBellsSkeleton from "./BlissBellsSkeleton";

type props = {
  data: any[];
  loading: boolean;
  refresh: (page: number) => void;
};
export default function ListItem({
  data,
  loading,
  refresh = (page) => {},
}: props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      const res = await apiDelete(`/blissbells/${selectedItem?.id}`);
      refresh(1);
      setSelectedItem(null);
      onClose();
      toast.success("Deleted Successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <BlissBellsSkeleton />;
  }
  return (
    <>
      <Accordion className="animate-[appearance-in_400ms]">
        {data.map((item: any, index: number) => (
          <AccordionItem
            key={index}
            aria-label={item.name}
            startContent={
              <Avatar
                isBordered
                className="bg-white mr-3"
                radius="lg"
                color={item.image ? "danger" : "default"}
                src={item.image || "/images/user.png"}
              />
            }
            subtitle={
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-2 rounded-md p-[3px] px-3 bg-pink-100 border-1 border-pink-500 text-black text-xs">
                  <i className="fa-regular fa-calendar text-xs" />
                  <div>{indianDate(item.date).format("DD MMM YYYY")}</div>
                </div>
                <div className="bg-gradient-to-r rounded-md p-1 px-3 text-xs capitalize text-white from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 flex items-center gap-2">
                  <i className="fa-regular fa-star" />
                  <div>{item.event}</div>
                </div>
              </div>
            }
            title={
              <p className="capitalize font-semibold text-[1.12rem] leading-[2rem]">
                {item.name}
              </p>
            }
          >
            <p className="font-semibold text-sm">Description</p>
            {item.description || "No Description"}
            <div className="text-end mt-4">
              <Button
                isIconOnly={true}
                startContent={<i className="fa fa-trash" />}
                color="danger"
                variant="flat"
                onClick={() => {
                  setSelectedItem(item);
                  onOpen();
                }}
              />
            </div>
          </AccordionItem>
        ))}
      </Accordion>
      {isOpen ? (
        <Modal
          size="md"
          isOpen={isOpen}
          onClose={onClose}
          className="bg-white mx-2"
          placement="center"
          backdrop="blur"
          isDismissable={false}
          radius="sm"
          hideCloseButton={actionLoading}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 capitalize">
                  Alert
                </ModalHeader>
                <ModalBody>Are you sure you want to delete?</ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    radius="sm"
                    variant="flat"
                    onPress={onClose}
                    isDisabled={actionLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="danger"
                    radius="sm"
                    className="text-white"
                    onPress={handleDelete}
                    isLoading={actionLoading}
                    isDisabled={actionLoading}
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      ) : null}
    </>
  );
}
