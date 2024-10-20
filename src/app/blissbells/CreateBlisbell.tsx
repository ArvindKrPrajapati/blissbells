"use client";
import React, { useState } from "react";
import Accordion from "../../components/Accordian/Accordian";
import ButtonContainer from "../../components/ButtonContainer";
import toast from "react-hot-toast";
import { apiPost } from "@/lib/apiCalls";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";

type props = {
  refresh: (page: number) => void;
};
export default function CreateBlisbell({ refresh = (page) => {} }: props) {
  const [eventType, setEventType] = useState("");
  const [otherEventName, setOtherEventName] = useState("");
  const [date, setDate] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [notification, setNotification] = useState(true);
  const router = useRouter();

  const clearState = () => {
    setEventType("");
    setOtherEventName("");
    setDate("");
    setName("");
    setDescription("");
    setNotification(true);
  };
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setActionLoading(true);
      const res = await apiPost(`/blissbells`, {
        date,
        event: otherEventName || eventType,
        name,
        description,
        notification,
      });
      clearState();
      refresh(1);
      toast.success("Blissbell Added");
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
          <span className="font-bold text-red-500 ml-4">Create BlissBell</span>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="md:w-1/2 w-full">
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
            Send Reminder on Whatsapp
          </label>
        </div>
        <ButtonContainer
          className="rounded-md w-full text-sm"
          type="submit"
          isLoading={actionLoading}
        >
          Set Blissbell
        </ButtonContainer>
      </form>
    </Accordion>
  );
}
