"use client";

import { useEffect, useRef, useCallback } from "react";

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function randomInterval(min = 40, max = 120) {
  const r = Math.random() * max;
  return r < min ? min : r;
}

/* ── Core imperative typer attached to a DOM span ─────────────────────────── */
class Typer {
  el: HTMLElement;
  constructor(el: HTMLElement) { this.el = el; }

  async type(text: string) {
    for (const ch of text) {
      this.el.textContent += ch;
      await sleep(randomInterval(35, 110));
    }
  }

  async delete(text: string) {
    for (let i = 0; i < text.length; i++) {
      this.el.textContent = this.el.textContent!.slice(0, -1);
      await sleep(randomInterval(25, 70));
    }
  }

  clear() { this.el.textContent = ""; }
}

/* ── Props ────────────────────────────────────────────────────────────────── */
interface TypeWriterProps {
  /** First string typed immediately when visible. */
  text: string;
  /**
   * Optional cycling words typed after `text`.
   * Each word is typed then deleted before the next, indefinitely.
   */
  cycleWords?: string[];
  /** ms pause between cycle words. Default 2200 */
  pauseMs?: number;
  /** Extra className on the wrapper span */
  className?: string;
  /** Start immediately without waiting for IntersectionObserver */
  immediate?: boolean;
  /** Show blinking cursor */
  cursor?: boolean;
}

/**
 * TypeWriter — reusable component that types / cycles text with a realistic
 * random keystroke interval, matching the CodePen pattern:
 *   type → pause → delete → type next → …
 */
export default function TypeWriter({
  text,
  cycleWords,
  pauseMs = 2200,
  className = "",
  immediate = false,
  cursor = true,
}: TypeWriterProps) {
  const spanRef  = useRef<HTMLSpanElement>(null);
  const stopRef  = useRef(false);

  const run = useCallback(async () => {
    if (!spanRef.current) return;
    const typer = new Typer(spanRef.current);
    typer.clear();

    // Type the base text
    await typer.type(text);

    if (!cycleWords?.length) return;

    // Cycle through words forever until component unmounts
    while (!stopRef.current) {
      for (const word of cycleWords) {
        if (stopRef.current) break;
        await typer.type(word);
        await sleep(pauseMs);
        if (stopRef.current) break;
        await typer.delete(word);
        await sleep(200);
      }
    }
  }, [text, cycleWords, pauseMs]);

  useEffect(() => {
    stopRef.current = false;
    const el = spanRef.current;
    if (!el) return;

    if (immediate) {
      run();
      return () => { stopRef.current = true; };
    }

    // Use IntersectionObserver so typing starts when element is visible
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.disconnect();
          run();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);

    return () => {
      stopRef.current = true;
      obs.disconnect();
    };
  }, [run, immediate]);

  return (
    <span className={`inline ${className}`}>
      <span ref={spanRef} />
      {cursor && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: "2px",
            height: "0.85em",
            background: "rgba(255,255,255,0.7)",
            marginLeft: "2px",
            verticalAlign: "text-bottom",
            borderRadius: "1px",
            animation: "tw-blink 1.1s step-start infinite",
          }}
        />
      )}
    </span>
  );
}
