import { AppProps } from "next/app"
import "tailwindcss/tailwind.css"
import Head from "next/head"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pomodoro</title>
        <meta
          name="description"
          content="Minimalist pomodoro timer for productivity"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Pomodoro, timer" />
        <meta name="author" content="Ahmad Muslih Zain" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
