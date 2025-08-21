"use client";

import { ToastOptions, toast } from "react-toastify";
import { ToastPosition, TypeOptions } from "react-toastify";

type TType = Exclude<TypeOptions, "default">;

export interface IToast {
  type: TType;
  message: string;
  theme?: "light" | "dark" | "colored";
  duration?: number;
  position?: ToastPosition;
}

export const showToast = ({ type, theme = "light", message, duration = 5000, position = "top-right" }: IToast) => {
  toast[type](message, {
    theme,
    position,
    autoClose: duration,
    draggable: true,
    closeOnClick: true,
    hideProgressBar: false,
  } as ToastOptions);
};
