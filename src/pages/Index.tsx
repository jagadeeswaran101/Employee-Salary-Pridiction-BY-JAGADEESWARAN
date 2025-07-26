import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SalaryPredictor from '@/components/SalaryPredictor';
import { Cpu, Database, TrendingUp, Shield, Zap, BarChart3 } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

const Index = () => {
  const features = [
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "AI-Powered Predictions",
      description: "Advanced linear regression algorithms analyze market data for accurate salary estimates"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Real-Time Data",
      description: "Fetches latest job market trends from multiple sources including LinkedIn and Glassdoor"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Market Analysis",
      description: "Comprehensive insights into job demand, competition levels, and growth trends"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Private",
      description: "Your data is processed securely with enterprise-grade encryption"
    }
  ];

  const stats = [
    { label: "Predictions Made", value: "25,000+", icon: <BarChart3 className="h-5 w-5" /> },
    { label: "Job Fields Covered", value: "50+", icon: <Zap className="h-5 w-5" /> },
    { label: "Accuracy Rate", value: "94%", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Active Users", value: "5,000+", icon: <Cpu className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/95" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <Badge variant="outline" className="mb-4 bg-primary/20 border-primary/30 text-primary">
            🔧 Mechanical Salary Engine v2.0
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Employee Salary Prediction
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Harness the power of AI and linear algebra to predict accurate salary ranges. 
            Built with industrial-grade precision for modern professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Linear Regression Model</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span>Real-time Market Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-copper rounded-full animate-pulse" />
              <span>AI-Powered Insights</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center bg-gradient-to-br from-card to-steel-dark border-steel shadow-industrial">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Main Predictor */}
        <div className="mb-12">
          <SalaryPredictor />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-gradient-to-br from-card to-steel-dark border-steel shadow-industrial hover:shadow-glow transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/20 text-accent">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Technical Details */}
        <Card className="mt-12 p-8 bg-gradient-to-br from-steel-dark to-card border-steel shadow-industrial">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-3">🔬 Technical Specifications</h2>
            <p className="text-muted-foreground">Built with cutting-edge technology and mathematical precision</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">Machine Learning</h4>
              <p className="text-sm text-muted-foreground">Linear regression with matrix operations and least squares optimization</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-accent/10 border border-accent/20">
              <h4 className="font-semibold text-accent mb-2">Data Sources</h4>
              <p className="text-sm text-muted-foreground">Google APIs, job portals, and real-time market analytics</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-copper/10 border border-copper/20">
              <h4 className="font-semibold text-copper mb-2">Frontend Tech</h4>
              <p className="text-sm text-muted-foreground">React.js with TypeScript and industrial UI components</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;