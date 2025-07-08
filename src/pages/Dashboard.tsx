import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Store, Rating } from '@/types';
import { mockApi } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/StarRating';
import { Search, MapPin, Star, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

export const Dashboard = () => {
  const { user } = useAuth();
  const [stores, setStores] = useState<Store[]>([]);
  const [userRatings, setUserRatings] = useState<Rating[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [submittingRating, setSubmittingRating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [storesData, ratingsData] = await Promise.all([
        mockApi.getStores(),
        mockApi.getUserRatings(user?.id || ''),
      ]);
      setStores(storesData);
      setUserRatings(ratingsData);
    } catch (error) {
      toast({
        title: "Error loading data",
        description: "Failed to load stores and ratings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserRating = (storeId: string): number => {
    const rating = userRatings.find(r => r.storeId === storeId);
    return rating ? rating.rating : 0;
  };

  const handleRating = async (storeId: string, rating: number) => {
    if (!user) return;

    try {
      setSubmittingRating(true);
      await mockApi.submitRating(user.id, storeId, rating);
      
      // Refresh data
      await loadData();
      
      toast({
        title: "Rating submitted",
        description: `You rated this store ${rating} star${rating !== 1 ? 's' : ''}`,
      });
      
      setSelectedStore(null);
    } catch (error) {
      toast({
        title: "Error submitting rating",
        description: "Failed to submit your rating",
        variant: "destructive",
      });
    } finally {
      setSubmittingRating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-card rounded-xl p-6 shadow-soft">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          Discover and rate stores in your area
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Find Stores
          </CardTitle>
          <CardDescription>
            Search for stores by name or location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search stores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => {
          const userRating = getUserRating(store.id);
          
          return (
            <Card key={store.id} className="hover:shadow-elevated transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{store.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {store.address}
                    </CardDescription>
                  </div>
                  {store.averageRating > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      <Star className="h-3 w-3 mr-1" />
                      {store.averageRating.toFixed(1)}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Store Rating */}
                <div>
                  <p className="text-sm font-medium mb-2">Store Rating</p>
                  <div className="flex items-center justify-between">
                    <StarRating rating={store.averageRating} />
                    <span className="text-sm text-muted-foreground">
                      ({store.totalRatings} rating{store.totalRatings !== 1 ? 's' : ''})
                    </span>
                  </div>
                </div>

                {/* User Rating */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Your Rating</p>
                    {userRating > 0 && (
                      <Badge variant="outline">{userRating} star{userRating !== 1 ? 's' : ''}</Badge>
                    )}
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant={userRating > 0 ? "outline" : "default"} 
                        size="sm" 
                        className="w-full"
                        onClick={() => setSelectedStore(store)}
                      >
                        {userRating > 0 ? 'Update Rating' : 'Rate Store'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Rate {store.name}</DialogTitle>
                        <DialogDescription>
                          Share your experience with this store
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="text-center">
                          <StarRating
                            rating={userRating}
                            interactive
                            size="lg"
                            onRatingChange={(rating) => handleRating(store.id, rating)}
                          />
                        </div>
                        
                        {userRating > 0 && (
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                              Current rating: {userRating} star{userRating !== 1 ? 's' : ''}
                            </p>
                          </div>
                        )}
                        
                        {submittingRating && (
                          <div className="flex items-center justify-center">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Submitting rating...
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredStores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No stores found matching your search.</p>
        </div>
      )}
    </div>
  );
};