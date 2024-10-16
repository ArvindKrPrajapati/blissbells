"use client";
import React, { useEffect, useState } from "react";
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
import { apiDelete, apiGet } from "@/lib/apiCalls";
import { useRouter } from "next/navigation";
import PageNavigation from "@/components/PageNavigation";
import CreateBlisbell from "@/app/blissbells/CreateBlisbell";
import BlissBellsSkeleton from "./BlissBellsSkeleton";

export default function ListBlissBells() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const url = `/blissbells?$sort[date]=1&$limit=${limit}`;

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
  const _init = async (page: number) => {
    try {
      setLoading(true);
      const res = await apiGet(`${url}&$skip=${(page - 1) * limit}`);
      setData(res.data);
      setTotal(res.total);
      setSkip(res.skip);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    _init(1);
  }, []);

  return (
    <>
      <CreateBlisbell refresh={_init} />
      <h2 className="my-3 mt-5 font-semibold my-text">
        Past and Upcoming Blissbells
      </h2>
      {loading ? (
        <BlissBellsSkeleton />
      ) : (
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
      )}

      <br />
      <br />
      {total > limit ? (
        <PageNavigation
          total={total}
          limit={limit}
          skip={skip}
          onChange={_init}
          loading={loading}
        />
      ) : null}
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
