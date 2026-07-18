# Technical Architecture

TomatoGuard AI utilizes a decoupled architecture to ensure high-performance inference and a rich user experience. The system features a **quad-model ensemble** with BiDCNet as the primary model.

### Model Architecture

**BiDCNet (Proposed)** - Primary Model (99.03% accuracy):
- ResNet-50 CNN encoder for local feature extraction
- Vision Transformer (384 embed dim, 12 layers, 8 heads) for global context
- Bidirectional Cross-Attention for CNN-ViT feature fusion
- Sparse token routing for computational efficiency
- 21.5M parameters

**Supporting Models**:
- **CoAtNet**: Hybrid CNN-Transformer with convolutional attention
- **MaxViT**: Multi-Axis Vision Transformer with block/grid attention
- **NextViT**: Next-generation efficient Vision Transformer

### Layer Breakdown:
1. **Frontend (Next.js)**: A React-based clinical dashboard that handles image uploads, report rendering, confidence metrics, severity assessment, and history visualization.
2. **Inference Backend (FastAPI)**: A Python-based engine that hosts the **quad-model ensemble** (BiDCNet, CoAtNet, MaxViT, NextViT) with ensemble agreement tracking and uncertainty quantification.
3. **Explainer Module (XAI)**: Multi-perspective explainability with Grad-CAM++, Attention Rollout, and Combined XAI visualization modes.
4. **Insight Layer (Groq)**: Utilizing Llama-4-Scout to perform multimodal visual analysis on the detected pathological markers.
5. **Persistence Layer**: Neon DB for SQL records and Cloudinary for media assets.
