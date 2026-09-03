import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './style.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import LoadingSpinner from './components/LoadingSpinner'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const AllAssets = lazy(() => import('./pages/AllAssets'))
const AssignInventory = lazy(() => import('./pages/AssignInventory'))
const WorkstationBundles = lazy(() => import('./pages/WorkstationBundles'))
const EmployeeAssignment = lazy(() => import('./pages/EmployeeAssignment'))
const AssetTransfers = lazy(() => import('./pages/AssetTransfers'))
const RepairsClearance = lazy(() => import('./pages/RepairsClearance'))
const Consumables = lazy(() => import('./pages/Consumables'))
const StockUsage = lazy(() => import('./pages/StockUsage'))
const LowStockConsumables = lazy(() => import('./pages/LowStockConsumables'))
const InventoryReports = lazy(() => import('./pages/InventoryReports'))
const Settings = lazy(() => import('./pages/Settings'))

const pageNames = { '/assets': 'All Assets', '/inventory/assign': 'Assign Inventory', '/inventory/bundles': 'Workstation Bundles', '/inventory/employees': 'Employee Assignments', '/inventory/transfers': 'Asset Transfers', '/inventory/repairs': 'Repairs & Clearance', '/consumables': 'Consumables', '/consumables/stock-usage': 'Stack usage', '/consumables/low-stock': 'Low Stock Consumables', '/reports': 'Reports', '/settings': 'Settings' }
function Placeholder() { const { pathname } = useLocation(); const name = pageNames[pathname] || 'Dashboard'; return <main className="min-h-screen bg-slate-50 p-4"><div className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-2xl font-bold tracking-tight text-slate-900">{name}</h1><p className="mt-1 text-sm text-slate-500">Manage {name.toLowerCase()}.</p></div><Header /></div></main> }
function App() { return <div className="flex h-screen overflow-hidden bg-slate-50"><Sidebar /><div className="h-full min-w-0 flex-1 overflow-y-auto"><Suspense fallback={<LoadingSpinner />}><Routes><Route path="/" element={<Dashboard />} /><Route path="/assets" element={<AllAssets />} /><Route path="/inventory/assign" element={<AssignInventory />} /><Route path="/inventory/bundles" element={<WorkstationBundles />} /><Route path="/inventory/employees" element={<EmployeeAssignment />} /><Route path="/inventory/transfers" element={<AssetTransfers />} /><Route path="/inventory/repairs" element={<RepairsClearance />} /><Route path="/consumables" element={<Consumables />} /><Route path="/consumables/stock-usage" element={<StockUsage />} /><Route path="/consumables/low-stock" element={<LowStockConsumables />} /><Route path="/reports" element={<InventoryReports />} /><Route path="/settings" element={<Settings />} /><Route path="*" element={<Placeholder />} /></Routes></Suspense></div></div> }
ReactDOM.createRoot(document.getElementById('app')).render(<React.StrictMode><Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider></React.StrictMode>)








