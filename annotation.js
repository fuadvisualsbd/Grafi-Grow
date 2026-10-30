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
      imageSrc: '/proofs/proof_autonomous_driving.png'
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
      imageSrc: '/proofs/proof_medical_segmentation.png'
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
      imageSrc: '/proofs/proof_industrial_qa.png'
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
      imageSrc: '/proofs/proof_drone_tracking.png'
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
  // 5. REAL WORKFLOW VIDEO + VOICE NARRATION + PROOF GALLERY
  // =========================================================================

// Native GrafiGrow Commercial Video Player Active

  // --- Voice Narration Player ---
  const voiceAudio = document.getElementById('explainerAudio');
  const voicePlayBtn = document.getElementById('voicePlayBtn');
  const voicePlayIcon = document.getElementById('voicePlayIcon');
  const voiceProgressBar = document.getElementById('voiceProgressBar');
  const voiceProgressWrap = document.getElementById('voiceProgressWrap');
  const voiceTime = document.getElementById('voiceTime');

  function fmtTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  if (voicePlayBtn && voiceAudio) {
    voicePlayBtn.addEventListener('click', () => {
      if (voiceAudio.paused) {
        voiceAudio.play().then(() => {
          voicePlayIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
        });
      } else {
        voiceAudio.pause();
        voicePlayIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
      }
    });

    voiceAudio.addEventListener('timeupdate', () => {
      const cur = voiceAudio.currentTime;
      const dur = voiceAudio.duration || 47;
      if (voiceProgressBar) {
        voiceProgressBar.style.width = `${(cur / dur) * 100}%`;
      }
      if (voiceTime) {
        voiceTime.textContent = `${fmtTime(cur)} / ${fmtTime(dur)}`;
      }
    });

    voiceAudio.addEventListener('ended', () => {
      voicePlayIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
    });

    if (voiceProgressWrap) {
      voiceProgressWrap.addEventListener('click', (e) => {
        if (!voiceAudio.duration) return;
        const rect = voiceProgressWrap.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        voiceAudio.currentTime = pct * voiceAudio.duration;
      });
    }
  }

  // --- Proof Screenshot Gallery + Lightbox ---
  const proofCards = document.querySelectorAll('.proof-card');
  const proofLightbox = document.getElementById('proofLightbox');
  const proofLightboxImg = document.getElementById('proofLightboxImg');
  const proofLightboxClose = document.getElementById('proofLightboxClose');

  function closeProofLightbox() {
    if (!proofLightbox) return;
    proofLightbox.classList.remove('active');
    if (proofLightboxImg) proofLightboxImg.src = '';
    document.body.style.overflow = '';
  }

  proofCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (img && proofLightbox && proofLightboxImg) {
        proofLightboxImg.src = img.src;
        proofLightboxImg.alt = img.alt;
        proofLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (proofLightboxClose) {
    proofLightboxClose.addEventListener('click', closeProofLightbox);
  }

  if (proofLightbox) {
    proofLightbox.addEventListener('click', (e) => {
      if (e.target === proofLightbox) {
        closeProofLightbox();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && proofLightbox.classList.contains('active')) {
        closeProofLightbox();
      }
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
