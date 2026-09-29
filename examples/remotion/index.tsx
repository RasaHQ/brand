import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {BrandScene} from './BrandScene';
const Root: React.FC = () => <Composition id="RasaBrandScene" component={BrandScene} durationInFrames={240} fps={30} width={1920} height={1080} defaultProps={{reducedMotion:false}} />;
registerRoot(Root);
