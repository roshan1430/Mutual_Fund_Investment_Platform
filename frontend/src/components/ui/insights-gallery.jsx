import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart3, Layers3, Shield, Sparkles } from 'lucide-react';
import insightGrid from '@/assets/insight-grid.svg';

const features = [
  {
    icon: BarChart3,
    title: 'Decision-ready dashboards',
    description: 'Track movements, evaluate fund categories, and understand recent performance at a glance.',
  },
  {
    icon: Layers3,
    title: 'A smoother investing workflow',
    description: 'Move from discovery to planning to monitoring without hopping between disconnected screens.',
  },
  {
    icon: Shield,
    title: 'Cleaner trust signals',
    description: 'A more polished visual hierarchy makes important actions and account states easier to understand.',
  },
];

const InsightsGallery = () => {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-900">
            <Sparkles className="h-4 w-4" />
            Designed to feel more premium and easier to trust
          </div>
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              A sharper product story with visuals that support the experience.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              We&apos;ve added richer illustration-led moments and tighter card layouts so the platform looks more deliberate while keeping the core actions obvious.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="rounded-3xl border-white/70 bg-white/85 p-5 shadow-card">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-primary text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="overflow-hidden rounded-[2rem] border-white/70 bg-white/70 p-4 shadow-xl backdrop-blur">
          <img
            src={insightGrid}
            alt="Grid of polished analytics and portfolio visuals"
            className="w-full rounded-[1.5rem] border border-slate-100 object-cover"
          />
        </Card>
      </div>
    </section>
  );
};

export default InsightsGallery;
