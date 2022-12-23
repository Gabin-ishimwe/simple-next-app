import Image from "next/image";
import Link from "next/link";


const Page = ({data, header}) => {
    return (
        <div>
            <h1>{header}</h1>
            {
                data.map((info, key) => {
                    return (
                        <Link href={`/events/${info.city}/${info.id}`} key={key}>
                        <Image src={info.image} height={200} width={200} alt={info.id}/>
                        <h1>{info.title}</h1>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Page;

export async function getStaticPaths() {
    const data = import("../../../data/data.json")
    const allPaths = (await data).events_categories.map(
        event => {
            return {
                params: {
                    cat: event.id.toString()
                }
            }
        }
    )
    return {
        paths: [
          ...allPaths
        ],
        fallback: false
    }
}
export async function getStaticProps(context) {
    const data = await import("../../../data/data.json")
    const id = context.params.cat
    const infos = data.allEvents.filter((page) => id == page.city)
    return {
        props: {
            data: infos,
            header: id
        }
    }
}