This is a starter template for [Learn Next.js](https://nextjs.org/learn).

Please run this after install Material UI
npm install --save-dev babel-plugin-styled-components

# Catch-all Routes

Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets. For example:

    pages/posts/[...id].js matches /posts/a, but also /posts/a/b, /posts/a/b/c and so on.

If you do this, in getStaticPaths, you must return an array as the value of the id key like so:

return [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ['a', 'b', 'c']
    }
  }
  //...
]
And params.id will be an array in getStaticProps:
export async function getStaticProps({ params }) {
  // params.id will be like ['a', 'b', 'c']
}

# SWR

The team behind Next.js has created a React hook for data fetching called SWR. We highly recommend it if you’re fetching data on the client side. It handles caching, revalidation, focus tracking, refetching on interval, and more. We won’t cover the details here, but here’s an example usage:

import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}

Check out the SWR documentation to learn more.

# Build Run

npm run dev


In your own hosting provider, run the build script once, which builds the production application in the .next folder.

npm run build

After building, the start script starts a Node.js server that supports hybrid pages, serving both statically generated and server-side rendered pages, and API Routes.

npm run start

    Tip: You can customize the start script in package.json to accept a PORT parameter by updating it as: "start": "next start -p $PORT".

npm run export
  Will export to static html in out dir.
  $ serve out
    
# Using antd

https://dev.to/burhanuday/using-ant-design-with-nextjs-custom-variables-for-ant-design-57m5

npm install --save @zeit/next-css @zeit/next-less @zeit/next-sass babel-plugin-import less
npm install --save antd
