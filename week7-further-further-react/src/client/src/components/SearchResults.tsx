import type IMapItem from "../types/IMapItem"

interface Props {
    mapItems: IMapItem[]
}

export default function ({ mapItems }: Props) {
    console.log(mapItems)

    return (
        <div className="flex flex-col">
            {mapItems.map((value, index) => {
                return (
                    <div key={index}>
                        <h1>{value.fullName}</h1>
                    </div>
                )
            })}
        </div>
    )
}