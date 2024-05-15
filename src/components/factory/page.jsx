"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "@/components/factory/factory.module.css";
gsap.registerPlugin(ScrollTrigger);

const AirpodsAnimation = ({ loadImage }) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const contextRef = useRef(null);
  const imagesRef = useRef([]);
  const airpodsRef = useRef({ frame: 0 });
  const [loading, setLoading] = useState(true);

  // const [imgLoad, setImgLoad] = useState(true);
  // console.log(loadImage(imgLoad));
  console.log("factory loading", loading);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const text = textRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;

    const setCanvasSize = () => {
      const canvas = canvasRef.current;
      const originalWidth = 1632;
      const originalHeight = 918;
      const aspectRatio = originalWidth / originalHeight;

      const availableWidth = window.innerWidth;
      const availableHeight = window.innerHeight;
      const heightByWidth = availableWidth / aspectRatio;

      if (availableWidth < 200) {
        canvas.width = originalWidth / 2; // Adjust canvas width for mobile screens
        canvas.height = originalHeight / 2;
        canvas.style.width = "1301px"; // Set canvas width to 1301px width to be given according screen Sizes
        canvas.style.height = "100vh"; // Set canvas height to window height or any height specified
      } else {
        canvas.width = originalWidth;
        canvas.height = originalHeight;
        canvas.style.width = "100%"; // Set canvas width to 100% of container
        canvas.style.height = "100vh"; // this will  Allow canvas to maintain aspect ratio
      }
    };





    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const frameCount = 160;
    const currentFrame = (index) =>
      `https://plywoodassets.royaletouche.com/assets/newframes/factoryzoom/F${(
        index + 0
      )
        .toString()
        .padStart(3, "0")}.webp`;
        // https://plywoodassets.royaletouche.com/assets/newframes/factoryzoom/F000.webp
        // https://plywoodassets.royaletouche.com/assets/compressed/factoryzoom/F000.jpg
    let imgL = [];

    for (let i = 0; i < frameCount; i++) {
      let img = new Image();
      img.src = currentFrame(i);
      imagesRef.current.push(img);
      imgL.push(img.src);
      // fetch(img.src)
      //   .then((res) => res.statusText)
      //   .then((data) => console.log("data", setImgLoad(data)))
      //   .catch((error) => console.error("error", error));
    }
    // imgL.map((imageUrl) => {
    //   return new Promise((resolve) => {
    //     const img = new Image();
    //     img.src = imageUrl;
    //     img.onload = () => resolve();
    //   });
    // });

    // Promise.all(imgL).then(() => {
    //   setLoading(false);
    // });

    const loadImages = async () => {
      try {
        const loadImagePromises = imgL.map((imageUrl) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => resolve();
          });
        });

        await Promise.all(loadImagePromises);
        setLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        // Handle error loading images
      }
    };
    loadImages();

    console.log(imgL);

    gsap
      .timeline({
        onUpdate: render,
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.5,
          end: "+=1000%",
        },
      })
      .to(airpodsRef.current, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        duration: 1,
      });

    imagesRef.current[0].onload = render;

    function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        imagesRef.current[airpodsRef.current.frame],
        0,
        0,
        canvas.width,
        canvas.height
      );
    }

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  console.log(loading ? "Loading" : "Complate");
  console.log(loadImage(loading));

  const phrase =
    "For those who accept nothing less than the finest. A ply that has it all. Carefully engineered using proprietary 4-stage preservative treatment of select hardwood species, cross-bonded with 100% BWP grade phenolic resins using 4 press technology, a ply that is safe for your home and loved ones with E-0 emissions and fire retardant properties.";

  let refs = useRef([]);
  const body = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    createAnimation();
  }, []);

  const createAnimation = () => {
    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: container.current,
        scrub: true,
        start: `top 90%`,
        end: `+=${window.innerHeight / 1.55}`,
      },
      opacity: 1,
      ease: "none",
      stagger: 0.1,
      color: "#c3a464",
    });
  };

  const splitWords = (phrase) => {
    let body = [];
    phrase.split(" ").forEach((word, i) => {
      const letters = splitLetters(word);
      body.push(<p key={word + "_" + i}>{letters}</p>);
    });
    return body;
  };

  const splitLetters = (word) => {
    let letters = [];
    word.split("").forEach((letter, i) => {
      letters.push(
        <span
          key={letter + "_" + i}
          ref={(el) => {
            refs.current.push(el);
          }}
        >
          {letter}
        </span>
      );
    });
    return letters;
  };

  return (
    <section>
      <section ref={sectionRef}>
        <canvas
          className={styles.canvas_factory_settings}
          ref={canvasRef}
        ></canvas>
      </section>
      <div className={styles.scroll_text_wrapper}>
        <div ref={container} className={styles.main}>
          <div ref={body} className={styles.body}>
            {splitWords(phrase)}
            <h1 className={styles.scroll_text_header}>
              Royale Touché Performance Ply
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirpodsAnimation;
