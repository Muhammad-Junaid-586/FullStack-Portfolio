"use client"

import { useState } from "react"
import { useUser, SignOutButton } from "@clerk/nextjs"
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"

import { UserProfile } from "@clerk/nextjs"   // 👈 add this
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function NavUser() {
  const { user } = useUser()
  const { isMobile } = useSidebar()
  const [open, setOpen] = useState(false) // 👈 state for manage account modal

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                  <AvatarImage src={user?.imageUrl || "/default-avatar.png"} alt={user?.fullName || "User"} />
                  <AvatarFallback className="rounded-lg">
                    {user?.firstName?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.fullName || "Guest"}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.primaryEmailAddress?.emailAddress || ""}
                  </span>
                </div>
                <IconDotsVertical className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              {user ? (
                <>
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user.imageUrl || "/default-avatar.png"} alt={user.fullName || ""} />
                        <AvatarFallback className="rounded-lg">
                          {user?.firstName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{user.fullName}</span>
                        <span className="text-muted-foreground truncate text-xs">
                          {user.primaryEmailAddress?.emailAddress}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {/* 👇 Manage Account Button */}
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                      <IconUserCircle />
                      Manage Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconCreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconNotification />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <SignOutButton>
                      <button className="flex items-center gap-2 w-full">
                        <IconLogout />
                        Log out
                      </button>
                    </SignOutButton>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <a href="/sign-in">Login</a>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Dialog for Manage Account */}
      <Dialog className="max-w-5xl" open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader className={"flex flex-col gap-1.5 text-center sm:text-left"}>
            <DialogTitle>Manage Account</DialogTitle>
          </DialogHeader>
          <div className="w-full h-[80vh] overflow-y-auto px-4 py-6">
            <UserProfile /> {/* Clerk's full account management UI */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
