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
import CreateBlisbell from "./CreateBlisbell";

type props = {
  data: any[];
  loading: boolean;
  refresh: (page: number) => void;
  variant?: "splitted" | "light" | "shadow" | "bordered";
};
export default function ListBlissbelltem({
  data,
  loading,
  refresh = (page) => {},
  variant = "splitted",
}: props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEdit, setIsEdit] = useState(false);

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
      <Accordion className="animate-[appearance-in_400ms]" variant={variant}>
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
            disableIndicatorAnimation
            indicator={
              <i className="fa-solid fa-chevron-down text-pink-500 mt-9" />
            }
            subtitle={
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 text-sm">
                  <i className="fa-regular fa-calendar text-xs" />
                  <div className="text-[0.8rem]">
                    {indianDate(item.date).format("DD MMM")}
                  </div>
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
            <div className="text-end mt-4 flex items-center justify-end gap-2">
              <Button
                isIconOnly={true}
                startContent={<i className="fa-solid fa-pen" />}
                variant="flat"
                size="sm"
                onClick={() => {
                  setSelectedItem(item);
                  setIsEdit(true);
                  onOpen();
                }}
              />
              <Button
                isIconOnly={true}
                startContent={<i className="fa fa-trash" />}
                color="danger"
                variant="flat"
                size="sm"
                onClick={() => {
                  setSelectedItem(item);
                  setIsEdit(false);
                  onOpen();
                }}
              />
            </div>
          </AccordionItem>
        ))}
      </Accordion>
      {isOpen ? (
        <Modal
          size={isEdit ? "5xl" : "2xl"}
          isOpen={isOpen}
          onClose={onClose}
          className="bg-white mx-2"
          placement={isEdit ? "top" : "center"}
          backdrop="opaque"
          isDismissable={false}
          radius="sm"
          hideCloseButton={actionLoading}
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                {isEdit ? (
                  <>
                    <CreateBlisbell
                      refresh={refresh}
                      isEdit={isEdit}
                      data={selectedItem}
                      closeModal={onClose}
                    />
                  </>
                ) : (
                  <>
                    <ModalHeader className="flex flex-col gap-1 capitalize">
                      {isEdit ? "Edit BlissBell" : "Alert"}
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
              </>
            )}
          </ModalContent>
        </Modal>
      ) : null}
    </>
  );
}
