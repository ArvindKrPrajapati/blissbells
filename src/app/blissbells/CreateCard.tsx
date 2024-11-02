"use client";
import ImageViewer from "@/components/ImageViewer";
import PageTitle from "@/components/PageTitle";
import PaginatedList from "@/components/PaginatedList";
import { apiGet, apiPost, baseUrl, getAuthCookie } from "@/lib/apiCalls";
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
      if (!selectedCard) return;
      setActionLoading(true);
      const auth = getAuthCookie();
      const res = await fetch(`${baseUrl}/download?buffer=true`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify({
          userCardId: selectedCard.id,
          blissbellId: item.id,
        }),
      });

      const contentDisposition = res.headers.get("Content-Disposition");
      const blob = await res.blob();

      const filename =
        contentDisposition?.split("filename=")[1]?.replace(/['"]/g, "") ||
        "download.jpg";

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Card downloaded successfully");
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setActionLoading(false);
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
