"use client";
import ImageViewer from "@/components/ImageViewer";
import PageTitle from "@/components/PageTitle";
import PaginatedList from "@/components/PaginatedList";
import { apiGet, apiPost } from "@/lib/apiCalls";
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

  // const handleDownload = async () => {
  //   try {
  //     if (!selectedCard?.template) return;
  //     setActionLoading(true);

  //     // Get the SVG element
  //     const svgElement = document.querySelector(
  //       `#${selectedCard?.html_id} svg`
  //     );
  //     if (!svgElement) return;

  //     // Create canvas with SVG dimensions
  //     const canvas = document.createElement("canvas");
  //     const svgRect = svgElement.getBoundingClientRect();
  //     canvas.width = svgRect.width;
  //     canvas.height = svgRect.height;

  //     // Get canvas context and set white background
  //     const ctx = canvas.getContext("2d");
  //     if (!ctx) return;

  //     ctx.fillStyle = "white";
  //     ctx.fillRect(0, 0, canvas.width, canvas.height);

  //     // Convert SVG to data URL
  //     const svgData = new XMLSerializer().serializeToString(svgElement);
  //     const svgBlob = new Blob([svgData], {
  //       type: "image/svg+xml;charset=utf-8",
  //     });
  //     const url = URL.createObjectURL(svgBlob);

  //     // Create image and draw to canvas
  //     const img = new Image();
  //     img.onload = () => {
  //       ctx.drawImage(img, 0, 0);
  //       const link = document.createElement("a");
  //       link.download = `${item.name.toLowerCase().replaceAll(" ", "-")}_Happy_birthday.png`;
  //       link.href = canvas.toDataURL("image/png", 1.0);
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //       URL.revokeObjectURL(url);

  //       setActionLoading(false);
  //       onClose();
  //       toast.success("Card downloaded successfully");
  //     };
  //     img.src = url;
  //   } catch (error) {
  //     console.log(error);
  //     setActionLoading(false);
  //     toast.error("Failed to download card");
  //   }
  // };

  const handleDownload = async () => {
    try {
      if (!selectedCard) return;
      setActionLoading(true);
      const res = await apiPost(`/download`, {
        userCardId: selectedCard.id,
        blissbellId: item.id,
      });
      if (res.card_url) {
        window.open(res.card_url, "_blank");
        toast.success("Card downloaded successfully");
        onClose();
      } else {
        toast.error("Failed to download card");
      }
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
