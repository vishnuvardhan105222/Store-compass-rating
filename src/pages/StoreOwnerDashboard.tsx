import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Store, Rating, User } from '@/types';
import { mockApi } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/StarRating';
import { Star, Users, MapPin, Loader2 } from 'lucide-react';

export const StoreOwnerDashboard = () => {
  const { user } = useAuth();
  const [myStores, setMyStores] = useState<Store[]>([]);
  const [storeRatings, setStoreRatings] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const [allStores, allRatings] = await Promise.all([
        mockApi.getStores(),
        mockApi.getRatings(),
      ]);

      // Filter stores owned by current user
      const ownedStores = allStores.filter(store => store.ownerId === user.id);
      setMyStores(ownedStores);

      // Get ratings for owned stores
      const storeIds = ownedStores.map(store => store.id);
      const relevantRatings = allRatings.filter(rating => storeIds.includes(rating.storeId));
      
      // Get user details for ratings
      const users = await mockApi.getUsers();
      const ratingsWithUsers = relevantRatings.map(rating => ({
        ...rating,
        user: users.find(u => u.id === rating.userId),
      }));
      
      setStoreRatings(ratingsWithUsers);
    } catch (error) {
      console.error('Failed to load store owner data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStoreRatings = (storeId: string) => {
    return storeRatings.filter(rating => rating.storeId === storeId);
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
      {/* Header */}
      <div className="bg-gradient-card rounded-xl p-6 shadow-soft">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Store Owner Dashboard
        </h1>
        <p className="text-muted-foreground">
          Monitor your stores and customer feedback
        </p>
      </div>

      {/* No Stores Message */}
      {myStores.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="mx-auto h-12 w-12 bg-muted rounded-lg flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Stores Assigned</h3>
            <p className="text-muted-foreground">
              Contact an administrator to get stores assigned to your account.
            </p>
          </CardContent>
        </Card>
      )}

      {/* My Stores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {myStores.map((store) => {
          const ratings = getStoreRatings(store.id);
          
          return (
            <Card key={store.id} className="shadow-soft">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{store.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {store.address}
                    </CardDescription>
                  </div>
                  {store.averageRating > 0 && (
                    <Badge variant="secondary" className="text-sm">
                      <Star className="h-3 w-3 mr-1" />
                      {store.averageRating.toFixed(1)}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Store Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-accent rounded-lg">
                    <div className="text-2xl font-bold text-accent-foreground">
                      {store.totalRatings}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Ratings</div>
                  </div>
                  <div className="text-center p-3 bg-accent rounded-lg">
                    <div className="text-2xl font-bold text-accent-foreground">
                      {store.averageRating.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">Average Rating</div>
                  </div>
                </div>

                {/* Overall Rating */}
                <div>
                  <h4 className="font-medium mb-2">Overall Rating</h4>
                  <StarRating rating={store.averageRating} />
                </div>

                {/* Recent Ratings */}
                {ratings.length > 0 ? (
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Customer Ratings ({ratings.length})
                    </h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {ratings.map((rating) => (
                        <div key={rating.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              {rating.user?.name || 'Anonymous User'}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(rating.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <StarRating rating={rating.rating} size="sm" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <Star className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No ratings yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};