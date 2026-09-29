import {animate} from 'animejs';
import {tokens} from '../../design-system/dist/tokens.mjs';
/** Proposed decorative-card reveal. Returns cleanup for Astro navigation/unmount. */
export function revealCards(root: HTMLElement): () => void {
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-rasa-reveal]'));
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  let animation: ReturnType<typeof animate> | undefined;
  let observer: IntersectionObserver | undefined;
  const show = () => cards.forEach(el => {el.style.opacity='1'; el.style.transform='none';});
  const stop = () => {animation?.cancel(); observer?.disconnect(); show();};
  // Shared cubic-bezier control points, evaluated by inversion of x.
  const [x1,y1,x2,y2] = tokens.motion.ease;
  const cubic = (t:number,a:number,b:number) => 3*(1-t)*(1-t)*t*a + 3*(1-t)*t*t*b + t*t*t;
  const easing = (x:number) => {let lo=0,hi=1;for(let i=0;i<20;i++){const m=(lo+hi)/2;if(cubic(m,x1,x2)<x)lo=m;else hi=m;}return cubic((lo+hi)/2,y1,y2);};
  if (!media.matches && cards.length && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      if (!entries.some(e=>e.isIntersecting)) return;
      observer?.disconnect();
      if (media.matches) {show();return;}
      animation = animate(cards, {opacity:[0,1],translateY:[tokens.motion.distance,0],duration:tokens.motion.reveal,delay:(_el:unknown,i:number=0)=>i*tokens.motion.stagger,ease:easing,onComplete:show});
    }, {threshold:0.15});
    observer.observe(root);
  }
  const onChange = () => {if(media.matches)stop();};
  media.addEventListener('change',onChange);
  return () => {stop();media.removeEventListener('change',onChange);};
}
