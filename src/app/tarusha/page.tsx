import { login } from './actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Zap, Activity, Terminal } from 'lucide-react';

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center py-32 px-6 bg-slate-50 overflow-hidden">
      {/* Aggressive Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-black mix-blend-multiply" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale" />
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[200px] rounded-full pointer-events-none animate-pulse" />

      <Card className="w-full max-w-lg relative z-10 border border-black/5 bg-black/[0.01] backdrop-blur-3xl shadow-[0_40px_120px_rgba(0,0,0,0.9)] rounded-[4rem] overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <CardHeader className="space-y-6 text-center pb-12 pt-20">
          <div className="w-24 h-24 rounded-[2.5rem] bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 transition-all duration-1000 group-hover:scale-110 group-hover:rotate-[360deg] shadow-[0_0_50px_rgba(239,68,68,0.2)]">
             <ShieldCheck className="w-12 h-12 text-primary drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase italic leading-none drop-shadow-2xl">
              OZONE <span className="text-primary italic">LABS</span>
            </CardTitle>
            <CardDescription className="text-slate-700 font-black uppercase tracking-[0.5em] text-[10px] italic">
              CENTRAL COMMAND AUTHENTICATION
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-14 pb-20">
          <form className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <Label htmlFor="email" className="text-slate-600 font-black uppercase tracking-[0.4em] text-[9px] italic flex items-center gap-3">
                  <Terminal className="w-3 h-3" />
                  OPERATOR IDENTIFIER
                </Label>
              </div>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="OPERATOR@OZONELABS.LK" 
                required 
                className="h-20 bg-black/[0.03] border-black/5 text-slate-900 placeholder:text-slate-800 focus:border-primary focus:ring-0 focus-visible:ring-0 rounded-2xl text-xl font-black uppercase tracking-tight italic transition-all duration-500 hover:bg-white/[0.05]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <Label htmlFor="password" className="text-slate-600 font-black uppercase tracking-[0.4em] text-[9px] italic flex items-center gap-3">
                  <Activity className="w-3 h-3" />
                  ACCESS ENCRYPTION KEY
                </Label>
              </div>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="h-20 bg-black/[0.03] border-black/5 text-slate-900 focus:border-primary focus:ring-0 focus-visible:ring-0 rounded-2xl text-xl font-black transition-all duration-500 hover:bg-white/[0.05]"
              />
            </div>

            <Button 
              formAction={login} 
              className="w-full mt-16 h-24 bg-primary hover:bg-primary/90 text-slate-900 font-black text-2xl rounded-2xl shadow-[0_20px_60px_rgba(239,68,68,0.5)] transition-all duration-700 transform hover:-translate-y-2 active:scale-95 uppercase tracking-[0.3em] flex items-center justify-center gap-6 italic group/btn" 
              type="submit"
            >
              <Zap className="w-8 h-8 group-hover/btn:scale-110 transition-transform" />
              INITIALIZE COMMAND
            </Button>
          </form>
        </CardContent>

        <div className="absolute bottom-0 left-0 w-full p-8 flex justify-center opacity-20">
           <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-[0.4em] text-slate-800">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              SECURE LAB NODE DETECTED
           </div>
        </div>
      </Card>
    </div>
  );
}
