import { logout } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "sonner";
import Swal from "sweetalert2";

export function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handelLogout = () => {
    dispatch(logout());
    Cookies.remove("token");
    toast.success("Logout successfully");
    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 300);
  };

  const handleLogoutClick = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      handelLogout();
    }
  };

  return { handelLogout, handleLogoutClick };
}
