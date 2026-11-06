import {describe,it,expect} from 'vitest';
import {seed,activeVersion} from '../src/domain/data';
import {calculateEarnedCredits,validatePlan,generateCandidatePlan,proposePlanChange,applyValidatedProposal} from '../src/domain/academic';
import {searchOfficialSources} from '../src/domain/sources';
describe('Academic planning safety',()=>{
 it('excludes pending transfer credit',()=>expect(calculateEarnedCredits(seed().workspaces.transfer.profile.records)).toBe(8));
 it('blocks prerequisite placed in the same term',()=>{const w=seed().workspaces.junior;const p=proposePlanChange(activeVersion(w),[{courseId:'c15',termId:'t6'}],w.profile,'test');expect(p.validation.status).toBe('invalid');expect(()=>applyValidatedProposal(p,activeVersion(w),w.profile)).toThrow();});
 it('preview is immutable, valid apply creates version, stale apply fails',()=>{const w=seed().workspaces.junior,v=activeVersion(w);const p=proposePlanChange(v,[{courseId:'c12',termId:'t5'}],w.profile,'move');expect(v.assignments.find(a=>a.courseId==='c12')?.termId).toBe('t6');const next=applyValidatedProposal(p,v,w.profile);expect(next.number).toBe(2);expect(()=>applyValidatedProposal(p,next,w.profile)).toThrow(/stale/);});
 it('early target reports omitted requirements and plans future only',()=>{const p=seed().workspaces.junior.profile;p.target='t4';const plan=generateCandidatePlan(p);expect(plan.every(a=>a.termId==='t4')).toBe(true);expect(validatePlan(plan,p).issues.some(i=>i.code==='missing')).toBe(true);});
 it('finds a full junior path by scheduling the prerequisite chain first',()=>{const p=seed().workspaces.junior.profile;const plan=generateCandidatePlan(p);expect(plan).toHaveLength(7);expect(validatePlan(plan,p).issues.some(i=>i.code==='missing'||i.severity==='error')).toBe(false);});
 it('rejects duplicates and hard overload',()=>{const w=seed().workspaces.first;const plan=Array.from({length:5},(_,i)=>({courseId:`c${i+1}`,termId:'t0'}));expect(validatePlan(plan,w.profile).issues.some(i=>i.code==='hard_load')).toBe(true);expect(validatePlan([...plan,plan[0]],w.profile).issues.some(i=>i.code==='duplicate')).toBe(true);});
 it('optional courses require configured eligibility',()=>{const p=seed().workspaces.junior.profile;p.summer=true;expect(validatePlan([{courseId:'c9',termId:'s2'}],p).issues.some(i=>i.code==='optional')).toBe(true);expect(validatePlan([{courseId:'c13',termId:'s2'}],p).issues.some(i=>i.code==='optional')).toBe(false);});
 it('retrieves only a curated source and never fabricates unknown citations',()=>{expect(searchOfficialSources('official IMA program')[0].url).toContain('bulletins.nyu.edu');expect(searchOfficialSources('DEMO-IMA-101 prerequisite')).toEqual([]);});
});
