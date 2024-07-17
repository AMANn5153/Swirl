import React from 'react'

const Skeleton = () => {
  return (
    <div class="flex w-52 flex-col gap-4">
  <div class="flex items-center gap-4">
    <div class="skeleton h-16 w-16 shrink-0 rounded-full"></div>
    <div class="flex flex-col gap-4">
      <div class="skeleton h-4 w-20"></div>
    </div>
  </div>
</div>
  )
}

export default Skeleton