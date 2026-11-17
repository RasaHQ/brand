// Optional: import from index.tsx only after the licensed files are in public/fonts/ (never commit them).
// Book is weight 300 (Rasa Brand 2026).
import {loadFont} from '@remotion/fonts';
import {staticFile,cancelRender} from 'remotion';
Promise.all([
  loadFont({family:'STK Bureau Serif',url:staticFile('fonts/STKBureauSerif-Book.woff2'),weight:'300'}),
  loadFont({family:'STK Bureau Serif',url:staticFile('fonts/STKBureauSerif-BookItalic.woff2'),weight:'300',style:'italic'}),
  loadFont({family:'STK Bureau Sans',url:staticFile('fonts/STKBureauSans-Book.woff2'),weight:'300'}),
  loadFont({family:'STK Bureau Sans',url:staticFile('fonts/STKBureauSans-Medium.woff2'),weight:'500'}),
  loadFont({family:'STK Bureau Sans Mono',url:staticFile('fonts/STKBureauSansMono-Regular.woff2'),weight:'400'}),
]).catch(cancelRender);
