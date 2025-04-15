import React from "react";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";

const Modal = (props) => {
  const { title, isOpen, onClose, children } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000000cc] bg-opacity-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="no-scrollbar relative mx-6 max-h-[90vh] w-[600px] max-w-2xl overflow-y-auto rounded-lg bg-white"
      >
        <div className="flex flex-col bg-white">
          <div className="sticky top-0 z-10 flex h-[48px] items-center justify-between gap-4 bg-white p-8">
            <span className="text-base font-bold text-gray-800 md:text-xl">
              {title ? title : null}
            </span>
            <button onClick={onClose} className="text-gray-800">
              <i className="fa-solid fa-xmark text-2xl md:text-4xl"></i>
            </button>
          </div>

          <div className="px-8 pb-8">{children}</div>
        </div>
      </motion.div>
    </Dialog>
  );
};

export default Modal;
