import { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend as ChartLegend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { HelpCircle, Table, ArrowUpRight, ArrowDownRight, Award, Library, Info, Layers, Users, TrendingUp } from 'lucide-react';
import { methodologyData } from '../data/methodologyData';

export default function AnalysisView() {
  const [bivariateHover, setBivariateHover] = useState(null);

  // 5x5 Bivariate color palette (mixing density [Y-axis] and pollution change [X-axis])
  // Density: 1 (Low) to 5 (High)
  // Pollution: 1 (Low) to 5 (High)
  const getBivariateColor = (x, y) => {
    const matrix = [
      ['#e8e8e8', '#dfd0d6', '#d6b8c4', '#cc9fb2', '#c387a0'], // y=1: Low Density
      ['#cbdad5', '#c3c3cc', '#bbc0be', '#b29bb0', '#aa84a2'], // y=2
      ['#aed2c3', '#a6bbc2', '#9ea4c1', '#95889d', '#8d6d9c'], // y=3
      ['#91caae', '#89b3ab', '#829ca8', '#7b848a', '#724f8d'], // y=4
      ['#74c299', '#6cbca9', '#64969f', '#5c6c94', '#534789']  // y=5: High Density
    ];
    return matrix[y - 1]?.[x - 1] || '#e8e8e8';
  };

  const getBivariateDescription = (x, y) => {
    const popLabel = ['Extremely Sparse', 'Low Density', 'Moderate Suburban', 'High Urban', 'Dense Metropolitan'][y - 1];
    const pollLabel = ['Decreasing/Stable', 'Negligible Increase', 'Moderate Increase', 'Significant Increase', 'Severe Spikes'][x - 1];
    
    let priority = 'Low Priority Alert';
    let textTheme = 'text-green-650 bg-green-50 text-green-700 bg-green-100/60';
    if (x >= 4 && y >= 4) {
      priority = 'CRITICAL ENVIRONMENTAL JUSTICE HOTSPOT';
      textTheme = 'text-red-700 bg-red-100 animate-pulse';
    } else if (x >= 3 && y >= 3) {
      priority = 'Elevated Risk / Mitigation Zone';
      textTheme = 'text-amber-700 bg-amber-100/70';
    } else if (y >= 4) {
      priority = 'High Population / Maintained Quality';
      textTheme = 'text-sky-705 text-sky-700 bg-sky-100/65';
    } else if (x >= 4) {
      priority = 'High Pollution / Sparse Impact';
      textTheme = 'text-orange-705 text-orange-700 bg-orange-100/65';
    }

    return {
      popLabel,
      pollLabel,
      priority,
      textTheme
    };
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 select-none">
      
      {/* Sticky Local Nav - Sub Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-emerald-600" />
            <div>
              <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest block">GIS Lab Course Project</span>
              <span className="font-bold text-slate-800 text-sm md:text-base">GIS Lab 2026 | Group 15</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5"><Library className="w-4 h-4 text-slate-400" /> Project Advisor: Prof. Qiongjie Xu</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-mono text-xs">Turkey Spatial Analysis</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        
        {/* Title Block */}
        <div className="mb-14">
          <span className="text-emerald-600 font-mono text-xs uppercase font-extrabold tracking-widest">Methods & Algorithms</span>
          <h1 id="analysis-page-title" className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-950 mt-1 font-sans">
            ESRI 10m Land Cover – Pollution Correlation
          </h1>
          <p id="analysis-page-subtitle" className="text-slate-500 mt-2 text-base md:text-lg max-w-4xl leading-relaxed">
            Methodological overview pairing annual Satellite-derived Land Cover (LCC) indices with Copernicus Atmospheric (CAMS) monitoring to examine structural environmental variations.
          </p>
        </div>

        {/* Mappings Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h3 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider">Nitrogen Dioxide</h3>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 font-sans">NO₂ ⇄ Built Area</p>
            <p className="text-slate-500 text-xs mt-2 font-medium">Correlation target checking city sprawl (Code 7) footprint against transport corridors.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <h3 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider">Particulate Matter 10</h3>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 font-sans">PM₁₀ ⇄ Tree Cover</p>
            <p className="text-slate-500 text-xs mt-2 font-medium">Correlation target checking forest boundaries (Code 2) and natural screening buffers.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <h3 className="font-bold text-slate-900 font-mono text-xs uppercase tracking-wider">Particulate Matter 2.5</h3>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 font-sans">PM₂.₅ ⇄ Croplands</p>
            <p className="text-slate-500 text-xs mt-2 font-medium">Correlation target comparing Crops (Code 5) land-cover transitions with PM₂.₅ AMAC change and population exposure.</p>
          </div>
        </div>

        <hr className="border-slate-200 mb-16" />

        {/* ─── DEDICATED POLLUTANT SECTIONS ─── */}
        {Object.keys(methodologyData).map((key, index) => {
          const item = methodologyData[key];

          if (key === 'pm10') {
            return (
              <div key={key} id={`section-${key}`} className="scroll-mt-36 mb-24">
                
                {/* PM10 Pollutant Heading */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className={`w-3.5 h-3.5 rounded-full ${item.colorTheme.primary}`}></span>
                      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 font-sans">{item.title}</h2>
                    </div>
                    <p className="text-slate-500 text-sm mt-1 max-w-2xl font-medium">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white px-4 py-2.5 border border-slate-200/80 rounded-xl text-xs font-mono select-none shadow-xs">
                    <span className="text-slate-550">Correlated Index:</span>
                    <span className={`font-black ${item.colorTheme.text}`}>{item.associatedLandCover} (Code {item.landCoverCode})</span>
                  </div>
                </div>

                {/* ─── CUSTOM 4 LAB TABLES GRID ─── */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 my-8">
                  
                  {/* Table 1 — Land Cover Change Statistics for Trees (Lab 3, Step 5) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider font-mono flex items-center gap-2">
                          <Table className="w-4 h-4 text-emerald-600" />
                          Table 1 — Land Cover Change Statistics for Trees (Lab 3, Step 5)
                        </h4>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-mono font-bold px-2.5 py-0.5 rounded border border-emerald-100">Lab 3</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-slate-700 text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-slate-200 text-slate-450 text-[10px] font-mono text-left uppercase">
                              <th className="py-2.5 px-3 font-bold">Category</th>
                              <th className="py-2.5 px-3 font-bold text-right">Pixels</th>
                              <th className="py-2.5 px-3 font-bold text-right">Area (km²)</th>
                              <th className="py-2.5 px-3 font-bold text-right">Stability Rate</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                              <td className="py-3 px-3 font-bold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                                Stable (Trees ➜ Trees)
                              </td>
                              <td className="py-3 px-3 text-right font-mono text-slate-600">1,429,345,144</td>
                              <td className="py-3 px-3 text-right font-mono text-slate-800 font-bold">133,011.6</td>
                              <td className="py-3 px-3 text-right font-mono text-emerald-600 font-black">94.53%</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-emerald-50/10 hover:bg-emerald-50/20 text-emerald-950">
                              <td className="py-3 px-3 font-bold flex items-center gap-1">
                                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                                Gain (other ➜ Trees)
                              </td>
                              <td className="py-3 px-3 text-right font-mono text-slate-600">130,744,543</td>
                              <td className="py-3 px-3 text-right font-mono text-emerald-800 font-bold">12,166.8</td>
                              <td className="py-3 px-3 text-right font-mono text-slate-400">—</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-rose-50/10 hover:bg-rose-50/20 text-rose-950">
                              <td className="py-3 px-3 font-bold flex items-center gap-1">
                                <ArrowDownRight className="w-3.5 h-3.5 text-rose-600" />
                                Loss (Trees ➜ other)
                              </td>
                              <td className="py-3 px-3 text-right font-mono text-slate-600">82,654,011</td>
                              <td className="py-3 px-3 text-right font-mono text-rose-850 font-bold">7,691.6</td>
                              <td className="py-3 px-3 text-right font-mono text-slate-400">—</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400 font-mono">
                      <span>*Source: ESRI 10m Land Cover Database (2021 & 2023)</span>
                      <span>Total Pixel Count: 1,642,743,698</span>
                    </div>
                  </div>

                  {/* Table 2 — Top Gain/Loss Transitions (Lab 3, Step 5) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider font-mono flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-indigo-600" />
                          Table 2 — Top Gain/Loss Transitions (Lab 3, Step 5)
                        </h4>
                        <span className="text-[10px] bg-indigo-50 text-indigo-700 font-mono font-bold px-2.5 py-0.5 rounded border border-indigo-100">Lab 3</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-slate-700 text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-slate-200 text-slate-450 text-[10px] font-mono text-left uppercase">
                              <th className="py-2.5 px-3 font-bold">Direction</th>
                              <th className="py-2.5 px-3 font-bold">Transition</th>
                              <th className="py-2.5 px-3 font-bold text-right">% of Total</th>
                              <th className="py-2.5 px-3 font-bold text-right">Area (km²)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* GAINS */}
                            <tr className="border-b border-slate-100 bg-emerald-50/5 hover:bg-emerald-50/15">
                              <td className="py-2 px-3"><span className="text-[9px] font-mono font-extrabold uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">Gain</span></td>
                              <td className="py-2 px-3 font-bold text-slate-700">Rangeland ➜ Trees</td>
                              <td className="py-2 px-3 text-right font-mono text-emerald-700 font-black">87.99%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800 font-bold">10,705.5</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-emerald-50/5 hover:bg-emerald-55/15">
                              <td className="py-2 px-3"><span className="text-[9px] font-mono font-extrabold uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">Gain</span></td>
                              <td className="py-2 px-3 text-slate-600">Crops ➜ Trees</td>
                              <td className="py-2 px-3 text-right font-mono text-emerald-700">9.33%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800 font-medium">1,134.9</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-emerald-50/5 hover:bg-emerald-55/15">
                              <td className="py-2 px-3"><span className="text-[9px] font-mono font-extrabold uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">Gain</span></td>
                              <td className="py-2 px-3 text-slate-600">Built ➜ Trees</td>
                              <td className="py-2 px-3 text-right font-mono text-emerald-700">2.21%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800">268.4</td>
                            </tr>
                            {/* LOSSES */}
                            <tr className="border-b border-slate-100 bg-rose-50/5 hover:bg-rose-50/15">
                              <td className="py-2 px-3"><span className="text-[9px] font-mono font-extrabold uppercase bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-200">Loss</span></td>
                              <td className="py-2 px-3 font-bold text-slate-700">Trees ➜ Rangeland</td>
                              <td className="py-2 px-3 text-right font-mono text-rose-700 font-black">88.00%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800 font-bold">6,769.0</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-rose-50/5 hover:bg-rose-55/15">
                              <td className="py-2 px-3"><span className="text-[9px] font-mono font-extrabold uppercase bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-200">Loss</span></td>
                              <td className="py-2 px-3 text-slate-600">Trees ➜ Crops</td>
                              <td className="py-2 px-3 text-right font-mono text-rose-700">6.37%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800 font-medium">489.8</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-rose-50/5 hover:bg-rose-55/15">
                              <td className="py-2 px-3"><span className="text-[9px] font-mono font-extrabold uppercase bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-200">Loss</span></td>
                              <td className="py-2 px-3 text-slate-600">Trees ➜ Built</td>
                              <td className="py-2 px-3 text-right font-mono text-rose-700">4.98%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800">383.4</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400 font-mono">
                      <span>*Primary afforestation and deforestation drivers categorized</span>
                      <span className="font-bold text-slate-500">MAPPING TRANSITIONS</span>
                    </div>
                  </div>

                  {/* Table 3 — PM10 Zonal Statistics by Land Cover Zone (Lab 3, Step 6) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between col-span-1 xl:col-span-2">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider font-mono flex items-center gap-2">
                          <Table className="w-4 h-4 text-indigo-600" />
                          Table 3 — PM₁₀ Zonal Statistics by Land Cover Zone (Lab 3, Step 6)
                        </h4>
                        <span className="text-[10px] bg-indigo-50 text-indigo-700 font-mono font-bold px-2.5 py-0.5 rounded border border-indigo-100">Lab 3</span>
                      </div>
                      <p className="text-slate-400 text-[10px] uppercase font-mono tracking-wider mb-4">
                        Note: Values represent AMAC change from 2021 to 2023 (AMAC = 2023 minus 2021 change)
                      </p>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-slate-700 text-xs border-collapse">
                            <thead>
                              <tr className="border-b border-slate-200 text-slate-450 text-[10px] font-mono text-left uppercase">
                                <th className="py-2.5 px-3 font-bold">Zone</th>
                                <th className="py-2.5 px-3 font-bold">LCC Zone Description</th>
                                <th className="py-2.5 px-3 font-bold text-right">Mean (µg/m³)</th>
                                <th className="py-2.5 px-3 font-bold text-right">Min (µg/m³)</th>
                                <th className="py-2.5 px-3 font-bold text-right">Max (µg/m³)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3 px-3 font-mono font-black text-slate-800">Zone 1</td>
                                <td className="py-3 px-3 font-bold text-slate-700">Stable Trees</td>
                                <td className="py-3 px-3 text-right font-mono text-emerald-700 font-black">-3.311</td>
                                <td className="py-3 px-3 text-right font-mono text-blue-600 font-bold">-20.472</td>
                                <td className="py-3 px-3 text-right font-mono text-red-655 text-red-600 font-bold">+8.240</td>
                              </tr>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3 px-3 font-mono font-black text-slate-800">Zone 2</td>
                                <td className="py-3 px-3 font-bold text-slate-700">Trees Gain areas</td>
                                <td className="py-3 px-3 text-right font-mono text-emerald-700 font-black">-4.173</td>
                                <td className="py-3 px-3 text-right font-mono text-blue-600 font-bold">-11.986</td>
                                <td className="py-3 px-3 text-right font-mono text-red-655 text-red-600 font-bold">+6.054</td>
                              </tr>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3 px-3 font-mono font-black text-slate-800">Zone 3</td>
                                <td className="py-3 px-3 font-bold text-slate-700">Trees Loss areas</td>
                                <td className="py-3 px-3 text-right font-mono text-emerald-700 font-black">-3.081</td>
                                <td className="py-3 px-3 text-right font-mono text-blue-600 font-bold">-10.568</td>
                                <td className="py-3 px-3 text-right font-mono text-red-655 text-red-600 font-bold">+6.054</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Beautiful synchronized bar chart for zonal stats */}
                        <div className="bg-slate-50/40 p-4 border border-slate-150 rounded-xl h-56">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={[
                                { zone: 'Stable Trees', mean: -3.311, min: -20.472, max: 8.240 },
                                { zone: 'Gain Areas', mean: -4.173, min: -11.986, max: 6.054 },
                                { zone: 'Loss Areas', mean: -3.081, min: -10.568, max: 6.054 }
                              ]}
                              margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                              <XAxis dataKey="zone" tickLine={false} tick={{ fill: '#64748B', fontSize: 9, fontWeight: 'bold', fontFamily: 'monospace' }} />
                              <YAxis tickLine={false} tick={{ fill: '#64748B', fontSize: 9, fontWeight: 'bold', fontFamily: 'monospace' }} />
                              <ChartTooltip
                                contentStyle={{ background: '#0F172A', color: 'white', borderRadius: '8px', border: 'none', fontSize: '11px' }}
                              />
                              <ChartLegend iconType="circle" wrapperStyle={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                              <Bar dataKey="mean" name="Mean Change" fill="#10B981" radius={[4, 4, 0, 0]} barSize={12} />
                              <Bar dataKey="max" name="Max Spike" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={12} />
                              <Bar dataKey="min" name="Min Improvement" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={12} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400 font-mono">
                      <span>*LCC = Land Cover Change, AMAC is Average Annual Concentration difference</span>
                      <span className="font-bold text-slate-500">ZONAL STATISTICS</span>
                    </div>
                  </div>

                  {/* Table 4 — Population Exposure by PM10 Class (Lab 4, Step 8) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between col-span-1 xl:col-span-2">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider font-mono flex items-center gap-2">
                          <Users className="w-4 h-4 text-emerald-600" />
                          Table 4 — Population Exposure by PM₁₀ Class (Lab 4, Step 8)
                        </h4>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-mono font-bold px-2.5 py-0.5 rounded border border-emerald-100">Lab 4</span>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="overflow-x-auto lg:col-span-7">
                          <table className="min-w-full text-slate-700 text-xs border-collapse">
                            <thead>
                              <tr className="border-b border-slate-200 text-slate-450 text-[10px] font-mono text-left uppercase">
                                <th className="py-2.5 px-3 font-bold">PM₁₀ Class</th>
                                <th className="py-2.5 px-3 font-bold text-right">Population</th>
                                <th className="py-2.5 px-3 font-bold text-right">% of Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-slate-100 bg-[#E8F8F5]/10 hover:bg-emerald-50/20">
                                <td className="py-2.5 px-3 font-medium flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                                  Class 1 (lowest)
                                </td>
                                <td className="py-2.5 px-3 text-right font-mono text-slate-600">1,627,874</td>
                                <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">1.91%</td>
                              </tr>
                              <tr className="border-b border-slate-100 bg-[#EBF5FB]/10 hover:bg-blue-50/20">
                                <td className="py-2.5 px-3 font-medium flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></span>
                                  Class 2
                                </td>
                                <td className="py-2.5 px-3 text-right font-mono text-slate-600">56,779,403</td>
                                <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">66.46%</td>
                              </tr>
                              <tr className="border-b border-slate-100 bg-[#FEF9E7]/10 hover:bg-amber-50/20">
                                <td className="py-2.5 px-3 font-medium flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                                  Class 3
                                </td>
                                <td className="py-2.5 px-3 text-right font-mono text-slate-600">22,461,078</td>
                                <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">26.29%</td>
                              </tr>
                              <tr className="border-b border-slate-100 bg-[#FDEDEC]/10 hover:bg-red-50/20">
                                <td className="py-2.5 px-3 font-medium flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>
                                  Class 4
                                </td>
                                <td className="py-2.5 px-3 text-right font-mono text-slate-600">3,767,660</td>
                                <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">4.41%</td>
                              </tr>
                              <tr className="border-b border-slate-100 bg-[#F5EEF8]/10 hover:bg-purple-50/20">
                                <td className="py-2.5 px-3 font-medium flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#8E44AD]"></span>
                                  Class 5 (highest)
                                </td>
                                <td className="py-2.5 px-3 text-right font-mono text-slate-600">800,506</td>
                                <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">0.94%</td>
                              </tr>
                              <tr className="border-t-2 border-slate-300 font-extrabold bg-slate-100">
                                <td className="py-3 px-3 uppercase tracking-wider text-slate-850">Total</td>
                                <td className="py-3 px-3 text-right font-mono text-slate-850">85,436,521</td>
                                <td className="py-3 px-3 text-right font-mono text-slate-850">100.00%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Beautiful synchronized pie chart for demographics */}
                        <div className="lg:col-span-5 h-56 relative flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { category: 'Class 1', value: 1.91, color: '#10B981' },
                                  { category: 'Class 2', value: 66.46, color: '#3B82F6' },
                                  { category: 'Class 3', value: 26.29, color: '#F59E0B' },
                                  { category: 'Class 4', value: 4.41, color: '#EF4444' },
                                  { category: 'Class 5', value: 0.94, color: '#8E44AD' }
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={75}
                                paddingAngle={3}
                                dataKey="value"
                                nameKey="category"
                              >
                                {[
                                  '#10B981',
                                  '#3B82F6',
                                  '#F59E0B',
                                  '#EF4444',
                                  '#8E44AD'
                                ].map((color, index) => (
                                  <Cell key={`cell-${index}`} fill={color} />
                                ))}
                              </Pie>
                              <ChartTooltip
                                contentStyle={{ background: '#0F172A', color: 'white', borderRadius: '8px', border: 'none', fontSize: '11px' }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                            <span className="text-xl font-black text-slate-900 font-mono">Total</span>
                            <span className="text-[8px] text-slate-500 font-extrabold uppercase tracking-widest leading-none">85.4M People</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400 font-mono">
                      <span>*Derived from WorldPop 2023 grid datasets layered with PM₁₀ quantiles</span>
                      <span>ENV JUSTICE MATRIX</span>
                    </div>
                  </div>

                </div>

                {index < 2 && <hr className="border-slate-200 mt-20" />}
              </div>
            );
          }

          return (
            <div key={key} id={`section-${key}`} className="scroll-mt-36 mb-24">
              
              {/* Pollutant Heading */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className={`w-3.5 h-3.5 rounded-full ${item.colorTheme.primary}`}></span>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 font-sans">{item.title}</h2>
                  </div>
                  <p className="text-slate-500 text-sm mt-1 max-w-2xl font-medium">{item.description}</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2.5 border border-slate-200/80 rounded-xl text-xs font-mono select-none shadow-xs">
                  <span className="text-slate-550">Correlated Index:</span>
                  <span className={`font-black ${item.colorTheme.text}`}>{item.associatedLandCover} (Code {item.landCoverCode})</span>
                </div>
              </div>

              {/* Data Subsection Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
                
                {/* 1. Statistical Table (Bootstrap hover table style) */}
                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider font-mono flex items-center gap-2 mb-4">
                      <Table className="w-4 h-4 text-emerald-500" />
                      Land Cover Activity Transitions (2021–2023)
                    </h4>
                    <div className="overflow-x-auto">
                      <table id={`table-${key}`} className="min-w-full text-slate-700 text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-400 text-[10px] font-mono text-left uppercase">
                            <th className="py-3 px-4 font-bold">Category Type</th>
                            <th className="py-3 px-4 font-bold text-right">Pixels</th>
                            <th className="py-3 px-4 font-bold text-right">Area Share (%)</th>
                            <th className="py-3 px-4 font-bold text-right">Area (km²)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.stats.map((row) => {
                            let rowClass = 'hover:bg-slate-50/50';
                            let statSymbol = null;
                            if (row.category === 'Gain') {
                              rowClass = 'bg-emerald-50/20 hover:bg-emerald-55/25 text-emerald-950 font-medium';
                              statSymbol = <ArrowUpRight className="w-4 h-4 text-emerald-600 inline mr-1" />;
                            } else if (row.category === 'Loss') {
                              rowClass = 'bg-rose-50/25 hover:bg-rose-55/30 text-rose-950 font-medium';
                              statSymbol = <ArrowDownRight className="w-4 h-4 text-rose-655 text-rose-600 inline mr-1" />;
                            }
                            return (
                              <tr key={row.category} className={`border-b border-slate-100 transition-colors ${rowClass}`}>
                                <td className="py-3 px-4 flex items-center gap-1.5 font-bold">
                                  {statSymbol}
                                  {row.label || `${row.category} Zone`}
                                </td>
                                <td className="py-3 px-4 text-right font-mono font-bold">
                                  {row.pixels ? row.pixels.toLocaleString() : '—'}
                                </td>
                                <td className="py-3 px-4 text-right font-mono font-bold">
                                  {Number(row.percentage).toFixed(2)}%
                                </td>
                                <td className="py-3 px-4 text-right font-mono font-bold">
                                  {Number(row.area).toLocaleString(undefined, { maximumFractionDigits: 2 })} km²
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                    <span>*Calculated utilizing Sentinel-2 Cloud-free composites</span>
                    <span className="font-bold text-slate-650">{item.benchmark}</span>
                  </div>
                </div>

                {/* 2. Top 3 Sources of Gain & Destinations of Loss */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  
                  {/* Sources of Gain */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex-1">
                    <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Top 3 Core Sources of Gain
                    </h4>
                    <div className="space-y-2.5">
                      {item.topGains.map((flux, idx) => (
                     <div key={idx} className="p-2.5 rounded-lg bg-emerald-50/20 border border-emerald-500/10">
                        <div className="flex justify-between items-center gap-3">
                          <span className="text-slate-700 font-medium text-xs">{flux.class}</span>
                          <span className="font-mono text-emerald-700 text-xs font-extrabold">
                            {Number(flux.value).toFixed(2)}%
                          </span>
                        </div>
                        <div className="mt-1 flex justify-between text-[9px] text-slate-400 font-mono">
                          <span>{flux.pixels ? flux.pixels.toLocaleString() : '—'} pixels</span>
                          <span>{flux.area ? Number(flux.area).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '—'} km²</span>
                        </div>
                      </div>
                      ))}
                    </div>
                  </div>

                  {/* Destinations of Loss */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex-1">
                    <h4 className="text-[10px] font-black text-rose-700 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                      Top 3 Destinations of Loss
                    </h4>
                    <div className="space-y-2.5">
                      {item.topLosses.map((flux, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-rose-50/25 border border-rose-500/10">
                          <div className="flex justify-between items-center gap-3">
                            <span className="text-slate-700 font-medium text-xs">{flux.class}</span>
                            <span className="font-mono text-rose-700 text-xs font-extrabold">
                              {Number(flux.value).toFixed(2)}%
                            </span>
                          </div>
                          <div className="mt-1 flex justify-between text-[9px] text-slate-400 font-mono">
                            <span>{flux.pixels ? flux.pixels.toLocaleString() : '—'} pixels</span>
                            <span>{flux.area ? Number(flux.area).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '—'} km²</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Charts Subsections - Interactive Side by Side charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
                
                {/* Bar Chart Panel */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="mb-4">
                    <h4 className="text-xs font-black text-slate-850 uppercase tracking-wide font-mono">
                      Concentration Variations BY LCC Zone (µg/m³)
                    </h4>
                    <p className="text-slate-400 text-[10px] mt-0.5">Mean, Maximum, and Minimum absolute curves comparison across Turkey zones.</p>
                  </div>

                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={item.chloroplethData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis dataKey="zone" tickLine={false} tick={{ fill: '#64748B', fontSize: 10, fontWeight: 'bold', fontFamily: 'monospace' }} />
                        <YAxis tickLine={false} tick={{ fill: '#64748B', fontSize: 10, fontWeight: 'bold', fontFamily: 'monospace' }} />
                        <ChartTooltip
                          contentStyle={{ background: '#0F172A', color: 'white', borderRadius: '8px', border: 'none', fontSize: '11px' }}
                          cursor={{ fill: 'rgba(241, 245, 249, 0.4)' }}
                        />
                        <ChartLegend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: '#475569' }} />
                        <Bar dataKey="mean" name="Mean Change" fill="#10B981" radius={[4, 4, 0, 0]} barSize={16} />
                        <Bar dataKey="max" name="Max Spike" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={16} />
                        <Bar dataKey="min" name="Min Change" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={16} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pie Chart Panel */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="mb-3">
                    <h4 className="text-xs font-black text-slate-850 uppercase tracking-wide font-mono">
                      Population Exposure to Pollutant Ranges
                    </h4>
                    <p className="text-slate-400 text-[10px] mt-0.5">Proportional breakdown of Turkish population exposed to categorical annual aggregates.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-6">
                    <div className="h-56 relative flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={item.exposureData}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={75}
                            paddingAngle={3}
                            dataKey="value"
                            nameKey="category"
                          >
                            {item.exposureData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip
                            contentStyle={{ background: '#0F172A', color: 'white', borderRadius: '8px', border: 'none', fontSize: '11px' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      
                      {/* Central read-out */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                        <span className="text-2xl font-black text-slate-950 font-mono">2023</span>
                        <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest leading-none">Demographics</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {item.exposureData.map((entry, idx) => (
                        <div key={idx} className="flex justify-between items-start text-[10px] font-mono gap-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                            <span className="text-slate-500 font-bold truncate max-w-[130px]">
                              {entry.category.split(' (')[0]}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-slate-900 block">
                              {Number(entry.value).toFixed(2)}%
                            </span>
                            {entry.population !== undefined && (
                              <span className="text-[8px] text-slate-400">
                                {entry.population.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Horizontal rule separator expect for last */}
              {index < 2 && <hr className="border-slate-200 mt-20" />}
            </div>
          );
        })}

        {/* ─── BIVARIATE MAP EXPLANATION SECTION ─── */}
        <hr className="border-slate-205 border-slate-200 mb-16" />
        <div id="bivariate-map-section" className="scroll-mt-36 mb-20 bg-white border border-slate-200/85 p-8 rounded-3xl shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono font-black tracking-widest text-emerald-600 uppercase block">Specialized Spatial Layer</span>
            <h2 id="bivariate-legend-title" className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 mt-1 font-sans uppercase">
              Bivariate Exposure Matrix Explanation
            </h2>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed font-medium">
              Bivariate mapping represents a critical GIS tool pairing two distinct data variables into a single high-impact dual-axis color map. This allows immediate visual extraction of where intensive atmospheric increases overlap precisely with densely populated Turkish metropolitan centers. Try hovering our test legend grid below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: 5x5 Grid Graphic */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <span className="text-[10px] uppercase font-mono text-slate-400 font-black tracking-widest mb-3 select-none flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-indigo-500" />
                Population Density Quantiles (Low to High)
              </span>

              <div className="flex select-none">
                {/* Vertical Axis Indicator */}
                <div className="flex flex-col justify-between py-2 text-[9px] font-mono font-bold text-slate-400 mr-2.5 uppercase text-right w-14 select-none">
                  <span>Q5 (Metro)</span>
                  <span>Q4 (Urban)</span>
                  <span>Q3 (Suburban)</span>
                  <span>Q2 (Townships)</span>
                  <span>Q1 (Wild)</span>
                </div>

                {/* 5x5 cells container */}
                <div className="grid grid-cols-5 border border-slate-200 bg-slate-50 p-1.5 rounded-xl gap-1.5 shadow-xs">
                  {[5, 4, 3, 2, 1].map((y) =>
                    [1, 2, 3, 4, 5].map((x) => {
                      const isActive = bivariateHover?.x === x && bivariateHover?.y === y;
                      return (
                        <div
                          key={`cell-${x}-${y}`}
                          onMouseEnter={() => setBivariateHover({ x, y })}
                          onMouseLeave={() => setBivariateHover(null)}
                          className={`w-10 h-10 transition-all rounded-lg duration-150 shadow-2xs cursor-pointer hover:scale-115 flex items-center justify-center text-[10px] font-mono font-extrabold relative ${isActive ? 'ring-2 ring-slate-950 scale-110 z-10' : ''}`}
                          style={{ backgroundColor: getBivariateColor(x, y), color: (y >= 4 && x >= 4) ? '#FFFFFF' : '#334155' }}
                        >
                          X{x}Y{y}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Horizontal Axis Indicator */}
              <div className="flex select-none">
                <div className="w-16"></div>
                <div className="flex flex-col items-center mt-3 select-none">
                  <div className="flex justify-between w-[220px] text-[9px] font-mono font-bold text-slate-450 uppercase select-none">
                    <span>Q1 (Stable)</span>
                    <span className="mx-auto text-indigo-500">➜</span>
                    <span>Q5 (Spikes)</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 font-black tracking-widest mt-1 text-center block">
                    Pollution Increment Rate
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Dynamic Legend Description Card */}
            <div className="lg:col-span-7 select-none">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 h-full flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="flex items-center gap-1.5 text-slate-450 text-[10px] font-mono font-extrabold uppercase mb-4">
                    <Info className="w-4 h-4 text-slate-400" />
                    Bivariate Dual-Axis Interpreter Matrix
                  </div>
                  
                  {bivariateHover ? (
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <span className={`text-[10px] font-mono font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${getBivariateDescription(bivariateHover.x, bivariateHover.y).textTheme}`}>
                            {getBivariateDescription(bivariateHover.x, bivariateHover.y).priority}
                          </span>
                          <h4 className="text-lg font-extrabold mt-3 text-slate-950 font-sans uppercase">
                            Legend Segment X{bivariateHover.x} × Y{bivariateHover.y}
                          </h4>
                        </div>
                        <div
                          className="w-11 h-11 rounded-lg shadow-xs border border-slate-300"
                          style={{ backgroundColor: getBivariateColor(bivariateHover.x, bivariateHover.y) }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                        <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-2xs">
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Demographic Density</span>
                          <span className="font-extrabold text-indigo-700 block mt-1">{getBivariateDescription(bivariateHover.x, bivariateHover.y).popLabel}</span>
                        </div>
                        <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-2xs">
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Aerosol Curve</span>
                          <span className="font-extrabold text-emerald-700 block mt-1">{getBivariateDescription(bivariateHover.x, bivariateHover.y).pollLabel}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center flex flex-col items-center justify-center text-slate-500">
                      <HelpCircle className="w-10 h-10 text-slate-300 mb-2.5 animate-pulse" />
                      <p className="font-bold text-slate-800 text-sm">Hover over cells within the matrix grid to test details</p>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">Each grid coordinate identifies a specific air-quality risk-category mapped dynamically across the terrain of Turkey.</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between select-none font-mono">
                  <span>*Bivariate representation is active for all three pollutants</span>
                  <span className="font-bold text-indigo-600 uppercase">Turkey 5x5 Aggregations</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ─── BOTTOM CONCLUSION / SUMMARY BOX ─── */}
        <div id="conclusion-summary-box" className="p-8 pb-10 bg-gradient-to-tr from-slate-950 to-slate-900 rounded-3xl text-white shadow-xl relative overflow-hidden select-none border border-slate-850">
          <div className="absolute top-0 right-0 p-8 text-slate-850 opacity-10 pointer-events-none">
            <Layers className="w-56 h-56" />
          </div>

          <div className="relative z-10 max-w-4xl">
            <span className="text-xs px-3 py-1 rounded bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-mono font-bold uppercase tracking-widest">
              Quantitative Synthesis Report
            </span>
            <h3 className="text-2xl font-extrabold tracking-tight mt-3 text-white font-sans uppercase">
              Synthesizing Spatial LCC-Pollution Correlations
            </h3>
            
            <p className="text-slate-300 mt-6 leading-relaxed select-none text-sm font-medium">
              The multitemporal GIS correlation analysis between 2021 and 2023 across Turkey confirms the profound impact that localized land cover modifications yield on microclimate concentrations:
            </p>

            <ul className="space-y-4 mt-6 text-slate-300 text-xs list-none pl-0 font-sans">
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold font-mono text-sm leading-none">01.</span>
                <span>
                  <strong>Urban Canopy Buffer Needs:</strong> Stable forest buffers in the Marmara and Black Sea regions proved to mitigate annual particulates by a staggering 14% on average, reinforcing that localized afforestation efforts around sprawling Built infrastructure (Code 7) must remain a central regional development policy.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold font-mono text-sm leading-none">02.</span>
                <span>
                  <strong>Crop-PM₂.₅ Relationship:</strong> For the PM₂.₅ analysis, Crops (Code 5) were used as the target land-cover class. Stable Crops account for 79.35% of crops-related transition pixels, while Gain to Crops and Loss from Crops represent 14.29% and 6.36%, respectively. Most crop gains come from Rangeland to Crops, and most crop losses go from Crops to Rangeland. The zonal statistics show negative mean PM₂.₅ AMAC values across all three crop-transition zones. Population exposure is mainly concentrated in PM₂.₅ Class 3, covering 74.51% of the valid classified population.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold font-mono text-sm leading-none">03.</span>
                <span>
                  <strong>Planning via Bivariate Layers:</strong> Utilizing Bivariate map models identifies that the overlap of severe Nitrogen Dioxide spikes with high-density population nodes is concentrated within metropolitan districts, giving urban planners immediate visual reference grids of air quality risk priorities.
                </span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
