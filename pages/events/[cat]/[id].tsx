import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";

const Page = ({data}) => {
    const inputRef = useRef()
    const router = useRouter()
    const onSubmit = async (e) => {
        e.preventDefault();
        const emailValue = inputRef.current.value
        const eventId = router?.query.id;
        try {
            // POST fetch request
            const response = await fetch("/api/email-registration", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    email: emailValue,
                    eventId
                })
            })
            console.log(response)
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
        <h1>{data.title}</h1>
        <Image src={data.image} height={200} width={200} alt={data.id} />
        <p>{data.description}</p>
        <form onSubmit={onSubmit}>
            <label>Register for this event</label>
            <input type={"email"} ref={inputRef} id="emai" placeholder="Email" required/>
            <button type="submit">submit</button>
        </form>
        </div>
    )
}

export default Page;

export async function getStaticPaths() {
    const data = await import("../../../data/data.json")
    const allPaths = data.allEvents.map((path) => {
        return {
            params: {
                id: path.id,
                cat: path.city
            }
        }
    })
    return {
        paths: allPaths,
        fallback: false
    }
}

export async function getStaticProps(context: any) {
    const data = await import("../../../data/data.json")
    const [eventData] = data.allEvents.filter((event) => event.id == context.params.id)
    return {
        props: {
            data: eventData
        }
    }
}

