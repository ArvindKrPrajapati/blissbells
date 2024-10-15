"use client";
import React, { useState } from "react";
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
import { indianDate } from "@/lib/common";
import toast from "react-hot-toast";
import { apiDelete } from "@/lib/apiCalls";
import { useRouter } from "next/navigation";
type props = {
  data: any[];
};
export default function ListBlissBells({ data }: props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      const res = await apiDelete(`/blissbells/${selectedItem?.id}`);
      router.refresh();
      setSelectedItem(null);
      onClose();
      toast.success("Deleted Successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setActionLoading(false);
    }
  };
  return (
    <>
      <Accordion>
        {data.map((item: any, index: number) => (
          <AccordionItem
            key={index}
            aria-label={item.name}
            startContent={
              <Avatar
                isBordered
                className="bg-white"
                radius="lg"
                src="/images/user.png"
              />
            }
            subtitle={
              <p>
                {item.name} on{" "}
                <span>{indianDate(item.date).format("DD MMM YYYY")}</span>
              </p>
            }
            title={<p className="capitalize font-semibold">{item.event}</p>}
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
