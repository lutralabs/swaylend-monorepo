import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useMarketConfiguration } from '@/hooks';
import { cn } from '@/lib/utils';
import { ACTION_TYPE, useMarketStore } from '@/stores';
import { EXPLORER_URL, SYMBOL_TO_NAME } from '@/utils';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { ArrowUpRightIcon, CheckCircleIcon } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

export const SuccessDialog = () => {
  const {
    actionTokenAssetId,
    tokenAmount,
    action,
    successDialogOpen: open,
    changeAction,
    changeTokenAmount,
    changeSuccessDialogOpen: setOpen,
    successDialogTransactionId,
  } = useMarketStore();

  const { data: marketConfiguration } = useMarketConfiguration();

  const actionText = useMemo(() => {
    if (action === ACTION_TYPE.SUPPLY) {
      return 'Supply Completed';
    }
    if (action === ACTION_TYPE.WITHDRAW) {
      return 'Withdrawal Completed';
    }
    if (action === ACTION_TYPE.BORROW) {
      return 'Borrow Completed';
    }
    if (action === ACTION_TYPE.REPAY) {
      return 'Repayment Completed';
    }
  }, [action, actionTokenAssetId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 max-sm:w-[90%] max-sm:rounded-xl max-w-[400px]">
        <VisuallyHidden.Root asChild>
          <DialogTitle>Transaction Successful</DialogTitle>
        </VisuallyHidden.Root>
        <div className="h-full w-full">
          <div className="relative w-full h-[64px] text-lg font-semibold flex justify-center items-center">
            Transaction Successful
            <div
              className={cn(
                '-z-10 w-[80%] top-[62px] h-[2px] rounded-full bg-gradient-to-r from-popover via-primary to-popover absolute left-[calc(10%)]'
              )}
            />
            <div
              className={cn(
                '-z-10 absolute blur-xl top-[56px] left-[calc(30%)] rounded-full w-[40%] h-8 bg-primary'
              )}
            />
          </div>
          <div className="bg-card p-4 w-full pt-12 flex flex-col items-center">
            <div>
              <CheckCircleIcon className="w-10 h-10 text-primary" />
            </div>
            <div className="text-lg font-semibold mt-4">{actionText}</div>

            <a
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer font-normal text-moon mt-12 flex items-center gap-x-2"
              href={`${EXPLORER_URL}/${successDialogTransactionId}`}
            >
              Explorer <ArrowUpRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};