# Technical Architecture

TomatoGuard AI utilizes a decoupled architecture to ensure high-performance inference and a rich user experience.

### Layer Breakdown:
1. **Frontend (Next.js)**: A React-based clinical dashboard that handles image uploads, report rendering, and history visualization.
2. **Inference Backend (FastAPI)**: A Python-based engine that hosts the MaxViT and CoAtNet models.
3. **Explainer Module (XAI)**: A Grad-CAM implementation that extracts activation maps from the final convolutional layers.
4. **Insight Layer (Groq)**: Utilizing Llama-4-Scout to perform multimodal visual analysis on the detected pathological markers.
5. **Persistence Layer**: Neon DB for SQL records and Cloudinary for media assets.
