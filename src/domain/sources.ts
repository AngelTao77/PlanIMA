import {z} from 'zod';
import index from '../../data/sources/official.json';
export const sourceSchema=z.object({id:z.string(),title:z.string(),url:z.url().refine(u=>new URL(u).hostname==='bulletins.nyu.edu','Only the curated NYU Bulletin domain is allowed'),domain:z.literal('bulletins.nyu.edu'),contentExcerpt:z.string().max(1000),summary:z.string().max(2000),retrievedAt:z.iso.datetime(),applicableBulletinYear:z.string(),sourceType:z.enum(['official_bulletin','official_course_catalog']),verificationStatus:z.literal('verified_excerpt'),keywords:z.array(z.string())});
export const sources=z.array(sourceSchema).parse(index);
export function searchOfficialSources(q:string){if(/DEMO-|prerequisite|先修|seat|availability|开课|gpa|minimum|graduation|毕业|equivalen|transfer/i.test(q))return [];return sources.filter(s=>new URL(s.url).hostname==='bulletins.nyu.edu'&&s.keywords.some(k=>q.toLowerCase().includes(k)));}
