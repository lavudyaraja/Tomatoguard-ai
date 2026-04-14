# 🍅 TomatoGuard AI

## 🌱 Overview

TomatoGuard AI is a next-generation, AI-powered agricultural diagnostic platform designed to revolutionize plant disease detection through advanced computer vision and multimodal intelligence. The system focuses specifically on tomato leaf pathology, enabling accurate, real-time identification of diseases using state-of-the-art deep learning architectures.

Traditional methods of plant disease detection rely heavily on manual inspection by experts, which is often time-consuming, subjective, and inaccessible to many farmers. TomatoGuard AI addresses these challenges by providing an automated, scalable, and highly precise solution that leverages recent advancements in Vision Transformers and Explainable AI.

At its core, the system integrates a dual-model ensemble consisting of MaxViT and CoAtNet architectures. These models work collaboratively to improve prediction robustness and reduce false positives by cross-validating outputs. The diagnostic pipeline processes input images of tomato leaves and classifies them into multiple pathological categories, including bacterial, viral, fungal, and pest-related diseases, as well as healthy states.

Beyond classification, TomatoGuard AI emphasizes interpretability through the integration of Grad-CAM (Gradient-weighted Class Activation Mapping). This enables the system to generate visual heatmaps that highlight the specific regions of the leaf responsible for the model’s prediction, offering transparency and trust in AI-driven decisions.

To further enhance usability, the platform incorporates a multimodal vision-language model capable of generating detailed diagnostic reports. These reports include disease descriptions, severity analysis, and actionable recovery recommendations, making the system not only a detection tool but also a decision-support system.

The platform is built using a modern, scalable architecture with a clear separation between frontend and backend components. The frontend, developed using Next.js and React, provides a highly interactive and visually rich user interface, including features like split-screen comparison and forensic visualization. The backend, powered by FastAPI and PyTorch, handles model inference and data processing efficiently.

Additionally, TomatoGuard AI integrates cloud-based services such as PostgreSQL (via Neon) for persistent data storage and Cloudinary for media management, ensuring high availability and scalability. The system follows an API-first design, making it extensible and adaptable for future integrations, including mobile applications and IoT-based agricultural systems.

Overall, TomatoGuard AI represents a significant step toward precision agriculture by combining cutting-edge AI technologies with practical usability. It empowers farmers, researchers, and agricultural stakeholders to make informed decisions, reduce crop losses, and enhance productivity through intelligent disease management.