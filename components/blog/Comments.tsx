"use client"

import { repositoryName } from "@/data/config";
import Giscus from "@giscus/react";

export function Comments() {
  return (
    <Giscus
      id="comments"
      repo={repositoryName}
      // @ts-ignore
      repoId={process.env.REPO_ID}
      category="Announcements"
      categoryId={process.env.CATEGORY_ID}
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark"
      lang="en"
      loading="lazy"
    />
  );
}