'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileUploader } from '../ui/file-uploader';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required',
  }),
  imageUrl: z.string().min(1, {
    message: 'Server name is required',
  }),
});

export const CreateNewServer = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    }
  });

  const isModalOpen = isOpen && type === 'createServer';

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const responseData = await fetch('/api/servers', {
        method: 'POST',
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(values),
      });
      console.log(responseData);
      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = useCallback(() => {
    form.reset();
    onClose();
  }, [form, onClose]);

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className='bg-white text-black p-0 overflow-hidden'>
          <DialogHeader className='pt-8 px-6'>
            <DialogTitle className='text-2xl text-center font-bold'>
              Create your server
            </DialogTitle>
            <DialogDescription className='text-center text-zinc-500'>
              Give your server a personality with a name and an image. You can always change it later
            </DialogDescription>
          </DialogHeader>
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='space-y-8 px-6'>
                <div className='flex items-center justify-center text-center'>
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormControl>
                        <FileUploader
                          value={field.value}
                          onChange={field.onChange}
                          name="imageUrl"
                        />
                      </FormControl>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                      >
                        Server name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Enter server name"
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="bg-gray-100 px-6 py-4">
                <Button disabled={isLoading} variant="primary">Create</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
