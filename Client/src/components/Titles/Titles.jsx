export default function Titles({title = "Title"}) {
    return (
        <div className='flex justify-start w-full lg:pl-10 px-15 imprima-700'>
            <a className='text-2xl'>{title}</a>
        </div>
    )
}
