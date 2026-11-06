import {NextRequest,NextResponse} from 'next/server';
import {searchOfficialSources} from '@/domain/sources';
export function GET(req:NextRequest){const q=req.nextUrl.searchParams.get('q')||'';if(q.length>500)return NextResponse.json({message:'Query too long'},{status:400});const sources=searchOfficialSources(q);return NextResponse.json({sources,message:sources.length?'Curated official references; individual applicability remains unverified.':'Could not verify from configured official sources.'});}
