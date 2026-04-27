"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconSelector, IconLogout, IconSettings } from "@tabler/icons-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { buttonVariants } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/ui/components/sidebar";
import { authClient } from "@repo/auth/client";
import { ChangeThemeSelector } from "./change-theme";
import { NavUserSkeleton } from "./nav-user-skeleton";

function initialsFromName(name: string): string {
  return name
    .split(" ")
    .map((n) => n.charAt(0).toUpperCase())
    .join("");
}

export function NavUser() {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        credentials: "include",
        onSuccess: () => router.push("/auth"),
      },
    });
  };

  if (isPending) return <NavUserSkeleton />;

  const name = session?.user.name ?? "";
  const email = session?.user.email ?? "";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-xl">
                <AvatarImage src={session?.user.image || undefined} alt={name} />
                <AvatarFallback className="rounded-xl">
                  {initialsFromName(name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <IconSelector className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 space-y-2 rounded-xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-xl">
                  <AvatarImage src={session?.user.image || undefined} alt={name} />
                  <AvatarFallback className="rounded-xl">
                    {initialsFromName(name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <Link
              href="/dashboard/settings"
              className={buttonVariants({
                variant: "ghost",
                className: "w-full justify-start rounded-xl",
              })}
            >
              <IconSettings className="size-4" />
              <span>Configuración</span>
            </Link>
            <ChangeThemeSelector className="w-full" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-destructive"
            >
              <IconLogout className="text-destructive" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
