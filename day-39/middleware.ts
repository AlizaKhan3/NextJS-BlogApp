import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"


export function middleware(request: NextRequest) {

  // return NextResponse.redirect(new URL('/feed', request.url))
  // return NextResponse.next()
  // const token = null
  // if(!token){
  //   return new NextResponse(JSON.stringify({
  //   error:'Unauthorized'
  // }), {status:401, headers:{"Content-Type": "application/json"}})
  // }
}

export const config = {
  matcher: [
    // '/login'
    // "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}


//  app -> page -> will serve page.ts  
//  app -> layout and page -> will look into layout -> through layout children page will serve 
//  app -> no middleware  -> directly
        //  app -> page -> will serve page.ts  
        //  app -> layout and page -> will look into layout -> through layout children page will serve 

//  app -> middleware.ts  -> app will serve according to the middleware file config