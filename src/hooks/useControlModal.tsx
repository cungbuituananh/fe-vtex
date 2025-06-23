import { useState } from "react";

export const useControlModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  //   const [title, setTitle] = useState("");
  //   const [content, setContent] = useState<ReactNode>(null);
  //   const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});

  const openModal = () =>
    // modalTitle: string,
    // modalContent: ReactNode,
    // confirmAction: () => void
    {
      // setTitle(modalTitle);
      // setContent(modalContent);
      // setOnConfirm(() => confirmAction);
      setIsOpen(true);
    };

  const closeModal = () => {
    setIsOpen(false);
    // setTitle("");
    // setContent(null);
    // setOnConfirm(() => () => {});
  };

  return {
    isOpen,
    // title,
    // content,
    // onConfirm,
    openModal,
    closeModal,
  };
};
