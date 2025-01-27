'use client';

import React from 'react';

import { notFound, useParams, usePathname, useRouter } from 'next/navigation';

import { useUser } from '@/hooks';

import { Menu } from '../components';

const menuItems = [
  { title: 'Профиль', id: 'info' },
  { title: 'Закладки', id: 'bookmarks' },
];

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  const navigation = useRouter();
  const pathname = usePathname();
  const { data: selfUser, error: selfUserError } = useUser();

  const isSelfUser = selfUser?.id === id;
  const lastPath = pathname.split('/').at(-1);

  React.useLayoutEffect(() => {
    if (selfUserError) {
      console.error(selfUserError);
      notFound();
    }
  }, [selfUserError, selfUserError]);

  React.useLayoutEffect(() => {
    if (!isSelfUser) {
      notFound();
    }
  }, [isSelfUser]);

  return isSelfUser ? (
    <section className="flex flex-nowrap gap-4">
      <Menu items={menuItems} onClick={menuId => navigation.push(`/user/${id}/settings/${menuId}`)} selectedId={lastPath!} />
      {children}
    </section>
  ) : null;
};

export default SettingsLayout;
