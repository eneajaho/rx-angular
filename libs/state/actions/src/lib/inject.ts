import { DestroyRef, ErrorHandler, inject } from '@angular/core';
import { RxActionFactory } from './actions.factory';
import { ActionTransforms, RxActions } from './types';

export function withTransforms<
  Actions extends object,
  Transforms extends ActionTransforms<Actions> = {}
>(transforms: Transforms) {
  return (rxActionFactory: RxActionFactory<Actions>) =>
    rxActionFactory.create<Transforms>(transforms);
}

export function rxActions<
  Actions extends object,
  Transforms extends ActionTransforms<Actions> = {}
>(
  withTransformsFn?: (
    rxActionFactory: RxActionFactory<Actions>
  ) => RxActions<Actions, Transforms>
): RxActions<Actions, Transforms> {
  const errorHandler = inject(ErrorHandler, { optional: true }) ?? undefined;
  const rxActionFactory = new RxActionFactory<Actions>(errorHandler);
  const destroyRef = inject(DestroyRef);

  destroyRef.onDestroy(() => rxActionFactory.ngOnDestroy());

  if (withTransformsFn) {
    return withTransformsFn(rxActionFactory);
  }

  return rxActionFactory.create();
}
