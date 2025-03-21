import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BookmarksService } from '@/services';
import { BookmarkDto } from '@/types/bookmarks';

type MutationVariables = {
  title: string;
};

const mutationFn = async ({ title }: MutationVariables) => (await BookmarksService.createBookmark({ title })).data;

const useCreateBookmark = (config: UseMutationOptions<BookmarkDto, AxiosError<{ message: string }>, MutationVariables> = {}) =>
  useMutation<BookmarkDto, AxiosError<{ message: string }>, MutationVariables>({
    mutationFn,
    mutationKey: ['bookmarks', 'create'],
    ...config,
  });

export default useCreateBookmark;
