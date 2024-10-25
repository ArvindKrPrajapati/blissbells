import Container from "@/components/Container";
import { apiGet } from "@/lib/apiCalls";
import { getServerCookies } from "@/middleware";
import React from "react";
import LogoutButton from "./LogoutButton";
import MobileNumber from "./MobileNumber";
import UserDetailsCard from "./UserDetailsCard";

export default async function ProfilePage() {
  const auth = getServerCookies();
  const data = await apiGet(`/users/${auth?.user?.id}`, auth);
  return (
    <Container className="p-3">
      <UserDetailsCard data={data} />
      <br />
      <MobileNumber data={data} />
      <br />
      <LogoutButton />
    </Container>
  );
}
