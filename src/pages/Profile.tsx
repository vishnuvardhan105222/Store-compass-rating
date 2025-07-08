import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, MapPin, Calendar } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'destructive';
      case 'STORE_OWNER':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <p className="text-muted-foreground">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Your account information and details
          </p>
        </div>

        {/* Profile Card */}
        <Card className="shadow-soft">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription className="flex items-center justify-center gap-2">
              <Badge variant={getRoleBadgeVariant(user.role)}>
                {user.role.toLowerCase().replace('_', ' ')}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </h3>
              <div className="grid gap-4">
                <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-lg">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{user.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Account Details
              </h3>
              <div className="grid gap-4">
                <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-lg">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-lg">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="font-medium">Last Updated</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(user.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Role Description */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Role Permissions</h3>
              <div className="p-4 bg-accent/50 rounded-lg">
                {user.role === 'ADMIN' && (
                  <div>
                    <p className="font-medium text-primary">System Administrator</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Full access to manage users, stores, and system settings. Can create and modify all platform data.
                    </p>
                  </div>
                )}
                {user.role === 'STORE_OWNER' && (
                  <div>
                    <p className="font-medium text-primary">Store Owner</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Can view and manage assigned stores, see customer ratings and feedback for owned stores.
                    </p>
                  </div>
                )}
                {user.role === 'NORMAL_USER' && (
                  <div>
                    <p className="font-medium text-primary">Normal User</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Can browse stores, submit ratings, and manage personal account settings.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};