"use client";
import React, { useState } from "react";
import Accordion from "../../components/Accordian/Accordian";
import ButtonContainer from "../../components/ButtonContainer";
import toast from "react-hot-toast";
import { apiPatch, apiPost, uploadFileWithData } from "@/lib/apiCalls";
import { Input } from "@nextui-org/react";
import ImageCropper from "@/components/ImageCropper";

type Props = {
  refresh: (page: number) => void;
  isEdit?: boolean;
  data?: any;
  closeModal?: () => void;
};

export default function CreateBlisbell({
  refresh = (page) => {},
  isEdit = false,
  data,
  closeModal = () => {},
}: Props) {
  const [eventType, setEventType] = useState(
    data
      ? ["birthday", "anniversary"].includes(data.event)
        ? data.event
        : "other"
      : ""
  );
  const [otherEventName, setOtherEventName] = useState(data?.event || "");
  const [date, setDate] = useState(data?.date || "");
  const [actionLoading, setActionLoading] = useState(false);
  const [name, setName] = useState(data?.name || "");
  const [description, setDescription] = useState(data?.description || "");
  const [notification, setNotification] = useState(
    data ? data.notification : true
  );
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(isEdit);

  const clearState = () => {
    setEventType("");
    setOtherEventName("");
    setDate("");
    setName("");
    setDescription("");
    setNotification(true);
    setImagePreview("/images/user.png");
    setImageFile(null);
    setIsOpen(false);
  };

  const handleCrop = (blob: Blob) => {
    const url = URL.createObjectURL(blob);

    setImagePreview(url);
    setImageFile(new File([blob], "cropped-image.jpg", { type: "image/jpeg" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      const payload = {
        date,
        event: otherEventName || eventType,
        name,
        description,
        notification,
      };

      if (imageFile) {
        await uploadFileWithData(
          `/blissbells${isEdit ? `/${data?.id}` : ""}`,
          imageFile,
          payload,
          isEdit ? "PATCH" : "POST"
        );
      } else {
        isEdit
          ? await apiPatch(`/blissbells/${data.id}`, payload)
          : await apiPost(`/blissbells`, payload);
      }
      clearState();
      closeModal();
      refresh(1);
      toast.success(`Blissbell ${isEdit ? "Updated" : "Created"} Successfully`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <Accordion
      title={
        <div className="flex items-center justify-center">
          <i className="fa-solid fa-bell text-red-500 animate-bounce" />
          <span className="font-bold text-red-500 ml-4">
            {isEdit ? "Edit" : "Create"} BlissBell
          </span>
        </div>
      }
      className={`animate-[appearance-in_200ms] ${isEdit ? "border-none" : ""}`}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      disabled={isEdit}
    >
      <form onSubmit={handleSubmit} className="space-y-4 p-2">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <select
            value={eventType}
            onChange={(e) => {
              setEventType(e.target.value);
              setOtherEventName("");
            }}
            className="w-full md:flex-1 px-4 py-2 pr-8 rounded border border-red-200 focus:outline-none focus:ring-1 focus:ring-red-300 appearance-none bg-white bg-no-repeat bg-right text-sm"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ef4444'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundSize: "1.5em 1.5em",
              backgroundPosition: "right 0.5em center",
            }}
            required
          >
            <option value="" disabled={true}>
              Select Event Type
            </option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="other">Other</option>
          </select>
          {eventType === "other" && (
            <input
              type="text"
              value={otherEventName}
              onChange={(e) =>
                e.target.value.length > 20
                  ? null
                  : setOtherEventName(e.target.value)
              }
              placeholder="Enter event name"
              className="w-full md:flex-1 px-4 py-2 rounded border border-red-200 focus:outline-none focus:ring-1 focus:ring-red-300"
              required
            />
          )}
          <Input
            type="date"
            required={true}
            value={date}
            radius="none"
            color="danger"
            onChange={(e) => setDate(e.target.value)}
            placeholder="dd/mm/yyyy"
            className="w-full md:flex-1 rounded border border-red-200 focus:outline-none focus:ring-1 focus:ring-red-300 bg-white"
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-start">
          <div className="md:w-[52%] w-full flex gap-2">
            <div className=" w-12 h-12">
              <ImageCropper onCrop={handleCrop} id={data?.id || "imageInput"}>
                <img
                  src={imagePreview || data?.image || "/images/user.png"}
                  alt="User"
                  className="rounded-full cursor-pointer border border-red-200 object-cover"
                />
              </ImageCropper>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Special Person Name"
              className="w-full md:flex-1 px-4 py-2 rounded border border-red-200 focus:outline-none focus:ring-1 focus:ring-red-300"
              required
            />
          </div>

          <textarea
            className="w-full md:flex-1 px-4 py-2 rounded border border-red-200 focus:outline-none focus:ring-1 focus:ring-red-300 resize-none"
            placeholder="Description (Optional)"
            value={description}
            onChange={(e) =>
              e.target.value.length > 200
                ? null
                : setDescription(e.target.value)
            }
          />
        </div>
        <div className="flex items-center py-1">
          <input
            type="checkbox"
            id="notification"
            checked={notification}
            onChange={(e) => setNotification(e.target.checked)}
            className="mr-3"
          />
          <label htmlFor="notification" className="text-sm">
            Send Reminder on Email
          </label>
        </div>
        <ButtonContainer
          className="rounded-md w-full text-sm"
          type="submit"
          isLoading={actionLoading}
        >
          {isEdit ? "Update" : "Set"} Blissbell
        </ButtonContainer>
      </form>
    </Accordion>
  );
}
