"use client";
import React from "react";

const ModalWrapper = ({
  children,
  onClose,
  width = "w-auto",
  height = "h-auto",
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div
        className={`relative bg-white shadow-xl ${width} ${height} max-h-[100%] md:max-h-[90%] rounded-lg p-4  max-w-[100%] md:max-w-[90%] border border-gray-300`}
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-sm"
          >
            <i className="fas fa-times text-xl" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
