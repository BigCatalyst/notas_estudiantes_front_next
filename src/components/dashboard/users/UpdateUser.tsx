"use client";
import { useParams } from "next/navigation";

const UpdateUser = () => {
  const { user } = useParams();

  console.log(user);
  return <div>asd</div>;
};

export default UpdateUser;
