interface PageTitleProps {
    title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
    return (
        <div className="my-6 flex flex-col items-center">
            <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
    )
}