export default function OtherBlogs({blogs}:{blogs:any}) {
    return (
        <>
            <div className="grid grid-cols-6 gap-2 mb-5">
                <div className="col-span-2">
                    <img src={blogs.img} className="rounded-sm" alt="" />
                </div>
                <div className="col-span-4">
                    <p className="text-xs">{blogs.category}</p>
                    <p className="text-sm font-bold text-black">{blogs.title}</p>
                    <p className="text-xs">Published: {blogs.published}</p>
                </div>
            </div>
        </>
    );
}
