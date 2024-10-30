import { apiGet } from "@/lib/apiCalls";
import { getServerCookies } from "../../middleware";
import React from "react";
import MobileNumber from "./MobileNumber";
import UserDetailsCard from "./UserDetailsCard";
import LogoutButton from "@/components/Auth/LogoutButton";

export default async function ProfilePage() {
  const auth = getServerCookies();
  const data = await apiGet(`/users/${auth?.user?.id}`, auth);
  return (
    <div className="p-3">
      <UserDetailsCard data={data} />
      <br />
      <MobileNumber data={data} />
      <br />
      <LogoutButton />
    </div>
  );
}
