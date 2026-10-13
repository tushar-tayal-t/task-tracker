'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function MemberChatRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = typeof params?.workspaceId === 'string' ? params.workspaceId : '';
  const memberId = typeof params?.memberId === 'string' ? params.memberId : '';

  useEffect(() => {
    if (workspaceId && memberId) {
      router.replace(`/workspaces/${workspaceId}/chat/dm/${memberId}`);
    }
  }, [workspaceId, memberId, router]);

  return (
    <div className="flex h-64 items-center justify-center text-xs text-zinc-500">
      Redirecting to unified chat...
    </div>
  );
}
