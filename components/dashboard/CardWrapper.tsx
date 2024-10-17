import React from 'react';
import { Card, CardContent, CardTitle, CardHeader } from '../ui/card';

interface CardWrapperProps {
  title: string;
  content: string | number;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.FC<{ className?: string }>;
}

export const CardWrapper: React.FC<CardWrapperProps> = ({ title, content, Icon }) => {
  return (
    <Card className="w-[90%] lg:w-1/3 md:p-4 bg-gray-50 text-black shadow-sm">
      <CardHeader className='flex flex-row w-full px-1 justify-between items-center py-0 py-4'>
        <CardTitle className='text-xl lg:text-2xl'>{title}</CardTitle>
        {Icon && <Icon className='w-8 h-8' />}
      </CardHeader>
      <CardContent className="flex items-center justify-between py-0 px-2">
        <span className="text-xl text-left pl-0 ml-0">{content}</span>
      </CardContent>
    </Card>
  );
};
