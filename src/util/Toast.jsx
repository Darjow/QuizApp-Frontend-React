import Swal from "sweetalert2"

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  timer: 4000,
  icon: "success",
  title: "Title",
  showConfirmButton: false,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer)
    toast.addEventListener("mouseleave", Swal.resumeTimer)
  },
})

/**
 *
 * @param {string} msg
 */
export const SuccessToast = (msg) => {
  Toast.fire({
    title: msg || "",
  })
}

export const ErrorToast = (msg) => {
  Toast.fire({
    icon: "error",
    title: "An error has occurred",
    text: msg,
  })
}
