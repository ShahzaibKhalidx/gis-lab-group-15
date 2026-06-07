export const methodologyData = {
  no2: {
    title: 'Nitrogen Dioxide (NO₂)',
    shortDesc: 'Combustion and traffic-related air pollutant analyzed in relation to urban expansion.',
    description: 'Nitrogen Dioxide (NO₂) is primarily associated with vehicle emissions, fossil fuel combustion, and industrial activities. Urban zones experience heightened exposure, making Built Area transitions critical indicators of NO₂ patterns over time.',
    associatedLandCover: 'Built Area',
    landCoverCode: 7,
    benchmark: 'WHO annual mean limit: 10 µg/m³',
    stats: [
      { category: 'Stable', percentage: 85.5, area: 669960 },
      { category: 'Gain', percentage: 11.2, area: 87700 },
      { category: 'Loss', percentage: 3.3, area: 25840 }
    ],
    topGains: [
      { class: 'Crops (Farmland conversion)', value: 48 },
      { class: 'Shrubland (Natural expansion)', value: 32 },
      { class: 'Grassland / Pasture', value: 20 }
    ],
    topLosses: [
      { class: 'Grassland (Regreening/Parks)', value: 45 },
      { class: 'Bare Area / Demolition', value: 35 },
      { class: 'Water Bodies / Wetlands', value: 20 }
    ],
    chloroplethData: [
      { zone: 'Stable', mean: 2.1, max: 15.4, min: -1.2 },
      { zone: 'Gain', mean: 8.4, max: 34.2, min: 1.5 },
      { zone: 'Loss', mean: -3.8, max: 4.1, min: -11.5 }
    ],
    exposureData: [
      { category: 'Good (0-10 µg/m³)', value: 35, color: '#10B981' },
      { category: 'Moderate (10-20 µg/m³)', value: 45, color: '#F59E0B' },
      { category: 'Unhealthy for Sensitive (20-30 µg/m³)', value: 12, color: '#EF4444' },
      { category: 'Unhealthy (30-40 µg/m³)', value: 6, color: '#9333EA' },
      { category: 'Hazardous (>40 µg/m³)', value: 2, color: '#7F1D1D' }
    ],
    colorTheme: {
      primary: 'bg-emerald-500',
      secondary: 'text-emerald-600',
      text: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200'
    }
  },
  pm10: {
    title: 'Particulate Matter 10 (PM₁₀)',
    shortDesc: 'Coarser particulate levels analyzed in relation to forested and tree-covered zones.',
    description: 'Particulate Matter 10 (PM₁₀) consists of inhalable particles like dust, pollen, and industrial emissions. Forest canopies (Tree Cover) help filter PM₁₀, acting as absolute buffers against pollution spread in Turkey.',
    associatedLandCover: 'Trees (Forest)',
    landCoverCode: 2,
    benchmark: 'WHO annual mean limit: 15 µg/m³',
    stats: [
      { category: 'Stable', percentage: 91.2, area: 714100 },
      { category: 'Gain', percentage: 4.1, area: 32100 },
      { category: 'Loss', percentage: 4.7, area: 36800 }
    ],
    topGains: [
      { class: 'Grassland (Natural afforestation)', value: 58 },
      { class: 'Shrubland (Forest growth)', value: 27 },
      { class: 'Crops (Abandoned Farmland)', value: 15 }
    ],
    topLosses: [
      { class: 'Bare / Burned Areas (Forest fires)', value: 52 },
      { class: 'Built Area (Deforestation/Expansion)', value: 28 },
      { class: 'Shrubland (Agricultural clearing)', value: 20 }
    ],
    chloroplethData: [
      { zone: 'Stable', mean: -1.5, max: 8.9, min: -9.2 },
      { zone: 'Gain', mean: -6.2, max: -0.8, min: -18.4 },
      { zone: 'Loss', mean: 4.1, max: 19.5, min: -2.3 }
    ],
    exposureData: [
      { category: 'Good (0-15 µg/m³)', value: 25, color: '#10B981' },
      { category: 'Moderate (15-30 µg/m³)', value: 52, color: '#F59E0B' },
      { category: 'Unhealthy for Sensitive (30-50 µg/m³)', value: 15, color: '#EF4444' },
      { category: 'Unhealthy (50-70 µg/m³)', value: 7, color: '#9333EA' },
      { category: 'Hazardous (>70 µg/m³)', value: 1, color: '#7F1D1D' }
    ],
    colorTheme: {
      primary: 'bg-indigo-505 bg-indigo-500',
      secondary: 'text-indigo-600',
      text: 'text-indigo-700',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200'
    }
  },
  pm25: {
    title: 'Particulate Matter 2.5 (PM₂.₅)',
    shortDesc: 'Fine particulate matter analyzed in relation to cropland transitions.',
    description: 'Particulate Matter 2.5 (PM₂.₅) represents fine aerosols with important health impacts. In this analysis, Crops (Code 5) are used as the target land-cover class to compare stable, gain, and loss cropland zones with PM₂.₅ concentration changes and population exposure.',
    associatedLandCover: 'Crops (Cropland)',
    landCoverCode: 5,
    benchmark: 'EU / course class threshold: Class 1 ≤ 5 µg/m³',
    stats: [
      { category: 'Stable', label: 'Stable Crops', pixels: 1949281999, percentage: 79.35, area: 194928.20 },
      { category: 'Gain', label: 'Gain to Crops', pixels: 351083907, percentage: 14.29, area: 35108.39 },
      { category: 'Loss', label: 'Loss from Crops', pixels: 156327078, percentage: 6.36, area: 15632.71 }
    ],
    topGains: [
      { class: 'Rangeland → Crops', pixels: 331621734, percentage: 94.46, area: 33162.17, value: 94.46 },
      { class: 'Built Area → Crops', pixels: 11409048, percentage: 3.25, area: 1140.90, value: 3.25 },
      { class: 'Trees → Crops', pixels: 5761802, percentage: 1.64, area: 576.18, value: 1.64 }
    ],
    topLosses: [
      { class: 'Crops → Rangeland', pixels: 120181022, percentage: 76.88, area: 12018.10, value: 76.88 },
      { class: 'Crops → Built Area', pixels: 21101202, percentage: 13.50, area: 2110.12, value: 13.50 },
      { class: 'Crops → Trees', pixels: 12955178, percentage: 8.29, area: 1295.52, value: 8.29 }
    ],
    chloroplethData: [
      { zone: 'Stable Crops', mean: -1.05, min: -15.98, max: 4.18 },
      { zone: 'Gain to Crops', mean: -1.85, min: -7.29, max: 3.72 },
      { zone: 'Loss from Crops', mean: -0.88, min: -15.98, max: 4.03 }
    ],
    exposureData: [
      { category: 'Class 1 (≤5 µg/m³)', population: 0, percentage: 0.00, value: 0.00, color: '#10B981' },
      { category: 'Class 2 (>5–10 µg/m³)', population: 2390748, percentage: 2.80, value: 2.80, color: '#3B82F6' },
      { category: 'Class 3 (>10–20 µg/m³)', population: 63658511, percentage: 74.51, value: 74.51, color: '#F59E0B' },
      { category: 'Class 4 (>20–25 µg/m³)', population: 15401816, percentage: 18.03, value: 18.03, color: '#EF4444' },
      { category: 'Class 5 (>25 µg/m³)', population: 3982586, percentage: 4.66, value: 4.66, color: '#8E44AD' }
    ],
    colorTheme: {
      primary: 'bg-amber-500',
      secondary: 'text-amber-600',
      text: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    }
  }
};
