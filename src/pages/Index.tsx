import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Shield, ArrowRight, CheckCircle, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  const features = [
    {
      icon: Star,
      title: 'Rate & Review',
      description: 'Share your experiences and help others make informed decisions'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of users sharing honest feedback about local stores'
    },
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description: 'Your data is protected with enterprise-grade security'
    },
    {
      icon: TrendingUp,
      title: 'Business Insights',
      description: 'Store owners get valuable analytics and customer feedback'
    }
  ];

  const roles = [
    {
      title: 'For Customers',
      description: 'Discover great stores and share your experiences',
      features: ['Browse stores', 'Submit ratings', 'Read reviews', 'Find recommendations'],
      action: 'Start Rating',
      href: '/auth/register'
    },
    {
      title: 'For Store Owners',
      description: 'Get insights about your business performance',
      features: ['View customer ratings', 'Monitor feedback', 'Track performance', 'Improve service'],
      action: 'Manage Store',
      href: '/auth/login'
    },
    {
      title: 'For Administrators',
      description: 'Manage the entire platform efficiently',
      features: ['User management', 'Store oversight', 'System analytics', 'Platform control'],
      action: 'Admin Access',
      href: '/auth/login'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">R</span>
            </div>
            <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              RATINITY
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🌟 Trusted by thousands of users
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Rate, Review &{' '}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Discover
                  </span>{' '}
                  Amazing Stores
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  The ultimate platform for rating stores and making informed shopping decisions. 
                  Join our community and share your experiences.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/auth/register">
                    Start Rating <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/auth/login">Sign In</Link>
                </Button>
              </div>
              
              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Free to use</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Secure platform</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Real reviews</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl"></div>
              <img 
                src={heroImage} 
                alt="RATINITY Platform" 
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-accent/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose RATINITY?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for the modern world, RATINITY connects customers with businesses 
              through authentic ratings and reviews.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perfect for Everyone
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're a customer, store owner, or administrator, 
              RATINITY has tools designed for your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <Card key={index} className="relative group hover:shadow-elevated transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl">{role.title}</CardTitle>
                  <CardDescription className="text-base">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {role.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={index === 1 ? "default" : "outline"} asChild>
                    <Link to={role.href}>
                      {role.action} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8 text-primary-foreground">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of users who trust RATINITY for honest store ratings and reviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/auth/register">
                  Create Account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 bg-gradient-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">R</span>
              </div>
              <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                RATINITY
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 RATINITY. Built with modern technology for the rating experience.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
