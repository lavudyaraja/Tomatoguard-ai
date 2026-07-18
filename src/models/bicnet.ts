import { ModelInfo } from './types';

export const BiDCNetInfo: ModelInfo = {
    id: 'scanet',
    name: 'BiDCNet (Proposed)',
    type: 'Bidirectional Dual Cross-attention Network',
    description: 'Novel hybrid architecture combining ResNet-50 CNN and Vision Transformer with dual-stage bidirectional cross-attention. Achieves 99.03% test accuracy - the highest performing model in comprehensive benchmark evaluation.',
    accuracy: '99.03%',
    parameters: '21.5M',
    research: 'Based on peer-reviewed thesis research'
};
