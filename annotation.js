/* ===== GrafiGrow — Annotation & Segmentation Portal Interactive Script ===== */
document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. DAILY PROOFS & DELIVERABLES DATABASE
  // Add new daily screenshots or video screen recordings here!
  // =========================================================================
  const DAILY_PROOFS = [
    {
      id: 'proof-v1',
      type: 'video',
      category: 'medical',
      title: 'Dental Radiography Sub-Pixel Polygon Masking',
      description: 'Meticulous polygon boundary delineation of dental anomalies (cavities, root canals, bone loss) from X-ray DICOM sequences for clinical AI diagnostic models.',
      date: 'Latest Production Batch',
      tool: 'CVAT • Polygons & Bounding Boxes',
      accuracy: '99.6% IoU',
      instances: '14,200 structures',
      videoId: 'wr3GlzDz-9c',
      thumbnail: 'https://img.youtube.com/vi/wr3GlzDz-9c/hqdefault.jpg'
    },
    {
      id: 'proof-v2',
      type: 'video',
      category: 'autonomous',
      title: 'Micro-Electrode Precision Robotic Mapping',
      description: 'High-density semantic segmentation for robotic pick-and-place assembly. Accurately maps irregular micro-electrodes distorted by glare and solder artifacts.',
      date: 'Daily Production Batch',
      tool: 'Labelme • Anaconda • Semantic',
      accuracy: '99.8% Pick Accuracy',
      instances: '15,000+ frames',
      videoId: '2zqnXJDFbuw',
      thumbnail: 'https://img.youtube.com/vi/2zqnXJDFbuw/hqdefault.jpg'
    },
    {
      id: 'proof-img1',
      type: 'image',
      category: 'video',
      title: 'EgoScale Multi-Clip Video Annotation Workspace',
      description: 'Live production pipeline displaying multi-clip video task assignment, automated pre-label ingestion, and state injection runtime with sub-second task queuing.',
      date: 'Production Batch #104',
      tool: 'EgoScale • CVAT Cloud Core',
      accuracy: '99.8% QA Pass',
      instances: '4,850 video segments',
      imageSrc: '/proofs/Screenshot_1.png'
    },
    {
      id: 'proof-v3',
      type: 'video',
      category: 'video',
      title: 'Human-in-the-Loop Active Learning QA Loop',
      description: 'Automated flagging of low-confidence model boundaries followed by senior human-in-the-loop micro-refinement, cutting false positives by 45%.',
      date: 'Production Sprint QA',
      tool: 'Custom Automated Scripts • Active Learning',
      accuracy: '45% Lower FP Rate',
      instances: 'Continuous Ingestion',
      videoId: 'xudGp0fGm5w',
      thumbnail: 'https://img.youtube.com/vi/xudGp0fGm5w/hqdefault.jpg'
    },
    {
      id: 'proof-img2',
      type: 'image',
      category: 'image',
      title: 'Dense Object Interaction & Spatial Segmentation',
      description: 'Fine-grained annotation isolating human hand actions, tool grasp trajectories, and exact object spatial coordinates without multi-class label bleed.',
      date: 'Production Batch #103',
      tool: 'CVAT • Multi-Class Polygon',
      accuracy: '99.5% Consistency',
      instances: '3,200 masks',
      imageSrc: '/proofs/Screenshot_2.png'
    },
    {
      id: 'proof-v4',
      type: 'video',
      category: 'image',
      title: 'Microscopic PORE & Structural Defect Detection',
      description: 'Dense point-and-polygon micro-masking on 4K industrial wafer scans. Captures micro-fissures and material weaknesses invisible to the naked human eye.',
      date: 'Daily QA Batch',
      tool: 'CVAT • 4K Surface Imaging',
      accuracy: '99.7% Sub-pixel IoU',
      instances: '82,000 pore instances',
      videoId: '3wA4p3tTGCg',
      thumbnail: 'https://img.youtube.com/vi/3wA4p3tTGCg/hqdefault.jpg'
    },
    {
      id: 'proof-img3',
      type: 'image',
      category: 'autonomous',
      title: 'Spatial Bounding & Keypoint Annotation Workspace',
      description: 'Multi-layer bounding boxes with coordinate validation, depth tags, and spatial reference frames prepared for computer vision model training.',
      date: 'Production Batch #102',
      tool: 'Custom Client Suite • CVAT',
      accuracy: '99.9% Boundary Fit',
      instances: '12,400 objects',
      imageSrc: '/proofs/Screenshot_3.png'
    },
    {
      id: 'proof-v5',
      type: 'video',
      category: 'video',
      title: 'Agricultural Plant Phenotyping & Temporal VOS',
      description: 'Multi-frame video object segmentation tracking plant leaf area index, blights, and fruiting bodies across temporal drone sequences with permanent ID persistence.',
      date: 'Drone AI Batch',
      tool: 'CVAT • Temporal Object Tracking',
      accuracy: '94% Yield Prediction',
      instances: 'Temporal Sequences',
      videoId: '754iZGwEEmg',
      thumbnail: 'https://img.youtube.com/vi/754iZGwEEmg/hqdefault.jpg'
    },
    {
      id: 'proof-img4',
      type: 'image',
      category: 'video',
      title: 'Turbo Continuous Auto-Next Pipeline Execution',
      description: 'High-speed automated pipeline execution showing rapid continuous verification, error handling, and key rotation across heavy video annotation workloads.',
      date: 'Production Batch #101',
      tool: 'EgoScale Turbo Runtime',
      accuracy: '99.7% Benchmark',
      instances: 'Automated Stream',
      imageSrc: '/proofs/Screenshot_4.png'
    },
    {
      id: 'proof-img5',
      type: 'image',
      category: 'image',
      title: 'High-Density Multi-Class Semantic Segmentation Dataset',
      description: 'Complete multi-class segmentation dataset packaging with COCO/YOLO annotations, pixel-level color masks, and verified ground-truth audit trails.',
      date: 'Archive Benchmark',
      tool: 'Labelme • Python QA Linting',
      accuracy: '99.8% Target IoU',
      instances: '50,000+ annotations',
      imageSrc: '/proofs/data_annotation_project.png'
    }
  ];

  // =========================================================================
  // 2. RENDER PROOFS & FILTERING
  // =========================================================================
  const proofsGrid = document.getElementById('proofsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderProofs(filter = 'all') {
    if (!proofsGrid) return;
    proofsGrid.innerHTML = '';

    const filtered = DAILY_PROOFS.filter(item => {
      if (filter === 'all') return true;
      if (filter === 'video') return item.type === 'video';
      if (filter === 'image') return item.type === 'image';
      return item.category === filter;
    });

    filtered.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = `proof-card reveal reveal-scale reveal-delay-${(index % 4) + 1}`;
      card.setAttribute('data-id', item.id);

      const isVideo = item.type === 'video';
      const mediaSrc = isVideo ? item.thumbnail : item.imageSrc;
      const typeLabel = isVideo ? 'Screen Record' : 'Workspace Screenshot';
      const typeClass = isVideo ? 'video' : '';

      card.innerHTML = `
        <div class="proof-media-wrapper" data-action="${isVideo ? 'play-video' : 'zoom-image'}" data-item-id="${item.id}">
          <img src="${mediaSrc}" alt="${item.title}" loading="lazy">
          <div class="proof-badge-date">
            <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            ${item.date}
          </div>
          <div class="proof-badge-type ${typeClass}">${typeLabel}</div>
          <div class="${isVideo ? 'media-play-overlay' : 'media-zoom-overlay'}">
            ${isVideo 
              ? `<div class="play-circle"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>`
              : `<div class="play-circle" style="background:rgba(255,255,255,0.2);"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></div>`
            }
          </div>
        </div>
        <div class="proof-content">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
          <div class="proof-meta-row">
            <span class="proof-tool">${item.tool}</span>
            <span class="proof-accuracy">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              ${item.accuracy}
            </span>
          </div>
        </div>
      `;
      proofsGrid.appendChild(card);
    });

    // Re-bind card raycast coordinates
    bindCardRaycast();
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProofs(filter);
    });
  });

  renderProofs('all');

  // =========================================================================
  // 3. VIDEO & LIGHTBOX MODAL HANDLERS
  // =========================================================================
  const videoModal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('videoIframe');
  const videoTitle = document.getElementById('videoModalTitle');
  const videoClose = document.getElementById('videoModalClose');

  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxTool = document.getElementById('lightboxTool');
  const lightboxAccuracy = document.getElementById('lightboxAccuracy');
  const lightboxInstances = document.getElementById('lightboxInstances');
  const lightboxBatch = document.getElementById('lightboxBatch');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxWhatsappBtn = document.getElementById('lightboxWhatsappBtn');

  if (proofsGrid) {
    proofsGrid.addEventListener('click', e => {
      const mediaWrapper = e.target.closest('.proof-media-wrapper');
      if (!mediaWrapper) return;

      const itemId = mediaWrapper.getAttribute('data-item-id');
      const item = DAILY_PROOFS.find(p => p.id === itemId);
      if (!item) return;

      if (item.type === 'video') {
        videoTitle.textContent = item.title;
        videoIframe.src = `https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1`;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        lightboxTitle.textContent = item.title;
        lightboxImg.src = item.imageSrc;
        lightboxTool.textContent = item.tool;
        lightboxAccuracy.textContent = item.accuracy;
        lightboxInstances.textContent = item.instances;
        lightboxBatch.textContent = item.date;
        
        const waMsg = encodeURIComponent(`Hi GrafiGrow, I am inquiring about the dataset from your proof: "${item.title}" (${item.tool}). I need similar annotation.`);
        lightboxWhatsappBtn.href = `https://wa.me/8801952767958?text=${waMsg}`;

        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove('active');
    if (videoIframe) videoIframe.src = '';
    document.body.style.overflow = '';
  }

  function closeLightboxModal() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    if (lightboxImg) lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  if (videoClose) videoClose.addEventListener('click', closeVideoModal);
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightboxModal);
  if (videoModal) videoModal.addEventListener('click', e => { if (e.target === videoModal) closeVideoModal(); });
  if (lightboxModal) lightboxModal.addEventListener('click', e => { if (e.target === lightboxModal) closeLightboxModal(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeVideoModal();
      closeLightboxModal();
    }
  });

  // =========================================================================
  // 4. INTERACTIVE BEFORE & AFTER SEGMENTATION SLIDER
  // =========================================================================
  const comparisonBox = document.getElementById('comparisonBox');
  const sliderHandle = document.getElementById('sliderHandle');
  const rawLayer = document.getElementById('rawLayer');
  const rawInner = document.getElementById('rawInner');

  if (comparisonBox && sliderHandle && rawLayer && rawInner) {
    let isDragging = false;

    function updateSlider(xPos) {
      const rect = comparisonBox.getBoundingClientRect();
      let offsetX = xPos - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      sliderHandle.style.left = `${percentage}%`;
      rawLayer.style.width = `${percentage}%`;
      rawInner.style.width = `${rect.width}px`;
    }

    window.addEventListener('resize', () => {
      rawInner.style.width = `${comparisonBox.offsetWidth}px`;
    });
    rawInner.style.width = `${comparisonBox.offsetWidth}px`;

    sliderHandle.addEventListener('mousedown', () => { isDragging = true; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });

    sliderHandle.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', e => {
      if (!isDragging) return;
      updateSlider(e.touches[0].clientX);
    });

    comparisonBox.addEventListener('click', e => {
      updateSlider(e.clientX);
    });
  }

  // =========================================================================
  // 5. MOTION GRAPHICS EXPLAINER VIDEO PLAYER (STUDIO TTS + INTERACTIVE SIMULATION)
  // =========================================================================
  const audio = document.getElementById('explainerAudio');
  const playerContainer = document.querySelector('.motion-player-container');
  const stagePlayTrigger = document.getElementById('stagePlayTrigger');
  const ctrlPlayBtn = document.getElementById('ctrlPlayBtn');
  const ctrlPlaySvg = document.getElementById('ctrlPlaySvg');
  const playIconSvg = document.getElementById('playIconSvg');
  const ctrlRestartBtn = document.getElementById('ctrlRestartBtn');
  const ctrlMuteBtn = document.getElementById('ctrlMuteBtn');
  const timeDisplay = document.getElementById('timeDisplay');
  const timelineBar = document.getElementById('timelineBar');
  const timelineProgress = document.getElementById('timelineProgress');
  const captionText = document.getElementById('captionText');
  const stageSoundwave = document.getElementById('stageSoundwave');
  const chapPills = document.querySelectorAll('.chap-pill');

  // Simulation Studio Elements
  const simStudioCanvas = document.getElementById('simStudioCanvas');
  const simModeBadge = document.getElementById('simModeBadge');
  const simModeText = document.getElementById('simModeText');
  const simVirtualCursor = document.getElementById('simVirtualCursor');
  const simCursorPill = document.getElementById('simCursorPill');
  const simCursorClickRing = document.getElementById('simCursorClickRing');
  const simCar1 = document.getElementById('simCar1');
  const simCar1Tooltip = document.getElementById('simCar1Tooltip');
  const simCar2 = document.getElementById('simCar2');
  const simPedestrian = document.getElementById('simPedestrian');
  const simTrajectory = document.getElementById('simTrajectory');
  const simLedgerOverlay = document.getElementById('simLedgerOverlay');
  const simLedgerRow1 = document.getElementById('simLedgerRow1');
  const simLedgerRow2 = document.getElementById('simLedgerRow2');
  const simLedgerRow3 = document.getElementById('simLedgerRow3');
  const simWhatsappOverlay = document.getElementById('simWhatsappOverlay');
  const simWhatsappBtn = document.getElementById('simWhatsappBtn');
  const simFrameCounter = document.getElementById('simFrameCounter');
  const simTrackProgress = document.getElementById('simTrackProgress');
  const simPlayhead = document.getElementById('simPlayhead');
  const simTimecode = document.getElementById('simTimecode');

  const videoSubtitles = [
    { start: 0.00, end: 7.20, scene: 0, text: "Hey there! Welcome to GrafiGrow. Let me show you how our high-precision annotation engine works in real time." },
    { start: 7.20, end: 20.10, scene: 1, text: "Look right here at our workspace. As our pointer hovers over this vehicle, watch the edge detection light up! One click, and boom: pixel-perfect polygon segmentation mask with sub-pixel IoU precision." },
    { start: 20.10, end: 29.80, scene: 2, text: "Now watch video temporal tracking across consecutive frames. Notice how the mask locks onto dynamic motion with zero drift and zero jitter." },
    { start: 29.80, end: 39.30, scene: 3, text: "Every single day, we log our verified production metrics, screen recordings, and QA audits right here on this portal for complete transparency." },
    { start: 39.30, end: 47.16, scene: 4, text: "Ready to accelerate your model training? Click the WhatsApp button right here, and let us launch your free custom pilot today!" }
  ];

  // Keyframes for Virtual Animated Cursor (x%, y%)
  const cursorKeyframes = [
    { t: 0.0, x: 82, y: 78, pill: "Studio Autopilot" },
    { t: 2.2, x: 22, y: 12, pill: "Select Smart Wand" },
    { t: 4.8, x: 74, y: 12, pill: "IoU 99.92% Calibrated" },
    { t: 7.2, x: 38, y: 44, pill: "Targeting Vehicle #04" },
    { t: 9.2, x: 45, y: 48, pill: "Edge Detection Active", hoverCar1: true },
    { t: 12.5, x: 45, y: 48, pill: "Polygon Mask Snapped!", click: true, maskCar1: true },
    { t: 15.5, x: 52, y: 42, pill: "Contour Verification" },
    { t: 18.0, x: 42, y: 54, pill: "Sub-pixel Verified" },
    { t: 20.1, x: 25, y: 90, pill: "VOS Scrubber Handle" },
    { t: 22.2, x: 25, y: 90, pill: "Tracking Frames...", click: true },
    { t: 27.5, x: 75, y: 90, pill: "Zero-Drift Motion Vectors" },
    { t: 29.8, x: 50, y: 38, pill: "Auditing Batch #1042", ledger: true, row1: true },
    { t: 34.5, x: 50, y: 64, pill: "Daily Screen Recording", ledger: true, row3: true },
    { t: 39.3, x: 50, y: 70, pill: "Connecting WhatsApp...", whatsapp: true },
    { t: 42.8, x: 50, y: 74, pill: "Direct WhatsApp Line", whatsapp: true, hoverBtn: true },
    { t: 44.2, x: 50, y: 74, pill: "Free Pilot Claimed!", click: true, whatsapp: true, hoverBtn: true },
    { t: 47.16, x: 50, y: 74, pill: "Ready for Pilot", whatsapp: true }
  ];

  let lastClickedTime = -1;
  let isUserInteracting = false;
  let userInteractTimeout = null;

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function triggerCursorClickEffect() {
    if (!simVirtualCursor) return;
    simVirtualCursor.classList.remove('clicked');
    void simVirtualCursor.offsetWidth; // trigger reflow
    simVirtualCursor.classList.add('clicked');
    setTimeout(() => {
      if (simVirtualCursor) simVirtualCursor.classList.remove('clicked');
    }, 600);
  }

  // Smooth Interpolation of Virtual Cursor Coordinates
  function updateVirtualCursor(cur) {
    if (!simVirtualCursor || isUserInteracting) return;

    let k1 = cursorKeyframes[0];
    let k2 = cursorKeyframes[cursorKeyframes.length - 1];

    for (let i = 0; i < cursorKeyframes.length - 1; i++) {
      if (cur >= cursorKeyframes[i].t && cur <= cursorKeyframes[i + 1].t) {
        k1 = cursorKeyframes[i];
        k2 = cursorKeyframes[i + 1];
        break;
      }
    }

    const duration = k2.t - k1.t || 0.001;
    const factor = Math.min(1, Math.max(0, (cur - k1.t) / duration));
    // Smooth easeInOut
    const ease = factor < 0.5 ? 2 * factor * factor : -1 + (4 - 2 * factor) * factor;

    const currentX = k1.x + (k2.x - k1.x) * ease;
    const currentY = k1.y + (k2.y - k1.y) * ease;

    simVirtualCursor.style.transform = `translate3d(${currentX}%, ${currentY}%, 0)`;

    if (simCursorPill && k2.pill) {
      simCursorPill.textContent = k2.pill;
    }

    // Check for click triggers
    if (k2.click && Math.abs(cur - k2.t) < 0.25 && lastClickedTime !== k2.t) {
      lastClickedTime = k2.t;
      triggerCursorClickEffect();
    }
  }

  // Update Studio Workspace States According to Audio Timeline
  function updateSimulationStudio(cur) {
    if (!simStudioCanvas) return;

    updateVirtualCursor(cur);

    // Timecode Display
    if (simTimecode) {
      const minutes = Math.floor(cur / 60);
      const seconds = (cur % 60).toFixed(2);
      simTimecode.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(5, '0')}`;
    }

    // Scene 1: 0 - 7.20s (Brand & Intro)
    if (cur < 7.20) {
      if (simCar1) {
        simCar1.classList.remove('hovered', 'segmented', 'tracked-forward');
      }
      if (simTrajectory) simTrajectory.classList.remove('active');
      if (simLedgerOverlay) simLedgerOverlay.classList.remove('active');
      if (simWhatsappOverlay) simWhatsappOverlay.classList.remove('active');
      if (simTrackProgress) simTrackProgress.style.width = '15%';
      if (simPlayhead) simPlayhead.style.left = '15%';
      if (simFrameCounter) simFrameCounter.textContent = 'FRAME: 01 / 48';
    }

    // Scene 2: 7.20s - 20.10s (Interactive Vehicle Hover & Polygon Snap)
    else if (cur >= 7.20 && cur < 20.10) {
      if (simLedgerOverlay) simLedgerOverlay.classList.remove('active');
      if (simWhatsappOverlay) simWhatsappOverlay.classList.remove('active');
      if (simTrajectory) simTrajectory.classList.remove('active');
      if (simCar1) {
        simCar1.classList.remove('tracked-forward');
        // Hover Car 1
        if (cur >= 9.0) {
          simCar1.classList.add('hovered');
        } else {
          simCar1.classList.remove('hovered');
        }
        // Segment Mask Car 1
        if (cur >= 12.5) {
          simCar1.classList.add('segmented');
          if (simCar1Tooltip) {
            simCar1Tooltip.innerHTML = '<span>✓ Sedan #04 • Segmented (99.92% IoU)</span>';
          }
        } else {
          simCar1.classList.remove('segmented');
          if (simCar1Tooltip) {
            simCar1Tooltip.innerHTML = '<span>🎯 Sedan #04 • Class: Vehicle [SAM-2 Active]</span>';
          }
        }
      }
    }

    // Scene 3: 20.10s - 29.80s (Temporal VOS Video Tracking)
    else if (cur >= 20.10 && cur < 29.80) {
      if (simLedgerOverlay) simLedgerOverlay.classList.remove('active');
      if (simWhatsappOverlay) simWhatsappOverlay.classList.remove('active');
      if (simCar1) {
        simCar1.classList.add('hovered', 'segmented');
      }
      if (simTrajectory) simTrajectory.classList.add('active');

      // Drag scrubber from 22.0s to 28.0s
      const scrubFactor = Math.min(1, Math.max(0, (cur - 22.0) / 6.0));
      const targetPercent = 25 + scrubFactor * 55;
      if (simTrackProgress) simTrackProgress.style.width = `${targetPercent}%`;
      if (simPlayhead) simPlayhead.style.left = `${targetPercent}%`;

      const frameNumber = Math.min(48, Math.max(1, Math.floor(1 + scrubFactor * 47)));
      if (simFrameCounter) simFrameCounter.textContent = `FRAME: ${String(frameNumber).padStart(2, '0')} / 48`;

      // Smoothly advance car along trajectory
      if (simCar1) {
        if (scrubFactor > 0.15) {
          simCar1.classList.add('tracked-forward');
        } else {
          simCar1.classList.remove('tracked-forward');
        }
      }
    }

    // Scene 4: 29.80s - 39.30s (Daily Production Audit Ledger)
    else if (cur >= 29.80 && cur < 39.30) {
      if (simTrajectory) simTrajectory.classList.remove('active');
      if (simWhatsappOverlay) simWhatsappOverlay.classList.remove('active');
      if (simLedgerOverlay) simLedgerOverlay.classList.add('active');

      if (cur < 34.0) {
        if (simLedgerRow1) simLedgerRow1.classList.add('hovered');
        if (simLedgerRow3) simLedgerRow3.classList.remove('hovered');
      } else {
        if (simLedgerRow1) simLedgerRow1.classList.remove('hovered');
        if (simLedgerRow3) simLedgerRow3.classList.add('hovered');
      }
    }

    // Scene 5: 39.30s - 47.16s (Direct WhatsApp Conversion Pilot)
    else if (cur >= 39.30) {
      if (simLedgerOverlay) simLedgerOverlay.classList.remove('active');
      if (simWhatsappOverlay) simWhatsappOverlay.classList.add('active');

      if (cur >= 42.5) {
        if (simWhatsappBtn) simWhatsappBtn.classList.add('hovered');
      } else {
        if (simWhatsappBtn) simWhatsappBtn.classList.remove('hovered');
      }
    }
  }

  // User Interactive Mode Handler
  function handleUserControl() {
    isUserInteracting = true;
    if (simModeText) {
      simModeText.textContent = "🕹️ INTERACTIVE MODE • YOU ARE IN CONTROL";
    }
    if (simVirtualCursor) {
      simVirtualCursor.style.opacity = "0.3";
    }

    clearTimeout(userInteractTimeout);
    userInteractTimeout = setTimeout(() => {
      isUserInteracting = false;
      if (simModeText) {
        simModeText.textContent = "AUTOPILOT DEMO • CLICK ANY OBJECT TO INTERACT";
      }
      if (simVirtualCursor) {
        simVirtualCursor.style.opacity = "1";
      }
    }, 4000);
  }

  if (simStudioCanvas) {
    simStudioCanvas.addEventListener('mousemove', handleUserControl);
    simStudioCanvas.addEventListener('touchstart', handleUserControl, { passive: true });
  }

  // Interactive toggle on Car 1 click
  if (simCar1) {
    simCar1.addEventListener('click', (e) => {
      e.stopPropagation();
      simCar1.classList.toggle('segmented');
      handleUserControl();
    });
  }

  function updatePlayIcons(isPlaying) {
    if (!playerContainer) return;
    if (isPlaying) {
      playerContainer.classList.add('playing');
      if (stageSoundwave) stageSoundwave.classList.add('active');
      const pauseIcon = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
      if (ctrlPlaySvg) ctrlPlaySvg.innerHTML = pauseIcon;
      if (playIconSvg) playIconSvg.innerHTML = pauseIcon;
    } else {
      playerContainer.classList.remove('playing');
      if (stageSoundwave) stageSoundwave.classList.remove('active');
      const playIcon = '<polygon points="5 3 19 12 5 21 5 3"/>';
      if (ctrlPlaySvg) ctrlPlaySvg.innerHTML = playIcon;
      if (playIconSvg) playIconSvg.innerHTML = playIcon;
    }
  }

  function togglePlayAudio() {
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => {
        updatePlayIcons(true);
      }).catch(err => {
        console.warn('Playback blocked or pending interaction:', err);
      });
    } else {
      audio.pause();
      updatePlayIcons(false);
    }
  }

  if (stagePlayTrigger) stagePlayTrigger.addEventListener('click', togglePlayAudio);
  if (ctrlPlayBtn) ctrlPlayBtn.addEventListener('click', togglePlayAudio);

  if (ctrlRestartBtn) {
    ctrlRestartBtn.addEventListener('click', () => {
      if (!audio) return;
      audio.currentTime = 0;
      audio.play().then(() => updatePlayIcons(true));
    });
  }

  if (ctrlMuteBtn) {
    ctrlMuteBtn.addEventListener('click', () => {
      if (!audio) return;
      audio.muted = !audio.muted;
      ctrlMuteBtn.style.opacity = audio.muted ? '0.45' : '1';
    });
  }

  if (timelineBar) {
    timelineBar.addEventListener('click', (e) => {
      if (!audio || !audio.duration) return;
      const rect = timelineBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = Math.max(0, Math.min(1, clickX / rect.width));
      audio.currentTime = percent * audio.duration;
    });
  }

  chapPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      if (!audio) return;
      const startSec = parseFloat(pill.getAttribute('data-start') || '0');
      audio.currentTime = startSec;
      if (audio.paused) audio.play().then(() => updatePlayIcons(true));
    });
  });

  if (audio) {
    audio.addEventListener('loadedmetadata', () => {
      if (timeDisplay) timeDisplay.textContent = `00:00 / ${formatTime(audio.duration || 47)}`;
    });

    audio.addEventListener('timeupdate', () => {
      const cur = audio.currentTime;
      const dur = audio.duration || 47.16;

      if (timeDisplay) {
        timeDisplay.textContent = `${formatTime(cur)} / ${formatTime(dur)}`;
      }

      if (timelineProgress && dur > 0) {
        timelineProgress.style.width = `${(cur / dur) * 100}%`;
      }

      // Synchronize simulated CV workspace & pointer
      updateSimulationStudio(cur);

      // Synchronize dynamic subtitle cues
      const activeCue = videoSubtitles.find(cue => cur >= cue.start && cur < cue.end);
      if (activeCue) {
        if (captionText && captionText.textContent !== activeCue.text) {
          captionText.textContent = activeCue.text;
        }

        chapPills.forEach((pill, idx) => {
          pill.classList.toggle('active', idx === activeCue.scene);
        });
      }
    });

    audio.addEventListener('ended', () => {
      updatePlayIcons(false);
      if (captionText) captionText.textContent = "Finished! Click restart or jump to any chapter.";
    });
  }

  // 6. KINETIC TYPOGRAPHY: ROTATING HEADLINE
  // =========================================================================
  const kineticWords = [
    'Segmentation',
    'Semantic Masks',
    'SAM 2 Video Tracking',
    'Instance Polygons',
    '3D LiDAR Cuboids',
    'Microscopic Defect QA'
  ];
  let wordIndex = 0;
  const kineticWordEl = document.getElementById('kineticWord');

  if (kineticWordEl) {
    setInterval(() => {
      kineticWordEl.classList.add('flip-out');
      setTimeout(() => {
        wordIndex = (wordIndex + 1) % kineticWords.length;
        kineticWordEl.textContent = kineticWords[wordIndex];
        kineticWordEl.classList.remove('flip-out');
        kineticWordEl.classList.add('flip-in');
        setTimeout(() => {
          kineticWordEl.classList.remove('flip-in');
        }, 50);
      }, 420);
    }, 2800);
  }

  // =========================================================================
  // 7. MOTION GRAPHICS: POINTER SPOTLIGHT & CARD SPECULAR BORDER LIGHTING
  // =========================================================================
  const spotlight = document.getElementById('cursorSpotlight');
  window.addEventListener('mousemove', e => {
    if (spotlight) {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    }
  });

  function bindCardRaycast() {
    const interactiveCards = document.querySelectorAll('.cap-card, .metric-card, .proof-card, .checklist-card, .qa-step');
    interactiveCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;
        card.style.setProperty('--card-x', `${cardX}px`);
        card.style.setProperty('--card-y', `${cardY}px`);
      });
    });
  }
  bindCardRaycast();

  // Kinetic Click Ripple Shockwave
  window.addEventListener('click', e => {
    if (e.target.closest('input, textarea, .modal-close')) return;
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });

  // =========================================================================
  // 8. FAQ ACCORDION
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherAns = other.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
    const firstAns = faqItems[0].querySelector('.faq-answer');
    if (firstAns) firstAns.style.maxHeight = firstAns.scrollHeight + 'px';
  }

  // =========================================================================
  // 9. SCROLL REVEAL OBSERVER
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));

  // =========================================================================
  // 10. RE-ENGINEERED MOBILE HAMBURGER
  // =========================================================================
  const hamburger = document.getElementById('hamburger');
  const navCenterMenu = document.getElementById('navCenterMenu');
  if (hamburger && navCenterMenu) {
    hamburger.addEventListener('click', () => {
      navCenterMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    // Close when clicking any link
    navCenterMenu.querySelectorAll('.nav-link-item').forEach(link => {
      link.addEventListener('click', () => {
        navCenterMenu.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

});
