import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Navbar } from "../components/Navbar/Navbar";
import NextNProgress from "nextjs-progressbar";
import { NETWORK } from "../const/contractAddresses";
import "../styles/globals.css";
import { useEffect } from "react";
import gsap from "gsap";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    function circleMouseFollower() {
      window.addEventListener("mousemove", function (event) {
        const circle = document.querySelector<HTMLElement>("#pointerCircle"); // Specify type as HTMLElement
    
        if (circle) {
          // Calculate the position of the circle based on mouse cursor position
          const x = event.clientX;
          const y = event.clientY;
    
          // Update the circle's position using CSS transform
          circle.style.transform = `translate(${x-10}px, ${y-155}px)`;
        }
      });
    }
    circleMouseFollower();
  }, [])


  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={NETWORK}
    >

      {/* Progress bar when navigating between pages */}
      <NextNProgress
        color="var(--color-tertiary)"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <div id="pointerCircle"></div>

      {/* Render the navigation menu above each component */}
      <Navbar />

      {/* Render the actual component (page) */}
      <Component {...pageProps} />
      <div id="background">
        {/* <video autoPlay loop muted className="background-video">
          <source src="landing.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
      </div>
    </ThirdwebProvider>
  );
}

export default MyApp;
