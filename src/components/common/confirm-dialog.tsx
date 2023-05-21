import { ReactNode, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmProps {
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  dangerous?: boolean;
  children: ReactNode;
}

export function ConfirmDialog(props: ConfirmProps) {
  const {
    onConfirm,
    title,
    description,
    confirmText,
    cancelText,
    dangerous,
    children,
  } = props;
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    await onConfirm();
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      {children}

      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>

        <DialogFooter>
          <Button
            color="neutral"
            onClick={() => setOpen(false)}
            variant="tonal"
          >
            {cancelText ?? "Cancel"}
          </Button>

          <Button
            color={dangerous ? "danger" : "primary"}
            onClick={handleConfirm}
          >
            {confirmText ?? "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
