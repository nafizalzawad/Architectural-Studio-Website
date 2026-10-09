import { Category, Project, Service } from '@/types/portfolio';

export const categories: Category[] = [
  {
    id: 1,
    name: 'All',
    slug: 'all',
    type: 'residential',
    description: 'Comprehensive catalogue of bespoke architectural commissions.',
  },
  {
    id: 2,
    name: 'Residential',
    slug: 'residential',
    type: 'residential',
    description: 'Prime private residences, townhouses, lateral apartments, and bespoke estates.',
  },
  {
    id: 3,
    name: 'Commercial',
    slug: 'commercial',
    type: 'commercial',
    description: 'Bespoke corporate spaces, boutique retail, and cultural flagships.',
  },
  {
    id: 4,
    name: 'Heritage',
    slug: 'heritage',
    type: 'heritage',
    description: 'Sensitive interventions and restorations within listed historical structures.',
  },
];

export const services: Service[] = [
  {
    id: 1,
    title: 'Architectural Design',
    slug: 'architectural-design',
    tagline: 'Sculptural forms, spatial order, and calibrated light.',
    short_description:
      'Purity of form, spatial clarity, and material permanence engineered for visionary structures.',
    full_description:
      'We conceptualise residential and commercial buildings with an obsessive attention to spatial order, daylight modulation, and tectonic elegance. Every elevation is tuned to harmonize with its urban context while asserting an unmistakable architectural presence.',
    scope_of_work: [
      'Spatial Planning & Volumetric Concept Studies',
      'Bespoke Prime Residential Architecture',
      'Envelope & High-Performance Facade Engineering',
      'Photorealistic 3D Spatial Visualization',
      'Full Technical Specifications & Construction Blueprints',
    ],
    process: [
      {
        step: '01',
        title: 'Concept & Orientation',
        description:
          'Forensic site analysis, volumetric spatial massing, daylight choreography, and contextual alignment.',
      },
      {
        step: '02',
        title: 'Spatial Feasibility',
        description:
          'Structural appraisal, preliminary contractor budget calibration, and initial regulatory engagement.',
      },
      {
        step: '03',
        title: 'Planning Preparation',
        description:
          'Drafting architectural elevations, 3D renderings, and comprehensive design and access statements.',
      },
      {
        step: '04',
        title: 'Technical Specification',
        description:
          'Detailed drawing packages, structural engineering coordination, and rare material sourcing.',
      },
      {
        step: '05',
        title: 'Handover & Completion',
        description:
          'Site observation, snagging scrutiny, and formal architectural commissioning of the finished residence.',
      },
    ],
    related_category_slug: 'residential',
    hero_image_url:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    display_order: 1,
  },
  {
    id: 2,
    title: 'Planning Applications',
    slug: 'planning-applications',
    tagline: 'Navigating complex municipal policies and conservation consents.',
    short_description:
      'Securing statutory planning consents and listed building permissions with a 95%+ success rate across prime London boroughs.',
    full_description:
      'We maintain an authoritative track record negotiating permissions across Westminster, Kensington & Chelsea, Wandsworth, and Camden. By balancing bold contemporary architecture with rigorous historical justification, we secure permissions where others falter.',
    scope_of_work: [
      'Listed Building Consents (Grade I, Grade II*, Grade II)',
      'Conservation Area Strategic Applications',
      'Basement Sub-Structure Permissions & Hydrology',
      'Permitted Development & Certificate of Lawfulness',
      'Planning Appeals & Expert Witness Representation',
    ],
    process: [
      {
        step: '01',
        title: 'Archival Research',
        description:
          'Historical archives, borough planning precedents, and conservation appraisal.',
      },
      {
        step: '02',
        title: 'Policy Formulation',
        description:
          'Developing a watertight planning argument rooted in local statutory policy.',
      },
      {
        step: '03',
        title: 'Submission Package',
        description:
          'Precision architectural elevations, heritage impact reports, and daylight assessments.',
      },
      {
        step: '04',
        title: 'Officer Liaison',
        description:
          'Constructive, proactive negotiations with borough conservation and planning officers.',
      },
      {
        step: '05',
        title: 'Consent & Discharge',
        description:
          'Securing formal decision notices and discharging all pre-commencement planning conditions.',
      },
    ],
    related_category_slug: 'heritage',
    hero_image_url:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=85',
    display_order: 2,
  },
  {
    id: 3,
    title: 'Interior Design',
    slug: 'interior-design',
    tagline: 'Tactile tranquility, monolithic stones, and bespoke joinery.',
    short_description:
      'Tactile curation of monolithic stone, bespoke smoked timber, and architectural illumination.',
    full_description:
      'Our interiors studio creates contemplative, serene living environments. By custom-commissioning joinery, sourcing rare natural stones, and sculpting both natural and recessed artificial light, we craft spaces that evoke understated luxury and timeless serenity.',
    scope_of_work: [
      'Custom Smoked Oak & Eucalyptus Joinery',
      'Rare European Marble & Basalt Sourcing',
      'Architectural Downlight & Recessed Linear Schemes',
      'Art Curation & Commissioned Private Furniture',
      'Tactile Cashmere, Wool & Linen Dressing',
    ],
    process: [
      {
        step: '01',
        title: 'Tactile Palette',
        description:
          'Material trays, tactile sampling of stone, metal patinas, and mood boards.',
      },
      {
        step: '02',
        title: 'Spatial Choreography',
        description:
          'Millwork sections, customized cabinetry details, and acoustic wall linings.',
      },
      {
        step: '03',
        title: 'Global Procurement',
        description:
          'Selecting marble slabs directly from Italian quarries and contracting artisan metalsmiths.',
      },
      {
        step: '04',
        title: 'Precision Fitting',
        description:
          'On-site installation by master cabinetmakers and specialist plasterers.',
      },
      {
        step: '05',
        title: 'Styling & Curation',
        description:
          'Bespoke dressing, artwork hangings, and calibrated architectural lighting scenes.',
      },
    ],
    related_category_slug: 'residential',
    hero_image_url:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85',
    display_order: 3,
  },
  {
    id: 4,
    title: 'Conservation & Heritage',
    slug: 'conservation-heritage',
    tagline: 'Sympathetic interventions within historic architectural fabric.',
    short_description:
      'Painstaking restoration and sympathetic modern modernization of Grade I and Grade II listed structures.',
    full_description:
      'Preserving historical integrity while seamlessly integrating 21st-century environmental efficiency, acoustic isolation, and discreet automation. We breathe renewed longevity into historic Georgian, Victorian, and Edwardian structures.',
    scope_of_work: [
      'Grade I & Grade II Listed Building Restoration',
      'Structural Masonry Underpinning & Stabilization',
      'Traditional Lime Plaster & Ornamental Cornice Casting',
      'Period Timber Sash Restoration & Acoustic Double-Glazing',
      'Discreet Smart Home Automation Integration',
    ],
    process: [
      {
        step: '01',
        title: 'Fabric Investigation',
        description:
          'Non-destructive forensic structural analysis and archival building history appraisal.',
      },
      {
        step: '02',
        title: 'Conservation Philosophy',
        description:
          'Adherence to Historic England guidelines and SPAB restoration principles.',
      },
      {
        step: '03',
        title: 'Artisan Deployment',
        description:
          'Engaging master stone-carvers, lime plasterers, and heritage leadworkers.',
      },
      {
        step: '04',
        title: 'Discreet Modernization',
        description:
          'Embedding HVAC, radiant heating, and fiber optics seamlessly inside period fabric.',
      },
      {
        step: '05',
        title: 'Historic Preservation',
        description:
          'Archival building log handover ensuring long-term conservation compliance.',
      },
    ],
    related_category_slug: 'heritage',
    hero_image_url:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=85',
    display_order: 4,
  },
  {
    id: 5,
    title: 'Create & Construct',
    slug: 'create-construct',
    tagline: 'Turn-key construction governed by architectural precision.',
    short_description:
      'Integrated turn-key construction management, master artisans, and uncompromising precision.',
    full_description:
      'By unifying architectural conception and master construction under a single studio umbrella, Minale + Mann ensures flawless delivery. Structural engineering, planning permissions, and artisanal site execution operate in absolute synchrony.',
    scope_of_work: [
      'Turn-Key Principal Contractor Governance',
      'Structural Steel Erection & Complex Excavation',
      'Artisanal On-Site Fabrication & Finishes',
      'Guaranteed Cost & Program Fixed Delivery',
      'Comprehensive 10-Year Structural Warranties',
    ],
    process: [
      {
        step: '01',
        title: 'Logistics & Groundwork',
        description:
          'Party wall coordination, site hoards, deep basement underpinning, and steel placement.',
      },
      {
        step: '02',
        title: 'Structural Envelope',
        description:
          'Frameless structural glass installation, monolithic masonry, and waterproofing.',
      },
      {
        step: '03',
        title: 'M&E Infrastructure',
        description:
          'Acoustic HVAC capsules, high-efficiency geothermal heating, and Lutron automation.',
      },
      {
        step: '04',
        title: 'Internal Mastercraft',
        description:
          'Flawless micro-cement applications, book-matched marble, and tailored joinery.',
      },
      {
        step: '05',
        title: 'White-Glove Handover',
        description:
          'Turn-key commissioning, operation manuals, and post-occupancy care.',
      },
    ],
    related_category_slug: 'commercial',
    hero_image_url:
      'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=2000&q=85',
    display_order: 5,
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'The Battersea Powerhouse',
    slug: 'the-battersea-powerhouse',
    category_id: 2,
    client_name: 'Private Client',
    description:
      'A radical transformation of a former Victorian industrial warehouse into a monolithic, light-flooded four-storey residence.',
    concept_narrative:
      'Conceived as a dialogue between industrial fortitude and minimalist domestic tranquility, The Battersea Powerhouse strips away century-old accretions to reveal a raw steel and brick framework. A central triple-height atrium acts as a light well, channelling London daylight down into subterranean entertaining spaces. Smoked oak millwork, hand-troweled micro-cement, and burnished bronze accents establish an atmosphere of monumental calm.',
    main_image_url:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    location: 'Battersea, London SW11',
    completion_year: 2026,
    is_featured: true,
    specs: {
      sector: 'Prime Residential',
      location: 'Battersea, London',
      completion: 'Autumn 2026',
      scope: 'Architecture, Interior Architecture, Full Construction',
    },
    category: categories[1],
    gallery: [
      {
        id: 101,
        project_id: 1,
        image_url:
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
        display_order: 1,
        caption: 'Cantilevered smoked timber kitchen island with integrated architectural downlights',
        aspect_ratio: 'landscape',
      },
      {
        id: 102,
        project_id: 1,
        image_url:
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85',
        display_order: 2,
        caption: 'Double-height volume framing the internal garden atrium',
        aspect_ratio: 'portrait',
      },
      {
        id: 103,
        project_id: 1,
        image_url:
          'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85',
        display_order: 3,
        caption: 'Monolithic en-suite bathroom lined with honed Pietra di Fossena limestone',
        aspect_ratio: 'portrait',
      },
      {
        id: 104,
        project_id: 1,
        image_url:
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85',
        display_order: 4,
        caption: 'Full-span glass sliding apertures opening towards the landscaped south courtyard',
        aspect_ratio: 'panoramic',
      },
      {
        id: 105,
        project_id: 1,
        image_url:
          'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
        display_order: 5,
        caption: 'Private library with custom patinated blackened steel joinery',
        aspect_ratio: 'square',
      },
    ],
  },
  {
    id: 2,
    title: 'Kensington Townhouse Conservation',
    slug: 'kensington-townhouse-conservation',
    category_id: 4,
    client_name: 'Lord & Lady Harrington',
    description:
      'Meticulous Grade II listed restoration uniting historical stucco grandeur with subterranean modernism.',
    concept_narrative:
      'Located within the Royal Borough of Kensington and Chelsea, this Grade II listed townhouse required forensic conservation alongside radical modern engineering. We excavated a two-level basement infrastructure to accommodate an indoor lap pool and climate-controlled art vault, while faithfully restoring ornate ceiling cornices, original Georgian sash windows, and solid lime plaster moldings upstairs.',
    main_image_url:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=85',
    location: 'Kensington, London W8',
    completion_year: 2025,
    is_featured: true,
    specs: {
      sector: 'Heritage Conservation',
      location: 'Kensington, London',
      completion: 'Winter 2025',
      scope: 'Planning Consents, Structural Excavation, Heritage Conservation',
    },
    category: categories[3],
    gallery: [
      {
        id: 201,
        project_id: 2,
        image_url:
          'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=85',
        display_order: 1,
        caption: 'Grand formal reception with restored ornamental plasterwork and modern bespoke lighting',
        aspect_ratio: 'landscape',
      },
      {
        id: 202,
        project_id: 2,
        image_url:
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85',
        display_order: 2,
        caption: 'Master dressing suite featuring smoked eucalyptus veneer wardrobes',
        aspect_ratio: 'portrait',
      },
      {
        id: 203,
        project_id: 2,
        image_url:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
        display_order: 3,
        caption: 'Subterranean wellness sanctuary with honed basalt and concealed perimeter lighting',
        aspect_ratio: 'portrait',
      },
      {
        id: 204,
        project_id: 2,
        image_url:
          'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=2200&q=85',
        display_order: 4,
        caption: 'Rear neoclassical facade facing private manicured garden',
        aspect_ratio: 'panoramic',
      },
    ],
  },
  {
    id: 3,
    title: 'The Mayfair Gallery & Headquarters',
    slug: 'the-mayfair-gallery-headquarters',
    category_id: 3,
    client_name: 'Vanguard Contemporary Arts',
    description:
      'Monolithic commercial gallery and executive headquarters crafted in Belgian bluestone and brushed stainless steel.',
    concept_narrative:
      'Commissioned by an international arts foundation, this Mayfair gallery rejects transient commercial tropes in favor of austere spatial permanence. Double-height exhibition volumes employ museum-grade tunable ceiling daylight membranes. The upper executive levels feature bespoke acoustic timber panels, fluted glass partitions, and sculptural bronze ironmongery.',
    main_image_url:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85',
    location: 'Mayfair, London W1',
    completion_year: 2026,
    is_featured: true,
    specs: {
      sector: 'Commercial & Arts',
      location: 'Mayfair, London',
      completion: 'Spring 2026',
      scope: 'Commercial Architecture, Interior Styling, Acoustic Engineering',
    },
    category: categories[2],
    gallery: [
      {
        id: 301,
        project_id: 3,
        image_url:
          'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85',
        display_order: 1,
        caption: 'Gallery circulation gallery with micro-cement floors and diffused architectural lighting',
        aspect_ratio: 'landscape',
      },
      {
        id: 302,
        project_id: 3,
        image_url:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85',
        display_order: 2,
        caption: 'Facade detail exhibiting fluted limestone and recessed bronze mullions',
        aspect_ratio: 'portrait',
      },
      {
        id: 303,
        project_id: 3,
        image_url:
          'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=85',
        display_order: 3,
        caption: 'Executive boardroom overlooking Berkeley Square',
        aspect_ratio: 'portrait',
      },
      {
        id: 304,
        project_id: 3,
        image_url:
          'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=2200&q=85',
        display_order: 4,
        caption: 'Main gallery exhibition hall set for preview evening',
        aspect_ratio: 'panoramic',
      },
    ],
  },
  {
    id: 4,
    title: 'Chelsea Glasshouse Pavilion',
    slug: 'chelsea-glasshouse-pavilion',
    category_id: 2,
    client_name: 'Private Collector',
    description:
      'A razor-sharp frameless glass and patinated copper pavilion extending into a private Chelsea sanctuary.',
    concept_narrative:
      'Bridging an austere Georgian brick terrace with a secluded walled courtyard, this extension dissolves structural boundaries through minimal 20mm sightline structural glass. A polished charcoal terrazzo floor continues uninterrupted from interior living spaces onto the outdoor terrace, visually expanding the living footprint while honoring the historical architecture.',
    main_image_url:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=85',
    location: 'Chelsea, London SW3',
    completion_year: 2025,
    is_featured: false,
    specs: {
      sector: 'Prime Residential',
      location: 'Chelsea, London',
      completion: 'Summer 2025',
      scope: 'Structural Glazing, Landscape Integration, Turn-key Build',
    },
    category: categories[1],
    gallery: [
      {
        id: 401,
        project_id: 4,
        image_url:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
        display_order: 1,
        caption: 'Dusk view of the glasshouse illuminated from within',
        aspect_ratio: 'landscape',
      },
      {
        id: 402,
        project_id: 4,
        image_url:
          'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85',
        display_order: 2,
        caption: 'Junction detail between historic brickwork and frameless glass roof',
        aspect_ratio: 'portrait',
      },
      {
        id: 403,
        project_id: 4,
        image_url:
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
        display_order: 3,
        caption: 'Interior dining zone overlooking reflect pond',
        aspect_ratio: 'portrait',
      },
      {
        id: 404,
        project_id: 4,
        image_url:
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85',
        display_order: 4,
        caption: 'Panoramic perspective showing the seamless indoor-outdoor transition',
        aspect_ratio: 'panoramic',
      },
    ],
  },
  {
    id: 5,
    title: 'Bayswater Penthouse & Sky Terrace',
    slug: 'bayswater-penthouse-sky-terrace',
    category_id: 2,
    client_name: 'International Family Office',
    description:
      'Lateral penthouse consolidation commanding 360-degree vistas across Hyde Park with sculpted travertine interiors.',
    concept_narrative:
      'Forged by combining two top-floor apartments overlooking Hyde Park, this 450 sqm residence embraces spatial fluidity. Axial sightlines frame park treetops through floor-to-ceiling blackened timber windows. Custom furniture pieces by renowned European makers were curated in dialogue with custom architectural plaster finishes.',
    main_image_url:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=85',
    location: 'Bayswater, London W2',
    completion_year: 2025,
    is_featured: false,
    specs: {
      sector: 'Prime Residential',
      location: 'Bayswater, London',
      completion: 'Spring 2025',
      scope: 'Apartment Consolidation, Bespoke Interior Design, Penthouse Terraces',
    },
    category: categories[1],
    gallery: [
      {
        id: 501,
        project_id: 5,
        image_url:
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
        display_order: 1,
        caption: 'Panoramic living pavilion with sweeping views towards Hyde Park',
        aspect_ratio: 'landscape',
      },
      {
        id: 502,
        project_id: 5,
        image_url:
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85',
        display_order: 2,
        caption: 'Primary bedroom wrapped in woven cashmere wall panels',
        aspect_ratio: 'portrait',
      },
      {
        id: 503,
        project_id: 5,
        image_url:
          'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=85',
        display_order: 3,
        caption: 'Sculpted roman travertine washbasin and concealed water outlets',
        aspect_ratio: 'portrait',
      },
      {
        id: 504,
        project_id: 5,
        image_url:
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=85',
        display_order: 4,
        caption: 'Private perimeter rooftop terrace with outdoor fireplace',
        aspect_ratio: 'panoramic',
      },
    ],
  },
  {
    id: 6,
    title: 'Soho Creative Atelier',
    slug: 'soho-creative-atelier',
    category_id: 3,
    client_name: 'Aura Media Group',
    description:
      'Adaptive reuse of a historic timber-framed printworks into an avant-garde creative studio and audio laboratory.',
    concept_narrative:
      'In the historic core of Soho, this four-level former printworks was re-engineered for a contemporary multidisciplinary media collective. Raw Douglas fir structural columns and cast-iron beams were sandblasted and stabilized, contrasting against brushed aluminum partitions and concealed state-of-the-art acoustic isolation capsules.',
    main_image_url:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=85',
    location: 'Soho, London W1D',
    completion_year: 2024,
    is_featured: false,
    specs: {
      sector: 'Commercial Architecture',
      location: 'Soho, London',
      completion: 'Winter 2024',
      scope: 'Adaptive Reuse, Acoustic Design, Turnkey Fit-Out',
    },
    category: categories[2],
    gallery: [
      {
        id: 601,
        project_id: 6,
        image_url:
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=85',
        display_order: 1,
        caption: 'Open collaborative studio with preserved timber trusses and industrial steel sash windows',
        aspect_ratio: 'landscape',
      },
      {
        id: 602,
        project_id: 6,
        image_url:
          'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=85',
        display_order: 2,
        caption: 'Private sound editing suite lined with charcoal wool acoustic battens',
        aspect_ratio: 'portrait',
      },
      {
        id: 603,
        project_id: 6,
        image_url:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85',
        display_order: 3,
        caption: 'Architectural staircase uniting the four levels with steel cable balustrades',
        aspect_ratio: 'portrait',
      },
      {
        id: 604,
        project_id: 6,
        image_url:
          'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=2200&q=85',
        display_order: 4,
        caption: 'Street-facing reception showcasing raw brick and minimal lighting',
        aspect_ratio: 'panoramic',
      },
    ],
  },
  {
    id: 7,
    title: 'Belgravia Mews House Reconfiguration',
    slug: 'belgravia-mews-house-reconfiguration',
    category_id: 4,
    client_name: 'Private Client',
    description:
      'Radical internal reconfiguration of a cobbled Belgravia mews into an art collector’s sanctuary with subterranean courtyards.',
    concept_narrative:
      'Hidden behind a picturesque cobbled facade in Belgravia, this historic carriage house was hollowed out to create a luminous, vertically interconnected home. A bespoke sculptural blackened steel staircase spirals around a subterranean glass courtyard that draws natural sunlight into a submerged gym, sauna, and wine cellar.',
    main_image_url:
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=2000&q=85',
    location: 'Belgravia, London SW1X',
    completion_year: 2026,
    is_featured: false,
    specs: {
      sector: 'Heritage & Residential',
      location: 'Belgravia, London',
      completion: 'Summer 2026',
      scope: 'Architecture, Listed Building Consents, Subterranean Engineering',
    },
    category: categories[3],
    gallery: [
      {
        id: 701,
        project_id: 7,
        image_url:
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
        display_order: 1,
        caption: 'Double-height reception zone with sculptural spiral staircase in blackened steel',
        aspect_ratio: 'landscape',
      },
      {
        id: 702,
        project_id: 7,
        image_url:
          'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85',
        display_order: 2,
        caption: 'Subterranean courtyard garden visible from the wine cellar and living lounge',
        aspect_ratio: 'portrait',
      },
      {
        id: 703,
        project_id: 7,
        image_url:
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
        display_order: 3,
        caption: 'Tailored kitchen in brushed patinated brass and Arabescato marble',
        aspect_ratio: 'portrait',
      },
      {
        id: 704,
        project_id: 7,
        image_url:
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85',
        display_order: 4,
        caption: 'Evening atmosphere along the private cobbled Belgravia mews',
        aspect_ratio: 'panoramic',
      },
    ],
  },
];

/**
 * Accessor Helpers
 */
export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(currentSlug: string): Project {
  const currentIndex = projects.findIndex((project) => project.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === projects.length - 1) {
    return projects[0];
  }
  return projects[currentIndex + 1];
}

export function getCategories(): Category[] {
  return categories;
}

export function getServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
