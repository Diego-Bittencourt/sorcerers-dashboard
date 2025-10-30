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
    "text-light-button-text",
    "bg-light-button-text",
    "bg-dark-background-primary",
    "bg-dark-background-secondary",
    "text-dark-foreground-primary",
    "text-dark-foreground-secondary",
    "text-dark-button-text",
    "bg-dark-button-text",
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
    "shadow-light-sorcerer",
    "shadow-dark-sorcerer",
    "shadow-light-druid",
    "shadow-dark-druid",
    "shadow-light-monk",
    "shadow-dark-monk",
    "shadow-light-novoc",
    "shadow-dark-novoc",
    "shadow-light-knight",
    "shadow-dark-knight",
    "border-light-knight",
    "border-dark-knight",
    "border-light-paladin",
    "border-dark-paladin",
    "border-light-sorcerer",    
    "border-dark-sorcerer",
    "border-light-druid",
    "border-dark-druid",
    "border-light-monk",
    "border-dark-monk",
    "border-light-novoc",
    "border-dark-novoc",
  ]
}
