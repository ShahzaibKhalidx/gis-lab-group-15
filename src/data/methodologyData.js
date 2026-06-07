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
    shortDesc: 'Fine dust levels analyzed in relation to intensive crops and farmland zones.',
    description: 'Particulate Matter 2.5 (PM₂.₅) represents fine aerosols with extreme cardiovascular health impacts. Intensive agricultural croplands (Crops) correlate with seasonal PM₂.₅ spikes due to fertilizer emissions and harvest harvesting dust.',
    associatedLandCover: 'Crops (Cropland)',
    landCoverCode: 5,
    benchmark: 'WHO annual mean limit: 5 µg/m³',
    stats: [
      { category: 'Stable', percentage: 93.8, area: 734500 },
      { category: 'Gain', percentage: 3.8, area: 29750 },
      { category: 'Loss', percentage: 2.4, area: 18790 }
    ],
    topGains: [
      { class: 'Grassland (Pasture reclamation)', value: 52 },
      { class: 'Shrubland (Fallow cultivation)', value: 30 },
      { class: 'Bare Area (Irrigation projects)', value: 18 }
    ],
    topLosses: [
      { class: 'Built Area (Suburban sprawl)', value: 62 },
      { class: 'Shrubland (Land abandonment)', value: 23 },
      { class: 'Forest/Trees (Agricultural retraction)', value: 15 }
    ],
    chloroplethData: [
      { zone: 'Stable', mean: -0.8, max: 5.2, min: -6.1 },
      { zone: 'Gain', mean: 1.2, max: 8.4, min: -2.1 },
      { zone: 'Loss', mean: -1.9, max: 2.4, min: -5.8 }
    ],
    exposureData: [
      { category: 'Good (0-5 µg/m³)', value: 18, color: '#10B981' },
      { category: 'Moderate (5-10 µg/m³)', value: 58, color: '#F59E0B' },
      { category: 'Unhealthy for Sensitive (10-15 µg/m³)', value: 18, color: '#EF4444' },
      { category: 'Unhealthy (15-25 µg/m³)', value: 5, color: '#9333EA' },
      { category: 'Hazardous (>25 µg/m³)', value: 1, color: '#7F1D1D' }
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
