"use client"

import * as React from "react"
import { Moon02Icon, Sun01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useTheme } from "next-themes"
import { Toggle } from "@/components/ui/toggle"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Toggle 
        aria-label="Toggle theme" 
        pressed={false}
        className="h-10 w-10 p-0"
      >
        <HugeiconsIcon icon={Sun01Icon} strokeWidth={2} className="h-5 w-5" />
      </Toggle>
    )
  }

  return (
    <Toggle
      aria-label="Toggle theme"
      pressed={theme === "dark"}
      onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
      className="h-10 w-10 p-0"
    >
      {theme === "dark" ? (
        <HugeiconsIcon icon={Moon02Icon} strokeWidth={2} className="h-5 w-5" />
      ) : (
        <HugeiconsIcon icon={Sun01Icon} strokeWidth={2} className="h-5 w-5" />
      )}
    </Toggle>
  )
}
