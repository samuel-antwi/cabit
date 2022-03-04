import { useDark, useToggle } from "@vueuse/core"

export const themeProvider = () => {
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  return { isDark, toggleDark }
}
