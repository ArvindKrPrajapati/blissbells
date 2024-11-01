"use client";
import ImageViewer from "@/components/ImageViewer";
import PageTitle from "@/components/PageTitle";
import PaginatedList from "@/components/PaginatedList";
import { apiGet } from "@/lib/apiCalls";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
type Props = {
  item: any;
};
export default function CreateCard({ item }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedCard(null);
    }
  }, [isOpen]);

  const handleDownload = async () => {
    try {
      setActionLoading(true);
      const res = await apiGet(
        `/user-cards/${selectedCard.id}?name=${item.name}&image=${item.image}`
      );
      const base64Data = res.image;
      const byteCharacters = atob(base64Data.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${item.name.toLowerCase().replaceAll(" ", "-")}_Happy_birthday.jpg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast.success("Downloaded successfully");
      setActionLoading(false);
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Button
        variant="solid"
        radius="sm"
        size="sm"
        color="success"
        className="text-white"
        onClick={onOpen}
      >
        Create Card
      </Button>
      {isOpen ? (
        <Modal
          size={"5xl"}
          isOpen={isOpen}
          onClose={onClose}
          className="bg-white min-h-[calc(100%-10px)] md:min-h-[80%]"
          placement={"top"}
          backdrop="opaque"
          isDismissable={false}
          radius="sm"
          hideCloseButton={actionLoading}
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Create Blissbell Card</ModalHeader>
                <ModalBody>
                  <PageTitle title="Your Active Cards" />
                  <PaginatedList
                    url={`/user-cards?status=ACTIVE&name=${item.name}&image=${item.image}`}
                    render={(data) => (
                      <ImageViewer
                        data={data}
                        onSelect={(selected) => {
                          if (actionLoading) return;
                          setSelectedCard(selected);
                        }}
                        selected={selectedCard}
                      />
                    )}
                    isLoaderFixed={true}
                  />
                </ModalBody>
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
                    radius="sm"
                    className="text-white my-btn-bg"
                    onClick={handleDownload}
                    isLoading={actionLoading}
                    isDisabled={actionLoading || !selectedCard}
                  >
                    Download
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
