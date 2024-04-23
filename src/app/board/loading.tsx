import ModalLoader from '@/components/ModalLoader';
import React from 'react';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <ModalLoader isVisible={true} />
}
