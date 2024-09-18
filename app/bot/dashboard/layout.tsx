import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

export default async function LayoutPrivate({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/pricing?showPurchaseModal=true");
  }

  await connectMongo();

  const existingUser = await User.findById(session?.user?.id);

  if (existingUser != null && !existingUser.hasAccess) {
    redirect("/pricing?showPurchaseModal=true");
  }

  return <>{children}</>;
}
