import { motion } from 'motion/react';
import { Wind, Cloud, Zap, ShieldAlert, Database, MapPin, ArrowRight, Table, Users, Mail, GraduationCap } from 'lucide-react';
import turkeySatellite from '../assets/images/turkey_satellite_1780705843222.png';

export default function HomeView({ onNavigate }) {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 select-none">
      
      {/* ─── HERO BANNER SECTION ─── */}
      <div id="hero-banner" className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={turkeySatellite}
            alt="Turkey Satellite View"
            className="w-full h-full object-cover object-center scale-102 filter brightness-75 contrast-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-emerald-500/20 border border-emerald-500/35 text-emerald-400">
              GIS Lab 2026 — Group 15
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            id="main-title"
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight uppercase font-sans"
          >
            Mapping Air Quality <br />
            <span className="text-emerald-400 bg-clip-text">Change in Turkey</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-250 mt-6 text-base md:text-lg max-w-2xl leading-relaxed font-sans font-medium"
          >
            Cross-referencing multitemporal ESRI 10-meter Deep Learning Land Cover with key ambient concentrations (NO₂, PM₁₀, and PM₂.₅) to evaluate environmental exposure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <button
              id="cta-webgis-btn"
              onClick={() => onNavigate('webgis')}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer text-sm font-mono tracking-wider uppercase"
            >
              Explore WebGIS Map
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="cta-analysis-btn"
              onClick={() => onNavigate('analysis')}
              className="px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-800 font-bold rounded-lg shadow-lg transition-all cursor-pointer text-sm font-mono tracking-wider uppercase"
            >
              Methodology & Statistics
            </button>
          </motion.div>
        </div>

        {/* Floating Mouse Scroll Guide indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-550 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-2.5 bg-emerald-400 rounded-full animate-scroll"></div>
          </div>
        </div>
      </div>

      {/* ─── DEDICATED POLLUTANT CARDS SECTIONS ─── */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 font-mono text-xs uppercase font-extrabold tracking-widest">Atmospheric Targets</span>
          <h2 id="features-title" className="text-3xl font-extrabold tracking-tight text-slate-950 mt-2 font-sans">
            Assigned Spatial Correlations
          </h2>
          <p className="text-slate-500 mt-2 text-base font-medium">
            Each pollutant is mapped chronologically (2021–2023) against its corresponding annual land cover index.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card NO2 */}
          <div
            id="card-no2"
            className="group bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col h-full bg-linear-to-b from-white to-slate-50/50"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center justify-between mb-1.5">
              <span>Nitrogen Dioxide (NO₂)</span>
              <span className="text-[10px] uppercase font-mono font-extrabold bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 px-2.5 py-0.5 rounded-full">Code 7</span>
            </h3>
            <span className="text-[10px] text-slate-400 uppercase font-mono font-extrabold tracking-wider mb-4 block">Mapped target: Built Area</span>
            <p className="text-slate-500 text-sm leading-relaxed flex-grow">
              Assesses the direct, dense spatial correlation between highway networks, urban industrial expansion, and municipal NO₂ plumes across Turkey.
            </p>
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-baseline justify-between font-mono text-xs">
              <span className="text-slate-400 uppercase font-bold">Stable Area Rate</span>
              <span className="text-emerald-600 font-black text-base">85.5%</span>
            </div>
          </div>

          {/* Card PM10 */}
          <div
            id="card-pm10"
            className="group bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col h-full bg-linear-to-b from-white to-slate-50/50"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center justify-between mb-1.5">
              <span>Particulate Matter 10 (PM₁₀)</span>
              <span className="text-[10px] uppercase font-mono font-extrabold bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 px-2.5 py-0.5 rounded-full">Code 2</span>
            </h3>
            <span className="text-[10px] text-slate-400 uppercase font-mono font-extrabold tracking-wider mb-4 block">Mapped target: Trees (Forest)</span>
            <p className="text-slate-500 text-sm leading-relaxed flex-grow">
              Examines coarse ambient particulate matter relative to surrounding forest buffers and green belts, verifying physical scrub characteristics.
            </p>
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-baseline justify-between font-mono text-xs">
              <span className="text-slate-400 uppercase font-bold">Resilient Forest Area</span>
              <span className="text-indigo-600 font-black text-base">714,100 km²</span>
            </div>
          </div>

          {/* Card PM2.5 */}
          <div
            id="card-pm25"
            className="group bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col h-full bg-linear-to-b from-white to-slate-50/50"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
              <Cloud className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center justify-between mb-1.5">
              <span>Particulate Matter 2.5 (PM₂.₅)</span>
              <span className="text-[10px] uppercase font-mono font-extrabold bg-amber-500/10 border border-amber-500/20 text-amber-700 px-2.5 py-0.5 rounded-full">Code 5</span>
            </h3>
            <span className="text-[10px] text-slate-400 uppercase font-mono font-extrabold tracking-wider mb-4 block">Mapped target: Crops (Cropland)</span>
            <p className="text-slate-500 text-sm leading-relaxed flex-grow">
              Measures fine particulate exposure across Turkey’s cropland transition zones, using Crops (Code 5) as the assigned land-cover class and comparing LCC transitions with PM₂.₅ AMAC and population exposure results.
            </p>
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-baseline justify-between font-mono text-xs">
              <span className="text-slate-400 uppercase font-bold">Inhabitant Reach</span>
              <span className="text-amber-600 font-black text-base">65.2M+</span>
            </div>
          </div>

        </div>
      </div>

      {/* ─── TECHNICAL FINDINGS BENTO SECTIONS ─── */}
      <div id="key-findings-section" className="bg-slate-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <span className="text-xs font-mono font-black tracking-widest text-emerald-400 uppercase">
                Zonal Statistics Findings
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight leading-tight font-sans uppercase">
                Spatial Discoveries & <br /> Environmental Indicators
              </h2>
              <p className="text-slate-400 mt-6 leading-relaxed text-sm font-medium">
                Our analysis integrates daily Copernicus Atmosphere Service datasets within distinct spatial zones of land cover change. These grids highlight demographic challenges across major municipal centers.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-12">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-850">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">Resiliency rate</span>
                  <span className="text-3xl md:text-4xl font-black text-emerald-400 mt-1 block font-mono">94.5%</span>
                  <p className="text-slate-400 text-xs mt-2.5">
                    Turkey shows stable, well-maintained forest boundaries and physical barriers.
                  </p>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-850">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">Exposure rate</span>
                  <span className="text-3xl md:text-4xl font-black text-amber-400 mt-1 block font-mono">76.3%</span>
                  <p className="text-slate-400 text-xs mt-2.5">
                    Of local demographics are exposed to levels above strict WHO limits.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              
              <div className="bg-slate-900/50 p-6 border border-slate-850 rounded-2xl flex gap-5 items-start">
                <div className="p-3 bg-red-500/10 text-red-400 rounded-xl">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white uppercase font-sans">Critical Urban Spikes</h4>
                  <p className="text-slate-450 text-xs mt-1.5 leading-relaxed">
                    Over 72% of localized Nitrogen Dioxide (NO₂) maximum hotspots were mapped inside Built Area (Code 7) expansion zones, heavily concentrated within Marmara provinces.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/50 p-6 border border-slate-850 rounded-2xl flex gap-5 items-start">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white uppercase font-sans">Active Canopy Mitigation</h4>
                  <p className="text-slate-450 text-xs mt-1.5 leading-relaxed">
                    Provinces with measured Tree Cover Gain showed a 4.2 µg/m³ decrease in coarser particulate (PM₁₀) average curves relative to surrounding areas.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/50 p-6 border border-slate-850 rounded-2xl flex gap-5 items-start">
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  <Table className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white uppercase font-sans">Agricultural Cropland Dynamics</h4>
                  <p className="text-slate-450 text-xs mt-1.5 leading-relaxed">
                    For PM₂.₅, Crops (Code 5) were used as the target land-cover class. Stable Crops represent 79.35% of crops-related transition pixels, while Gain to Crops and Loss from Crops represent 14.29% and 6.36%, respectively.
                  </p>
                </div>
              </div>

            </div>
            
          </div>
        </div>
      </div>

      {/* ─── SCIENTIFIC SOURCES SECTIONS ─── */}
      <div id="data-sources-section" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-605 font-mono text-xs uppercase font-extrabold tracking-widest text-emerald-600">GeoServer Providers</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 mt-1 font-sans">
            Authoritative Dataset Matrices
          </h2>
          <p className="text-slate-500 mt-2 text-base font-medium">
            This analytical project leverages real atmospheric records and satellite telemetry datasets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col hover:border-emerald-300 hover:shadow-md transition-all">
            <div className="mb-4 text-emerald-600">
              <Database className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-sans uppercase">CAMS Archives</h4>
            <p className="text-slate-400 text-[10px] font-mono mt-1">Copernicus Atmosphere Service</p>
            <p className="text-slate-500 text-xs mt-3 leading-relaxed flex-grow">
              Provides daily concentrations of NO₂, PM₁₀, and PM₂.₅ over a 0.1° grid coverage for Turkey (2021–2023).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col hover:border-indigo-300 hover:shadow-md transition-all">
            <div className="mb-4 text-indigo-600">
              <Database className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-sans uppercase">ESRI 10m Landcover</h4>
            <p className="text-slate-400 text-[10px] font-mono mt-1">ESRI Sentinel-2 Deep Learning</p>
            <p className="text-slate-500 text-xs mt-3 leading-relaxed flex-grow">
              Resolves 10m annual classification boundaries tracking forest canopy, crops, and built-up environments with high fidelity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col hover:border-amber-300 hover:shadow-md transition-all">
            <div className="mb-4 text-amber-600">
              <Database className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-sans uppercase">WorldPop Demographic</h4>
            <p className="text-slate-400 text-[10px] font-mono mt-1">Socioeconomic Data Center</p>
            <p className="text-slate-500 text-xs mt-3 leading-relaxed flex-grow">
              Renders 100-meter gridded population structures across administrative divisions of Turkey to calculate demographic impacts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col hover:border-purple-300 hover:shadow-md transition-all">
            <div className="mb-4 text-purple-600">
              <Database className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-sans uppercase">Admin Boundaries</h4>
            <p className="text-slate-400 text-[10px] font-mono mt-1">FAO GAUL Administrative</p>
            <p className="text-slate-500 text-xs mt-3 leading-relaxed flex-grow">
              Provides standard boundaries for regional zonal statistical calculations and regional grouping.
            </p>
          </div>

        </div>
      </div>

      {/* ─── GROUP MEMBERS SECTION ─── */}
      <div id="group-members-section" className="bg-slate-100 border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-emerald-600 font-mono text-xs uppercase font-extrabold tracking-widest flex items-center justify-center gap-1.5">
              <GraduationCap className="w-4 h-4" /> Academic Group Core Members
            </span>
            <h2 id="team-title" className="text-3xl font-extrabold tracking-tight text-slate-950 mt-1 font-sans">
              GIS Project Group 15
            </h2>
            <p className="text-slate-500 mt-2 text-sm font-medium">
              Research project collaborators & developers analyzing temporal spatial atmospheric variations in Turkey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Member Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4 hover:border-emerald-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg select-none border border-blue-100 uppercase flex-shrink-0">
                NR
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-extrabold text-slate-900 whitespace-normal break-words" title="Nicolas Alejandro Rodriguez Martinez">Nicolas Alejandro Rodriguez Martinez</h4>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">Assigned: <span className="font-bold text-blue-600">NO₂ (Nitrogen Dioxide)</span></p>
                <a href="mailto:nicolasalejandro.rodriguez@mail.polimi.it" className="text-xs text-slate-500 flex items-center gap-1 mt-1.5 hover:text-emerald-600 font-sans transition-colors">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                  <span className="truncate">nicolasalejandro.rodriguez@mail.polimi.it</span>
                </a>
              </div>
            </div>

            {/* Member Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4 hover:border-emerald-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg select-none border border-amber-100 uppercase flex-shrink-0">
                QX
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-extrabold text-slate-900 whitespace-normal break-words">Qiling Xiong</h4>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">Assigned: <span className="font-bold text-amber-600">PM₂.₅ Particulates</span></p>
                <a href="mailto:qiling.xiong@mail.polimi.it" className="text-xs text-slate-500 flex items-center gap-1 mt-1.5 hover:text-emerald-600 font-sans transition-colors">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                  <span className="truncate">qiling.xiong@mail.polimi.it</span>
                </a>
              </div>
            </div>

            {/* Member Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4 hover:border-emerald-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg select-none border border-emerald-100 uppercase flex-shrink-0">
                MS
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-extrabold text-slate-900 whitespace-normal break-words">Muhammad Shahzaib</h4>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">Assigned: <span className="font-bold text-emerald-600">PM₁₀ Particulates</span></p>
                <a href="mailto:muhammad.shahzaib@mail.polimi.it" className="text-xs text-slate-500 flex items-center gap-1 mt-1.5 hover:text-emerald-600 font-sans transition-colors">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                  <span className="truncate">muhammad.shahzaib@mail.polimi.it</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
