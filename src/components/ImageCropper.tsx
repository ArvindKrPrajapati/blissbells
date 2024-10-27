"use client";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type Props = {
  children?: React.ReactNode;
  onCrop?: (blob: Blob) => void;
  loading?: boolean;
  buttonTitle?: string;
  id?: string;
};
export default function ImageCropper({
  children,
  onCrop = (blob) => {},
  loading = false,
  buttonTitle = "Crop",
  id = "imageInput",
}: Props) {
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState<string>("");
  const [crop, setCrop] = useState<Crop | any>();
  const imgRef = React.useRef<HTMLImageElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setTempImage(e.target.result as string);
          setShowCropper(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const conf = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 100,
        },
        1 / 1,
        width,
        height
      ),
      width,
      height
    );
    setCrop(conf);
  }

  const onCancel = () => {
    setShowCropper(false);
    setTempImage("");
  };

  const handleCrop = () => {
    if (!imgRef.current || !crop) return;

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Enable image smoothing for better quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      imgRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    // Convert to blob with high quality
    canvas.toBlob(
      async (blob) => {
        if (blob) {
          await onCrop(blob);
          onCancel();
        }
      },
      "image/jpeg",
      1 // Maximum quality
    );
  };
  return (
    <>
      <input
        type="file"
        id={id}
        accept="image/*"
        className="hidden"
        onClick={(e: any) => {
          e.target.value = null;
        }}
        onChange={handleImageSelect}
      />
      <div
        className="cursor-pointer"
        onClick={() => document.getElementById(id)?.click()}
      >
        {children || (
          <div className="p-2 px-3 rounded-md border-2 bg-gray-50 text-nowrap">
            Select Image
          </div>
        )}
      </div>
      {showCropper ? (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 10000 }}
        >
          <div className="bg-white p-6 px-4 rounded-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Crop Image</h3>
              {!loading ? (
                <button
                  onClick={onCancel}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fa-solid fa-close w-5 h-5" />
                </button>
              ) : null}
            </div>

            <div className="mb-4 max-h-[76dvh] overflow-auto flex justify-center">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                aspect={1 / 1}
              >
                <img
                  ref={imgRef}
                  src={tempImage}
                  alt="Crop preview"
                  className="max-w-full"
                  onLoad={onImageLoad}
                  crossOrigin="anonymous" // Add this if loading from external URL
                />
              </ReactCrop>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={onCancel}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-70"
              >
                Cancel
              </button>
              <Button
                onClick={handleCrop}
                isLoading={loading}
                type="button"
                radius="sm"
                color="danger"
              >
                {buttonTitle}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
