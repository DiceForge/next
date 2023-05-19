import { Inter, Poppins} from "next/font/google"

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-display"
});
