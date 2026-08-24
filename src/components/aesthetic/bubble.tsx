'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from 'motion/react';

import { cn } from '~/lib/utils';

type BubbleColors = {
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
  sixth: string;
};

type BubbleBackgroundProps = React.ComponentProps<'div'> & {
  interactive?: boolean;
  transition?: SpringOptions;
  colors?: BubbleColors;
};

function BubbleBackground({
  ref,
  className,
  children,
  interactive = false,
  transition = { stiffness: 100, damping: 20 },
  colors = {
    first: '18,113,255',
    second: '221,74,255',
    third: '0,220,255',
    fourth: '200,50,50',
    fifth: '180,180,50',
    sixth: '140,100,255',
  },
  ...props
}: BubbleBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref as React.Ref<HTMLDivElement>, () => containerRef.current!);

  const filterId = React.useId().replace(/:/g, '');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, transition);
  const springY = useSpring(mouseY, transition);

  React.useEffect(() => {
    if (!interactive) return;

    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReduced.matches) return;

    const updateFromEvent = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - (rect.left + rect.width / 2));
      mouseY.set(e.clientY - (rect.top + rect.height / 2));
    };

    window.addEventListener('mousemove', updateFromEvent, { passive: true });
    return () => window.removeEventListener('mousemove', updateFromEvent);
  }, [interactive, mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-slot="bubble-background"
      className={cn(
        'pointer-events-none relative size-full overflow-hidden bg-linear-to-br from-violet-900 to-blue-900',
        className,
      )}
      style={
        {
          '--first-color': colors.first,
          '--second-color': colors.second,
          '--third-color': colors.third,
          '--fourth-color': colors.fourth,
          '--fifth-color': colors.fifth,
          '--sixth-color': colors.sixth,
        } as React.CSSProperties
      }
      {...props}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 h-0 w-0">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        className="absolute inset-0"
        style={{ filter: `url(#${filterId}) blur(40px)` }}
      >
        <motion.div
          className="absolute size-[80%] rounded-full top-[10%] left-[10%] mix-blend-hard-light bg-[radial-gradient(circle_at_center,rgba(var(--first-color),0.8)_0%,rgba(var(--first-color),0)_50%)]"
          animate={{ y: [-50, 50, -50] }}
          transition={{ duration: 30, ease: 'easeInOut', repeat: Infinity }}
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center origin-[calc(50%-400px)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
        >
          <div className="size-[80%] rounded-full mix-blend-hard-light bg-[radial-gradient(circle_at_center,rgba(var(--second-color),0.8)_0%,rgba(var(--second-color),0)_50%)]" />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center origin-[calc(50%+400px)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        >
          <div className="absolute size-[80%] rounded-full mix-blend-hard-light top-[calc(50%+200px)] left-[calc(50%-500px)] bg-[radial-gradient(circle_at_center,rgba(var(--third-color),0.8)_0%,rgba(var(--third-color),0)_50%)]" />
        </motion.div>

        <motion.div
          className="absolute size-[80%] rounded-full top-[10%] left-[10%] opacity-70 mix-blend-hard-light bg-[radial-gradient(circle_at_center,rgba(var(--fourth-color),0.8)_0%,rgba(var(--fourth-color),0)_50%)]"
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 40, ease: 'easeInOut', repeat: Infinity }}
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center origin-[calc(50%-800px)_calc(50%+200px)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
        >
          <div className="absolute size-[160%] mix-blend-hard-light top-[calc(50%-80%)] left-[calc(50%-80%)] bg-[radial-gradient(circle_at_center,rgba(var(--fifth-color),0.8)_0%,rgba(var(--fifth-color),0)_50%)]" />
        </motion.div>

        {interactive ? (
          <motion.div
            className="absolute size-full rounded-full opacity-70 mix-blend-hard-light bg-[radial-gradient(circle_at_center,rgba(var(--sixth-color),0.8)_0%,rgba(var(--sixth-color),0)_50%)]"
            style={{ x: springX, y: springY }}
          />
        ) : null}
      </div>

      {children}
    </div>
  );
}

export { BubbleBackground, type BubbleBackgroundProps };
