"use client";
import { apiPatch } from "@/lib/apiCalls";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function MobileNumber({ data }: { data: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(data.phone || "");
  const [actionLoading, setActionLoading] = useState(false);
  const [localData, setLocalData] = useState(data);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (phoneNumber.length !== 10) {
        return;
      }
      setActionLoading(true);
      const response = await apiPatch(`/users/${data.id}`, {
        phone: phoneNumber,
      });
      setLocalData({ ...data, phone: response.phone });
      setIsEditing(false);
      toast.success("Phone number updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 w-full mx-auto animate-[appearance-in_800ms]">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center w-full me-2">
          <i className="fa-brands fa-whatsapp text-xl text-green-600 mt-1" />
          {isEditing ? (
            <form onSubmit={handleSubmit} className="w-full">
              <input
                type="number"
                value={phoneNumber}
                onChange={(e) => {
                  if (e.target.value.length <= 10) {
                    setPhoneNumber(e.target.value);
                  }
                }}
                disabled={actionLoading}
                autoFocus
                className={`w-full border rounded-md px-3 py-2  transition-colors duration-200 ease-in-out outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${phoneNumber.length < 10 ? "border-red-500" : ""}`}
                placeholder="Mobile Number"
              />
            </form>
          ) : (
            <p>{localData.phone || "NA"}</p>
          )}
        </div>
        <div className="flex gap-2">
          {isEditing && (
            <>
              {!actionLoading ? (
                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  isIconOnly={true}
                  isDisabled={actionLoading}
                  onClick={() => setIsEditing(false)}
                  startContent={<i className="fa-solid fa-times" />}
                />
              ) : null}
            </>
          )}
          <Button
            size="sm"
            color="success"
            variant="flat"
            isIconOnly={true}
            isDisabled={actionLoading}
            isLoading={actionLoading}
            onClick={(e) => {
              if (!isEditing) {
                setPhoneNumber(localData.phone || "");
                setIsEditing(true);
              } else {
                handleSubmit(e);
              }
            }}
            startContent={
              <>
                {!actionLoading ? (
                  <i
                    className={`fa-solid ${isEditing ? "fa-check" : "fa-pen"}`}
                  />
                ) : null}
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
