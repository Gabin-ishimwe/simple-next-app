import Image from "next/image";

const EventMain = ({data}) => {
    return (
        <div>
        <h1>All Events</h1>
        <div>
        <div>
        {
            data.map((info) => (
                <a href={`/events/` + info.id} key={info.id}>
                <h2>{info.title}</h2>
                <p>{info.description}</p>
                <Image width={200} height={200} src={info.image} alt={info.id}/>
                </a>
            ))
          }
        </div>
        </div>
        </div>
    )
}

export default EventMain;

export async function getStaticProps() {
    const {events_categories}= await import("../../data/data.json")
    return {
        props: {
            data: events_categories
        }
    }
}