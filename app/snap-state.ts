export type SnapTarget = {
  listId: string;
  itemIndex: number;
};

const snapState = {
  current: null as SnapTarget | null,
};

export function updateSnapOwner(listId: string, itemIndex: number) {
  const nextTarget = { listId, itemIndex };

  if (
    snapState.current &&
    snapState.current.listId === listId &&
    snapState.current.itemIndex === itemIndex
  ) {
    return;
  }

  snapState.current = nextTarget;
  document.documentElement.classList.add('list-snapping');
}

export function clearSnapOwner(listId: string) {
  if (snapState.current?.listId !== listId) {
    return;
  }

  snapState.current = null;
  document.documentElement.classList.remove('list-snapping');
}
