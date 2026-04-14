# 🍅 TomatoGuard AI
> **Forensic Pathological Intelligence for High-Yield Agriculture**

[![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Groq AI](https://img.shields.io/badge/Groq_AI-f3d142?style=for-the-badge&logo=lightning&logoColor=black)](https://groq.com/)
[![Neon DB](https://img.shields.io/badge/Neon_DB-00e599?style=for-the-badge&logo=postgresql&logoColor=black)](https://neon.tech/)

TomatoGuard AI is a hyper-sophisticated diagnostic ecosystem that transforms agricultural pathology using **Multimodal Vision Transformers** and **State-of-the-Art Explainable AI (XAI)**. It provides a cinematically designed, clinician-grade interface for identifying, documenting, and curing tomato leaf diseases.

---

## 🏛️ System Architecture

```mermaid
graph TD
    A[Tomato Leaf Input] --> B{Diagnostic Pipeline}
    B --> C[MaxViT Ensemble]
    B --> D[CoAtNet Transformer]
    C --> E[Grad-CAM Activation Mapping]
    D --> E
    E --> F[Forensic Heatmap]
    F --> G[Llama 4 Scout Vision]
    G --> H[Multimodal Diagnostic Report]
    H --> I[Neon DB Clinical Ledger]
    I --> J[Pathologist UI]
```

---

## 💎 Next-Level Features

### 🌌 **Cinematic Forensic Viewer**
*   **Split-Screen Comparison**: A sliding dual-view for side-by-side analysis of raw leaf tissue vs. AI-generated activation maps.
*   **Micron-Level Precision**: Interactive hotspots with absolute X-Y grid mapping for pathological localization.
*   **Glassmorphic Design**: Built with a high-contrast, premium aesthetic that respects both system-wide light and dark themes.

### 🧠 **The Intelligence Ensemble**
*   **Llama 4 Scout Vision**: Leverages the world's most advanced 17B-parameter vision-language model to generate localized, specific diagnostic insights.
*   **Dual-Architecture Consensus**: Cross-references MaxViT and CoAtNet predictions for maximum specificity and reduced false positives.
*   **Real-time Pathology Reports**: Generates recovery protocols encompassing biosecurity, recovery timelines, and biological priority analysis.

### �️ **Agricultural Asset Infrastructure**
*   **Neon SQL Persistence**: Scalable PostgreSQL storage for immutable diagnostic records.
*   **Media Cloud Storage**: Integrated Cloudinary pipeline for high-availability access to diagnostic evidence.
*   **API-First Design**: Decoupled Python-Inference and Next.js-Rendering layers for maximum throughput.

---

## 🛠️ The Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Interface** | Next.js 16.2 (App Router), React 19, Tailwind CSS 4, Framer Motion |
| **Logic** | TypeScript (Strict), Zod Validation, Shadcn/UI |
| **Inference** | Python 3.10+, PyTorch, FastAPI, OpenCV |
| **Cloud AI** | Groq AI Llama-4-Scout, Llama 3.3-70B |
| **Data & Media** | Neon DB (PostgreSQL), Cloudinary V2, next-cloudinary |

---

## 🚦 Pathological Deployment

### **Core Configuration**
1.  **Backend Initialization**: Ensure the Python Inference server is running on port `8000`.
    ```bash
    cd tomatoguard-backen
    pip install -r requirements.txt
    python main.py
    ```
2.  **Frontend Synchronisation**:
    ```bash
    cd tomatoguard-ai
    npm install
    npm run dev
    ```

### **Environment Matrix (`.env.local`)**
```properties
# 🧬 Database & Auth
DATABASE_URL=postgresql://user:pass@ep-shiny-field.neon.tech/tomatoguard

# 👁️ Groq AI Keys
GROQAI_API_KEY=gsk_v5...

# ☁️ Cloudinary Assets
CLOUDINARY_CLOUD_NAME=dg...
CLOUDINARY_API_KEY=45...
CLOUDINARY_API_SECRET=x9...

# 🔗 Engine Links
BACKEND_URL=http://localhost:8000
```

---

## 🌡️ Diagnostic Capabilities
The system is strictly trained on the following pathological classes:
- 🧪 **Bacterial & Viral**: Bacterial Spot, Mosaic Virus, Yellow Leaf Curl Virus.
- 🍄 **Fungal & Mildew**: Early Blight, Late Blight, Leaf Mold, Septoria Leaf Spot, Target Spot, Powdery Mildew.
- 🕷️ **Pest Vectors**: Two-spotted Spider Mite.
- ✅ **Baseline**: Optimal Healthy State.

---

## 🗺️ Roadmap v4.0
- [ ] **Mobile Field App**: React Native integration for real-time offline edge inference.
- [ ] **IoT Sensor Grid**: Direct integration with soil moisture and humidity hardware.
- [ ] **Export Engine**: One-click professional PDF Clinical Reports for laboratory submission.
- [ ] **Community Archive**: Anonymized data sharing for global pathological research.

---

## � Professional Ledger
© 2026 TomatoGuard AI Infrastructure.
*Engineered for agricultural excellence. Verified by AI.*
