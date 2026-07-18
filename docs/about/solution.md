# The Solution: Quad-Model Ensemble with BiDCNet

TomatoGuard AI provides an end-to-end diagnostic pipeline that combines **four state-of-the-art deep learning models** with multimodal explanation and research-backed uncertainty quantification.

### Our Approach:

#### 1. **Quad-Model Ensemble Architecture**
- **Primary Model**: BiDCNet (Proposed) - Bidirectional Dual Cross-attention Network achieving **99.03% accuracy**
- **Supporting Models**: CoAtNet, MaxViT, NextViT for ensemble consensus
- **Ensemble Agreement Tracking**: Monitors model consensus (25%, 50%, 75%, 100%)
- **Uncertainty Quantification**: Entropy-based confidence scoring with 4-level classification

#### 2. **Instant Recognition**
- Upload a photo and get a diagnosis in < 5 seconds
- Multi-model inference with real-time result aggregation
- Automatic primary model selection (BiDCNet prioritized)

#### 3. **Advanced Explainability (XAI)**
- **Grad-CAM++ Heatmaps**: Show exactly *where* the model focuses for disease detection
- **Attention Rollout**: Transformer attention flow visualization
- **Combined XAI Mode**: Dual-perspective overlays for comprehensive interpretability
- **Lesion Annotation**: Automatic hotspot detection and severity assessment

#### 4. **Research-Backed Enhancements**
- **Confusion Warnings**: Smart alerts for visually similar disease pairs (Early Blight ↔ Target Spot)
- **Disease Severity Scoring**: Quantitative assessment based on affected area, lesion count, and intensity
- **Image Quality Analysis**: Leaf vitality, light exposure, color profile metrics
- **Quality Advisories**: Real-time feedback on image capture quality

#### 5. **Clinical Reports & Actionable Guidance**
- Automated LLM-generated summaries explain the "why" and "how"
- Every diagnosis comes with tailored biosecurity and recovery protocols
- Treatment recommendations based on severity level

### Technical Implementation:

**BiDCNet Architecture (Proposed):**
- Pretrained ResNet-50 CNN encoder for local feature extraction
- Scratch-trained Vision Transformer (4 blocks, 384 dim, 6 heads) for global context
- Dual-Stage Bidirectional Cross-Attention:
  - Stage 1: Full dense cross-attention between CNN and ViT tokens
  - Stage 2: Sparse top-K token routing for computational efficiency
- 21.5M parameters trained on 43,109 augmented tomato leaf images
- Hyperparameter optimization via Optuna (15 trials × 12 epochs)
- 5-View Test-Time Augmentation for robust predictions

**Dataset:**
- **43,109 total images** (Augmented Tomato Leaf Disease dataset)
- Training: 34,243 (79.4%)
- Testing: 4,433 (10.3%)
- Validation: 4,433 (10.3%)
- 11 disease classes including bacterial, viral, fungal, and healthy states

### Performance Metrics:

| Model | Accuracy | Parameters | Status |
|-------|----------|------------|--------|
| **BiDCNet (Proposed)** | **99.03%** | 21.5M | Primary |
| CoAtNet | 98.9% | Hybrid | Supporting |
| MaxViT | 98.8% | Multi-Axis ViT | Supporting |
| NextViT | 98.7% | Next-Gen | Supporting |

### Deployment Stack:
- **Frontend**: Next.js 15 with React, TypeScript, Tailwind CSS v4
- **Backend**: FastAPI with PyTorch 2.6, Python 3.11
- **Database**: Neon Serverless PostgreSQL for persistent storage
- **Media**: Cloudinary for image hosting and delivery
- **Deployment**: Vercel (frontend) + Render (backend)
