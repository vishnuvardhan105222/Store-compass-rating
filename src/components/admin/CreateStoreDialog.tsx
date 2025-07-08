import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { mockApi } from '@/lib/mockData';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const createStoreSchema = z.object({
  name: z.string()
    .min(2, 'Store name must be at least 2 characters')
    .max(60, 'Store name must not exceed 60 characters'),
  email: z.string().email('Please enter a valid email'),
  address: z.string()
    .min(10, 'Address must be at least 10 characters')
    .max(400, 'Address must not exceed 400 characters'),
  ownerEmail: z.string().email('Please enter a valid owner email').optional().or(z.literal('')),
});

type CreateStoreForm = z.infer<typeof createStoreSchema>;

interface CreateStoreDialogProps {
  children: React.ReactNode;
  onStoreCreated: () => void;
}

export const CreateStoreDialog: React.FC<CreateStoreDialogProps> = ({ children, onStoreCreated }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateStoreForm>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      ownerEmail: '',
    },
  });

  const onSubmit = async (data: CreateStoreForm) => {
    setIsLoading(true);
    try {
      await mockApi.createStore({
        name: data.name,
        email: data.email,
        address: data.address,
        ownerEmail: data.ownerEmail || undefined,
      });
      toast({
        title: "Store created",
        description: `${data.name} has been successfully created`,
      });
      onStoreCreated();
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error creating store",
        description: "Failed to create store",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Store</DialogTitle>
          <DialogDescription>
            Add a new store to the platform. You can optionally assign an owner.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter store name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter store email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter store address" rows={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ownerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Email (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter owner email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Store
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};