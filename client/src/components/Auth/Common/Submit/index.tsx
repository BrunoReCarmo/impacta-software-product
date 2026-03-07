"use client";

import { Button } from "@/components/core";
import useTranslation from "@/lib/i18n";

export default function SubmitButton() {
    const { t } = useTranslation('common')
    
    return <Button >{t('sign_up')}</Button>
}