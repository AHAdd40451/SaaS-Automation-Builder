"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "../../node_modules/next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
