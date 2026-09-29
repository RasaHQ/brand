// Optional: import from index.tsx only after authorized files are in public/fonts/.
import {loadFont} from '@remotion/fonts';
import {staticFile,cancelRender} from 'remotion';
Promise.all([
  loadFont({family:'STK Bureau Serif',url:staticFile('fonts/STKBureauSerif-Book.woff2'),weight:'350'}),
  loadFont({family:'STK Bureau Serif',url:staticFile('fonts/STKBureauSerif-BookItalic.woff2'),weight:'350',style:'italic'}),
  loadFont({family:'STK Bureau Sans',url:staticFile('fonts/STKBureauSans-Book.woff2'),weight:'350'}),
  loadFont({family:'STK Bureau Sans Mono',url:staticFile('fonts/STKBureauSansMono-Regular.woff2'),weight:'400'}),
]).catch(cancelRender);
