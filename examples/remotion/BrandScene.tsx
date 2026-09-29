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
  return <AbsoluteFill style={{background:t.ui.bg,color:t.ui.ink,padding:96,fontFamily:t.font.sans,fontWeight:t.weight.book}}>
    <div style={{fontFamily:t.font.mono,fontSize:24,fontWeight:400,textTransform:'uppercase',color:t.ui['text-muted']}}>Rasa · illustrative workflow</div>
    <h1 style={{fontFamily:t.font.serif,fontWeight:350,fontSize:100,lineHeight:1.05,letterSpacing:'-.02em',margin:'48px 0 64px'}}>Build, review,<br/><em>improve.</em></h1>
    <div style={{display:'flex',gap:32}}>{labels.map((label,i)=>{
      const start=(700+i*550)*fps/1000;
      const progress=reducedMotion?1:interpolate(frame,[start,start+duration],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
      return <div key={label} style={{flex:1,background:t.ui.muted,borderRadius:t.radius.card*2,padding:40,opacity:progress,transform:`translateY(${(1-progress)*t.motion.distance*2}px)`}}>
        <div style={{fontFamily:t.font.mono,fontSize:24,fontWeight:400,color:t.ui['accent-ink']}}>0{i+1}</div>
        <div style={{fontSize:36,lineHeight:1.2,marginTop:24}}>{label}</div>
      </div>;
    })}</div>
    <div style={{position:'absolute',bottom:64,fontSize:24,color:t.ui['text-muted']}}>Design specimen · replace with approved copy and supplied logo assets</div>
  </AbsoluteFill>;
};
