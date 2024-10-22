import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: "#0D0C1C",
        primary: {
          accent: "#DCA8CE",
          light: "#1E1D2F",
          dark: "#111021",
          moon: "#FDFDFB",
          onyx: "#0A090B",
          summary: "#FAF9FB",
          "dark-lavender": "#473E62",
        },
        secondary: {
          DEFAULT: "#2A2143",
          accent: "#FECAED",
          inverted: "#231F31",
          onyx: "#5A565E",
          text: "#121113",
        },
        tertiary: {
          DEFAULT: "#363155",
          accent: "#272337",
          inner: "#ECE9DF",
          onyx: "#4F4D55",
          light: "#E9D7FE",
        },
        neutral: {
          DEFAULT: "#A49FA9",
          astronaut: "#FBFAF7",
          satellite: "#C6C8C7",
          gray: "#929292",
          ashen: "#7F7D83",
        },
        surface: {
          overlay: "#545162",
          light: "#F8F4EA",
          foundation: "#191527",
          midnight: "#2E1C51",
        },
        twilight: {
          slate: "#403D4F",
        },
        divider: "#ECECED",
        highlight: "#D7CDF533",
        disabled: "#575060",
        cross: "#98A2B3",
        island: "#352F49",
        link: "#AE99CD",
        cosmos: "#9682B4",
        comet: "#38285C",
      },
      backgroundImage: {
        "hero-gradient": "url('/hero-gradient.svg')",
        cta: "url('/jetpack-eclipse.png')",
        "call-out-box": "url('/call-out-box.svg')",
        template: "url('/template-card.png')",
        footer: "url('/shooting-star.png')",
        "signup-card": "url('/signup-card.svg')",
        "jetpack-eclipse": "url('/jetpack-bg.png')",
        subscribe: "url('/subscribe.png')",
        "subscribe-modal": "url('/subscribe-modal.svg')",
        "jetify-preview": "url('/jetify-preview.svg')",
        "pricing-gradient":
          "linear-gradient(79.62deg, #231F31 26.89%, #6C6097 227.9%)",
        "pricing-gradient-2":
          "linear-gradient(180deg, #2B243F -15.57%, #1B1726 113.5%)",
        "radial-one":
          "radial-gradient(100% 100% at 97.67% 0%, #1E1D2F 0%, #0D0C1C 100%)",
        "radial-enterprise":
          "radial-gradient(100% 100% at 97.67% 0%, #1E1D2F 0%, #0D0C1C 100%)",
        "purple-gradient": "linear-gradient(180deg, #141326 0%, #0D0C1C 100%)",
        "guide-lottie": "url('/guide-lottie.svg')",
        "hero-radial-gradient": `radial-gradient(60.67% 100.21% at 56.12% 78.7%, rgba(255, 255, 255, 0) 97.18%, #FFF 100%), 
                                  radial-gradient(162.07% 143.38% at 76.13% 108.56%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.08) 69.4%, rgba(150, 130, 180, 0.20) 76.23%),
                                  radial-gradient(162.07% 143.38% at 76.13% 108.56%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.20) 50%, rgba(40, 4, 89, 0.50) 100%),
                                  radial-gradient(162.07% 143.38% at 76.13% 108.56%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.20) 55.89%, rgba(96, 30, 186, 0.50) 76.23%),
                                  radial-gradient(73.37% 87.22% at 56.47% 81.55%, rgba(13, 12, 28, 0) 85.67%, #C1AFC9 100%),
                                  radial-gradient(87.03% 107.05% at 62.16% 102.85%, rgba(13, 12, 28, 0) 66.11%, #281F3C 100%)`,
      },
      borderImage: {
        "gradient-one":
          "linear-gradient(180deg, #545162 0%, rgba(84, 81, 98, 0.2) 100%) 1",
        "gradient-two":
          "linear-gradient(126.47deg, #CFC0E5 11.62%, #DCA8CE 76.69%)",
      },
      borderRadius: {
        "3xl": "calc(var(--radius) + 8px)",
        "2xl": "calc(var(--radius) + 4px)",
        xl: "calc(var(--radius) + 2px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        pill: "50px",
      },
      boxShadow: {
        "sheet-1":
          "0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
      },
      maxWidth: {
        "8xl": "94.5rem",
      },
      padding: {
        "4.5": "1.125rem",
      },
      margin: {
        "4.5": "1.125rem",
      },
      fontSize: {
        xxs: [
          "0.6875rem",
          {
            lineHeight: "0.875rem",
          },
        ],
        "xs+": [
          "0.8125rem",
          {
            lineHeight: "1.375rem",
          },
        ],
        "sm+": [
          "0.9375rem",
          {
            lineHeight: "1.3125rem",
          },
        ],
        "base+": [
          "1.0625rem",
          {
            lineHeight: "1.25rem",
          },
        ],
        "2.5xl": [
          "1.75rem",
          {
            lineHeight: "2rem",
          },
        ],
        "2.25xl": [
          "1.6875rem",
          {
            lineHeight: "2.025rem",
          },
        ],
        "3.5xl": [
          "2rem",
          {
            lineHeight: "1.15",
          },
        ],
        "4.5xl": [
          "2.5rem",
          {
            lineHeight: "1",
          },
        ],
        "6.75xl": [
          "4.375rem",
          {
            lineHeight: "1",
          },
        ],
      },
      lineHeight: {
        "3.5": "0.820625rem",
        "5.5": "1.09375rem",
      },
      borderTop: {
        gradient: "1px solid transparent",
      },
      borderImageSource: {
        gradient:
          "linear-gradient(90deg, rgba(202, 180, 233, 0) 0%, #CAB4E9 48.8%, rgba(202, 180, 233, 0) 100%)",
      },
      borderImageSlice: {
        "1": "1",
      },
      borderImageWidth: {
        "top-only": "1px 0 0 0",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  plugins: [tailwindcssAnimate],
};

export default config;
