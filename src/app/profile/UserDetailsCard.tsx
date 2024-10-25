"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { apiPatch, uploadFileWithData } from "@/lib/apiCalls";
import toast from "react-hot-toast";
import ImageCropper from "@/components/ImageCropper";

export default function UserDetailsCard({ data }: { data: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(data.name || "");
  const [actionLoading, setActionLoading] = useState(false);
  const [localData, setLocalData] = useState(data);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (name.trim().length < 3) {
        return;
      }
      setActionLoading(true);
      const response = await apiPatch(`/users/${data.id}`, {
        name: name,
      });
      setLocalData({ ...data, name: response.name });
      setIsEditing(false);
      toast.success("Name updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleImageUpload = async (blob: Blob) => {
    try {
      setActionLoading(true);
      const file = new File(
        [blob],
        `${data?.name?.toLowerCase()?.replaceAll(" ", "-")}-${Date.now()}.jpg`,
        {
          type: "image/jpeg",
        }
      );

      const res = await uploadFileWithData(
        `/users/${data.id}`,
        file,
        {},
        "PATCH"
      );
      setLocalData({ ...localData, dp: res.dp });

      toast.success("Image Changed Successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md md:p-6 py-6 px-4 w-full mx-auto relative animate-[appearance-in_400ms]">
      <div className="flex items-center md:gap-6 gap-3">
        <ImageCropper
          loading={actionLoading}
          buttonTitle="Upload"
          onCrop={handleImageUpload}
        >
          <div className="md:h-[100px] md:w-[100px] h-[90px] w-[90px] border-2 border-red-300 p-1 rounded-md transition-all duration-300">
            <Image
              src={localData.dp || "/images/user.png"}
              alt="user"
              width={1000}
              height={1000}
              className="rounded-md w-full h-full"
            />
          </div>
        </ImageCropper>

        <div className="w-[calc(100%-125px)]">
          <div className="flex items-center justify-between">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="w-full md:mt-2 mt-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={actionLoading}
                  autoFocus
                  className="w-full border rounded-md px-3 py-2 transition-colors duration-200 ease-in-out outline-none"
                  placeholder="Enter name"
                />
              </form>
            ) : (
              <p className="font-medium text-xl line-clamp-2">
                {localData.name}
              </p>
            )}
            <div className="absolute top-2 right-2 flex gap-2">
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
                    setName(localData.name || "");
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
          <div className="flex items-center gap-2">
            <p className="line-clamp-2">{data.email}</p>
            <i className="fa-solid fa-check-circle text-green-700 text-sm mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
