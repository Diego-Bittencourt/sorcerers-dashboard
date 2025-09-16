import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
    extend: {
      colors: {
        // TODO: add the colors for the themes
      }
    }
  },
  safelist: [
    "bg-light-background-primary",
    "bg-light-background-secondary",
    "text-light-foreground-primary",
    "text-light-foreground-secondary",
    "bg-dark-background-primary",
    "bg-dark-background-secondary",
    "text-dark-foreground-primary",
    "text-dark-foreground-secondary",
    "bg-light-knight",
    "bg-light-paladin",
    "bg-light-sorcerer",
    "bg-light-druid",
    "bg-light-monk",
    "bg-light-novoc",
    "bg-dark-knight",
    "bg-dark-paladin",
    "bg-dark-sorcerer",
    "bg-dark-druid",
    "bg-dark-monk",
    "bg-dark-novoc",
    
  ]
}
