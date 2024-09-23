'use client';

import React from 'react';

import { IconAdd, IconArrowBack } from '@/assets/icons';
import { Button } from '@/components/ui';

type FilterPageProps = {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
};

const FilterPage = ({ title, children, className, isLoading }: FilterPageProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenBtnClick = () => {
    setIsOpen(true);
  };

  const handleCloseBtnClick = () => {
    setIsOpen(false);
  };

  return (
    <section className={className}>
      {isLoading ? (
        <div className="skeleton w-[9.375rem] h-[2.75rem] cursor-progress rounded-full" />
      ) : (
        <Button iconLeft={<IconAdd className="w-6 h-6" />} onClick={handleOpenBtnClick}>
          {title}
        </Button>
      )}
      <div
        className="absolute top-0 left-0 w-full h-[calc(100%-2.75rem)] translate-x-full transition-all z-0 bg-white data-[open='true']:translate-x-0 data-[open='true']:z-20 flex flex-col"
        data-open={String(isOpen)}
      >
        <Button iconLeft={<IconArrowBack className="w-6 h-6" />} onClick={handleCloseBtnClick} className="self-start">
          Назад
        </Button>
        <div className="flex-1 mt-4 bg-white flex flex-col">{children}</div>
      </div>
    </section>
  );
};

export default FilterPage;
