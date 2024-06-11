"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EditUserProfileSchema } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

type Props = {
  user: any | null;
  onUpdate?: any;
};

const ProfileForm = ({ user, onUpdate }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof EditUserProfileSchema>>({
    mode: "onChange",
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: { name: user.name, email: user.email }
  });
  // const { toast } = useToast()

  const onSubmit = async (data: z.infer<typeof EditUserProfileSchema>) => {
    setLoading(true);
    try {
      const result = await onUpdate(data.name);
      if (result) {

        toast('User Details Updated Successfully')
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);

      toast('Failed to update user details')

    };
  }
  useEffect(() => {
    reset({ name: user.name, email: user.email });
  }, [user]);

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-[50%] h-[500px] border-none">
          <CardContent className='pl-0'>
            <div className="grid w-full items-center gap-4 text-2xl">
              <div className="flex flex-col  space-y-2">
                <Label htmlFor="name" className='text-xl' >Name</Label>
                <Input id="name" placeholder="Enter Your Name" className='py-7' {...register('name')} disabled={isLoading} />
                {errors.name && <span className="text-red-500 text-lg">{errors.name.message}</span>}
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email" className='text-xl'>Email</Label>
                <Input id="email" placeholder="Enter Your Email" className='py-7' {...register('email')} disabled={isLoading} />
                {errors.email && <span className="text-red-500 text-lg">{errors.email.message}</span>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between space-y-2 pl-0">
            <Button type="submit">{isLoading ? <> <Loader2 className='animate-spin mr-2' /> <>Updating</> </> : "Update"}</Button>
          </CardFooter>
        </Card>
      </form>
      <Toaster />
    </div>
  );
};

export default ProfileForm;
