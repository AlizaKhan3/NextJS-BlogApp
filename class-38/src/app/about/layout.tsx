import React from 'react'

const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div>
      This is about layout
      <hr />
      {children}
    </div>
  )
}

export default layout
