import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@template/ui/components/button";

export function BackButton() {
  return (
    <Button variant="ghost" size="sm" asChild>
      <Link href="/">
        <IconArrowLeft size={16} />
        Regresar
      </Link>
    </Button>
  );
}
