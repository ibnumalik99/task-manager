import Main from "../../Layouts/Main";
import Button from "../../Components/Button";
import { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";

const Index = ({users, record}) => {
    const { errors, application_name, auth } = usePage().props
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        title: record ? record.title : '',
        description: record ? record.description : '',
        status: record ? record.status : 'Pending',
        assigned: record ? record.assigned : null,
        due_date: record ? record.due_date : null
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        router.post('/task', data, {
            onError: () => [setLoading(false)],
        });
    }

    const handleEdit = async(e) => {
        e.preventDefault();
        setLoading(true);
        router.put(`/task/${record.id}`, data, {
            onError: () => [setLoading(false)],
            onSuccess: () => [setLoading(false)]
        });
    }

    const handleUpdateStatus = () => {
        router.get(`/task/${record.id}/update-status`)
    }

    const handleDelete = () => {
        router.delete( `/task/${record.id}`)
    }

    function handleValues(e) {
        const key = e.target.id;
        const value = e.target.value;

        setData((data) => ({
            ...data,
            [key]: value,
        }));
    }

    return (
        <div>
            <Head>
                <title>{`${ record ? 'Edit':'Create'} Task - ${application_name}`}</title>
            </Head>

            <div className="max-w-4xl mx-auto h-screen w-full grid content-center grid-cols-6 gap-x-6">
                <div className="col-span-4 flex gap-2">
                    <Button
                        btnType="submit"
                        type="warning"
                        text="Back"
                        onClick={() => router.get('/dashboard')}
                    >
                    </Button>
                    {record && record.created_by === auth.user.id && (
                        <Button
                            btnType="submit"
                            type="danger"
                            text="Delete"
                            onClick={handleDelete}
                        >
                        </Button>
                    )}
                </div>
                <div className="col-span-4 grid gap-4 content-start">
                    <div className="">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input
                            type="title"
                            id="title"
                            name="title"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                            placeholder="Your Name"
                            required
                            value={data.title}
                            onChange={handleValues}
                        />
                        {errors.title && (
                            <p className="mt-2 text-xs text-red-600 dark:text-red-500">
                                <span className="font-medium">Opps! </span>{" "}
                                {errors.title}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea 
                            name="description"
                            id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-h-[200%]" 
                            placeholder="Task Description..."
                            required
                            value={data.description}
                            onChange={handleValues}
                        ></textarea>
                        {errors.description && (
                            <p className="mt-2 text-xs text-red-600 dark:text-red-500">
                                <span className="font-medium">Opps! </span>{" "}
                                {errors.description}
                            </p>
                        )}
                    </div>
                </div>
                <div className="col-span-2 grid content-between border rounded-lg p-2 gap-4">
                    <div>
                        <div className="grid gap-2">
                            <label htmlFor="created_by" className="block text-sm font-medium text-gray-900 dark:text-white">Created By</label>
                            <input
                                type="text"
                                id="created_by"
                                name="created_by"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                                disabled
                                value={auth.user.name}
                            />
                            {errors.title && (
                                <p className="mt-2 text-xs text-red-600 dark:text-red-500">
                                    <span className="font-medium">Opps! </span>{" "}
                                    {errors.title}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="assigned" className="block text-sm font-medium text-gray-900 dark:text-white">Assignedd</label>
                            <select 
                                id="assigned" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                value={data.assigned || ''}
                                onChange={(e) => setData({ ...data, assigned: e.target.value })}
                                required
                            >
                                <option>Choose a user</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>

                            {errors.assigned && (
                                <p className="mt-2 text-xs text-red-600 dark:text-red-500">
                                    <span className="font-medium">Opps! </span>{" "}
                                    {errors.assigned}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="due_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input
                                type="date"
                                id="due_date"
                                name="due_date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                                placeholder="Your Name"
                                required
                                value={data.due_date}
                                onChange={handleValues}
                            />
                            {errors.due_date && (
                                <p className="mt-2 text-xs text-red-600 dark:text-red-500">
                                    <span className="font-medium">Opps! </span>{" "}
                                    {errors.due_date}
                                </p>
                            )}
                        </div>
                    </div>
                    {record ? (
                        <>
                            {record.status != 'Completed' && (

                            <Button
                                btnType="submit"
                                type="warning"
                                text={record.status == 'Pending' ? 'On Progress' : 'Completed'}
                                optionalClass="w-full"
                                // isLoading={loading}
                                onClick={handleUpdateStatus}
                            >
                            </Button>
                            )}
                            <Button
                                btnType="submit"
                                type="secondary"
                                text="Update"
                                optionalClass="w-full"
                                isLoading={loading}
                                onClick={handleEdit}
                            >
                            </Button>
                        </>
                    ) : (
                        <Button
                            btnType="submit"
                            type="warning"
                            text="Submit"
                            optionalClass="w-full"
                            isLoading={loading}
                            onClick={handleSubmit}
                        >
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

Index.layout = (page) => <Main children={page} title="Create Task" />;

export default Index;