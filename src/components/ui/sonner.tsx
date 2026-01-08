"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-white group-[.toaster]:text-foreground group-[.toaster]:border-black group-[.toaster]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-[.toaster]:rounded-none group-[.toaster]:font-code",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:font-code group-[.error]:!text-red-500 group-[.success]:!text-green-600",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-none",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-none",
          error: "group toast error group-[.toaster]:!bg-red-50 group-[.toaster]:!text-red-600 group-[.toaster]:!border-red-600 group-[.toaster]:!shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]",
          success: "group toast success group-[.toaster]:!bg-green-50 group-[.toaster]:!text-green-700 group-[.toaster]:!border-green-600 group-[.toaster]:!shadow-[4px_4px_0px_0px_rgba(22,163,74,1)]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
