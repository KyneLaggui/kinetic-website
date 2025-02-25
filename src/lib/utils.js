import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import Swal from 'sweetalert2';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const showNotification = (type, message) => {
  Toast.fire({
    icon: type,
    title: message,
  });
};