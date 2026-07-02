import { animate, hover, inView, stagger } from "motion";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const qsa = <T extends Element>(selector: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(selector));

function prepareRevealElement(element: HTMLElement) {
  if (element.dataset.motionPrepared === "true") return;

  element.dataset.motionPrepared = "true";
  element.style.opacity = "0";
  element.style.transform = "translateY(22px)";
  element.style.filter = "blur(6px)";
}

function revealElements(elements: HTMLElement[], delayStep = 0.07, startDelay = 0) {
  if (!elements.length) return;

  animate(
    elements,
    {
      opacity: [0, 1],
      y: [22, 0],
      filter: ["blur(6px)", "blur(0px)"],
    },
    {
      duration: 0.75,
      ease,
      delay: stagger(delayStep, { startDelay }),
    },
  );
}

function setupNavbar() {
  const navbar = document.querySelector<HTMLElement>("[data-motion-nav]");

  if (!navbar || navbar.dataset.motionReady === "true") return;

  navbar.dataset.motionReady = "true";

  animate(
    navbar,
    {
      opacity: [0, 1],
      y: [-12, 0],
    },
    {
      duration: 0.55,
      ease,
    },
  );
}
function setupClapperboard() {
  const clapper = document.querySelector<HTMLElement>("[data-motion-clapper]");

  if (!clapper || clapper.dataset.motionReady === "true") return;

  clapper.dataset.motionReady = "true";

  const entrance = animate(
    clapper,
    {
      y: [10, -2, 0],
      rotate: [-1.6, 0.45, 0],
      scale: [0.96, 1.015, 1],
    },
    {
      duration: 1.05,
      delay: 0.55,
      ease,
    },
  );

  entrance.finished.then(() => {
    if (!clapper.isConnected) return;

    animate(
      clapper,
      {
        y: [0, -7, 0],
        rotate: [0, -0.4, 0.25, 0],
      },
      {
        duration: 7.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    );
  });
}
function setupHero() {
  const hero = document.querySelector<HTMLElement>("[data-motion-hero]");

  if (!hero || hero.dataset.motionReady === "true") return;

  hero.dataset.motionReady = "true";

  const items = qsa<HTMLElement>("[data-motion-item]", hero);
  items.forEach(prepareRevealElement);

  revealElements(items, 0.09, 0.12);

  const visual = hero.querySelector<HTMLElement>("[data-motion-hero-visual]");

  if (visual) {
    visual.style.opacity = "0";

    animate(
      visual,
      {
        opacity: [0, 1],
      },
      {
        duration: 1.1,
        delay: 0.45,
        ease,
      },
    );
  }
}
function setupSectionReveals() {
  const sections = qsa<HTMLElement>("[data-motion-section]");

  sections.forEach((section) => {
    if (section.dataset.motionReady === "true") return;

    section.dataset.motionReady = "true";

    const items = qsa<HTMLElement>("[data-motion-item]", section);
    const cards = qsa<HTMLElement>("[data-motion-card]", section);

    items.forEach(prepareRevealElement);
    cards.forEach(prepareRevealElement);

    const introTrigger = items[0] ?? section;

    inView(
      introTrigger,
      () => {
        revealElements(items, 0.06);
      },
      {
        amount: 0.01,
        margin: "0px 0px -10% 0px",
      },
    );

    if (cards.length > 0) {
      inView(
        cards[0],
        () => {
          revealElements(cards, 0.05);
        },
        {
          amount: 0.01,
          margin: "0px 0px -10% 0px",
        },
      );
    }
  });
}
function setupFilmStrips() {
  const strips = qsa<HTMLElement>("[data-motion-film]");

  strips.forEach((strip) => {
    if (strip.dataset.motionReady === "true") return;

    strip.dataset.motionReady = "true";
    strip.style.opacity = "0";

    inView(
      strip,
      () => {
        animate(
          strip,
          {
            opacity: [0, 1],
            filter: ["blur(4px)", "blur(0px)"],
          },
          {
            duration: 0.7,
            ease,
          },
        );
      },
      {
        amount: 0.3,
      },
    );
  });
}

function setupCardHover() {
  const cards = qsa<HTMLElement>("[data-motion-card]");

  cards.forEach((card) => {
    if (card.dataset.motionHoverReady === "true") return;

    card.dataset.motionHoverReady = "true";

    hover(card, (element) => {
      const target = element as HTMLElement;

      const enterAnimation = animate(
        target,
        {
          y: -5,
          scale: 1.01,
        },
        {
          duration: 0.22,
          ease,
        },
      );

      return () => {
        enterAnimation.stop();

        animate(
          target,
          {
            y: 0,
            scale: 1,
          },
          {
            duration: 0.22,
            ease,
          },
        );
      };
    });
  });
}

function setupMotion() {
  // if (prefersReducedMotion()) {
  //   return;
  // }
  setupClapperboard();
  setupNavbar();
  setupHero();
  setupSectionReveals();
  setupFilmStrips();
  setupCardHover();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupMotion);
} else {
  setupMotion();
}

document.addEventListener("astro:page-load", setupMotion);
