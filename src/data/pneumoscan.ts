/**
 * PneumoScan AI case-study content.
 * Sourced from the project brief and the public repository
 * (github.com/dilutha/Pneumonia_X-tray_Detection). Model performance is the
 * project's own reported evaluation — not a clinical validation.
 */

export const problem = {
  statement:
    'A classifier that only outputs “NORMAL” or “PNEUMONIA” is hard to trust: it gives no insight into why it reached its decision. The legacy prototype had exactly this limitation — a custom CNN on 150×150 images, with no way to see what the model was looking at.',
  questions: [
    'Can a stronger, pretrained model improve on the legacy CNN?',
    'Can every prediction come with a visual explanation?',
    'Can the system store images, results, and history like a real application?',
  ],
}

export const pneumoOverview = {
  tagline: 'DenseNet121 · Grad-CAM Explainability · FastAPI · Next.js · Supabase',
  goal: 'The goal is not only to classify an X-ray, but to make the model’s decision interpretable — every prediction ships with a visual explanation of where the model was looking.',
  capabilities: [
    'Chest X-ray upload',
    'AI prediction',
    'Confidence score',
    'Severity indicator',
    'Grad-CAM heatmap',
    'Prediction history',
    'Persistent image & result storage',
    'Responsive interactive UI',
  ],
  workflow: [
    'Upload X-ray',
    'Image preprocessing',
    'DenseNet121 inference',
    'NORMAL / PNEUMONIA',
    'Confidence score',
    'Grad-CAM',
    'Visual explanation',
    'Store prediction & history',
  ],
}

export const evolution = {
  versions: [
    {
      id: 'v1',
      label: 'Version 1',
      name: 'Legacy CNN / Streamlit',
      points: [
        'TensorFlow / Keras',
        'Streamlit',
        'Custom CNN',
        '150×150 input',
        'Basic pneumonia prediction',
        'No explainability',
      ],
    },
    {
      id: 'v2',
      label: 'Version 2',
      name: 'PneumoScan AI',
      points: [
        'FastAPI backend',
        'Next.js frontend',
        'TypeScript',
        'DenseNet121',
        '224×224 input',
        'ImageNet pretrained weights',
        'Fine-tuning',
        'Grad-CAM',
        'Supabase PostgreSQL',
        'Supabase Storage',
      ],
    },
  ],
  path: [
    'Prototype',
    'Model improvement',
    'Explainability',
    'Backend / frontend separation',
    'Persistent storage',
    'Production-style architecture',
  ],
}

export type LayerKind = 'io' | 'backbone' | 'anchor' | 'pool' | 'norm' | 'dense' | 'dropout' | 'output'

export const modelArchitecture = {
  input: { label: 'Input', detail: '224 × 224 × 3' },
  backbone: [
    { label: 'Dense Block 1', kind: 'backbone' as LayerKind },
    { label: 'Transition', kind: 'pool' as LayerKind },
    { label: 'Dense Block 2', kind: 'backbone' as LayerKind },
    { label: 'Transition', kind: 'pool' as LayerKind },
    { label: 'Dense Block 3', kind: 'backbone' as LayerKind },
    { label: 'Transition', kind: 'pool' as LayerKind },
    { label: 'Dense Block 4', kind: 'backbone' as LayerKind },
  ],
  anchor: 'conv5_block16_concat',
  head: [
    { label: 'GlobalAveragePooling2D', kind: 'pool' as LayerKind },
    { label: 'BatchNormalization', kind: 'norm' as LayerKind },
    { label: 'Dense(512, ReLU)', kind: 'dense' as LayerKind },
    { label: 'Dropout(0.4)', kind: 'dropout' as LayerKind },
    { label: 'Dense(256, ReLU)', kind: 'dense' as LayerKind },
    { label: 'Dropout(0.2)', kind: 'dropout' as LayerKind },
    { label: 'Dense(1, Sigmoid)', kind: 'output' as LayerKind },
  ],
  outputs: ['NORMAL', 'PNEUMONIA'],
}

export const whyDenseNet: { title: string; body: string }[] = [
  {
    title: 'ImageNet pretrained weights',
    body: 'Starts from features learned on a large natural-image corpus instead of training from scratch.',
  },
  {
    title: 'Dense connectivity',
    body: 'Each layer receives the feature maps of all preceding layers within a dense block.',
  },
  {
    title: 'Stronger feature reuse',
    body: 'Dense connections encourage reuse of earlier features, keeping the network parameter-efficient.',
  },
  {
    title: 'Higher input resolution',
    body: '224×224 input versus 150×150 in the legacy model preserves more detail from each X-ray.',
  },
  {
    title: 'Grad-CAM compatibility',
    body: 'The final concatenation layer (conv5_block16_concat) gives a natural anchor for Grad-CAM.',
  },
  {
    title: 'Transfer learning',
    body: 'A pretrained backbone adapts well to small, specialised medical-image classification datasets.',
  },
]

export const trainingPhases = [
  {
    phase: 'Phase 1',
    title: 'Head Training',
    epochs: 15,
    lr: '1e-3',
    backbone: 'DenseNet121 backbone frozen',
    goal: 'Train the classification head',
  },
  {
    phase: 'Phase 2',
    title: 'Fine-Tuning',
    epochs: 20,
    lr: '1e-5',
    backbone: 'First 300 layers frozen',
    goal: 'Adapt deeper DenseNet features to the X-ray domain',
  },
]

export const trainingConfig: { label: string; values: string[] }[] = [
  { label: 'Optimizer', values: ['Adam'] },
  { label: 'Loss', values: ['Binary Cross-Entropy'] },
  { label: 'Metrics', values: ['Accuracy', 'AUC-ROC', 'Precision', 'Recall'] },
  { label: 'Callbacks', values: ['EarlyStopping', 'ReduceLROnPlateau', 'ModelCheckpoint'] },
  {
    label: 'Augmentation',
    values: ['Rotation ±15°', 'Shift ±10%', 'Zoom ±15%', 'Horizontal flip', 'Brightness 0.85–1.15'],
  },
  { label: 'Class weights', values: ['Balanced automatically to address dataset imbalance'] },
]

export const gradCamPipeline = [
  'Forward pass',
  'Capture activations',
  'GradientTape',
  'Calculate gradients',
  'Global average pooling',
  'Channel importance weights',
  'Weighted feature maps',
  'ReLU',
  'Normalize',
  'Resize',
  'Overlay on X-ray',
]

export const systemFlow = [
  'User',
  'Next.js Frontend',
  'FastAPI REST API',
  'Model Service',
  'DenseNet121',
  'Prediction',
  'Grad-CAM Service',
  'Heatmap',
]

export const stackGroups: { title: string; items: string[] }[] = [
  {
    title: 'Frontend',
    items: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Dropzone'],
  },
  {
    title: 'Backend & ML',
    items: ['FastAPI', 'TensorFlow / Keras', 'DenseNet121', 'OpenCV', 'Pillow', 'Uvicorn'],
  },
  {
    title: 'Data',
    items: ['Supabase PostgreSQL', 'Supabase Storage', 'Supabase Python SDK'],
  },
]

/** Deployment targets as documented in the project README. */
export const deployment: { name: string; role: string }[] = [
  { name: 'Vercel', role: 'Frontend hosting (Next.js)' },
  { name: 'Render', role: 'Backend hosting (FastAPI, Python 3.11 runtime)' },
  { name: 'Supabase', role: 'PostgreSQL database + file storage' },
]

export const featureCards: { title: string; icon: 'scan' | 'heat' | 'history' | 'ui'; items: string[] }[] = [
  {
    title: 'AI Prediction',
    icon: 'scan',
    items: ['NORMAL / PNEUMONIA label', 'Confidence score', 'Severity indicator'],
  },
  {
    title: 'Grad-CAM',
    icon: 'heat',
    items: ['Original X-ray', 'Heatmap', 'Overlay', 'Attention visualization'],
  },
  {
    title: 'Prediction History',
    icon: 'history',
    items: ['Image', 'Label', 'Confidence', 'Heatmap', 'Timestamp'],
  },
  {
    title: 'Interactive UI',
    icon: 'ui',
    items: [
      'Drag-and-drop upload',
      'Image preview',
      'Animated results',
      'Progress indicator',
      'Responsive design',
      'Analytics summary',
    ],
  },
]

export const dataset = {
  name: 'Chest X-Ray Images (Pneumonia)',
  source: 'Kaggle — Chest X-Ray Pneumonia',
  url: 'https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia',
  classes: ['NORMAL', 'PNEUMONIA'],
  format: 'JPEG grayscale X-rays',
  splits: [
    { label: 'Train', value: '~5,216' },
    { label: 'Validation', value: '~16' },
    { label: 'Test', value: '~624' },
  ],
}

export interface RepoNode {
  name: string
  note?: string
  children?: RepoNode[]
}

/** Simplified from the actual repository layout. */
export const repoStructure: RepoNode[] = [
  {
    name: 'legacy-version/',
    note: 'Version 1 prototype',
    children: [
      { name: 'app.py', note: 'Streamlit app' },
      { name: 'requirements.txt' },
      { name: 'notebook (.ipynb)', note: 'Training & exploration' },
      { name: 'README' },
    ],
  },
  {
    name: 'pneumoscan-ai/backend/',
    note: 'FastAPI service',
    children: [
      { name: 'app/main.py', note: 'App entry point' },
      { name: 'app/api/v1/endpoints/', note: 'predict · history · health' },
      { name: 'app/services/', note: 'ml_service · gradcam_service · storage_service' },
      { name: 'app/core/', note: 'config · database' },
      { name: 'app/schemas/ · app/models/', note: 'Request/response & DB models' },
      { name: 'ml_models/densenet121_pneumonia_model.h5', note: 'Trained model' },
      { name: 'requirements.txt · Dockerfile' },
    ],
  },
  {
    name: 'pneumoscan-ai/frontend/',
    note: 'Next.js app',
    children: [
      { name: 'src/app/page.tsx', note: 'Upload & predict' },
      { name: 'src/app/history/page.tsx', note: 'Prediction history' },
      { name: 'src/components/dashboard/', note: 'UploadZone · PredictionCard' },
      { name: 'src/hooks · src/lib · src/types', note: 'History hook, API client, types' },
    ],
  },
]

export const futureImprovements = [
  'Multi-class lung disease classification',
  'EfficientNetV2 experimentation',
  'PDF medical report generation',
  'Supabase authentication',
  'Real-time analytics dashboard',
  'Docker Compose for the full stack',
  'GitHub Actions CI/CD',
  'Model versioning',
  'A/B evaluation',
  'DICOM support',
  'Research paper / reference integration',
]
