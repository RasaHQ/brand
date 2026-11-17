import React from 'react';
import {AbsoluteFill,Easing,interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {tokens as t} from '../../design-system/dist/tokens.mjs';
export type BrandSceneProps = {reducedMotion?: boolean};
export const BrandScene: React.FC<BrandSceneProps> = ({reducedMotion=false}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const duration=t.motion.reveal*fps/1000;
  const ease=Easing.bezier(...t.motion.ease);
  const labels=['Describe the task','Review the behavior','Share what you learned'];
  return <AbsoluteFill style={{background:t.ui.bg,color:t.ui.fg,padding:96,fontFamily:t.font.sans,fontWeight:t.weight.book}}>
    <div style={{fontFamily:t.font.mono,fontSize:24,fontWeight:400,textTransform:'uppercase',color:t.ui['fg-muted']}}>Workflow</div>
    <h1 style={{fontFamily:t.font.serif,fontWeight:t.weight.book,fontSize:100,lineHeight:'105px',letterSpacing:'-.02em',margin:'48px 0 64px'}}>Build, review and <em style={{color:t.ui.accent}}>improve.</em></h1>
    <div style={{display:'flex',gap:32}}>{labels.map((label,i)=>{
      const start=(700+i*550)*fps/1000;
      const progress=reducedMotion?1:interpolate(frame,[start,start+duration],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
      return <div key={label} style={{flex:1,background:t.color.taupe['50'],border:`1px solid ${t.color.taupe['300']}`,borderRadius:t.radius['4xl'],padding:40,opacity:progress,transform:`translateY(${(1-progress)*t.motion.distance*2}px)`}}>
        <div style={{fontFamily:t.font.mono,fontSize:24,fontWeight:400,color:t.ui['fg-muted']}}>0{i+1}</div>
        <div style={{fontFamily:t.font.serif,fontWeight:t.weight.book,fontSize:40,lineHeight:'48px',marginTop:24}}>{label}</div>
      </div>;
    })}</div>
    <div style={{position:'absolute',bottom:64,fontSize:24,color:t.ui['fg-muted']}}>Design specimen · replace with approved copy and supplied logo assets</div>
  </AbsoluteFill>;
};
