"use client"

import { repositoryName } from "@/data/config";
import Giscus from "@giscus/react";

export function Comments({slug}: {slug: string}) {
  return (
    <Giscus
      id="comments"
      repo={repositoryName}
      repoId={process.env.NEXT_PUBLIC_REPO_ID || ''}
      category="Announcements"
      categoryId={process.env.NEXT_PUBLIC_CATEGORY_ID || ''}
      mapping="specific"
      term={slug}
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