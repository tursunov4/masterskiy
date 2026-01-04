"use client";

import FloatingContactWidget from "@/components/ui/FloatingContactWidget";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
// agar sizda shunaqa action bo‘lsa:
import { openConsult } from "@/store/slices/consult.slice";

export default function FloatingContactWidgetClient() {
  const dispatch = useAppDispatch();
  const contact = useAppSelector((s) => s.contact.data);

  return (
    <FloatingContactWidget
      position="right"
      phone={contact?.phone}
      email={contact?.email}
      whatsappUrl={contact?.whatsapp}
      onOpenRequest={() => dispatch(openConsult())}
    />
  );
}
