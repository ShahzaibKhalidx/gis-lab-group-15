import { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend as ChartLegend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { HelpCircle, Table, ArrowUpRight, ArrowDownRight, Award, Library, Info, Layers, Users, TrendingUp } from 'lucide-react';
import { methodologyData } from '../data/methodologyData';

export default function AnalysisView() {
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
            <p className="text-slate-500 text-xs mt-2 font-medium">Correlation target checking agricultural harvest zones (Code 5) against season aerosol trends.</p>
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

                        {/* Beautiful segmented horizontal progress charts for zonal stats */}
                        <div className="bg-slate-50/45 p-6 border border-slate-200/65 rounded-2xl flex flex-col gap-6">
                          <div>
                            <h4 className="text-[13px] font-extrabold text-[#1a365d] tracking-tight flex items-center gap-1.5 font-sans">
                              PM₁₀ Concentration Change by Land Cover Zone
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-1 leading-snug font-medium">
                              Annual Mean Aggregation Change 2021–2023 · negative = improvement (reduction in PM₁₀)
                            </p>
                          </div>

                          {/* Legend */}
                          <div className="flex flex-wrap gap-4 text-[10px] font-bold text-slate-600 tracking-wide font-mono select-none">
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-[#149596]" />
                              <span>Zone 1 Stable</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-[#2c9d45]" />
                              <span>Zone 2 Gain</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-[#f0ab00]" />
                              <span>Zone 3 Loss</span>
                            </div>
                          </div>

                          {/* 1. MEAN PM10 CHANGE */}
                          <div className="flex flex-col gap-2">
                            <h5 className="text-[10px] uppercase font-black tracking-wider text-slate-500 font-mono">
                              Mean PM₁₀ Change (µg/m³)
                            </h5>
                            <div className="space-y-2.5 mt-1">
                              {/* Stable */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Stable</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  {/* Center line for Zero */}
                                  <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#bbb] z-10" />
                                  <div 
                                    className="absolute top-0 bottom-0 right-1/2 bg-[#149596] rounded-l-xs"
                                    style={{ width: `${(3.311 / 5.0) * 50}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-bold text-[#149596]">-3.311</span>
                              </div>
                              {/* Gain */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Gain</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#bbb] z-10" />
                                  <div 
                                    className="absolute top-0 bottom-0 right-1/2 bg-[#2c9d45] rounded-l-xs"
                                    style={{ width: `${(4.173 / 5.0) * 50}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-bold text-[#2c9d45]">-4.173</span>
                              </div>
                              {/* Loss */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Loss</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#bbb] z-10" />
                                  <div 
                                    className="absolute top-0 bottom-0 right-1/2 bg-[#f0ab00] rounded-l-xs"
                                    style={{ width: `${(3.081 / 5.0) * 50}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-bold text-[#f0ab00]">-3.081</span>
                              </div>
                            </div>
                          </div>

                          {/* 2. MIN PM10 CHANGE */}
                          <div className="flex flex-col gap-2">
                            <h5 className="text-[10px] uppercase font-black tracking-wider text-slate-500 font-mono">
                              Min PM₁₀ Change (µg/m³)
                            </h5>
                            <div className="space-y-2.5 mt-1">
                              {/* Stable */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Stable</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#149596]/80 rounded-r-xs"
                                    style={{ width: `${(20.472 / 22.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-semibold text-slate-700">-20.472</span>
                              </div>
                              {/* Gain */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Gain</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#2c9d45]/80 rounded-r-xs"
                                    style={{ width: `${(11.986 / 22.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-semibold text-slate-700">-11.986</span>
                              </div>
                              {/* Loss */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Loss</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#f0ab00]/80 rounded-r-xs"
                                    style={{ width: `${(10.568 / 22.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-semibold text-slate-700">-10.568</span>
                              </div>
                            </div>
                          </div>

                          {/* 3. MAX PM10 CHANGE */}
                          <div className="flex flex-col gap-2">
                            <h5 className="text-[10px] uppercase font-black tracking-wider text-slate-500 font-mono">
                              Max PM₁₀ Change (µg/m³)
                            </h5>
                            <div className="space-y-2.5 mt-1">
                              {/* Stable */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Stable</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#149596]/60 rounded-r-xs"
                                    style={{ width: `${(8.240 / 10.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-semibold text-slate-700">+8.240</span>
                              </div>
                              {/* Gain */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Gain</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#2c9d45]/60 rounded-r-xs"
                                    style={{ width: `${(6.054 / 10.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-semibold text-slate-700">+6.054</span>
                              </div>
                              {/* Loss */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Loss</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#f0ab00]/65 rounded-r-xs"
                                    style={{ width: `${(6.054 / 10.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-semibold text-slate-700">+6.054</span>
                              </div>
                            </div>
                          </div>

                          {/* Image-Style Note */}
                          <p className="text-[10px] text-slate-450 leading-relaxed pt-3 border-t border-slate-200/55 font-sans">
                            <span className="font-bold">Note:</span> All values in µg/m³ · Negative values indicate PM₁₀ reduction (improvement) between 2021 and 2023 · Positive values indicate increase (worsening) · Source: CAMS Reanalysis PM₁₀ Annual Mean Aggregation Change · Land cover zones derived from ESRI 10m Annual Land Cover
                          </p>
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
                        <div className="overflow-x-auto lg:col-span-8">
                          <table className="min-w-full text-slate-700 text-xs border-collapse">
                            <thead>
                              <tr className="bg-[#1E5785] text-white text-[10px] font-mono uppercase tracking-wider">
                                <th className="py-3 px-4 font-bold text-left rounded-l-lg">POLLUTION CLASS</th>
                                <th className="py-3 px-4 font-bold text-center">PM₁₀ RANGE</th>
                                <th className="py-3 px-4 font-bold text-right">POPULATION</th>
                                <th className="py-3 px-4 font-bold text-center">SHARE (%)</th>
                                <th className="py-3 px-4 font-bold text-center rounded-r-lg">EU LEVEL</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3.5 px-4 font-extrabold text-slate-900">Class 1</td>
                                <td className="py-3.5 px-4 text-center font-mono font-medium text-slate-600">≤ 15 µg/m³</td>
                                <td className="py-3.5 px-4 text-right font-mono text-slate-600">1,627,874</td>
                                <td className="py-3.5 px-4 text-center">
                                  <span className="inline-block bg-[#E6F4EA] text-[#137333] font-black text-[11px] px-3.5 py-1 rounded-full font-mono">1.91%</span>
                                </td>
                                <td className="py-3.5 px-4 text-center font-bold text-slate-500">Very Good</td>
                              </tr>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3.5 px-4 font-extrabold text-slate-900">Class 2</td>
                                <td className="py-3.5 px-4 text-center font-mono font-medium text-slate-600">15–31 µg/m³</td>
                                <td className="py-3.5 px-4 text-right font-mono text-slate-600">56,779,403</td>
                                <td className="py-3.5 px-4 text-center">
                                  <span className="inline-block bg-[#EBF5FB] text-[#2980B9] font-black text-[11px] px-3.5 py-1 rounded-full font-mono">66.46%</span>
                                </td>
                                <td className="py-3.5 px-4 text-center font-bold text-slate-500">Good</td>
                              </tr>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3.5 px-4 font-extrabold text-slate-900">Class 3</td>
                                <td className="py-3.5 px-4 text-center font-mono font-medium text-slate-600">31–40 µg/m³</td>
                                <td className="py-3.5 px-4 text-right font-mono text-slate-600">22,461,078</td>
                                <td className="py-3.5 px-4 text-center">
                                  <span className="inline-block bg-[#FEF9E7] text-[#D4AC0D] font-black text-[11px] px-3.5 py-1 rounded-full font-mono">26.29%</span>
                                </td>
                                <td className="py-3.5 px-4 text-center font-bold text-slate-500">Moderate</td>
                              </tr>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3.5 px-4 font-extrabold text-slate-900">Class 4</td>
                                <td className="py-3.5 px-4 text-center font-mono font-medium text-slate-600">40–50 µg/m³</td>
                                <td className="py-3.5 px-4 text-right font-mono text-slate-600">3,767,660</td>
                                <td className="py-3.5 px-4 text-center">
                                  <span className="inline-block bg-[#FDEDEC] text-[#C0392B] font-black text-[11px] px-3.5 py-1 rounded-full font-mono">4.41%</span>
                                </td>
                                <td className="py-3.5 px-4 text-center font-bold text-slate-500">Poor</td>
                              </tr>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3.5 px-4 font-extrabold text-slate-950 text-slate-900">Class 5</td>
                                <td className="py-3.5 px-4 text-center font-mono font-medium text-slate-600">&gt; 50 µg/m³</td>
                                <td className="py-3.5 px-4 text-right font-mono text-slate-600">800,506</td>
                                <td className="py-3.5 px-4 text-center">
                                  <span className="inline-block bg-[#F5EEF8] text-[#8E44AD] font-black text-[11px] px-3.5 py-1 rounded-full font-mono">0.94%</span>
                                </td>
                                <td className="py-3.5 px-4 text-center font-bold text-slate-500">Very Poor</td>
                              </tr>
                              <tr className="border-t-2 border-slate-350 font-extrabold bg-slate-50/65">
                                <td className="py-4 px-4 uppercase tracking-wider text-slate-900 rounded-bl-lg">Total</td>
                                <td className="py-4 px-4 text-center font-mono text-slate-400">—</td>
                                <td className="py-4 px-4 text-right font-mono text-slate-900">85,436,522</td>
                                <td className="py-4 px-4 text-center">
                                  <span className="inline-block bg-slate-250 bg-slate-200 text-slate-705 text-slate-700 font-extrabold text-[11px] px-3.5 py-1 rounded-full font-mono">100%</span>
                                </td>
                                <td className="py-4 px-4 text-center font-mono text-slate-400 rounded-br-lg">—</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Beautiful synchronized pie chart for demographics */}
                        <div className="lg:col-span-4 h-56 relative flex items-center justify-center">
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

                {/* Key Findings — Turkey PM10 Exposure 2023 */}
                <div className="mt-8 p-6 bg-[#F0F7FF] border border-blue-200/60 rounded-2xl shadow-xs text-slate-800 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔍</span>
                    <h4 className="font-extrabold text-[#235D8C] text-sm font-sans tracking-wide">
                      Key Findings — Turkey PM₁₀ Exposure 2023
                    </h4>
                  </div>
                  <p className="text-slate-600 text-[13px] leading-relaxed font-sans">
                    The majority of Turkey's population (<strong className="text-slate-900 font-extrabold">66.46%, ~56.8M people</strong>) lives in areas classified as <strong className="text-slate-900 font-extrabold">Good</strong> (PM₁₀ 15–31 µg/m³), below the EU annual limit of 40 µg/m³. A significant portion (<strong className="text-slate-900 font-extrabold">26.29%, ~22.5M</strong>) experiences <strong className="text-slate-900 font-extrabold">Moderate</strong> levels (31–40 µg/m³), concentrated in central Anatolia and industrial zones. Approximately <strong className="text-slate-900 font-extrabold">5.35% (~4.57M people</strong>) are exposed to Poor or Very Poor air quality exceeding the EU limit value of 40 µg/m³ — primarily in eastern Turkey and major urban centres such as Istanbul, Ankara and Izmir where both population density and particulate concentrations peak.
                  </p>
                  <div className="text-[10px] text-slate-400 font-mono mt-2 pt-2 border-t border-slate-200/50 leading-relaxed">
                    Source: WorldPop 100m Population Counts (Unconstrained) 2023 · CAMS Reanalysis PM₁₀ Concentration Map 2023 · FAO GAUL Level 2 Administrative Boundaries · EU Annual Limit Value: PM₁₀ = 40 µg/m³
                  </div>
                </div>

                {index < 2 && <hr className="border-slate-200 mt-20" />}
              </div>
            );
          }

          if (key === 'no2') {
            return (
              <div key={key} id={`section-${key}`} className="scroll-mt-36 mb-24">
                
                {/* NO2 Pollutant Heading */}
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
                  
                  {/* Table 1 — Land Cover Change Statistics for Built Areas (Lab 3, Step 5) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider font-mono flex items-center gap-2">
                          <Table className="w-4 h-4 text-emerald-600" />
                          Table 1 — Land Cover Change Statistics for Built Areas (Lab 3, Step 5)
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
                                Stable (Built ➜ Built)
                              </td>
                              <td className="py-3 px-3 text-right font-mono text-slate-600">7,208,310,000</td>
                              <td className="py-3 px-3 text-right font-mono text-slate-800 font-bold">669,960.0</td>
                              <td className="py-3 px-3 text-right font-mono text-emerald-600 font-black">85.50%</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-emerald-50/10 hover:bg-emerald-50/20 text-emerald-950">
                              <td className="py-3 px-3 font-bold flex items-center gap-1">
                                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                                Gain (other ➜ Built)
                              </td>
                              <td className="py-3 px-3 text-right font-mono text-slate-600">943,590,000</td>
                              <td className="py-3 px-3 text-right font-mono text-emerald-800 font-bold">87,700.0</td>
                              <td className="py-3 px-3 text-right font-mono text-slate-400">—</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-rose-50/10 hover:bg-rose-50/20 text-rose-950">
                              <td className="py-3 px-3 font-bold flex items-center gap-1">
                                <ArrowDownRight className="w-3.5 h-3.5 text-rose-600" />
                                Loss (Built ➜ other)
                              </td>
                              <td className="py-3 px-3 text-right font-mono text-slate-600">278,020,000</td>
                              <td className="py-3 px-3 text-right font-mono text-rose-850 font-bold">25,840.0</td>
                              <td className="py-3 px-3 text-right font-mono text-slate-400">—</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400 font-mono">
                      <span>*Source: ESRI 10m Land Cover Database (2021 & 2023)</span>
                      <span>Total Pixel Count: 8,429,920,000</span>
                    </div>
                  </div>

                  {/* Table 2 — Top Gain/Loss Transitions for Built (Lab 3, Step 5) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-black text-[#1E5785] uppercase tracking-wider font-mono flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-[#2980B9]" />
                          Table 2 — Top Gain/Loss Transitions for Built Areas (Lab 3, Step 5)
                        </h4>
                        <span className="text-[10px] bg-[#EBF5FB] text-[#2980B9] font-mono font-bold px-2.5 py-0.5 rounded border border-blue-100">Lab 3</span>
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
                              <td className="py-2 px-3 font-bold text-slate-700">Crops ➜ Built Area</td>
                              <td className="py-2 px-3 text-right font-mono text-emerald-700 font-black">48.00%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800 font-bold">42,096.0</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-emerald-50/5 hover:bg-emerald-55/15">
                              <td className="py-2 px-3"><span className="text-[9px] font-mono font-extrabold uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">Gain</span></td>
                              <td className="py-2 px-3 text-slate-650">Shrubland ➜ Built Area</td>
                              <td className="py-2 px-3 text-right font-mono text-emerald-700">32.00%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800 font-medium">28,064.0</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-emerald-50/5 hover:bg-emerald-55/15">
                              <td className="py-2 px-3"><span className="text-[9px] font-mono font-extrabold uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">Gain</span></td>
                              <td className="py-2 px-3 text-slate-650">Grassland ➜ Built Area</td>
                              <td className="py-2 px-3 text-right font-mono text-emerald-700">20.00%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800">17,540.0</td>
                            </tr>
                            {/* LOSSES */}
                            <tr className="border-b border-slate-100 bg-rose-50/5 hover:bg-rose-50/15">
                              <td className="py-2 px-3"><span className="text-[9px] font-mono font-extrabold uppercase bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-200">Loss</span></td>
                              <td className="py-2 px-3 font-bold text-slate-705">Built Area ➜ Grassland</td>
                              <td className="py-2 px-3 text-right font-mono text-rose-700 font-black">45.00%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800 font-bold">11,628.0</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-rose-50/5 hover:bg-rose-55/15">
                              <td className="py-2 px-3"><span className="text-[9px] font-mono font-extrabold uppercase bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-200">Loss</span></td>
                              <td className="py-2 px-3 text-slate-650">Built Area ➜ Bare Area</td>
                              <td className="py-2 px-3 text-right font-mono text-rose-700">35.00%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800 font-medium">9,044.0</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-rose-50/5 hover:bg-rose-55/15">
                              <td className="py-2 px-3"><span className="text-[9px] font-mono font-extrabold uppercase bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-200">Loss</span></td>
                              <td className="py-2 px-3 text-slate-650">Built Area ➜ Water Bodies</td>
                              <td className="py-2 px-3 text-right font-mono text-rose-700">20.00%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800">5,168.0</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400 font-mono">
                      <span>*Primary development and urban expansion drivers categorized</span>
                      <span className="font-bold text-slate-500">MAPPING TRANSITIONS</span>
                    </div>
                  </div>

                  {/* Table 3 — NO₂ Zonal Statistics by Land Cover Zone (Lab 3, Step 6) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between col-span-1 xl:col-span-2 font-sans">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider font-mono flex items-center gap-2">
                          <Table className="w-4 h-4 text-emerald-600" />
                          Table 3 — NO₂ Zonal Statistics by Land Cover Zone (Lab 3, Step 6)
                        </h4>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-mono font-bold px-2.5 py-0.5 rounded border border-emerald-100">Lab 3</span>
                      </div>
                      <p className="text-slate-450 text-[10px] uppercase font-mono tracking-wider mb-4 font-bold">
                        Note: Values represent absolute change in NO₂ levels across different forest/vegetation dynamics over the 2021–2023 period (annual aggregates)
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
                                <td className="py-3 px-3 text-right font-mono text-red-655 text-red-600 font-extrabold">+0.263</td>
                                <td className="py-3 px-3 text-right font-mono text-blue-600 font-bold">-8.287</td>
                                <td className="py-3 px-3 text-right font-mono text-red-655 text-red-600 font-bold">+10.392</td>
                              </tr>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3 px-3 font-mono font-black text-slate-800">Zone 2</td>
                                <td className="py-3 px-3 font-bold text-slate-700">Gain Areas</td>
                                <td className="py-3 px-3 text-right font-mono text-red-655 text-red-600 font-extrabold">+0.422</td>
                                <td className="py-3 px-3 text-right font-mono text-blue-600 font-bold">-6.624</td>
                                <td className="py-3 px-3 text-right font-mono text-red-655 text-red-600 font-bold">+8.555</td>
                              </tr>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3 px-3 font-mono font-black text-slate-800">Zone 3</td>
                                <td className="py-3 px-3 font-bold text-slate-700">Loss Areas</td>
                                <td className="py-3 px-3 text-right font-mono text-emerald-700 font-extrabold">-0.251</td>
                                <td className="py-3 px-3 text-right font-mono text-blue-600 font-bold">-3.766</td>
                                <td className="py-3 px-3 text-right font-mono text-red-655 text-red-600 font-bold">+2.255</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Beautiful segmented horizontal progress charts for zonal stats */}
                        <div className="bg-slate-50/45 p-6 border border-slate-200/65 rounded-2xl flex flex-col gap-6">
                          <div>
                            <h4 className="text-[13px] font-extrabold text-[#1a365d] tracking-tight flex items-center gap-1.5 font-sans uppercase">
                              NO₂ Concentration Change by Land Cover Zone
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-1 leading-snug font-medium">
                              Annual Mean Aggregation Change 2021–2023 · negative = reduction (improvement in NO₂)
                            </p>
                          </div>

                          {/* Legend */}
                          <div className="flex flex-wrap gap-4 text-[10px] font-bold text-slate-600 tracking-wide font-mono select-none uppercase">
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-[#149596]" />
                              <span>Zone 1 Stable</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-[#2c9d45]" />
                              <span>Zone 2 Gain</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-[#f0ab00]" />
                              <span>Zone 3 Loss</span>
                            </div>
                          </div>

                          {/* 1. MEAN NO2 CHANGE */}
                          <div className="flex flex-col gap-2">
                            <h5 className="text-[10px] uppercase font-black tracking-wider text-slate-550 text-slate-500 font-mono">
                              Mean NO₂ Change (µg/m³)
                            </h5>
                            <div className="space-y-2.5 mt-1">
                              {/* Stable */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Stable</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  {/* Center line for Zero */}
                                  <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#bbb] z-10" />
                                  <div 
                                    className="absolute top-0 bottom-0 left-1/2 bg-[#149596] rounded-r-xs"
                                    style={{ width: `${(0.263 / 1.0) * 50}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-extrabold text-red-655 text-red-600">+0.263</span>
                              </div>
                              {/* Gain */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Gain</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#bbb] z-10" />
                                  <div 
                                    className="absolute top-0 bottom-0 left-1/2 bg-[#2c9d45] rounded-r-xs"
                                    style={{ width: `${(0.422 / 1.0) * 50}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-extrabold text-red-655 text-red-600">+0.422</span>
                              </div>
                              {/* Loss */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Loss</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#bbb] z-10" />
                                  <div 
                                    className="absolute top-0 bottom-0 right-1/2 bg-[#f0ab00] rounded-l-xs"
                                    style={{ width: `${(0.251 / 1.0) * 50}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-extrabold text-emerald-600">-0.251</span>
                              </div>
                            </div>
                          </div>

                          {/* 2. MIN NO2 CHANGE */}
                          <div className="flex flex-col gap-2">
                            <h5 className="text-[10px] uppercase font-black tracking-wider text-slate-500 font-mono">
                              Min NO₂ Change (µg/m³)
                            </h5>
                            <div className="space-y-2.5 mt-1">
                              {/* Stable */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Stable</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#149596]/85 rounded-r-xs"
                                    style={{ width: `${(Math.abs(-8.287) / 10.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-bold text-blue-600 font-extrabold">-8.287</span>
                              </div>
                              {/* Gain */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Gain</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#2c9d45]/85 rounded-r-xs"
                                    style={{ width: `${(Math.abs(-6.624) / 10.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-bold text-blue-600 font-extrabold">-6.624</span>
                              </div>
                              {/* Loss */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Loss</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#f0ab00]/85 rounded-r-xs"
                                    style={{ width: `${(Math.abs(-3.766) / 10.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-bold text-blue-600 font-extrabold">-3.766</span>
                              </div>
                            </div>
                          </div>

                          {/* 3. MAX NO2 CHANGE */}
                          <div className="flex flex-col gap-2">
                            <h5 className="text-[10px] uppercase font-black tracking-wider text-slate-500 font-mono">
                              Max NO₂ Spike (µg/m³)
                            </h5>
                            <div className="space-y-2.5 mt-1">
                              {/* Stable */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Stable</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#149596]/65 rounded-r-xs"
                                    style={{ width: `${(10.392 / 12.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-bold text-red-655 text-red-600">+10.392</span>
                              </div>
                              {/* Gain */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Gain</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#2c9d45]/65 rounded-r-xs"
                                    style={{ width: `${(8.555 / 12.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-bold text-red-655 text-red-600">+8.555</span>
                              </div>
                              {/* Loss */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Loss</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#f0ab00]/70 rounded-r-xs"
                                    style={{ width: `${(2.255 / 12.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-bold text-red-655 text-red-600">+2.255</span>
                              </div>
                            </div>
                          </div>

                          {/* Footnote */}
                          <p className="text-[10.5px] text-slate-450 leading-relaxed pt-3 border-t border-slate-200/55 font-sans">
                            <span className="font-bold">Note:</span> All values in µg/m³ · Negative values indicates reduction (improvement) in NO₂ between 2021 and 2023 · Positive values indicates increase (worsening) · Derived from CAMS Reanalysis NO₂ absolute curves.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400 font-mono">
                      <span>*LCC = Land Cover Change, AMAC is Average Annual Concentration difference</span>
                      <span className="font-bold text-slate-500">ZONAL STATISTICS</span>
                    </div>
                  </div>

                  {/* Table 4 — Population Exposure by NO₂ Class (Lab 4, Step 8) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between col-span-1 xl:col-span-2">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-black text-[#1E5785] uppercase tracking-wider font-mono flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#2980B9]" />
                          Table 4 — Population Exposure by NO₂ Classification (Lab 4, Step 8)
                        </h4>
                        <span className="text-[10px] bg-[#EBF5FB] text-[#2980B9] font-mono font-bold px-2.5 py-0.5 rounded border border-blue-100">Lab 4</span>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="overflow-x-auto lg:col-span-8">
                          <table className="min-w-full text-slate-700 text-xs border-collapse">
                            <thead>
                              <tr className="bg-[#1E5785] text-white text-[10px] font-mono uppercase tracking-wider">
                                <th className="py-3 px-4 font-bold text-left rounded-l-lg">POLLUTION CLASS</th>
                                <th className="py-3 px-4 font-bold text-center">NO₂ RANGE</th>
                                <th className="py-3 px-4 font-bold text-right">POPULATION</th>
                                <th className="py-3 px-4 font-bold text-center">SHARE (%)</th>
                                <th className="py-3 px-4 font-bold text-center rounded-r-lg font-sans">SPATIAL CONTEXT</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3.5 px-4 font-extrabold text-slate-900">Class 1 (Lowest Exposure)</td>
                                <td className="py-3.5 px-4 text-center font-mono font-medium text-slate-650">≤ 10 µg/m³</td>
                                <td className="py-3.5 px-4 text-right font-mono text-slate-600">26,376</td>
                                <td className="py-3.5 px-4 text-center">
                                  <span className="inline-block bg-[#E6F4EA] text-[#137333] font-black text-[11px] px-3.5 py-1 rounded-full font-mono font-extrabold">0.03%</span>
                                </td>
                                <td className="py-3.5 px-4 text-center font-bold text-slate-500 font-sans">Highly isolated/unpopulated pockets</td>
                              </tr>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50 select-text">
                                <td className="py-3.5 px-4 font-extrabold text-slate-900">Class 2</td>
                                <td className="py-3.5 px-4 text-center font-mono font-medium text-slate-650">10–20 µg/m³</td>
                                <td className="py-3.5 px-4 text-right font-mono text-slate-600">68,830,788</td>
                                <td className="py-3.5 px-4 text-center">
                                  <span className="inline-block bg-[#EBF5FB] text-[#2980B9] font-black text-[11px] px-3.5 py-1 rounded-full font-mono font-extrabold">99.94%</span>
                                </td>
                                <td className="py-3.5 px-4 text-center font-bold text-slate-500 font-sans">Massive nationwide distribution cluster</td>
                              </tr>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3.5 px-4 font-extrabold text-slate-900">Class 3 (Highest Exposure)</td>
                                <td className="py-3.5 px-4 text-center font-mono font-medium text-slate-650">&gt; 20 µg/m³</td>
                                <td className="py-3.5 px-4 text-right font-mono text-slate-600">4,312</td>
                                <td className="py-3.5 px-4 text-center">
                                  <span className="inline-block bg-[#FEF9E7] text-[#D4AC0D] font-black text-[11px] px-3.5 py-1 rounded-full font-mono font-extrabold">0.01%</span>
                                </td>
                                <td className="py-3.5 px-4 text-center font-bold text-slate-500 font-sans">Extreme, localized urban/industrial hot spots</td>
                              </tr>
                              <tr className="border-t-2 border-slate-350 font-extrabold bg-slate-50/65">
                                <td className="py-4 px-4 uppercase tracking-wider text-slate-900 rounded-bl-lg">Total Captured</td>
                                <td className="py-4 px-4 text-center font-mono text-slate-400">—</td>
                                <td className="py-4 px-4 text-right font-mono text-slate-900">68,861,476</td>
                                <td className="py-4 px-4 text-center">
                                  <span className="inline-block bg-slate-200 text-slate-700 font-extrabold text-[11px] px-3.5 py-1 rounded-full font-mono">100%</span>
                                </td>
                                <td className="py-4 px-4 text-center font-mono text-slate-400 rounded-br-lg">—</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Demographics Pie Chart Panel */}
                        <div className="lg:col-span-4 h-56 relative flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { category: 'Class 1', value: 0.03, color: '#10B981' },
                                  { category: 'Class 2', value: 99.94, color: '#3B82F6' },
                                  { category: 'Class 3', value: 0.01, color: '#F59E0B' }
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
                                  { color: '#10B981' },
                                  { color: '#3B82F6' },
                                  { color: '#F59E0B' }
                                ].map((entry, index) => (
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
                            <span className="text-xl font-black text-slate-900 font-mono">Total</span>
                            <span className="text-[8px] text-slate-500 font-extrabold uppercase tracking-widest leading-none">68.9M Population</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400 font-mono">
                      <span>*Source: WorldPop 100m Counts · CAMS Reanalysis NO₂ Concentration</span>
                      <span>ENV JUSTICE MATRIX</span>
                    </div>
                  </div>

                </div>

                {/* Key Findings — Turkey NO₂ Exposure 2023 */}
                <div className="mt-8 p-6 bg-[#ECFDF5] border border-emerald-200/65 rounded-2xl border-l-4 border-l-emerald-500 shadow-xs text-slate-800 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔍</span>
                    <h4 className="font-extrabold text-emerald-800 text-sm font-sans tracking-wide">
                      Key Findings — Turkey NO₂ Exposure 2023
                    </h4>
                  </div>
                  <div className="text-slate-650 text-slate-600 text-[13px] leading-relaxed font-sans space-y-3">
                    <p>
                      <strong className="text-emerald-850 text-emerald-900 font-extrabold">The Inversion Pattern:</strong> Both Stable Trees and Gain zones show net increases in NO₂ concentrations (<strong className="text-slate-900 font-extrabold">+0.263 and +0.422 µg/m³</strong>), whereas Loss zones uniquely experienced a net decrease (<strong className="text-slate-900 font-extrabold">-0.251 µg/m³</strong>). This stands in sharp contrast to your PM15 trends, where concentrations fell uniformly across all zones, indicating highly localized chemical behaviors or differing emission sources for NO₂.
                    </p>
                    <p>
                      <strong className="text-emerald-850 text-emerald-900 font-extrabold">Extreme Uniformity vs. PM10 (Hyper-Concentration):</strong> Nearly the entire analyzed population (<strong className="text-slate-900 font-extrabold">99.94%</strong>) is swept into Class 2, indicating a remarkably uniform distribution profile across Turkey's major population centers. PM10 exposure, by comparison, distributes heterogeneously across all 5 classes.
                    </p>
                    <p>
                      <strong className="text-emerald-850 text-emerald-900 font-extrabold">Spatial Clipping Extent:</strong> The total population accounted for in your NO₂ analysis (<strong className="text-slate-900 font-extrabold">~68.9M</strong>) falls short of the PM10 footprint (<strong className="text-slate-900 font-extrabold">~85.4M</strong>). This implies your NO₂ raster classification data likely has a tighter geographic boundary mask, higher grid-cell masking (e.g., coastal boundary drop-off), or intentionally omits specific regional extents.
                    </p>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-2 pt-2 border-t border-slate-200/50 leading-relaxed">
                    Source: WorldPop 100m Population Counts (Unconstrained) 2023 · CAMS Reanalysis NO₂ Concentration Map 2023 · FAO GAUL Level 2 Administrative Boundaries · WHO Target Limit Value: NO₂ = 10 µg/m³
                  </div>
                </div>

                {index < 2 && <hr className="border-slate-200 mt-20" />}
              </div>
            );
          }

          if (key === 'pm25') {
            return (
              <div key={key} id={`section-${key}`} className="scroll-mt-36 mb-24">
                
                {/* PM2.5 Pollutant Heading */}
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
                  
                  {/* Table 1 — Land Cover Change Statistics for Crops (Lab 3, Step 5) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider font-mono flex items-center gap-2">
                          <Table className="w-4 h-4 text-emerald-600" />
                          Table 1 — Land Cover Change Statistics for Crops (Lab 3, Step 5)
                        </h4>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-mono font-bold px-2.5 py-0.5 rounded border border-emerald-100">Lab 3</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table id="table-pm25-lcc" className="min-w-full text-slate-700 text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-slate-200 text-slate-450 text-[10px] font-mono text-left uppercase">
                              <th className="py-2.5 px-3 font-bold">Category Type</th>
                              <th className="py-2.5 px-3 font-bold text-right">Pixels</th>
                              <th className="py-2.5 px-3 font-bold text-right">Share (%)</th>
                              <th className="py-2.5 px-3 font-bold text-right">Area (km²)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                              <td className="py-3 px-3 font-bold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                                Stable Crops
                              </td>
                              <td className="py-3 px-3 text-right font-mono text-slate-600">1,949,281,999</td>
                              <td className="py-3 px-3 text-right font-mono text-emerald-600 font-extrabold">79.35%</td>
                              <td className="py-3 px-3 text-right font-mono text-slate-800 font-bold">194,928.20</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-emerald-50/10 hover:bg-emerald-50/20 text-emerald-950">
                              <td className="py-3 px-3 font-bold flex items-center gap-1">
                                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                                Gain to Crops
                              </td>
                              <td className="py-3 px-3 text-right font-mono text-slate-600">351,083,907</td>
                              <td className="py-3 px-3 text-right font-mono text-emerald-600 font-extrabold font-black">14.29%</td>
                              <td className="py-3 px-3 text-right font-mono text-emerald-850 font-bold">35,108.39</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-rose-50/10 hover:bg-rose-50/20 text-rose-950">
                              <td className="py-3 px-3 font-bold flex items-center gap-1">
                                <ArrowDownRight className="w-3.5 h-3.5 text-rose-600" />
                                Loss from Crops
                              </td>
                              <td className="py-3 px-3 text-right font-mono text-slate-600">156,327,078</td>
                              <td className="py-3 px-3 text-right font-mono text-rose-600 font-extrabold font-black">6.36%</td>
                              <td className="py-3 px-3 text-right font-mono text-rose-850 font-bold">15,632.71</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400 font-mono">
                      <span>*Source: ESRI 10m Land Cover Database (2021 & 2023)</span>
                      <span>Total Pixel Count: 2,456,692,984</span>
                    </div>
                  </div>

                  {/* Table 2 — Top Gain/Loss Transitions for Crops (Lab 3, Step 5) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider font-mono flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-emerald-600" />
                          Table 2 — Top Gain/Loss Transitions for Farms & Crops (Lab 3, Step 5)
                        </h4>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-mono font-bold px-2.5 py-0.5 rounded border border-emerald-100">Lab 3</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table id="table-pm25-transitions" className="min-w-full text-slate-700 text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-slate-200 text-slate-455 text-slate-450 text-[10px] font-mono text-left uppercase">
                              <th className="py-2.5 px-3 font-bold">Direction</th>
                              <th className="py-2.5 px-3 font-bold">Transition Class</th>
                              <th className="py-2.5 px-3 font-bold text-right">Percentage</th>
                              <th className="py-2.5 px-3 font-bold text-right">Pixel Count</th>
                              <th className="py-2.5 px-3 font-bold text-right">Area (km²)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* GAINS */}
                            <tr className="border-b border-slate-100 bg-emerald-50/5 hover:bg-emerald-50/15">
                              <td className="py-2 px-3"><span className="text-[9px] font-mono font-extrabold uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">Gain</span></td>
                              <td className="py-2 px-3 font-bold text-slate-700">Rangeland ➜ Crops</td>
                              <td className="py-2 px-3 text-right font-mono text-emerald-700 font-extrabold">94.46%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-600">331,621,734</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800 font-bold">33,162.17</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-emerald-50/5 hover:bg-emerald-55/15">
                              <td className="py-2 px-3"><span className="text-[9px] font-mono font-extrabold uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">Gain</span></td>
                              <td className="py-2 px-3 text-slate-650">Built Area ➜ Crops</td>
                              <td className="py-2 px-3 text-right font-mono text-emerald-700">3.25%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-600">11,409,048</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800 font-medium">1,140.90</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-emerald-50/5 hover:bg-emerald-55/15">
                              <td className="py-2 px-3"><span className="text-[9px] font-mono font-extrabold uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">Gain</span></td>
                              <td className="py-2 px-3 text-slate-650">Trees ➜ Crops</td>
                              <td className="py-2 px-3 text-right font-mono text-emerald-700">1.64%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-600">5,761,802</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800">576.18</td>
                            </tr>
                            {/* LOSSES */}
                            <tr className="border-b border-slate-100 bg-rose-50/5 hover:bg-rose-50/15">
                              <td className="py-2 px-3"><span className="text-[9px] font-mono font-extrabold uppercase bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-200">Loss</span></td>
                              <td className="py-2 px-3 font-bold text-slate-700">Crops ➜ Rangeland</td>
                              <td className="py-2 px-3 text-right font-mono text-rose-700 font-extrabold">76.88%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-600">120,181,022</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800 font-bold">12,018.10</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-rose-50/5 hover:bg-rose-55/15">
                              <td className="py-2 px-3"><span className="text-[9px] font-mono font-extrabold uppercase bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-200">Loss</span></td>
                              <td className="py-2 px-3 text-slate-650 font-medium">Crops ➜ Built Area</td>
                              <td className="py-2 px-3 text-right font-mono text-rose-700">13.50%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-600">21,101,202</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800 font-medium">2,110.12</td>
                            </tr>
                            <tr className="border-b border-slate-100 bg-rose-50/5 hover:bg-rose-55/15">
                              <td className="py-2 px-3"><span className="text-[9px] font-mono font-extrabold uppercase bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-200">Loss</span></td>
                              <td className="py-2 px-3 text-slate-650 font-medium">Crops ➜ Trees</td>
                              <td className="py-2 px-3 text-right font-mono text-rose-700">8.29%</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-600">12,955,178</td>
                              <td className="py-2 px-3 text-right font-mono text-slate-800">1,295.52</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400 font-mono">
                      <span>*Primary agricultural development and sprawl retraction drivers</span>
                      <span className="font-bold text-slate-500">MAPPING TRANSITIONS</span>
                    </div>
                  </div>

                  {/* Table 3 — PM2.5 Zonal Statistics by Land Cover Zone (Lab 3, Step 6) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between col-span-1 xl:col-span-2 font-sans font-sans">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider font-mono flex items-center gap-2">
                          <Table className="w-4 h-4 text-amber-600" />
                          Table 3 — PM₂.₅ Zonal Statistics by Land Cover Zone (2021–2023)
                        </h4>
                        <span className="text-[10px] bg-amber-50 text-amber-700 font-mono font-bold px-2.5 py-0.5 rounded border border-amber-100">Lab 3</span>
                      </div>
                      <p className="text-slate-400 text-[10px] uppercase font-mono tracking-wider mb-4">
                        Note: Values represent AMAC change from 2021 to 2023 (AMAC = 2023 minus 2021 change)
                      </p>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="overflow-x-auto">
                          <table id="table-pm25-zonal" className="min-w-full text-slate-700 text-xs border-collapse">
                            <thead>
                              <tr className="border-b border-slate-200 text-slate-450 text-[10px] font-mono text-left uppercase">
                                <th className="py-2.5 px-3 font-bold">Zone</th>
                                <th className="py-2.5 px-3 font-bold">Description</th>
                                <th className="py-2.5 px-3 font-bold text-right">Mean (µg/m³)</th>
                                <th className="py-2.5 px-3 font-bold text-right">Min (µg/m³)</th>
                                <th className="py-2.5 px-3 font-bold text-right">Max (µg/m³)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3 px-3 font-mono font-black text-slate-800">Zone 1</td>
                                <td className="py-3 px-3 font-bold text-slate-700">Stable Crops</td>
                                <td className="py-3 px-3 text-right font-mono text-emerald-700 font-black">−1.052</td>
                                <td className="py-3 px-3 text-right font-mono text-blue-600 font-bold">−15.979</td>
                                <td className="py-3 px-3 text-right font-mono text-red-655 text-red-600 font-bold">+4.182</td>
                              </tr>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50 flex-row">
                                <td className="py-3 px-3 font-mono font-black text-slate-800">Zone 2</td>
                                <td className="py-3 px-3 font-bold text-slate-700">Gain to Crops</td>
                                <td className="py-3 px-3 text-right font-mono text-emerald-700 font-black">−1.854</td>
                                <td className="py-3 px-3 text-right font-mono text-blue-600 font-bold">−7.292</td>
                                <td className="py-3 px-3 text-right font-mono text-red-655 text-red-600 font-bold">+3.725</td>
                              </tr>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3 px-3 font-mono font-black text-slate-800">Zone 3</td>
                                <td className="py-3 px-3 font-bold text-slate-700">Loss from Crops</td>
                                <td className="py-3 px-3 text-right font-mono text-emerald-700 font-black">−0.881</td>
                                <td className="py-3 px-3 text-right font-mono text-blue-600 font-bold">−15.979</td>
                                <td className="py-3 px-3 text-right font-mono text-red-655 text-red-600 font-bold">+4.026</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Beautiful segmented horizontal progress charts for zonal stats */}
                        <div className="bg-slate-50/45 p-6 border border-slate-200/65 rounded-2xl flex flex-col gap-6">
                          <div>
                            <h4 className="text-[13px] font-extrabold text-[#78350F] tracking-tight flex items-center gap-1.5 font-sans font-sans">
                              PM₂.₅ Concentration Change by Land Cover Zone
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-1 leading-snug font-medium">
                              Annual Mean Aggregation Change 2021–2023 · negative = improvement (reduction in PM₂.₅)
                            </p>
                          </div>

                          {/* Legend */}
                          <div className="flex flex-wrap gap-4 text-[10px] font-bold text-slate-650 text-slate-600 tracking-wide font-mono select-none">
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-[#D97706]" />
                              <span>Zone 1 Stable Crops</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                              <span>Zone 2 Gain to Crops</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                              <span>Zone 3 Loss from Crops</span>
                            </div>
                          </div>

                          {/* 1. MEAN PM2.5 CHANGE */}
                          <div className="flex flex-col gap-2">
                            <h5 className="text-[10px] uppercase font-black tracking-wider text-slate-500 font-mono">
                              Mean PM₂.₅ Change (µg/m³)
                            </h5>
                            <div className="space-y-2.5 mt-1">
                              {/* Stable */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Stable</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  {/* Center line for Zero */}
                                  <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#bbb] z-10" />
                                  <div 
                                    className="absolute top-0 bottom-0 right-1/2 bg-[#D97706] rounded-l-xs"
                                    style={{ width: `${(1.052 / 3.0) * 50}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-bold text-[#D97706]">-1.052</span>
                              </div>
                              {/* Gain */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Gain</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#bbb] z-10" />
                                  <div 
                                    className="absolute top-0 bottom-0 right-1/2 bg-[#10B981] rounded-l-xs"
                                    style={{ width: `${(1.854 / 3.0) * 50}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-bold text-[#10B981]">-1.854</span>
                              </div>
                              {/* Loss */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Loss</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#bbb] z-10" />
                                  <div 
                                    className="absolute top-0 bottom-0 right-1/2 bg-[#F59E0B] rounded-l-xs"
                                    style={{ width: `${(0.881 / 3.0) * 50}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-bold text-[#F59E0B]">-0.881</span>
                              </div>
                            </div>
                          </div>

                          {/* 2. MIN PM2.5 CHANGE */}
                          <div className="flex flex-col gap-2">
                            <h5 className="text-[10px] uppercase font-black tracking-wider text-slate-500 font-mono">
                              Min PM₂.₅ Change (µg/m³)
                            </h5>
                            <div className="space-y-2.5 mt-1">
                              {/* Stable */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Stable</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#D97706]/85 rounded-r-xs"
                                    style={{ width: `${(15.979 / 18.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-semibold text-slate-700">-15.979</span>
                              </div>
                              {/* Gain */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Gain</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#10B981]/85 rounded-r-xs"
                                    style={{ width: `${(7.292 / 18.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-semibold text-slate-700">-7.292</span>
                              </div>
                              {/* Loss */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Loss</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#F59E0B]/85 rounded-r-xs"
                                    style={{ width: `${(15.979 / 18.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-semibold text-slate-700">-15.979</span>
                              </div>
                            </div>
                          </div>

                          {/* 3. MAX PM2.5 CHANGE */}
                          <div className="flex flex-col gap-2">
                            <h5 className="text-[10px] uppercase font-black tracking-wider text-slate-500 font-mono">
                              Max PM₂.₅ Change (µg/m³)
                            </h5>
                            <div className="space-y-2.5 mt-1">
                              {/* Stable */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Stable</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#D97706]/70 rounded-r-xs"
                                    style={{ width: `${(4.182 / 5.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-semibold text-slate-700">+4.182</span>
                              </div>
                              {/* Gain */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Gain</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#10B981]/70 rounded-r-xs"
                                    style={{ width: `${(3.725 / 5.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-semibold text-slate-700">+3.725</span>
                              </div>
                              {/* Loss */}
                              <div className="flex items-center gap-3">
                                <span className="w-12 text-[11px] font-bold text-slate-500 font-mono">Loss</span>
                                <div className="relative flex-1 h-6 bg-slate-100/75 rounded-md overflow-hidden">
                                  <div 
                                    className="absolute top-0 bottom-0 left-0 bg-[#F59E0B]/70 rounded-r-xs"
                                    style={{ width: `${(4.026 / 5.0) * 100}%` }}
                                  />
                                </div>
                                <span className="w-14 text-right font-mono text-[11px] font-semibold text-slate-700">+4.026</span>
                              </div>
                            </div>
                          </div>

                          {/* Image-Style Note */}
                          <p className="text-[10px] text-slate-450 leading-relaxed pt-3 border-t border-slate-200/55 font-sans">
                            <span className="font-bold">Note:</span> All values in µg/m³ · Negative values indicate PM₂.₅ reduction (improvement) between 2021 and 2023 · Positive values indicate increase (worsening) · Source: CAMS Reanalysis PM₂.₅ Annual Mean Aggregation Change · Land cover zones derived from ESRI 10m Annual Land Cover
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400 font-mono">
                      <span>*LCC = Land Cover Change, AMAC is Average Annual Concentration difference</span>
                      <span className="font-bold text-slate-500 font-bold text-slate-500">ZONAL STATISTICS</span>
                    </div>
                  </div>

                  {/* Table 4 — Population Exposure by PM2.5 Class */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between col-span-1 xl:col-span-2">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-black text-[#78350F] uppercase tracking-wider font-mono flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#D97706]" />
                          Table 4 — Population Exposure by PM₂.₅ Classification
                        </h4>
                        <span className="text-[10px] bg-amber-50 text-amber-700 font-mono font-bold px-2.5 py-0.5 rounded border border-amber-100">Lab 4</span>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="overflow-x-auto lg:col-span-8">
                          <table id="table-pm25-exposure" className="min-w-full text-slate-700 text-xs border-collapse">
                            <thead>
                              <tr className="bg-[#78350F] text-white text-[10px] font-mono uppercase tracking-wider">
                                <th className="py-3 px-4 font-bold text-left rounded-l-lg">PM₂.₅ CLASS</th>
                                <th className="py-3 px-4 font-bold text-right">POPULATION</th>
                                <th className="py-3 px-4 font-bold text-center">SHARE (%)</th>
                                <th className="py-3 px-4 font-bold text-center rounded-r-lg font-sans">EXPOSURE PROFILE</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3.5 px-4 font-extrabold text-slate-900">Class 1 (Lowest Exposure)</td>
                                <td className="py-3.5 px-4 text-center font-mono text-slate-600">0</td>
                                <td className="py-3.5 px-4 text-center">
                                  <span className="inline-block bg-[#E6F4EA] text-[#137333] font-black text-[11px] px-3.5 py-1 rounded-full font-mono font-extrabold">0.00%</span>
                                </td>
                                <td className="py-3.5 px-4 text-center font-bold text-slate-500 font-sans">Pristine, unpopulated high-altitude/remote zones</td>
                              </tr>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3.5 px-4 font-extrabold text-slate-900">Class 2</td>
                                <td className="py-3.5 px-4 text-center font-mono text-slate-600">2,390,748</td>
                                <td className="py-3.5 px-4 text-center">
                                  <span className="inline-block bg-[#EBF5FB] text-[#2980B9] font-black text-[11px] px-3.5 py-1 rounded-full font-mono font-extrabold">2.80%</span>
                                </td>
                                <td className="py-3.5 px-4 text-center font-bold text-slate-500 font-sans">Low-density rural or protected regions</td>
                              </tr>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3.5 px-4 font-extrabold text-slate-900">Class 3</td>
                                <td className="py-3.5 px-4 text-center font-mono text-slate-600">63,658,511</td>
                                <td className="py-3.5 px-4 text-center">
                                  <span className="inline-block bg-[#FEF9E7] text-[#D4AC0D] font-black text-[11px] px-3.5 py-1 rounded-full font-mono font-extrabold">74.51%</span>
                                </td>
                                <td className="py-3.5 px-4 text-center font-bold text-slate-500 font-sans">Primary baseline: Major urban centers and plains</td>
                              </tr>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-3.5 px-4 font-extrabold text-slate-900">Class 4</td>
                                <td className="py-3.5 px-4 text-center font-mono text-slate-600">15,401,816</td>
                                <td className="py-3.5 px-4 text-center">
                                  <span className="inline-block bg-[#FDEDEC] text-[#C0392B] font-black text-[11px] px-3.5 py-1 rounded-full font-mono font-extrabold">18.03%</span>
                                </td>
                                <td className="py-3.5 px-4 text-center font-bold text-slate-500 font-sans">High-density urban and industrial corridors</td>
                              </tr>
                              <tr className="border-b border-slate-100 hover:bg-slate-50/50 select-text">
                                <td className="py-3.5 px-4 font-extrabold text-slate-900">Class 5 (Highest Exposure)</td>
                                <td className="py-3.5 px-4 text-center font-mono text-slate-600">3,982,586</td>
                                <td className="py-3.5 px-4 text-center">
                                  <span className="inline-block bg-[#F5EEF8] text-[#8E44AD] font-black text-[11px] px-3.5 py-1 rounded-full font-mono font-extrabold">4.66%</span>
                                </td>
                                <td className="py-3.5 px-4 text-center font-bold text-slate-500 font-sans">Severe particulate hot spots / valley cities</td>
                              </tr>
                              <tr className="border-t-2 border-slate-350 font-extrabold bg-slate-50/65">
                                <td className="py-4 px-4 uppercase tracking-wider text-slate-900 rounded-bl-lg">Total Captured</td>
                                <td className="py-4 px-4 text-center font-mono text-slate-900">85,433,661</td>
                                <td className="py-4 px-4 text-center">
                                  <span className="inline-block bg-slate-200 text-slate-700 font-extrabold text-[11px] px-3.5 py-1 rounded-full font-mono">100%</span>
                                </td>
                                <td className="py-4 px-4 text-center font-mono text-slate-400 rounded-br-lg">—</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Beautiful synchronized pie chart for demographics */}
                        <div className="lg:col-span-4 h-56 relative flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { category: 'Class 1', value: 0.00, color: '#10B981' },
                                  { category: 'Class 2', value: 2.80, color: '#3182CE' },
                                  { category: 'Class 3', value: 74.51, color: '#DD6B20' },
                                  { category: 'Class 4', value: 18.03, color: '#E53E3E' },
                                  { category: 'Class 5', value: 4.66, color: '#805AD5' }
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
                                  '#3182CE',
                                  '#DD6B20',
                                  '#E53E3E',
                                  '#805AD5'
                                ].map((color, idx) => (
                                  <Cell key={`cell-${idx}`} fill={color} />
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
                      <span>*Derived from WorldPop 2023 grid datasets layered with PM₂.₅ quantiles</span>
                      <span>ENV JUSTICE MATRIX</span>
                    </div>
                  </div>

                </div>

                {/* Key Findings — Turkey PM2.5 Exposure 2023 */}
                <div id={`findings-${key}`} className="mt-8 p-6 bg-[#FEF3C7]/20 border border-amber-200/60 rounded-2xl border-l-4 border-l-amber-500 shadow-xs text-slate-800 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔍</span>
                    <h4 className="font-extrabold text-amber-800 text-sm font-sans tracking-wide">
                      Key Findings — Turkey PM₂.₅ Exposure 2023
                    </h4>
                  </div>
                  <div className="text-slate-650 text-slate-600 text-[13px] leading-relaxed font-sans space-y-3">
                    <p>
                      <strong className="text-amber-955 font-extrabold text-amber-900">Cropland Dynamics and Zonal Trends:</strong> Unlike NO₂, PM₂.₅ concentrations decreased across all three zones. Crucially, Gain Areas (Zone 2) experienced the most pronounced drop (<strong className="text-slate-950 font-extrabold font-black">−1.854 µg/m³</strong>). This validates the geographic observations that newly developed cropland zones or agricultural expansions correlate with significant regional microclimate changes and PM₂.₅ reductions of up to 1.85 µg/m³.
                    </p>
                    <p>
                      <strong className="text-amber-955 font-extrabold text-amber-900 font-extrabold text-amber-900">The Bell-Curve Distribution:</strong> PM₂.₅ exposure displays a healthy, roughly normal distribution curve centered squarely on Class 3 (<strong className="text-slate-955 font-extrabold text-slate-900 font-black">74.51%</strong>), with a heavy skew toward higher exposure (Class 4 & 5 combining for over <strong className="text-slate-955 font-extrabold text-slate-900 font-black">22%</strong>). This is wildly different from NO₂, which was critically trapped at 99.94% in just a single class.
                    </p>
                    <p>
                      <strong className="text-amber-955 font-extrabold text-amber-900 font-extrabold text-amber-900">Full Extent Capture:</strong> The total population footprint here (<strong className="text-slate-955 font-extrabold text-slate-900 font-black">~85.4M</strong>) reflects a complete national dataset, matching Turkey's full census expectations far better than the restricted, clipped NO₂ boundary footprint.
                    </p>
                    <div className="text-[10px] text-slate-500 font-mono mt-2 pt-2 border-t border-slate-200/50 leading-relaxed font-normal">
                      <span className="font-bold text-slate-900">Border Effect Observation:</span> The identical minimum values (<strong className="text-slate-955 font-extrabold text-slate-900">−15.979 µg/m³</strong>) shared by Zone 1 and Zone 3 suggest a massive regional PM₂.₅ reduction localized along a shared geographic border between stable crop boundaries and transition edge zones.
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-450 font-mono mt-2 pt-3 border-t border-slate-250/50 border-slate-200 leading-relaxed select-text">
                    Source: WorldPop 100m Population Counts (Unconstrained) 2023 · CAMS Reanalysis PM₂.₅ Map 2023 · FAO GAUL Level 2 Administrative Boundaries · WHO Target Limit Value: PM₂.₅ = 5 µg/m³
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
                            <th className="py-3 px-4 font-bold text-right">Expansion Rate (%)</th>
                            <th className="py-3 px-4 font-bold text-right">Coverage Area (km²)</th>
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
                                  {row.category} Zone
                                </td>
                                <td className="py-3 px-4 text-right font-mono font-bold">{row.percentage.toFixed(1)}%</td>
                                <td className="py-3 px-4 text-right font-mono font-bold">{row.area.toLocaleString()} km²</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                    <span>*Calculated utilizing Sentinel-2 Cloud-free composites</span>
                    <span className="font-bold text-slate-655">{item.benchmark}</span>
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
                        <div key={idx} className="flex justify-between items-center p-2.5 rounded-lg bg-emerald-50/20 border border-emerald-500/10">
                          <span className="text-slate-700 font-medium text-xs">{flux.class}</span>
                          <span className="font-mono text-emerald-700 text-xs font-extrabold">{flux.value}% conversion</span>
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
                        <div key={idx} className="flex justify-between items-center p-2.5 rounded-lg bg-rose-50/25 border border-rose-500/10">
                          <span className="text-slate-700 font-medium text-xs">{flux.class}</span>
                          <span className="font-mono text-rose-700 text-xs font-extrabold">{flux.value}% transition</span>
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
                        <div key={idx} className="flex justify-between items-center text-[10px] font-mono">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                            <span className="text-slate-550 font-bold truncate max-w-[130px]">{entry.category.split(' (')[0]}</span>
                          </div>
                          <span className="font-bold text-slate-900">{entry.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Dynamic Key Findings Conclusion Box for PM2.5 */}
              {key === 'pm25' && (
                <div className="mt-8 p-6 bg-amber-50/50 border border-amber-200/60 rounded-2xl border-l-4 border-l-amber-500 shadow-xs text-slate-800 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔍</span>
                    <h4 className="font-extrabold text-[#78350F] text-sm font-sans tracking-wide">
                      Key Findings — Turkey PM₂.₅ Exposure 2023
                    </h4>
                  </div>
                  <p className="text-slate-600 text-[13px] leading-relaxed font-sans">
                    Fine Particulate Matter (PM₂.₅) remains a challenging atmospheric pressure in Turkey, where <strong className="text-slate-900 font-extrabold">58%</strong> of the country's population experiences <strong className="text-slate-900 font-extrabold">Moderate</strong> ranges (5–10 µg/m³). These aerosol curves correspond strongly with intensive <strong className="text-slate-900 font-extrabold">Croplands</strong> (Code 5) activity, causing persistent seasonal spikes during harvesting periods and field conditioning. Gained agricultural areas showcase moderate increases in annual aggregates, signaling that implementing dust-preventative agricultural measures has a major outcome on adjacent suburban population centers.
                  </p>
                  <div className="text-[10px] text-slate-450 font-mono mt-2 pt-2 border-t border-slate-200/50 leading-relaxed">
                    Source: WorldPop 100m Population Counts (Unconstrained) 2023 · CAMS Reanalysis PM₂.₅ Concentration Map 2023 · FAO GAUL Level 2 Administrative Boundaries · WHO Target Limit Value: PM₂.₅ = 5 µg/m³
                  </div>
                </div>
              )}

              {/* Horizontal rule separator expect for last */}
              {index < 2 && <hr className="border-slate-200 mt-20" />}
            </div>
          );
        })}



      </div>
    </div>
  );
}
