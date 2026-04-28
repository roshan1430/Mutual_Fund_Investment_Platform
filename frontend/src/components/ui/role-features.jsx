import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RoleFeatures = () => {
  const roles = [
    {
      title: 'For Investors',
      description: 'Explore, compare, and manage your mutual fund investments with ease',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      features: ['Fund discovery and comparison', 'Portfolio tracking and analytics', 'Investment recommendations', 'Goal-based planning tools'],
      color: 'primary',
      path: '/register',
    },
    {
      title: 'For Financial Advisors',
      description: 'Provide expert guidance and create educational content for clients',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      features: ['Client portfolio management', 'Educational content creation', 'Performance analysis tools', 'Client communication platform'],
      color: 'accent',
    },
    {
      title: 'For Admins',
      description: 'Oversee platform operations, user activities, and content management',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      features: ['User management and monitoring', 'Platform configuration', 'Content moderation', 'System analytics and reports'],
      color: 'success',
      path: '/admin-login',
    },
    {
      title: 'For Data Analysts',
      description: 'Analyze trends, update performance data, and generate insights',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: ['Market trend analysis', 'Fund performance tracking', 'Risk assessment models', 'Custom report generation'],
      color: 'warning',
    },
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary/5 text-primary border-primary/20';
      case 'accent':
        return 'bg-accent/5 text-accent border-accent/20';
      case 'success':
        return 'bg-success/5 text-success border-success/20';
      case 'warning':
        return 'bg-warning/5 text-warning border-warning/20';
      default:
        return 'bg-primary/5 text-primary border-primary/20';
    }
  };

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-3 inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-900">
            Role-based experiences that still feel connected
          </div>
          <h2 className="mb-4 text-4xl font-bold text-foreground">Tailored Solutions for Every Role</h2>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            Our platform serves different user types with specialized tools and features designed for their unique needs
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {roles.map((role, index) => (
            <Card
              key={index}
              className="border-white/70 bg-[image:var(--gradient-panel)] p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className={`rounded-lg border p-3 ${getColorClasses(role.color)}`}>{role.icon}</div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-bold text-foreground">{role.title}</h3>
                    <p className="text-muted-foreground">{role.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {role.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${role.color === 'primary' ? 'bg-gradient-primary text-primary-foreground' : 'bg-gradient-success text-success-foreground'} hover:opacity-90`}
                  asChild
                >
                  <Link to={role.path || '/investment-plans'}>Get Started as {role.title.replace('For ', '')}</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoleFeatures;
