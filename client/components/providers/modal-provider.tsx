"use client";

import { CreateNewServer } from "@/components/modals/create-new-server";
import { useEffect, useState } from "react";


export const ModalProvider = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null
  }
  return (
    <>
    <CreateNewServer />
    </>
  );
};
