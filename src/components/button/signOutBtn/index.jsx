import React from "react";
import { getFromLocalStorage, updateLocalStorageValue } from "@/utility/localStorageUtils";
import { useRouter } from "next/router";

const SignOutBtn = () => {
  const router = useRouter()

  const handleSingOut = () => {
    updateLocalStorageValue("token", { token: false });
    const tokenLogin = getFromLocalStorage('token')

    if (!tokenLogin?.token) {
      router.push("/login")
    }
  }

  return <button type="button" className="btn btn-danger" onClick={handleSingOut}>Sign Out</button>
}

export default SignOutBtn;