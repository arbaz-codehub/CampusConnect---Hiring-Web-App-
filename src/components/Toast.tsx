"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";

export default function Toast() {
  const params = useSearchParams();

  useEffect(() => {
    if (params?.get("error") || params?.get("error") != "") {
      toast.error(params.get("error"), { theme: "colored" });
    }
  }, [params]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
