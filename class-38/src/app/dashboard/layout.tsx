import Link from 'next/link'
import React, { ReactNode } from 'react'

const layout = ({children}:{children: ReactNode}) => {
  return (
    <div className='grid grid-cols-6'>



        <div className='bg-slate-400 h-screen px-2 py-3'>
            <ul>
                <li><Link href='/dashboard' >Dashboard</Link></li>
                <li><Link href='/dashboard/home' >Home</Link></li>
                <li><Link href='/dashboard/bookmarks' >Bookmarks</Link></li>
                <li><Link href='/dashboard/articles' >Articles</Link></li>
                <li><Link href='/dashboard/saved-items' >Saved Items</Link></li>
            </ul>
        </div>

        
        <div className='col-span-5'>

            <div className='bg-blue-300 py-3 px-3'>
                This is top bar
            </div>
          <div className='px-4 py-3 overflow-y-auto h-[87dvh]'>
             {children}
          </div>
        </div>


    </div>
  )
}

export default layout
