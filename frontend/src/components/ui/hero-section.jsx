import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeIndianRupee, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/market-hero.svg';

const HeroSection = () => {
  const stats = [
    { label: 'Verified investors', value: '50K+' },
    { label: 'Curated fund ideas', value: '500+' },
    { label: 'Assets tracked', value: 'Rs 10L+' },
  ];

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-10">
      <div className="absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_top,hsl(196_80%_78%/.22),transparent_48%),linear-gradient(180deg,hsl(210_70%_16%)_0%,hsl(195_65%_26%)_42%,transparent_100%)]" />
      <div className="absolute left-[-8rem] top-28 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="absolute right-[-6rem] top-12 h-56 w-56 rounded-full bg-orange-300/25 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 shadow-lg backdrop-blur">
            <Sparkles className="h-4 w-4" />
            A more confident way to discover, compare, and grow your investments
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-6xl xl:text-7xl">
              Build a calmer,
              <span className="block bg-[linear-gradient(135deg,#7dd3fc,#fcd34d)] bg-clip-text text-transparent">
                clearer investing habit.
              </span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-200/92 md:text-xl">
              MutualFunds Pro brings fund discovery, SIP planning, performance tracking, and portfolio clarity into one polished workspace designed for everyday investors.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="h-12 bg-white text-slate-900 hover:bg-slate-100" asChild>
              <Link to="/register">
                Create your account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 border-white/30 bg-white/10 text-white hover:bg-white/15" asChild>
              <Link to="/funds">Explore top funds</Link>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-white/12 bg-white/10 p-5 text-white shadow-[0_25px_50px_-28px_rgba(15,23,42,0.65)] backdrop-blur">
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="mt-1 text-sm text-slate-200">{stat.label}</div>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              SEBI-style trust cues and transparent workflows
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2">
              <TrendingUp className="h-4 w-4 text-sky-300" />
              Rich dashboards with focused insights
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-[2.4rem] bg-white/10 blur-3xl" />
          <Card className="relative overflow-hidden rounded-[2rem] border-white/15 bg-[linear-gradient(180deg,hsl(0_0%_100%/.14),hsl(0_0%_100%/.06))] p-4 shadow-[0_40px_90px_-40px_rgba(2,8,23,0.72)] backdrop-blur-xl">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-slate-950/25">
              <img
                src={heroImage}
                alt="Investment analytics dashboard preview"
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-2">
              <div className="rounded-2xl border border-white/12 bg-white/10 p-4 text-white">
                <div className="mb-2 inline-flex rounded-xl bg-emerald-400/15 p-2 text-emerald-300">
                  <BadgeIndianRupee className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">SIP confidence</h3>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Simulate monthly investing outcomes and compare strategy choices before you commit.
                </p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/10 p-4 text-white">
                <div className="mb-2 inline-flex rounded-xl bg-sky-400/15 p-2 text-sky-300">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">Portfolio snapshots</h3>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  See fund trends, risk posture, and recent activity without wading through clutter.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
