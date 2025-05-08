import { JSX } from 'react';
export const LoadingSpinner = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className='size-12 animate-spin rounded-full border-4 border-solid border-gray-200 border-t-transparent'
        role='status'
      >
        <span className='sr-only'>로딩 중...</span>
      </div>
    </div>
  )
}