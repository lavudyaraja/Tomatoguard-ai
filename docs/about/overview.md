# 🍅 TomatoGuard AI

## 🌱 Overview

TomatoGuard AI is a next-generation, AI-powered agricultural diagnostic platform designed to revolutionize plant disease detection through advanced computer vision and multimodal intelligence. The system focuses specifically on tomato leaf pathology, enabling accurate, real-time identification of diseases using state-of-the-art deep learning architectures.

Traditional methods of plant disease detection rely heavily on manual inspection by experts, which is often time-consuming, subjective, and inaccessible to many farmers. TomatoGuard AI addresses these challenges by providing an automated, scalable, and highly precise solution that leverages recent advancements in Vision Transformers, Hybrid CNN-Transformer architectures, and Explainable AI.

### 🎯 Quad-Model Ensemble Architecture

At its core, the system integrates a **quad-model ensemble** consisting of **BiDCNet (Proposed)**, CoAtNet, MaxViT, and NextViT architectures. These models work collaboratively to improve prediction robustness and reduce false positives through ensemble agreement tracking and uncertainty quantification.

**BiDCNet (Bidirectional Dual Cross-attention Network)** is our novel proposed architecture that achieves **99.03% test accuracy** - the highest performance in comprehensive benchmark evaluation. It combines:
- **ResNet-50 CNN** encoder for local feature extraction
- **Vision Transformer** for global context understanding  
- **Dual-Stage Bidirectional Cross-Attention** for progressive CNN-ViT feature fusion
- **Sparse Token Routing** for computational efficiency

The diagnostic pipeline processes input images of tomato leaves and classifies them into 11 pathological categories, including bacterial, viral, fungal, and pest-related diseases, as well as healthy states.

### 📊 Dataset & Training

The system is trained on the **Augmented Tomato Leaf Disease dataset** with **43,109 total images**:
- **Training**: 34,243 images (79.4%)
- **Testing**: 4,433 images (10.3%)
- **Validation**: 4,433 images (10.3%)

All models are trained under consistent preprocessing, augmentation, Optuna hyperparameter optimization, and 5-View Test-Time Augmentation protocols.

### 🔍 Explainability & Severity Assessment

Beyond classification, TomatoGuard AI emphasizes interpretability through multiple XAI techniques:
- **Grad-CAM++**: Gradient-weighted class activation mapping with enhanced hotspot detection
- **Attention Rollout**: Transformer attention flow visualization
- **Combined XAI Mode**: Dual-perspective overlays for comprehensive explainability
- **Disease Severity Assessment**: Quantitative scoring based on affected area, lesion count, and intensity

### 🧠 Smart Prediction Features

The platform includes research-backed enhancements:
- **Ensemble Agreement Metrics**: Track model consensus (25%, 50%, 75%, 100%)
- **Uncertainty Quantification**: Entropy-based confidence scoring with 4-level classification
- **Confusion Warnings**: Smart alerts for visually similar disease pairs (Early Blight ↔ Target Spot)
- **Severity Scoring**: Actionable treatment recommendations based on disease progression

### 💻 Modern Architecture

The platform is built using a modern, scalable architecture with a clear separation between frontend and backend components. The frontend, developed using Next.js and React, provides a highly interactive and visually rich user interface, including confidence analysis dashboards, severity assessment cards, and forensic visualization. The backend, powered by FastAPI and PyTorch, handles quad-model inference and data processing efficiently.

Additionally, TomatoGuard AI integrates cloud-based services such as PostgreSQL (via Neon) for persistent data storage and Cloudinary for media management, ensuring high availability and scalability. The system follows an API-first design, making it extensible and adaptable for future integrations, including mobile applications and IoT-based agricultural systems.

Overall, TomatoGuard AI represents a significant step toward precision agriculture by combining cutting-edge AI technologies with practical usability. It empowers farmers, researchers, and agricultural stakeholders to make informed decisions, reduce crop losses, and enhance productivity through intelligent disease management.