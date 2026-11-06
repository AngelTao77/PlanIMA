import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'PlanIMA — Your path, taking shape',description:'An interactive academic journey planner. Fictional demo data; not an official NYU degree audit.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
