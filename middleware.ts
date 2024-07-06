import { clerkMiddleware, createRouteMatcher,  } from '@clerk/nextjs/server';
import { redirectToSignIn} from '@clerk/nextjs/server'

import { redirect } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';


const isPublicRoute=createRouteMatcher([`/`]);
export default clerkMiddleware((auth,req)=>{
  if(auth().userId && isPublicRoute(req)){
    let path="/select-org"
    if(auth().orgId){
      path=`/organizations/${auth().orgId}`
    }
    const orgSelection=new URL(path,req.url)
    return NextResponse.redirect(orgSelection)
  }
    if(!auth().userId && !isPublicRoute){
     return redirectToSignIn({ returnBackUrl:req.url})
    }
    if(auth().userId && !auth().orgId && req.nextUrl.pathname!== "/select-org"){
      const orgSelection=new URL("/select-org",req.url)
      return NextResponse.redirect(orgSelection)
  }
})

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

