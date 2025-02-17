import { FC } from "react";

export type PageProps<TParams> = {
  params: TParams;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export type Page<TParams> = FC<PageProps<TParams>>;
