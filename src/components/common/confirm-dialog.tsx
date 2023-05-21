import { ReactNode, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ConfirmProps {
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  matchTextToDelete?: {
    label: string;
    helpText: string;
    matchText: string;
  };
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
    matchTextToDelete,
    children,
  } = props;
  const [open, setOpen] = useState(false);
  const [matchText, setMatchText] = useState("");

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

        {matchTextToDelete && (
          <Input
            className="mb-4"
            helpText={matchTextToDelete.helpText}
            label={matchTextToDelete.label}
            onChange={(e) => setMatchText(e.target.value)}
            value={matchText}
          />
        )}

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
            disabled={
              matchTextToDelete && matchTextToDelete.matchText !== matchText
            }
            onClick={handleConfirm}
          >
            {confirmText ?? "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
