import React from 'react';
import { Card, CardContent, CardTitle, CardHeader } from '../ui/card';

interface CardWrapperProps {
  title: string;
  content: string | number;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.FC<{ className?: string }>;
}

export const CardWrapper: React.FC<CardWrapperProps> = ({ title, content, Icon }) => {
  return (
    <Card className="w-1/3 p-4 bg-gray-50 text-black shadow-sm">
      <CardHeader className='flex flex-row justify-between items-center py-0 py-4'>
        <CardTitle>{title}</CardTitle>
        {Icon && <Icon className='w-8 h-8' />}
      </CardHeader>
      <CardContent className="flex items-center justify-between py-0">
        <span className="text-xl">{content}</span>
      </CardContent>
    </Card>
  );
};
