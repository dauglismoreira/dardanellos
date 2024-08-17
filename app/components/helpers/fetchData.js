import {redirect} from "next/navigation";

export default async function fetchData(path) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_ROUTE + path, {
        next: {revalidate: 10},
        headers: {
            'app-authorization': `${process.env.NEXT_PUBLIC_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
    })

    if (!res.ok) {
        // redirect('/404')
    }

    return res.json()
}
 