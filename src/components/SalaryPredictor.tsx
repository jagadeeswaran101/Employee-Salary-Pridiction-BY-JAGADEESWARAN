import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Calculator, TrendingUp, Users, DollarSign, Gauge } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PredictionResult {
  minSalary: number;
  maxSalary: number;
  avgSalary: number;
  marketDemand: 'High' | 'Moderate' | 'Low';
  experienceBonus: number;
}

const jobFields = [
  'Information Technology',
  'Mechanical Engineering',
  'Finance & Banking',
  'Healthcare',
  'Marketing & Sales',
  'Human Resources',
  'Data Science',
  'Cybersecurity'
];

const SalaryPredictor = () => {
  const [formData, setFormData] = useState({
    age: '',
    experience: '',
    jobField: '',
    specificJob: ''
  });
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock prediction function (in real app, this would call backend API)
  const calculateSalary = (data: typeof formData): PredictionResult => {
    const baseRates: Record<string, number> = {
      'Information Technology': 8.5,
      'Mechanical Engineering': 6.5,
      'Finance & Banking': 7.2,
      'Healthcare': 7.8,
      'Marketing & Sales': 5.5,
      'Human Resources': 5.8,
      'Data Science': 9.2,
      'Cybersecurity': 8.8
    };

    const baseRate = baseRates[data.jobField] || 5.0;
    const experienceMultiplier = 1 + (parseInt(data.experience) * 0.15);
    const ageMultiplier = parseInt(data.age) > 30 ? 1.1 : 1.0;
    
    const avgSalary = baseRate * experienceMultiplier * ageMultiplier;
    const variance = avgSalary * 0.25;

    return {
      minSalary: Math.round((avgSalary - variance) * 100000),
      maxSalary: Math.round((avgSalary + variance) * 100000),
      avgSalary: Math.round(avgSalary * 100000),
      marketDemand: parseInt(data.experience) > 3 ? 'High' : parseInt(data.experience) > 1 ? 'Moderate' : 'Low',
      experienceBonus: parseInt(data.experience) * 0.15 * 100
    };
  };

  const handlePredict = async () => {
    if (!formData.age || !formData.experience || !formData.jobField || !formData.specificJob) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to get a salary prediction.",
        variant: "destructive"
      });
      return;
    }

    if (parseInt(formData.age) < 18) {
      toast({
        title: "Invalid Age",
        description: "Age must be 18 or above.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const result = calculateSalary(formData);
      setPrediction(result);
      setLoading(false);
      toast({
        title: "Prediction Complete",
        description: "Your salary prediction has been calculated successfully!",
      });
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'text-accent';
      case 'Moderate': return 'text-warning-amber';
      case 'Low': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Form */}
      <Card className="p-6 bg-gradient-to-br from-card to-steel-dark border-steel shadow-industrial">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/20">
            <Calculator className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Salary Calculator</h2>
            <p className="text-sm text-muted-foreground">Enter your details for prediction</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium text-foreground">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="24"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="bg-steel-dark border-steel-light"
                min="18"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-sm font-medium text-foreground">Experience (Years)</Label>
              <Input
                id="experience"
                type="number"
                placeholder="2"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="bg-steel-dark border-steel-light"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobField" className="text-sm font-medium text-foreground">Job Field</Label>
            <Select value={formData.jobField} onValueChange={(value) => setFormData({ ...formData, jobField: value })}>
              <SelectTrigger className="bg-steel-dark border-steel-light">
                <SelectValue placeholder="Select your field" />
              </SelectTrigger>
              <SelectContent className="bg-card border-steel-light">
                {jobFields.map((field) => (
                  <SelectItem key={field} value={field}>{field}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specificJob" className="text-sm font-medium text-foreground">Specific Job Role</Label>
            <Input
              id="specificJob"
              placeholder="e.g., Frontend Developer, Data Analyst"
              value={formData.specificJob}
              onChange={(e) => setFormData({ ...formData, specificJob: e.target.value })}
              className="bg-steel-dark border-steel-light"
            />
          </div>

          <Button 
            onClick={handlePredict} 
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-industrial-blue hover:from-primary/90 hover:to-industrial-blue/90 font-semibold"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Calculating...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Predict Salary
              </div>
            )}
          </Button>
        </div>
      </Card>

      {/* Results Panel */}
      <Card className="p-6 bg-gradient-to-br from-card to-steel-dark border-steel shadow-industrial">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-accent/20">
            <Gauge className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Prediction Results</h2>
            <p className="text-sm text-muted-foreground">AI-powered salary analysis</p>
          </div>
        </div>

        {loading && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-foreground">Analyzing market data...</span>
            </div>
            <Progress value={65} className="w-full" />
            <p className="text-sm text-muted-foreground">Processing your request with our AI model</p>
          </div>
        )}

        {!loading && !prediction && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <DollarSign className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Ready for Prediction</h3>
            <p className="text-muted-foreground">Fill in the form and click predict to see your salary analysis</p>
          </div>
        )}

        {prediction && !loading && (
          <div className="space-y-6">
            {/* Salary Range */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-steel-dark border border-steel-light">
                <p className="text-sm text-muted-foreground mb-1">Minimum</p>
                <p className="text-lg font-bold text-foreground">{formatCurrency(prediction.minSalary)}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-primary/20 border border-primary/30">
                <p className="text-sm text-primary mb-1">Expected</p>
                <p className="text-xl font-bold text-primary">{formatCurrency(prediction.avgSalary)}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-steel-dark border border-steel-light">
                <p className="text-sm text-muted-foreground mb-1">Maximum</p>
                <p className="text-lg font-bold text-foreground">{formatCurrency(prediction.maxSalary)}</p>
              </div>
            </div>

            {/* Market Insights */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-steel-dark border border-steel-light">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Market Demand</span>
                </div>
                <span className={`text-sm font-semibold ${getDemandColor(prediction.marketDemand)}`}>
                  {prediction.marketDemand}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-steel-dark border border-steel-light">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Experience Bonus</span>
                </div>
                <span className="text-sm font-semibold text-accent">
                  +{prediction.experienceBonus.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Recommendation */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/30">
              <h4 className="font-semibold text-foreground mb-2">💡 Recommendation</h4>
              <p className="text-sm text-muted-foreground">
                Based on current market trends, consider developing skills in emerging technologies to increase your earning potential by 15-25%.
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SalaryPredictor;