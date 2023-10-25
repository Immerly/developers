interface ErrorBoxProps {
    message: string;
}

const ErrorBox = ({ message }: ErrorBoxProps) => {
    return (
        <div className="w-full px-4 py-2 flex flex-col bg-red-400 dark:bg-red-500">
            <div className="font-bold">Error!11!1</div>
            <p>{message}</p>
        </div>
    );
};

export default ErrorBox;
