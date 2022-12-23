import Image from "next/image";


const Page = ({data}) => {
    return (
        <div>
            {
                data.map((info, key) => {
                    return (
                        <a href={`/events/${info.id}`} key={key}>
                        <Image src={info.image} height={200} width={200}/>
                        <h1>{info.title}</h1>
                        </a>
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
            data: infos
        }
    }
}