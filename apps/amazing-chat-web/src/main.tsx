import { useGSAP } from '@gsap/react'
import gasp from 'gsap'
import { createRoot } from 'react-dom/client'
import Entry from './pages/entry/Entry.tsx'
import { initDatasource } from './services/datasource'
import './index.css'

gasp.registerPlugin(useGSAP)
const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(<Entry />)
}
initDatasource()
