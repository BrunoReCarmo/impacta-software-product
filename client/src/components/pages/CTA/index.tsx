"use client";

import { useUserMe } from "@/api/user/useUserMe";
import { Trans } from "@/lib/i18n";

export default function CTA() {
    const { user } = useUserMe()

    return <Trans i18nKey="welcome" ns={'common'} values={{value: user?.name ?? ''}} />
}